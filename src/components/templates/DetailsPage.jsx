import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import api from 'src/configs/api';
import Loader from '../modules/Loader';

import bookImg from "assets/pictures/bookImg.png";

const DetailsPage = () => {

    const {id} = useParams();

    const getBookById = async ({queryKey}) => {
        try {
            const response = await api.get(`book/${queryKey[1]}`);
            return {response};
        } catch (error) {
            return {error};
        }
    };

    const { data, isLoading } = useQuery({queryKey: ["book", id], queryFn: getBookById})

    // const { title, price, quantity, author, summary } = data?.response.data;
    
    return (
       <>
        {
            isLoading ? <Loader /> : (
                <div>
                    <img src={bookImg} alt="book-cover" />
                        <p>{data?.response.data.title}</p>
                        <p>{data?.response.data.author}</p>
                        <p>{data?.response.data.publication}</p>
                        <p>{data?.response.data.price} هزار تومان</p>
                        <Link>
                            <button>خرید</button>
                        </Link>

                </div>
            )
        }
       </>
    );
};

export default DetailsPage;