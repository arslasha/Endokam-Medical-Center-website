import { z } from 'zod';

export const AnalyzesFormSchema = z.object({
    fullName: z.string().min(5, 'Введите полное имя'),
    phone: z.string().regex(/^\+?\d{10,15}$/, 'Введите корректный номер телефона'),
    email: z.string().email('Введите корректную почту'),
    appointmentDate: z.string().min(1, 'Выберите дату приёма'),
    consent: z.literal(true, {
        errorMap: () => ({ message: 'Необходимо согласие на обработку данных' })
    }),
});

export type AnalyzesFormData = z.infer<typeof AnalyzesFormSchema>;
