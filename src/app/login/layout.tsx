import type { ReactNode } from "react";
import styles from "./Login.module.css";

export default function LoginLayout({ children }: { children: ReactNode }) {
    return <main className={styles.layout}>{children}</main>;
}
