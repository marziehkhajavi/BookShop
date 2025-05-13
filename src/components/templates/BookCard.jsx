import React from 'react';

import icon from "assets/pictures/book.png";
import bookImg from "assets/pictures/bookImg.png";
import shopping from "assets/pictures/shopping-cart.png";
import PageNumber from './PageNumber';

import styles from "./BookCard.module.css";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const BookCard = ({data, error}) => {

    const username = Cookies.get('username');

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                    { username && (
                        <div className={styles.user}>           
                            <svg width="35px" height="35px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 18.7023C18 15.6706 14.5 15 12 15C9.5 15 6 15.6706 6 18.7023M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <p>{username}</p>
                        </div>
                        )
                    }
                <span>
                    <Link to='/'>
                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M12 6.90909C10.8999 5.50893 9.20406 4.10877 5.00119 4.00602C4.72513 3.99928 4.5 4.22351 4.5 4.49965C4.5 6.54813 4.5 14.3034 4.5 16.597C4.5 16.8731 4.72515 17.09 5.00114 17.099C9.20405 17.2364 10.8999 19.0998 12 20.5M12 6.90909C13.1001 5.50893 14.7959 4.10877 18.9988 4.00602C19.2749 3.99928 19.5 4.21847 19.5 4.49461C19.5 6.78447 19.5 14.3064 19.5 16.5963C19.5 16.8724 19.2749 17.09 18.9989 17.099C14.796 17.2364 13.1001 19.0998 12 20.5M12 6.90909L12 20.5" stroke="#000000" stroke-linejoin="round"></path> <path d="M19.2353 6H21.5C21.7761 6 22 6.22386 22 6.5V19.539C22 19.9436 21.5233 20.2124 21.1535 20.0481C20.3584 19.6948 19.0315 19.2632 17.2941 19.2632C14.3529 19.2632 12 21 12 21C12 21 9.64706 19.2632 6.70588 19.2632C4.96845 19.2632 3.64156 19.6948 2.84647 20.0481C2.47668 20.2124 2 19.9436 2 19.539V6.5C2 6.22386 2.22386 6 2.5 6H4.76471" stroke="#000000" stroke-linejoin="round"></path> </g></svg>                        <p>همه کتاب ها</p>
                    </Link>
                </span>
                <div>
                    <button onClick={() => navigate("/auth")} className={styles.sortButton}>ثبت نام/ورود</button>
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