// // import boosttrap
// import "bootstrap/dist/css/bootstrap.min.css";
// import "swiper/css";
// import "./App.css";

// import React, {useState, useEffect} from 'react';
// import './App.css';
// import Header from "./pages/Header";
// import Banner from "./pages/Banner";
// import Main from "./pages/Main";
// import Footer from './pages/Footer';
// import BackToTopBtn from "./components/BackToTopBtn";

// function App() {
//     const [scroll, setScroll] = useState(0);

//     useEffect (() => {
//         window.addEventListener('scroll', () =>{
//             setScroll(window.scrollY);
//         });
//         return () => {
//             window.removeEventListener('scroll', () => {
//                 setScroll(window.scrollY);
//             });
//         };
//     }, [scroll]);
//     return (
//         <>
//             <Header scroll={scroll} />
//             <Banner />
//             <Main />
//             <Footer />
//             <BackToTopBtn scroll={scroll} />
//         </>
//     );
// }

// export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "./App.css";

import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./pages/Header";
import Banner from "./pages/Banner";
import Main from "./pages/Main";
import Footer from "./pages/Footer";
import BackToTopBtn from "./components/BackToTopBtn";

// Import thêm các trang Login và Register
import LoginForm from "./pages/LoginForm";
import DKForm from "./pages/DKForm";

function App() {
    const [scroll, setScroll] = useState(0);
    const [currentPage, setCurrentPage] = useState("login"); // Trang mặc định là Login

    // Quản lý sự kiện cuộn
    useEffect(() => {
        const handleScroll = () => setScroll(window.scrollY);

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scroll]);

    // Hàm điều hướng giữa các trang
    const navigateTo = (page) => {
        setCurrentPage(page);
    };

    // Render trang dựa trên trạng thái
    const renderPage = () => {
        switch (currentPage) {
            case "login":
                return <LoginForm navigateTo={navigateTo} />;
            case "register":
                return <DKForm navigateTo={navigateTo} />;
            default:
                return (
                    <>
                        <Header scroll={scroll} />
                        <Banner />
                        <Main />
                        <Footer />
                        <BackToTopBtn scroll={scroll} />
                    </>
                );
        }
    };

    return <>{renderPage()}</>;
}

export default App;
