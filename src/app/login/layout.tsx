'use client'

import type { ReactNode } from "react";
import styles from "./Login.module.css";
import {SessionProvider} from "next-auth/react";

export default function LoginLayout({ children }: { children: ReactNode }) {
    return <main className={styles.layout}><SessionProvider> {children} </SessionProvider></main>;
}
