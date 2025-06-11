import styles from "../Appointment.module.css";

interface ServiceCardProps {
    name: string;
    price: string;
    description: string;
    selected?: boolean;
    onSelect: () => void;
}

export default function ServiceCard({ name, price, description, selected, onSelect }: ServiceCardProps) {
    return (
        <div
            className={`${styles.serviceCard} ${selected ? styles.serviceCardSelected : ""}`}
            onClick={onSelect}
        >
            <div className={styles.serviceCardContent}>
                <div>
                    <h3 className={styles.serviceCardTitle}>{name}</h3>
                    <p className={styles.serviceCardDescription}>{description}</p>
                </div>
                <div className={styles.serviceCardMeta}>
                    <span className={styles.serviceCardPrice}>{price}</span>
                </div>
            </div>
        </div>
    );
}
