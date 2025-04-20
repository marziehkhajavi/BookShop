import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { getBooks } from 'src/services/book';
import Loader from 'src/components/modules/Loader';
import BookCard from 'src/components/templates/BookCard';

const HomePage = () => {
    const {data, isLoading, error} = useQuery({queryKey: ["books"], queryFn: getBooks});

    return (
        <>
        {
            isLoading ?
                <Loader /> :
                <BookCard 
                    data={data}
                    isLoading={isLoading}
                />
            }
        </>
    );
};

export default HomePage;