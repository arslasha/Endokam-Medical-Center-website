// src/app/preparation/[id]/page.tsx

'use client';

import { notFound } from 'next/navigation';
import styles from '../Preparation.module.css';
import {
    ClipboardList,
    FileText,
    Syringe,
    ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

type PatientArticle = {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: string;
};

const dynamicArticles: PatientArticle[] = [
    {
        id: 'lavacol',
        title: 'Подготовка к ФКС с препаратом "Лавакол"',
        icon: <ClipboardList size={24} />,
        content: `
      <h2>Инструкция по подготовке к фиброколоноскопии (ФКС) с использованием "Лавакола"</h2>
      <p>Для получения достоверных результатов перед исследованием необходимо правильно очистить кишечник.</p>
      <h3>За 3 дня до процедуры</h3>
      <ul>
        <li>Исключите свежие овощи, фрукты, хлеб с отрубями, газированные напитки</li>
        <li>Пейте больше жидкости: воду, чай, прозрачный сок без мякоти</li>
      </ul>
      <h3>В день накануне</h3>
      <ul>
        <li>После 14:00 — только жидкая пища</li>
        <li>С 17:00 — начните приём "Лавакола": 1 пакет на 200 мл воды, всего 15 пакетов</li>
        <li>Пейте по 1 стакану каждые 20 минут</li>
      </ul>
    `
    },
    {
        id: 'fortrans',
        title: 'Подготовка к ФКС с препаратом "Фортранс"',
        icon: <Syringe size={24} />,
        content: `
      <h2>Инструкция по подготовке к фиброколоноскопии (ФКС) с использованием "Фортранс"</h2>
      <p>"Фортранс" — эффективное средство для полного очищения кишечника перед ФКС.</p>
      <h3>За 3 дня до исследования</h3>
      <ul>
        <li>Исключите продукты, содержащие клетчатку, мясо, газировку, бобовые</li>
      </ul>
      <h3>За день до процедуры</h3>
      <ul>
        <li>Последний приём пищи — не позднее 14:00</li>
        <li>Растворите 4 пакетика "Фортранса" в 4 литрах воды</li>
        <li>Выпейте 1 стакан каждые 15 минут</li>
      </ul>
    `
    },
    {
        id: 'moviprep',
        title: 'Подготовка к ФКС — Мовипреп',
        icon: <FileText size={24} />,
        content: `
      <h2>Общие правила подготовки к колоноскопии</h2>
      <p>Независимо от выбранного препарата, важно соблюдать рекомендации по питанию и питьевому режиму.</p>
      <h3>Рекомендации</h3>
      <ul>
        <li>Последний приём твёрдой пищи — за 18–20 часов до ФКС</li>
        <li>На процедуру приходите натощак</li>
        <li>Если назначена седация — обязательно предупредите о хронических заболеваниях</li>
      </ul>
    `
    },
];

export default async function PreparationArticlePage(props: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await props.params;
    const article = dynamicArticles.find(a => a.id === id);

    if (!article) return notFound();

    return (
        <section className={styles.articlePage}>
            <div className={styles.articleHeader}>
                <div className={styles.articleIcon}>{article.icon}</div>
                <h1 className={styles.articleTitle}>{article.title}</h1>
            </div>

            <div
                className={styles.articleContent}
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <Link href="/patient" className={styles.backButton}>
                <ArrowLeft size={18} className={styles.backIcon} />
                Вернуться к материалам
            </Link>
        </section>
    );
}
