import React from 'react';
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
    const token = document.cookie;

    if (isLoading) return <Loader />
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/auth" 
                    element={!token ? <AuthPage /> :
                                      <Navigate to="/" /> } />
            <Route path="/dashboard" 
                   element={ token ? <BooksList /> :
                                     <Navigate to="/auth" replace />} />
            <Route path='/book/:id' element={<DetailsPage />} />
        </Routes>
    );
};

export default Router;