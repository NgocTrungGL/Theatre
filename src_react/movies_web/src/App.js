import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "./App.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./pages/Header";
import Banner from "./pages/Banner";
import Main from "./pages/Main";
import Footer from "./pages/Footer";
import BackToTopBtn from "./components/BackToTopBtn";
import VideoPlayerPage from "./components/VideoPlayerPage";
import LoginForm from "./pages/LoginForm";
import DKForm from "./pages/DKForm";
import Admin from "./pages/Admin";
import UpdateUserInfo from "./pages/UpdateUserInfo";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái đăng nhập

    // Kiểm tra trạng thái đăng nhập từ sessionStorage khi khởi động ứng dụng
    useEffect(() => {
        const authToken = sessionStorage.getItem("authToken");
        setIsAuthenticated(!!authToken); // Chuyển trạng thái dựa trên token
    }, []);

    // Xử lý khi người dùng đăng nhập
    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    // Xử lý khi người dùng đăng xuất
    const handleLogout = () => {
        setIsAuthenticated(false);

        // Xóa trạng thái khỏi sessionStorage
        sessionStorage.removeItem("authToken");
    };

    const handleDK = () => {
        setIsAuthenticated(true);
    }

    const MainPage = () => (
        <>
            <Header />
            <Banner />
            <Main />
            <Footer />
            <BackToTopBtn />
        </>
    );

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Trang đăng nhập */}
                    <Route
                        path="/login"
                        element={<LoginForm onLogin={handleLogin} />}
                    />
                    <Route
                        path="/signup"
                        element={<DKForm onRegister={handleDK} />}
                    />
                    {/* Trang chính */}
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <MainPage />
                            ) : (
                                <LoginForm onLogin={handleLogin} />
                            )
                        }
                    />
                    {/* Trang phát video */}
                    <Route path="/movie/:id" element={<VideoPlayerPage />} />
                    {/* Trang admin */}
                    <Route
                        path="/admin"
                        element={<Admin onLogout={handleLogout} />}
                    />
                    {/* Trang cập nhật thông tin người dùng */}
                    <Route
                        path="/update-user-info"
                        element={
                            isAuthenticated ? (
                                <UpdateUserInfo />
                            ) : (
                                <LoginForm onLogin={handleLogin} />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
