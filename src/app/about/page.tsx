// src/app/about/page.tsx

import { aboutContent } from "@/lib/data/about";
import styles from "./About.module.css";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{aboutContent.title}</h1>

            {aboutContent.sections.map((section, index) => (
                <section key={index} className={styles.section}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={section.image}
                            alt={section.imageAlt}
                            fill
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.text}>
                        <h2 className={styles.heading}>{section.heading}</h2>
                        <p className={styles.body}>{section.body}</p>
                    </div>
                </section>
            ))}
        </div>
    );
}

// Добавить SEO-мета, анимации, галерею, видео или вкладки для секций — сообщи, и я реализую.