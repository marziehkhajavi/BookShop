import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from 'src/pages/AuthPage';
import HomePage from 'src/pages/HomePage';
import BooksList from 'src/pages/BooksList';
import BookCart from 'src/components/templates/BookCart';
import DetailsPage from 'src/components/templates/DetailsPage';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from 'src/services/book';
import Loader from 'src/components/modules/Loader';

const Router = () => {
    const {data, isLoading, error} = useQuery({queryKey: ["books"], queryFn: getBooks});
    const [token, setToken] = useState("");

    // const token = document.cookie;
    // console.log(token)
    useEffect(() => {
        const getTokenFromCookie = () => {
            const cookieToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1];
            setToken(cookieToken || "");
        };

        getTokenFromCookie();
        const interval = setInterval(getTokenFromCookie, 1000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading) return <Loader />
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* <Route path="/auth"
                    element= {!token ? <AuthPage /> :
                                      <Navigate to="/" /> } /> */}
            <Route path="/dashboard" 
                    element={ token ? <BooksList /> :
                                     <Navigate to="/auth" replace />} />
            {/* <Route path="/dashboard" 
                   element={<BooksList />} /> */}
            <Route path='/book/:id' element={<DetailsPage />} />
        </Routes>
    );
};

export default Router;