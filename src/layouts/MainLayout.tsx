import { Outlet } from "react-router-dom";

import styles from './styles.module.scss'
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
export const MainLayout = () => {
    return (
        <div className={styles.wrapper}>
            <Header/>
            <div className={styles.content}>
            <Outlet/>
            </div>
            <Footer/>
        </div>
    );
}