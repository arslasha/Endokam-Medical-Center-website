import styles from "../Home.module.css";

export default function Location() {
    return (
        <section className={styles.location}>
            <div className={styles.mapWrapper}>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa788841526c02c76b5ffa7206dd7f6ea4618597503a91ca87ce97b238ce6d152&amp;source=constructor"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    title="Карта"
                ></iframe>

                <div className={styles.infoCard}>
                    <h2 className={styles.title}>Медицинсикй центр &#34;Эндокам&#34;</h2>
                    <p className={styles.address}>
                        Адрес: Набережные Челны, ЗЯБ, 17а комплекс, 24Б (пересечение с Набережночелнинский проспект, 5Б), 1 этаж; 1 подъезд
                    </p>
                    <p className={styles.contact}>Телефон: +7 (917) 891-16-63 </p>
                    <p className={styles.contact}>Email: endokam@mail.ru</p>
                </div>
            </div>
        </section>
    );
}
