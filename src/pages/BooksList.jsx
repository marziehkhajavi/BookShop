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
                <span>
                    <svg width="35px" height="35px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.029 16.5295L19.5 19.0005" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </span>
                <input type="text" placeholder='جستجو کتاب' />
            </div>
            <div className={styles.header}>
                <span>
                    <Link to='/dashboard'>
                    <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.5699 18.5001V14.6001" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.5699 7.45V5.5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.57 12.65C17.0059 12.65 18.17 11.4859 18.17 10.05C18.17 8.61401 17.0059 7.44995 15.57 7.44995C14.134 7.44995 12.97 8.61401 12.97 10.05C12.97 11.4859 14.134 12.65 15.57 12.65Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.43005 18.5V16.55" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.43005 9.4V5.5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.42996 16.5501C9.8659 16.5501 11.03 15.386 11.03 13.9501C11.03 12.5142 9.8659 11.3501 8.42996 11.3501C6.99402 11.3501 5.82996 12.5142 5.82996 13.9501C5.82996 15.386 6.99402 16.5501 8.42996 16.5501Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                        <p>مدیریت کتاب ها</p>
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
                                        <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#85ffc6"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="#72f8a5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z" stroke="#72f8a5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899" stroke="#72f8a5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>                                        </button>
                                        <button onClick={() => openDeleteBookModal(book)}>
                                        <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3094 2.25002H13.6908C13.9072 2.24988 14.0957 2.24976 14.2737 2.27819C14.977 2.39049 15.5856 2.82915 15.9146 3.46084C15.9978 3.62073 16.0573 3.79961 16.1256 4.00494L16.2373 4.33984C16.2562 4.39653 16.2616 4.41258 16.2661 4.42522C16.4413 4.90933 16.8953 5.23659 17.4099 5.24964C17.4235 5.24998 17.44 5.25004 17.5001 5.25004H20.5001C20.9143 5.25004 21.2501 5.58582 21.2501 6.00004C21.2501 6.41425 20.9143 6.75004 20.5001 6.75004H3.5C3.08579 6.75004 2.75 6.41425 2.75 6.00004C2.75 5.58582 3.08579 5.25004 3.5 5.25004H6.50008C6.56013 5.25004 6.5767 5.24998 6.59023 5.24964C7.10488 5.23659 7.55891 4.90936 7.73402 4.42524C7.73863 4.41251 7.74392 4.39681 7.76291 4.33984L7.87452 4.00496C7.94281 3.79964 8.00233 3.62073 8.08559 3.46084C8.41453 2.82915 9.02313 2.39049 9.72643 2.27819C9.90445 2.24976 10.093 2.24988 10.3094 2.25002ZM9.00815 5.25004C9.05966 5.14902 9.10531 5.04404 9.14458 4.93548C9.1565 4.90251 9.1682 4.86742 9.18322 4.82234L9.28302 4.52292C9.37419 4.24941 9.39519 4.19363 9.41601 4.15364C9.52566 3.94307 9.72853 3.79686 9.96296 3.75942C10.0075 3.75231 10.067 3.75004 10.3553 3.75004H13.6448C13.9331 3.75004 13.9927 3.75231 14.0372 3.75942C14.2716 3.79686 14.4745 3.94307 14.5842 4.15364C14.605 4.19363 14.626 4.2494 14.7171 4.52292L14.8169 4.82216L14.8556 4.9355C14.8949 5.04405 14.9405 5.14902 14.992 5.25004H9.00815Z" fill="#F21055"></path> <path d="M5.91509 8.45015C5.88754 8.03685 5.53016 7.72415 5.11686 7.7517C4.70357 7.77925 4.39086 8.13663 4.41841 8.54993L4.88186 15.5017C4.96736 16.7844 5.03642 17.8205 5.19839 18.6336C5.36679 19.4789 5.65321 20.185 6.2448 20.7385C6.8364 21.2919 7.55995 21.5308 8.4146 21.6425C9.23662 21.7501 10.275 21.7501 11.5606 21.75H12.4395C13.7251 21.7501 14.7635 21.7501 15.5856 21.6425C16.4402 21.5308 17.1638 21.2919 17.7554 20.7385C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9638 17.8206 19.0328 16.7844 19.1183 15.5017L19.5818 8.54993C19.6093 8.13663 19.2966 7.77925 18.8833 7.7517C18.47 7.72415 18.1126 8.03685 18.0851 8.45015L17.6251 15.3493C17.5353 16.6971 17.4713 17.6349 17.3307 18.3406C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8989 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8989 7.26958 19.6431C6.99617 19.3873 6.80583 19.025 6.66948 18.3406C6.52892 17.6349 6.46489 16.6971 6.37503 15.3493L5.91509 8.45015Z" fill="#F21055"></path> <path d="M9.42546 10.2538C9.83762 10.2125 10.2052 10.5133 10.2464 10.9254L10.7464 15.9254C10.7876 16.3376 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29503 16.4868 9.25381 16.0747L8.75381 11.0747C8.7126 10.6625 9.01331 10.295 9.42546 10.2538Z" fill="#F21055"></path> <path d="M14.5747 10.2538C14.9869 10.295 15.2876 10.6625 15.2464 11.0747L14.7464 16.0747C14.7052 16.4868 14.3376 16.7875 13.9255 16.7463C13.5133 16.7051 13.2126 16.3376 13.2538 15.9254L13.7538 10.9254C13.795 10.5133 14.1626 10.2125 14.5747 10.2538Z" fill="#F21055"></path> </g></svg>
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