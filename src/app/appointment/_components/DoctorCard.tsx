"use client";

import styles from "../Appointment.module.css";
import {FaUserMd} from "react-icons/fa";

interface DoctorCardProps {
    name: string;
    role: string;
    description: string;
    selected: boolean;
    onSelect: () => void;
}

export default function DoctorCard({ name, role, description, selected, onSelect }: DoctorCardProps) {
    return (
        <div
            className={`${styles.doctorCard} ${selected ? styles.doctorCardSelected : ""}`}
            onClick={onSelect}
        >
            <div className={styles.doctorAvatar}>
                <FaUserMd size={48} color="#008080" />
            </div>
            <div className={styles.doctorInfo}>
                <h3 className={styles.doctorName}>{name}</h3>
                <p className={styles.doctorRole}>{role}</p>
                <p className={styles.doctorDesc}>{description}</p>
            </div>
        </div>
    );
}
