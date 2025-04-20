import React from 'react';

import icon from "assets/pictures/book.png";
import bookImg from "assets/pictures/bookImg.png";
import shopping from "assets/pictures/shopping-cart.png";
import PageNumber from './PageNumber';

import styles from "./BookCard.module.css";
import { Link, useNavigate } from 'react-router-dom';

const BookCard = ({data, error}) => {

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>
                    <img src={icon} alt="" />
                    <p>همه کتاب ها</p>
                </span>
                <div>
                    <button onClick={() => navigate("/auth")} className={styles.sortButton}>حساب کاربری</button>
                    <button onClick={() => navigate("/dashboard")} className={styles.sortButton}>مدیریت کتاب</button>
                </div>
            </div>
            <div className={styles.books}>
                {
                    data?.data.map((book) => (
                    <Link to={`/book/${book.id}`} key={book.id}>
                    <div 
                        className={styles.bookList}>
                        <img src={bookImg} alt="" />
                        <p>{book.title}</p>
                        <div className={styles.detail}>
                            <span>{book.price} هزار تومان</span>
                            <button><img src={shopping} alt="" /></button>
                        </div>
                    </div>
                    </Link>
                    )
                )
                }
            </div>
            {/* <PageNumber data={data} /> */}
        </div>
    );
};

export default BookCard;