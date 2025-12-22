"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { FiMenu, FiSearch, FiUser, FiLogOut, FiLogIn } from "react-icons/fi"; // Добавили FiLogOut
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Header() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    // Проверка авторизации при загрузке и изменении токена
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("accessToken");
            setIsLoggedIn(!!token);
        };

        checkAuth();
        // Слушаем событие изменения хранилища (чтобы шапка обновлялась при входе/выходе в других вкладках)
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
        setMenuOpen(false);
        router.push("/login");
        router.refresh();
    };

    // Закрытие по клику вне
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        if (!isMobile && isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen, isMobile]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.header}>
            <div className={styles.header__inner}>
                {/* Логотип */}
                <div className={styles.header__left}>
                    <Link href="/" className={styles.header__logo} onClick={closeMenu}>
                        <img src="/images/logos/logo.svg" alt="Логотип" />
                    </Link>
                </div>

                <div className={styles.header__right}>
                    <nav className={styles.header__nav}>
                        <Link href="/about" className={styles.header__link}>О нас</Link>
                        <Link href="/news" className={styles.header__link}>Новости</Link>
                        <Link href="/patient" className={styles.header__link}>Пациентам</Link>
                        <Link href="/services" className={styles.header__link}>Услуги</Link>
                        <Link href="/analyzes" className={styles.header__link}>Анализы</Link>
                    </nav>

                    <div className={styles.header__icons}>
                        {isSearchOpen ? (
                            <input
                                type="text"
                                placeholder="Поиск..."
                                className={styles.header__searchInput}
                                onBlur={() => setSearchOpen(false)}
                                autoFocus
                            />
                        ) : (
                            <button className={styles.header__icon} onClick={() => setSearchOpen(true)}>
                                <FiSearch />
                            </button>
                        )}

                        {/* ЛОГИКА КНОПОК АККАУНТА */}
                        {!isLoggedIn ? (
                            <Link href="/login" className={styles.header__icon} title="Войти">
                                <FiLogIn />
                            </Link>
                        ) : (
                            <>
                                <Link href="/profile" className={styles.header__icon} title="Профиль">
                                    <FiUser />
                                </Link>
                                <button 
                                    className={styles.header__icon} 
                                    onClick={handleLogout} 
                                    title="Выйти"
                                >
                                    <FiLogOut />
                                </button>
                            </>
                        )}

                        <button
                            className={styles.header__icon}
                            onClick={() => setMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <IoClose /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Выпадающее меню */}
            {isMenuOpen && (
                <div ref={menuRef}>
                    <div className={styles.header__dropdownMenu}>
                        <Link href="/about" className={styles.header__link} onClick={closeMenu}>О нас</Link>
                        <Link href="/news" className={styles.header__link} onClick={closeMenu}>Новости</Link>
                        <Link href="/patient" className={styles.header__link} onClick={closeMenu}>Пациентам</Link>
                        <Link href="/services" className={styles.header__link} onClick={closeMenu}>Услуги</Link>
                        <Link href="/analyzes" className={styles.header__link} onClick={closeMenu}>Анализы</Link>
                        
                        <div className={styles.header__dropdownDivider} />
                        
                        {!isLoggedIn ? (
                            <Link href="/login" className={styles.header__link} onClick={closeMenu}>Войти</Link>
                        ) : (
                            <>
                                <Link href="/profile" className={styles.header__link} onClick={closeMenu}>Личный кабинет</Link>
                                <button 
                                    className={styles.header__link} 
                                    style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4f' }} 
                                    onClick={handleLogout}
                                >
                                    Выйти
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}