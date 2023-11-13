import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, first, map, merge, share, shareReplay, startWith, Subject, switchMap, take, tap} from 'rxjs';
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

  public init$ = this.http.post(this.baseUrl + '/commands/init', undefined).pipe(map(() => true));

  private ws$ =
    webSocket<MessageModel>( `${this.baseUrl}/ws/${this.sessionId}`.replace('http:', 'ws:'));

  public items$ = this.ws$.pipe(
    filter(x => x.type === 'update'),
    startWith(undefined),
    switchMap(() => this.http.get<QueryModel>(this.baseUrl + '/queries/getdata')),
    map(x => x.items)
  );

  public deleteItem(item: ItemModel) {
    this.http.post(this.baseUrl + '/commands/deleteitem', {id: item.id, sessionId: this.sessionId}).subscribe();
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
