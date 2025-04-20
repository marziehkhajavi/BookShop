import React from 'react';

import deleteIcon from "assets/pictures/Close.png";

import styles from "./DeleteBookModal.module.css";
import { deleteBook } from 'src/services/book';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const DeleteBookModal = ({ closeModal, id }) => {
    
    const queryKey = ["books"]
    const queryClient = useQueryClient();

    const mutationFn = ({id}) => deleteBook(id);
    const { mutate, isPending } = useMutation({ mutationFn,
        onSuccess: (newBook) => {
            console.log("success", newBook);
            queryClient.invalidateQueries({queryKey: ["books"]});
        },
        onError: (error) => {
            console.log("error", error)
        },
     });

    const deleteHandler = async (event) => {
        event.preventDefault();
        mutate({id})
        // const {response, error} = await deleteBook(id);
        // console.log({response, error})
        closeModal();
    };

    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <img src={deleteIcon} alt="delete-icon" />
                <p>آیا از حذف این کتاب مطمئنید؟</p>
                <div className={styles.buttons}>
                    <button className={styles.delete} onClick={deleteHandler}>حذف</button>
                    <button className={styles.cancel} onClick={closeModal}>لفو</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBookModal;