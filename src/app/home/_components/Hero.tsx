// src/app/home/_components/Hero.tsx
import styles from '../Home.module.css';
import Image from 'next/image';
import { Button } from 'antd';

export const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.hero__content}>
                <div className={styles.hero__text}>
                    <h1 className={styles.hero__title}>Медицинский центр<br />доктора Хисамутдинова И.Г.</h1>
                    <p className={styles.hero__subtitle}>
                        Медицинский центр «Эндокам» — это современный диагностический<br />
                        центр, основанный доктором Хисамутдиновым И. Г. в Набережных Челнах.
                    </p>
                    <div className={styles.hero__buttons}>
                        <Button type="primary" size="large" href="/appointment">
                            Записаться на прием
                        </Button>
                        <Button className={styles.hero__button_call} size="large" href="tel:+79178911663">
                            Связаться с нами
                        </Button>
                    </div>
                </div>
                <div className={styles.hero__image}>
                    <Image
                        src="/images/doctors/hero-doc.png"
                        alt="Доктор Хисамутдинов"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
            </div>
        </section>
    );
};
