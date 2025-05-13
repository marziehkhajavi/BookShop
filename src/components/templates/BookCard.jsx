import React from 'react';

import icon from "assets/pictures/book.png";
import bookImg from "assets/pictures/bookImg.png";
import shopping from "assets/pictures/shopping-cart.png";
import PageNumber from './PageNumber';

import styles from "./BookCard.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { getUsername } from 'src/utils/cookie';

const BookCard = ({data, error}) => {

    const username = getUsername();

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                    { username && (
                        <div className={styles.user}>           
                            <svg width="35px" height="35px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 18.7023C18 15.6706 14.5 15 12 15C9.5 15 6 15.6706 6 18.7023M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <p>{username}</p>
                        </div>
                        )
                    }
                <span>
                    <Link to='/'>
                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M12 6.90909C10.8999 5.50893 9.20406 4.10877 5.00119 4.00602C4.72513 3.99928 4.5 4.22351 4.5 4.49965C4.5 6.54813 4.5 14.3034 4.5 16.597C4.5 16.8731 4.72515 17.09 5.00114 17.099C9.20405 17.2364 10.8999 19.0998 12 20.5M12 6.90909C13.1001 5.50893 14.7959 4.10877 18.9988 4.00602C19.2749 3.99928 19.5 4.21847 19.5 4.49461C19.5 6.78447 19.5 14.3064 19.5 16.5963C19.5 16.8724 19.2749 17.09 18.9989 17.099C14.796 17.2364 13.1001 19.0998 12 20.5M12 6.90909L12 20.5" stroke="#000000" stroke-linejoin="round"></path> <path d="M19.2353 6H21.5C21.7761 6 22 6.22386 22 6.5V19.539C22 19.9436 21.5233 20.2124 21.1535 20.0481C20.3584 19.6948 19.0315 19.2632 17.2941 19.2632C14.3529 19.2632 12 21 12 21C12 21 9.64706 19.2632 6.70588 19.2632C4.96845 19.2632 3.64156 19.6948 2.84647 20.0481C2.47668 20.2124 2 19.9436 2 19.539V6.5C2 6.22386 2.22386 6 2.5 6H4.76471" stroke="#000000" stroke-linejoin="round"></path> </g></svg>
                    <p>همه کتاب ها</p>
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
                    <div className={styles.bookList}>
                        <img src={bookImg} alt="" />
                        <p>{book.title}</p>
                        <div className={styles.detail}>
                            <span>{book.price} هزار تومان</span>
                            <button><svg fill="#F21055" width="40px" height="40px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" stroke="#F21055" stroke-width="0.96"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M28.462,49.718c-1.202,0-2.322-0.447-3.151-1.26c-1.051-1.028-1.5-2.594-1.172-4.087c0.311-1.416,1.245-2.498,2.563-2.968 c1.803-0.643,3.784-0.14,4.983,1.234c0.852,0.977,1.237,2.295,1.057,3.618C32.467,48.262,30.667,49.718,28.462,49.718z M28.326,43.117c-0.314,0-0.635,0.057-0.952,0.17c-0.896,0.32-1.188,1.085-1.282,1.513c-0.181,0.825,0.056,1.679,0.617,2.229 c0.454,0.445,1.077,0.689,1.753,0.689c1.024,0,2.143-0.596,2.298-1.734c0.104-0.761-0.103-1.483-0.581-2.032 C29.715,43.421,29.04,43.117,28.326,43.117z"></path> </g> <g> <path d="M41.669,49.718c-1.203,0-2.322-0.447-3.152-1.26c-1.051-1.029-1.5-2.595-1.172-4.087c0.311-1.416,1.245-2.498,2.563-2.968 c1.802-0.644,3.783-0.14,4.983,1.234c0.853,0.977,1.237,2.295,1.057,3.618C45.673,48.262,43.874,49.718,41.669,49.718z M41.532,43.117c-0.314,0-0.635,0.057-0.952,0.17c-0.896,0.32-1.188,1.085-1.282,1.513c-0.181,0.825,0.056,1.679,0.617,2.229 c0.454,0.445,1.077,0.689,1.754,0.689c1.023,0,2.142-0.596,2.297-1.734c0.104-0.761-0.103-1.483-0.581-2.032 C42.921,43.421,42.246,43.117,41.532,43.117z"></path> </g> <g> <path d="M37.921,39.828c-1.068,0-2.127-0.026-3.093-0.05l-1.418-0.029c-2.82-0.038-7.541-0.102-9.318-2.541 c-0.916-1.261-1.626-3.712-1.81-6.247c-0.092-1.257-0.122-2.609-0.15-3.917c-0.105-4.737-0.215-9.636-3.169-10.481 c-1.206-0.344-2.195-0.3-3.688-0.236l-0.246,0.011c-0.533,0.025-1.019-0.404-1.042-0.957c-0.023-0.552,0.404-1.018,0.956-1.042 l0.245-0.011c1.568-0.068,2.809-0.123,4.324,0.312c2.326,0.665,3.45,2.574,4.012,5.039c0.392-0.004,1.029-0.013,1.838-0.023 c4.072-0.055,12.547-0.167,15.883-0.089c0.501,0.011,0.99,0.016,1.463,0.02c3.554,0.033,7.229,0.067,7.306,4.05 c0.063,3.361-1.077,7.377-1.429,8.529c-0.094,0.309-0.182,0.611-0.268,0.906c-0.405,1.388-0.787,2.698-1.572,3.912 c-0.889,1.373-2.344,2.259-4.21,2.563C41.172,39.767,39.536,39.828,37.921,39.828z M23.854,21.674 c0.195,1.684,0.236,3.515,0.276,5.325c0.028,1.283,0.058,2.61,0.146,3.816c0.154,2.122,0.743,4.266,1.433,5.215 c1.188,1.629,5.605,1.689,7.729,1.718l1.441,0.029c2.342,0.059,5.257,0.132,7.334-0.206c1.293-0.21,2.279-0.79,2.852-1.675 c0.627-0.969,0.953-2.088,1.332-3.385c0.088-0.303,0.178-0.613,0.275-0.93c0.679-2.226,1.388-5.471,1.341-7.907 c-0.034-1.799-1.102-2.049-5.324-2.088c-0.482-0.004-0.98-0.009-1.491-0.021c-3.296-0.076-11.749,0.036-15.81,0.089 C24.766,21.663,24.243,21.669,23.854,21.674z"></path> </g> </g></svg></button>
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