import 'antd/dist/reset.css';
import '../styles/globals.css';

import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import { ReactNode } from 'react';
import AnimatedWrapper from '@/components/shared/AnimatedWrapper';

export const metadata = {
    title: 'Эндокам | Главная',
    description: 'Медицинская клиника — забота и здоровье для всей семьи.',
    robots: 'noindex',
}
;

export default function RootLayout({children }: { children: ReactNode }) {
    return (
        <html lang="ru">
        <body>
        <ConfigProvider
            locale={ruRU}
            theme={{
                token: {
                    colorPrimary: '#008080',
                    fontFamily: "'Inter', sans-serif",
                },
            }}
        >
            <Header />
            <AnimatedWrapper>
                <main style={{ minHeight: '80vh', padding: '24px' }}>{children}</main>
            </AnimatedWrapper>
            <Footer />
        </ConfigProvider>
        </body>
        </html>
    );
}