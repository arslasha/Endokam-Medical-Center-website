

import 'antd/dist/reset.css';
import '../styles/globals.css';

import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

export const metadata = {
    title: 'МедКлиника | Главная',
    description: 'Медицинская клиника — забота и здоровье для всей семьи.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
        <body>
        <AnimatePresence mode="wait">

        </AnimatePresence>
        <ConfigProvider
            locale={ruRU}
            theme={{
                token: {
                    colorPrimary: '#008080', // основной цвет бренда
                    fontFamily: "'Inter', sans-serif",
                },
            }}
        >
            <Header />
            <AnimatePresence mode="wait">
                <main style={{ minHeight: '80vh', padding: '24px' }}>{children}</main>
            </AnimatePresence>
            <Footer />
        </ConfigProvider>
        </body>
        </html>
    );
}
