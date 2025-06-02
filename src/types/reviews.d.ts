export interface Review {
    id: number;
    name: string;
    date: string;
    rating: number; // от 1 до 5
    text: string; // краткий текст для карточки
    fullText: string; // полный текст для модального окна
}
