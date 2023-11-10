import React from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {deleteItem, getData} from '../api.ts';
import {QueryModel} from '../models.ts';
import {List} from './List.tsx';
import {ErrorDialog} from './ErrorDialog.tsx';

const queryKey = 'data';

export const Page: React.FC = () => {
    const queryClient = useQueryClient()
    const {data, isSuccess} = useQuery<QueryModel>({ queryKey: [queryKey], queryFn: getData });

    const mutation = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] })
        },
    });

    const dismissDialog = () => {
        // @ts-ignore
        queryClient.setQueryData([queryKey], data => ({...data, errors: null}));
    }

    return isSuccess && (
        <>
            <List items={data.items} deleteItem={item => mutation.mutate(item.id)}/>
            <ErrorDialog error={data.errors} dismiss={dismissDialog}/>
        </>
    )
}
