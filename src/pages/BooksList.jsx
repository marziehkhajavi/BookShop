import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getBooks } from 'src/services/book';

import AddBookModal from 'src/components/modals/AddBookModal';
import DeleteBookModal from 'src/components/modals/DeleteBookModal';
import EditBookModal from 'src/components/modals/EditBookModal';


import trash from "assets/pictures/trash.png";
import edit from "assets/pictures/edit.png";
import search from "assets/pictures/search.png";

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
                    <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.5699 18.5001V14.6001" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.5699 7.45V5.5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.57 12.65C17.0059 12.65 18.17 11.4859 18.17 10.05C18.17 8.61401 17.0059 7.44995 15.57 7.44995C14.134 7.44995 12.97 8.61401 12.97 10.05C12.97 11.4859 14.134 12.65 15.57 12.65Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.43005 18.5V16.55" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.43005 9.4V5.5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.42996 16.5501C9.8659 16.5501 11.03 15.386 11.03 13.9501C11.03 12.5142 9.8659 11.3501 8.42996 11.3501C6.99402 11.3501 5.82996 12.5142 5.82996 13.9501C5.82996 15.386 6.99402 16.5501 8.42996 16.5501Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                        <p>مدیریت کتاب ها</p>
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