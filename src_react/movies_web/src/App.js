import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./pages/Header";
import Banner from "./pages/Banner";
import Main from "./pages/Main";
import Footer from "./pages/Footer";
import BackToTopBtn from "./components/BackToTopBtn";
import VideoPlayerPage from "./components/VideoPlayerPage"; // Trang phát video
import LoginForm from "./pages/LoginForm"; // Form đăng nhập
import DKForm from "./pages/DKForm"; // Form đăng ký
import AdminDashboard from "./pages/Admin";

function App() {
    const [scroll, setScroll] = useState(0);
    const [currentPage, setCurrentPage] = useState("login"); // Trang mặc định là login

    // Quản lý sự kiện cuộn
    useEffect(() => {
        const handleScroll = () => setScroll(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const renderMainPage = () => (
        <>
            <Header scroll={scroll} />
            <Banner />
            <Main />
            <Footer />
            <BackToTopBtn scroll={scroll} />
        </>
    );

    const renderAuthPage = () => {
        if (currentPage === "login") {
            return <LoginForm setCurrentPage={setCurrentPage} />;
        }
        if (currentPage === "register") {
            return <DKForm setCurrentPage={setCurrentPage} />;
        }
        if (currentPage === "admin") {
            return <AdminDashboard setCurrentPage={setCurrentPage} />;
        }
        return renderMainPage();
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Trang chính */}
                    <Route path="/" element={renderAuthPage()} />
                    {/* Trang phát video */}
                    <Route path="/movie/:id" element={<VideoPlayerPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
