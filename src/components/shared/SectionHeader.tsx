// components/shared/SectionHeader.tsx
import styles from "@/app/home/Home.module.css";
import Link from "next/link";

export default function SectionHeader({ title, description, href }: { title: string; description: string; href: string }) {
    return (
        <div className={styles.sectionHeader}>
            <Link href={href} className={styles.sectionHeader__link}>
                <h2 className={styles.sectionHeader__title}>{title}</h2>
            </Link>
            <p className={styles.sectionHeader__desc}>{description}</p>
        </div>
    );
}
