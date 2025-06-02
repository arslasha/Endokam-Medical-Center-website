'use client';

import { Review } from '@/types/reviews';
import styles from '../Home.module.css';

interface Props {
    review: Review;
    onClose: () => void;
}

export default function ReviewModal({ review, onClose }: Props) {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.close} onClick={onClose}>
                    ×
                </button>
                <div className={styles.date}>{review.date}</div>
                <h2>{review.name}</h2>
                <div className={styles.stars}>{'★'.repeat(review.rating)}</div>
                <div className={styles.text}>{review.fullText}</div>
            </div>
        </div>
    );
}
