import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getBooks } from 'src/services/book';

import AddBookModal from 'src/components/modals/AddBookModal';
import DeleteBookModal from 'src/components/modals/DeleteBookModal';
import EditBookModal from 'src/components/modals/EditBookModal';


import trash from "assets/pictures/trash.png";
import edit from "assets/pictures/edit.png";
import search from "assets/pictures/search.png";
import setting from "assets/pictures/setting.png";

import styles from "./BooksList.module.css";
import { Link } from 'react-router-dom';

const BooksList = () => {

    const {data, isLoading, error} = useQuery({queryKey: ["books"], queryFn: getBooks});
    // console.log(data)
    const [newBook, setNewBook] = useState({
        title: "", 
        summary: "", 
        author: "", 
        price: "", 
        quantity: "",
        id: ""
    });

    const [selectedBookId, setSelectedBookId] = useState(null)

    const [modal, setModal] = useState(null);

    const openAddBookModal = () => {
        setModal("add");
    };

    const openEditBookModal = (book) => {
        setNewBook({
            title: book.title,
            quantity: book.quantity,
            price: book.price,
        })
        setSelectedBookId(book.id)
        setModal("edit");
    }; 

    const openDeleteBookModal = (book) => {
        setSelectedBookId(book.id)
        setModal("delete");
    };

    const closeModal = () => {
        setModal(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <img src={search} alt="" />
                <input type="text" placeholder='جستجو کتاب' />
            </div>
            <div className={styles.header}>
                <span>
                    <Link to='/dashboard'>
                        <img src={setting} alt="" />
                        <p>مدیریت کتاب ها</p>
                    </Link>
                </span>
                <button onClick={openAddBookModal} className={styles.add}>افزودن کتاب</button>
            </div>
            
            <div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>نام کتاب</th>
                            <th>موجودی</th> 
                            <th>قیمت</th>
                            <th>شناسه کالا</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.data.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.quantity}</td>
                                    <td>{book.price}</td>
                                    <td>{book.id}</td>
                                    <td>
                                        <button onClick={() => openEditBookModal(book)}>
                                            <img src={edit} alt="" />
                                        </button>
                                        <button onClick={() => openDeleteBookModal(book)}>
                                            <img src={trash} alt="" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                modal === 'add' && (
                    <AddBookModal 
                        newBook={newBook}
                        setNewBook={setNewBook}
                        closeModal={closeModal}
                    />
                )
            }
            {
                modal === 'edit' && (
                    <EditBookModal 
                        newBook={newBook}
                        setNewBook={setNewBook}
                        closeModal={closeModal}
                        id={selectedBookId}
                    />
                )
            }
            {
                modal === 'delete' && (
                    <DeleteBookModal 
                        closeModal={closeModal}
                        id={selectedBookId}
                    />
                )
            }
        </div>
    );
};

export default BooksList;