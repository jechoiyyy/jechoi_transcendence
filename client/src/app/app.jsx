import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserProvider } from "@contexts/UserContext";
import { ToastProvider } from "@contexts/ToastContext"
import { InputProvider } from "@contexts/InputContext"

import Background from '@layout/Background';
import Navbar from '@layout/Navbar';
import Footer from '@layout/Footer';
import BaseRoutes from '@routes/BaseRoutes'

const App = () => {
    return (
        <UserProvider>
            <ToastProvider>
                <InputProvider>
                    <Router
                        future={{
                            v7_startTransition: true,
                            v7_relativeSplatPath: true,
                        }}>
                        <Background bgColor="bg-blue-100">
                            <Navbar />
                            <BaseRoutes />
                            <Footer />
                        </Background>
                    </Router>
                </InputProvider>
            </ToastProvider>
        </UserProvider>
    );
};

export default App;