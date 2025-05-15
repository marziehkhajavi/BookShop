import React, { useState } from 'react';

import styles from "./AddBookModal.module.css";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBook, getBooks } from 'src/services/book';

import toast from 'react-hot-toast';
import { messages } from 'src/utils/messages';
import { BookValidation } from 'src/helpers/validation';

const AddBookModal = ({ newBook, setNewBook, closeModal }) => {

    const {title, quantity, price} = newBook;

    const [errors, setErrors] = useState({});

    const queryKey = ["books"]
    const queryClient = useQueryClient();

    // const {data} = useQuery({queryKey, getBooks})

    const mutationFn = ({title, quantity, price}) => createBook(title, quantity, price);
    const { mutate, isPending } = useMutation({ mutationFn,
        onSuccess: (newBook) => {
            console.log("success", newBook);
            queryClient.invalidateQueries({queryKey: ["books"]});
            setNewBook({
                title: "",
                quantity: "",
                price: "",
            });
            closeModal();
            return toast.success(messages.success.addBook);

        },
        onError: (error) => {
            console.log("error", error);
            return toast.error(messages.error.addBook);
        },
     });

    const addHandler = async (event) => {
        event.preventDefault();

        const validationErrors = await BookValidation(title, quantity, price);
        setErrors(validationErrors);
        console.log(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            mutate({ title, quantity, price });
        };
    };

    return (
        <div className={styles.container}>
            <form className={styles.modal} onSubmit={addHandler}>
                <p>ایجاد محصول جدید</p>
                <div className={styles.inputs}>
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
                    <button type="submit" className={styles.add}>ایجاد</button>
                    <button type="button" onClick={closeModal} className={styles.cancel}>انصراف</button>
                </div>
                
            </form>
        </div>
    );
};

export default AddBookModal;