'use client';

import { useRef, useState } from 'react';
import styles from '../Home.module.css';
import { reviews } from '@/lib/data/reviews';
import { Review } from '@/types/reviews';
import ReviewModal from './ReviewModal';
import SectionHeader from "@/components/shared/SectionHeader";

export default function Reviews() {
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const { scrollLeft, clientWidth } = containerRef.current;
            const scrollAmount = clientWidth * 0.9;
            containerRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className={styles.reviews}>
            <SectionHeader
                title="Отзывы пациентов"
                description="Что говорят наши клиенты о лечении, подходе и комфорте"
                href="/reviews"
            />

            <div className={styles.sliderWrapper}>
                <button className={styles.arrowLeft} onClick={() => scroll('left')}>←</button>

                <div className={styles.list} ref={containerRef}>
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className={styles.card}
                            onClick={() => setSelectedReview(review)}
                        >
                            <div className={styles.top}>
                                <div className={styles.date}>{review.date}</div>
                                <div className={styles.stars}>{'★'.repeat(review.rating)}</div>
                            </div>

                            <h3>{review.name}</h3>
                            <p>{review.text}</p>
                        </div>
                    ))}
                </div>

                <button className={styles.arrowRight} onClick={() => scroll('right')}>→</button>
            </div>

            {selectedReview && (
                <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
            )}
        </section>
    );
}
