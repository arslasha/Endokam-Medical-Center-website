// src/app/about/layout.tsx

import type { ReactNode } from "react";
import styles from "./About.module.css";

export default function AboutLayout({ children }: { children: ReactNode }) {
    return (
        <main className={styles.layout}>
            {children}
        </main>
    );
}
