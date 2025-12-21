import styles from "./Footer.module.css";
import { FaTelegramPlane, FaVk, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Column 1 */}
                <div className={styles.columnWide}>
                    <h2 className={styles.title}>
                        ООО Эндокам “Медицинский центр <br /> доктора Хисамутдинова И.Г.”
                    </h2>
                    <p className={styles.text}>
                        Республики Татарстан, Набережные Челны (Комсомольский район), ЗЯБ,
                        17а комплекс, 24Б (пересечение с Набережночелнинский проспект, 5Б),
                        1 этаж; 1 подъезд.
                    </p>
                    <div className={styles.icons}>
                        <a href="mailto:info@endocam.ru" aria-label="Mail">
                            <FaEnvelope />
                        </a>
                        <a href="https://wa.me/79178911663" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <FaWhatsapp />
                        </a>
                        <a href="https://t.me/yourclinic" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                            <FaTelegramPlane />
                        </a>
                        <a href="https://vk.com/yourclinic" target="_blank" rel="noopener noreferrer" aria-label="VK">
                            <FaVk />
                        </a>
                    </div>
                </div>

                {/* Column 2 */}
                <div className={styles.column}>
                    <h2 className={styles.title}>Наши контакты</h2>
                    <p className={styles.text}>Тел.: 8 (917) 891-16-63</p>
                    <p className={styles.text}>Тел.: 8 (8552) 33-30-10</p>
                    <p className={styles.text}>Тел.: 8 (937) 582-83-20</p>
                </div>

                {/* Column 3 */}
                <div className={styles.column}>
                    <h2 className={styles.title}>Время работы центра</h2>
                    <p className={styles.text}>Будни 8:00 – 18:00</p>
                    <p className={styles.text}>Суббота – выходной</p>
                    <p className={styles.text}>Воскресенье – выходной</p>
                </div>
            </div>
        </footer>
    );
}

