# Файловая структура проекта 

```plantuml
public/                   # Статические файлы
├── images/               # Общие изображения
│   ├── logo.svg
│   ├── doctors/
│   ├── clinic/
│   └── icons/
├── fonts/                # Локальные шрифты
│   ├── Inter-Regular.woff2
│   └── Inter-Bold.woff2
└── favicon.ico

src/
├── app/
│   ├── layout.tsx        # Корневой макет
│   ├── page.tsx          # Главная страница
│   ├── about/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── components/   # Локальные компоненты
│   │       ├── TeamSection.module.css
│   │       └── TeamCard.tsx
│   ├── patient/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── components/
│   │       ├── PatientForm.module.css
│   │       └── Instructions.tsx
│   ├── servicesCategory/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── [service]/
│   │       ├── page.tsx  # Динамический маршрут услуги
│   │       └── components/
│   ├── feedback/
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── FeedbackForm.tsx
│   │       └── Reviews.module.css
│   ├── analyzes/
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── AnalysisTable.tsx
│   │       └── PriceList.module.css
│   ├── news/
│   │   ├── page.tsx
│   │   ├── [slug]/
│   │   │   ├── page.tsx  # Динамический маршрут новости
│   │   │   └── components/
│   │   └── components/
│   │       ├── NewsCard.tsx
│   │       └── NewsFilter.module.css
│   ├── login/
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── AuthForm.module.css
│   │       └── SocialAuth.tsx
│   └── (marketing)/      # Группа маршрутов для маркетинга
│       ├── layout.tsx    # Общий макет для маркетинговых страниц
│       ├── about/
│       └── servicesCategory/
│
├── components/           # Общие компоненты
│   ├── ui/               # Базовые UI-компоненты
│   │   ├── buttons/
│   │   │   ├── PrimaryButton.tsx
│   │   │   └── PrimaryButton.module.css
│   │   ├── cards/
│   │   ├── forms/
│   │   └── ...
│   ├── layout/           # Компоненты макетов
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── NavDesktop.tsx
│   │   │   ├── NavMobile.tsx
│   │   │   └── Header.module.css
│   │   ├── Footer/
│   │   └── ...
│   ├── shared/           # Переиспользуемые компоненты
│   │   ├── SectionTitle.tsx
│   │   ├── DoctorCard/
│   │   ├── ServiceCard/
│   │   └── ...
│   └── providers/        # Провайдеры (для UI библиотек)
│       ├── AntdProvider.tsx
│       ├── MuiProvider.tsx
│       └── MotionProvider.tsx
│
├── styles/               # Глобальные стили
│   ├── globals.css       # Глобальные CSS
│   ├── antd-overrides.css
│   ├── mui-overrides.css
│   ├── variables.module.css # CSS переменные
│   └── animations.css    # Анимации
│
├── lib/                  # Вспомогательные функции
│   ├── api/              # API клиенты
│   ├── constants/        # Константы
│   │   ├── route.ts
│   │   ├── servicesCategory.ts  # Данные об услугах
│   │   └── ...
│   └── utils/           # Утилиты
│       ├── date.ts
│       └── formatters.ts
│
├── types/                # Типы TypeScript
│   ├── index.d.ts
│   ├── servicesCategory.d.ts
│   └── ...
│
└── hooks/                # Кастомные хуки
    ├── useAuth.ts
    ├── useMediaQuery.ts
    └── ...
```