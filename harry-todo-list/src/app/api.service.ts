import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, first, map, merge, of, share, shareReplay, startWith, Subject, switchMap, take, tap} from 'rxjs';
import {webSocket} from 'rxjs/webSocket';
import {ItemModel, MessageModel, QueryModel, StartMessageModel} from './models';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {nanoid} from 'nanoid';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3003/api';
  private sessionId = nanoid();
  private dismiss$ = new Subject();

  private ws$ =
    webSocket<MessageModel>( `ws://localhost:3102/${this.sessionId}`.replace('http:', 'ws:'));

  public items$ = this.ws$.pipe(
    filter(x => x.type === 'update'),
    startWith(undefined),
    switchMap(() => this.http.get<Array<ItemModel>>('http://localhost:3101/getitems'))
  );

  public deleteItem(item: ItemModel) {
    this.http.post('http://localhost:3100/deleteitem', {id: item.id, sessionId: this.sessionId}).subscribe();
  }

  public error$ = merge(
    this.dismiss$.pipe(map(() => false)),
    this.ws$.pipe(
      filter(x => x.type === 'message'),
      map(() => true)
    ));

  public dismissError() {
    this.dismiss$.next(undefined);
  }

}
