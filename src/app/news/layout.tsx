// src/app/news/layout.tsx

import type { ReactNode } from "react";
import styles from "./News.module.css";

export default function NewsLayout({ children }: { children: ReactNode }) {
    return <main className={styles.layout}>{children}</main>;
}
