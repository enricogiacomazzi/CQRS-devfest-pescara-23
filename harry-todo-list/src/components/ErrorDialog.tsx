import React, {useEffect, useRef} from 'react';
import {ErrorModel} from '../models.ts';

interface ErrorDialogProps {
    error: ErrorModel | undefined;
    dismiss: () => void;
}
export const ErrorDialog: React.FC<ErrorDialogProps> = ({error, dismiss}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if(!!error) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [error]);

    return (
        <dialog ref={dialogRef}>
            <div onClick={dismiss}>
                <img src="/images/voldemort.webp"/>
            </div>
        </dialog>
    )
}
