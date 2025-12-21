// src/app/preparation/[id]/page.tsx

'use client';

import { notFound } from 'next/navigation';
import styles from '../Preparation.module.css';
import {
    FileText,
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
        icon: <FileText size={24} />,
        content: `
    <div class="preparation-guide">
      <h2><strong>Подготовка пациента к колоноскопии препаратом "Лавакол"</strong></h2>
      
      <p>Для проведения колоноскопии <strong>очень важна тщательная подготовка кишечника</strong> с соблюдением строгой диеты.</p>

      <div class="diet-section">
        <h3><strong>Диета за 3 дня до исследования:</strong></h3>
        <p><strong>Исключить:</strong> ВСЕ овощи, фрукты и ягоды (сырые и варёные), зерновые каши, зелень, орехи.</p>
        <p><strong>Можно:</strong> мясо птицы, нежирную говядину, рыбу; кисломолочные продукты; бульоны; манную и рисовую кашу; белый хлеб в небольшом количестве.</p>
      </div>

      <div class="day-before">
        <h3><strong>Накануне исследования:</strong></h3>
        <ul>
          <li>Последний лёгкий приём пищи в <strong>10.00-11.00</strong></li>
          <li>После - только жидкость (вода, прозрачные соки, чай, бульон)</li>
          <li><strong>При запорах:</strong> начать диету за 4-5 дней + слабительное</li>
          <li>Отменить препараты железа, активированный уголь за 3 дня</li>
        </ul>
      </div>

      <div class="lavacol-prep">
        <h3><strong>Приём Лавакола:</strong></h3>
        
        <div class="evening-prep">
          <h4><strong>Накануне исследования:</strong></h4>
          <ul>
            <li>10 пакетиков на 2 литра воды</li>
            <li>Приём с <strong>15.00-18.00</strong> в течение 2-3 часов</li>
            <li>В последний литр добавить <strong>10 мл Боботика/Эспумизана L</strong></li>
          </ul>
        </div>

        <div class="morning-prep">
          <h4><strong>Утром в день исследования:</strong></h4>
          <ul>
            <li>10 пакетиков на 2 литра воды</li>
            <li>Начать пить <strong>за 6 часов до процедуры</strong></li>
            <li>В последний литр добавить <strong>10 мл Боботика/Эспумизана L</strong></li>
            <li><strong>Запрещено:</strong> масла, ректальные свечи</li>
          </ul>
        </div>
      </div>

      <div class="warning-section">
        <h3><strong>Важные предупреждения:</strong></h3>
        <ul>
          <li>Нормальная реакция - <strong>обильный жидкий стул</strong> через 1-3 часа</li>
          <li><strong>Прекратить приём</strong> при отсутствии стула + вздутии (возможна непроходимость)</li>
          <li>Постоянные лекарства принимать <strong>за 1-2 часа до/после Лавакола</strong></li>
        </ul>
      </div>

      <div class="checklist">
        <h3><strong>Что взять с собой:</strong></h3>
        <ul>
          <li><strong>Паспорт</strong></li>
          <li>Простынь</li>
          <li>Чистые носки</li>
          <li>Сменные облегающие трусы (будут разрезаны)</li>
        </ul>
        <p>Прийти <strong>за 10-15 минут</strong> до назначенного времени для оформления документов.</p>
      </div>

      <div class="footer">
        <p>Подробная информация на сайте: <strong>endokam.ru</strong></p>
      </div>
    </div>
    `
    },
    {
        id: 'fortrans',
        title: 'Подготовка  к ФКС с препаратом "Фортранс"',
        icon: <FileText size={24} />,
        content: `
    <div class="preparation-guide">
      <h2><strong>Подготовка пациента к ФКС препаратом "Фортранс"</strong></h2>
      
      <p>Для проведения колоноскопии <strong>очень важна тщательная подготовка кишечника</strong> с соблюдением строгой диеты.</p>

      <div class="diet-section">
        <h3><strong>Диета за 3 дня до исследования:</strong></h3>
        <p><strong>Исключить:</strong> ВСЕ овощи, фрукты и ягоды (сырые и варёные), зерновые каши, зелень, орехи.</p>
        <p><strong>Можно:</strong> мясо птицы, нежирную говядину, рыбу; кисломолочные продукты; бульоны; манную и рисовую кашу; белый хлеб в небольшом количестве.</p>
      </div>

      <div class="day-before">
        <h3><strong>Накануне исследования:</strong></h3>
        <ul>
          <li>Последний лёгкий приём пищи в <strong>10.00-11.00</strong></li>
          <li>После - только жидкость (вода, прозрачные соки, чай, бульон)</li>
          <li><strong>При запорах:</strong> начать диету за 4-5 дней + слабительное</li>
          <li>Отменить препараты железа, активированный уголь за 3 дня</li>
        </ul>
      </div>

      <div class="fortrans-prep">
        <h3><strong>Приём Фортранса:</strong></h3>
        
        <div class="evening-prep">
          <h4><strong>Накануне исследования:</strong></h4>
          <ul>
            <li><strong>2 пакета</strong> растворить в 2 литрах воды</li>
            <li>Приём с <strong>15.00-18.00</strong> в течение 2-3 часов</li>
            <li>Можно разбавить соком (без мякоти) для улучшения вкуса</li>
            <li>В последний литр добавить <strong>10 мл Боботика/Эспумизана L</strong></li>
          </ul>
        </div>

        <div class="morning-prep">
          <h4><strong>Утром в день исследования:</strong></h4>
          <ul>
            <li><strong>2 пакета</strong> растворить в 2 литрах воды</li>
            <li>Начать пить <strong>за 6 часов до процедуры</strong></li>
            <li>Можно разбавить соком (без мякоти) для улучшения вкуса</li>
            <li>В последний литр добавить <strong>10 мл Боботика/Эспумизана L</strong></li>
          </ul>
        </div>
      </div>

      <div class="warning-section">
        <h3><strong>Важные предупреждения:</strong></h3>
        <ul>
          <li>Нормальная реакция - <strong>обильный жидкий стул</strong> через 1-3 часа</li>
          <li><strong>Прекратить приём</strong> при отсутствии стула + вздутии (возможна непроходимость)</li>
          <li>Постоянные лекарства принимать <strong>за 1-2 часа до/после Фортранса</strong></li>
        </ul>
      </div>

      <div class="checklist">
        <h3><strong>Что взять с собой:</strong></h3>
        <ul>
          <li><strong>Паспорт</strong></li>
          <li>Простынь</li>
          <li>Чистые носки</li>
          <li>Сменные облегающие трусы (будут разрезаны)</li>
        </ul>
        <p>Прийти <strong>за 10-15 минут</strong> до назначенного времени для оформления документов.</p>
      </div>
    </div>
  `
    },
    {
        id: 'eziklen',
        title: 'Подготовка к колоноскопии препаратом "Эзиклен"',
        icon: <FileText size={24} />,
        content: `
    <div class="preparation-guide">
      <h2><strong>Подготовка пациента к ФКС препаратом "Эзиклен"</strong></h2>
      
      <p>Для проведения колоноскопии <strong>очень важна тщательная подготовка кишечника</strong> с соблюдением строгой диеты.</p>

      <div class="diet-section">
        <h3><strong>Диета за 3 дня до исследования:</strong></h3>
        <p><strong>Исключить:</strong> ВСЕ овощи, фрукты, ягоды (сырые и варёные), зерновые каши, зелень, орехи.</p>
        <p><strong>Можно:</strong> мясо птицы, нежирную говядину, рыбу; кисломолочные продукты; яйца; бульоны; манную и рисовую кашу; белый хлеб в небольшом количестве.</p>
      </div>

      <div class="day-before">
        <h3><strong>Накануне исследования:</strong></h3>
        <ul>
          <li>Последний лёгкий приём пищи в <strong>10.00-11.00</strong></li>
          <li>После - только жидкость (вода, прозрачные соки, чай, бульон)</li>
          <li><strong>При запорах:</strong> начать диету за 4-5 дней + слабительное</li>
          <li>Отменить препараты железа, активированный уголь за 3 дня</li>
        </ul>
      </div>

      <div class="eziklen-prep">
        <h3><strong>Приём Эзиклена:</strong></h3>
        
        <div class="evening-prep">
          <h4><strong>Накануне исследования:</strong></h4>
          <ul>
            <li><strong>1 флакон</strong> развести в 0,5 л воды</li>
            <li>Приём с <strong>15.00-18.00</strong> в течение 2-3 часов</li>
            <li>Дополнительно выпить <strong>1.0-1.5 л воды</strong></li>
            <li>В последние 0,5 л добавить <strong>10 мл Боботика/Эспумизана L</strong></li>
          </ul>
        </div>

        <div class="morning-prep">
          <h4><strong>Утром в день исследования:</strong></h4>
          <ul>
            <li><strong>2 флакон</strong> развести в 0,5 л воды</li>
            <li>Начать пить <strong>за 6 часов до процедуры</strong></li>
            <li>Дополнительно выпить <strong>1.0-1.5 л воды</strong></li>
            <li>В последние 0,5 л добавить <strong>10 мл Боботика/Эспумизана L</strong></li>
          </ul>
        </div>
      </div>

      <div class="warning-section">
        <h3><strong>Важные предупреждения:</strong></h3>
        <ul>
          <li>Нормальная реакция - <strong>обильный жидкий стул</strong> через 1-3 часа</li>
          <li><strong>Прекратить приём</strong> при отсутствии стула + вздутии (возможна непроходимость)</li>
          <li>Постоянные лекарства принимать <strong>за 1-2 часа до/после Эзиклена</strong></li>
        </ul>
      </div>

      <div class="checklist">
        <h3><strong>Что взять с собой:</strong></h3>
        <ul>
          <li><strong>Паспорт</strong></li>
          <li>Простынь</li>
          <li>Чистые носки</li>
          <li>Сменные облегающие трусы (будут разрезаны)</li>
        </ul>
        <p>Прийти <strong>за 10-15 минут</strong> до назначенного времени для оформления документов.</p>
      </div>
    </div>
  `
    }
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
