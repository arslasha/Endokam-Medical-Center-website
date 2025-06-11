'use client';

import { useState } from "react";
import Image from "next/image";
import { newsData, NewsItem } from "@/lib/data/news";
import styles from "./News.module.css";

export default function NewsPage() {
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    const handleClose = () => setSelectedNews(null);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Новости</h1>
            <div className={styles.grid}>
                {newsData.map((news) => (
                    <div
                        key={news.id}
                        className={styles.card}
                        onClick={() => setSelectedNews(news)}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={news.image || "/images/news/placeholder.jpg"}
                                alt={news.title}
                                fill
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.date}>{news.date}</div>
                            <h2 className={styles.heading}>{news.title}</h2>
                            <p className={styles.description}>{news.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedNews && (
                <div className={styles.modalOverlay} onClick={handleClose}>
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeButton} onClick={handleClose}>
                            &times;
                        </button>
                        <article>
                            <h2 className={styles.modalTitle}>{selectedNews.title}</h2>
                            <div className={styles.modalDate}>{selectedNews.date}</div>
                            {selectedNews.image && (
                                <div className={styles.modalImageWrapper}>
                                    <Image
                                        src={selectedNews.image}
                                        alt={selectedNews.title}
                                        fill
                                        className={styles.modalImage}
                                    />
                                </div>
                            )}
                            <div className={styles.modalContent}>
                                <p>{selectedNews.content}</p>
                            </div>
                        </article>
                    </div>
                </div>
            )}
        </div>
    );
}


//📝 Что ещё можно добавить:
//
// Подгрузку новостей с сервера.
// Фильтрацию и поиск.
// Пагинацию.
// Анимации появления карточек и модалки.
// Хочешь реализовать что-то из этого? Готов помочь.