"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { FiMenu, FiSearch, FiUser } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function Header() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    // Закрытие по клику вне
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        }

        if (!isMobile && isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header className={styles.header}>
            <div className={styles.header__inner}>
                {/* Логотип */}
                <div className={styles.header__left}>
                    <Link href="/" className={styles.header__logo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M14.31 8l5.74 9.94" />
                            <path d="M9.69 8h11.48" />
                            <path d="M7.38 12l5.74-9.94" />
                            <path d="M9.69 16L3.95 6.06" />
                            <path d="M14.31 16H2.83" />
                            <path d="M16.62 12l-5.74 9.94" />
                        </svg>
                    </Link>
                </div>

                <div className={styles.header__right}>
                    <nav className={styles.header__nav}>
                        <Link href="/about" className={styles.header__link}>О нас</Link>
                        <Link href="/news" className={styles.header__link}>Новости</Link>
                        <Link href="/patient" className={styles.header__link}>Пациентам</Link>
                        <Link href="/services" className={styles.header__link}>Услуги</Link>
                        {/*<Link href="/reviews" className={styles.header__link}>Отзывы</Link>*/}
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

                        <Link href="/login" className={styles.header__icon}>
                            <FiUser />
                        </Link>

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

            {/* Выпадающее меню / overlay */}
            {isMenuOpen && (
                <div ref={menuRef}>
                    { (
                        <div className={styles.header__dropdownMenu}>
                            <Link href="/about" className={styles.header__link}>О нас</Link>
                            <Link href="/news" className={styles.header__link}>Новости</Link>
                            <Link href="/patient" className={styles.header__link}>Пациентам</Link>
                            <Link href="/services" className={styles.header__link}>Услуги</Link>
                            <Link href="/reviews" className={styles.header__link}>Отзывы</Link>
                            <Link href="/analyzes" className={styles.header__link}>Анализы</Link>
                            <Link href="/login" className={styles.header__link}>Войти</Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
