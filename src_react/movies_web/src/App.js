// import boosttrap
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "./App.css";

import React, {useState, useEffect} from 'react';
import './App.css';
import Header from "./pages/Header";
import Banner from "./pages/Banner";
import Main from "./pages/Main";
import Footer from './pages/Footer';
import BackToTopBtn from "./components/BackToTopBtn";

function App() {
    const [scroll, setScroll] = useState(0);

    useEffect (() => {
        window.addEventListener('scroll', () =>{
            setScroll(window.scrollY);
        });
        return () => {
            window.removeEventListener('scroll', () => {
                setScroll(window.scrollY);
            });
        };
    }, [scroll]);
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

export default App;
