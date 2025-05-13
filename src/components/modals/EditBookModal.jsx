import React, { useState } from 'react';

import styles from "./EditBookModal.module.css";
import { editBook } from 'src/services/book';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messages } from 'src/utils/messages';
import toast from 'react-hot-toast';
import { BookValidation } from 'src/helpers/validation';

const EditBookModal = ({ newBook, setNewBook, closeModal, id }) => {

    const {title, quantity, price} = newBook;
    
    const [errors, setErrors] = useState({});

    const queryKey = ["books"]
    const queryClient = useQueryClient();

    const mutationFn = ({id, title, quantity, price}) => editBook(id, title, quantity, price);
    const { mutate, isPending } = useMutation({ mutationFn,
        onSuccess: (newBook) => {
            console.log("success", newBook);
            queryClient.invalidateQueries({queryKey: ["books"]});
            return toast.success(messages.success.editBook);
        },
        onError: (error) => {
            console.log("error", error);
            return toast.error(messages.error.editBook);
        },
     });

    const editHandler = async (event) => {
        event.preventDefault();
        mutate({id, title, quantity, price})
        // const {response, error} = await editBook(id, title, quantity, price);
        // console.log({response, error})
        const validationErrors = await BookValidation(title, quantity, price);
        await setErrors(validationErrors);
        setNewBook("");
        !validationErrors && closeModal();
    };

    return (
        <div className={styles.container}>
            <form className={styles.modal}>
                <div className={styles.inputs}>
                    <p>ویرایش اطلاعات</p>
                    <label>نام کتاب</label>
                    <input
                        type="text"
                        id='title'
                        placeholder='نام کتاب'
                        value={title}
                        onChange={e => setNewBook({
                            ...newBook,
                            [e.target.id] :e.target.value})}
                    />
                    {errors.title && (
                    <span className={styles.errorText}>{errors.title}</span>)}

                    <label>تعداد موجودی</label>
                    <input 
                        type="number"
                        id='quantity'
                        placeholder='تعداد'
                        value={quantity}
                        onChange={e => setNewBook({
                            ...newBook,
                            [e.target.id] :e.target.value})}
                    />
                    {errors.quantity && (
                    <span className={styles.errorText}>{errors.quantity}</span>)}

                    <label>قیمت</label>
                    <input 
                        type="number"
                        id='price'
                        placeholder='قیمت'
                        value={price}
                        onChange={e => setNewBook({
                            ...newBook,
                            [e.target.id] :e.target.value})}
                    />
                    {errors.price && (
                    <span className={styles.errorText}>{errors.price}</span>)}
                </div>
                <div className={styles.buttons}>
                {errors.emptyField && (
                <span className={styles.errorText}>{errors.emptyField}</span>)}
                    <button onClick={editHandler} className={styles.add}>ثبت اطلاعات جدید</button>
                    <button onClick={closeModal} className={styles.cancel}>انصراف</button>
                </div>
            </form>
        </div>
    );
};

export default EditBookModal;