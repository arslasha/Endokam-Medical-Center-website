'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { Variants } from 'framer-motion';

type Props = {
    children: ReactNode;
};

// Используем правильный тип easing — либо массив, либо импортированную функцию
const pageVariants: Variants = {
    initial: { opacity: 0, y: 16 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1], // или импортированный easeOut
        },
    },
    exit: {
        opacity: 0,
        y: -16,
        transition: {
            duration: 0.2,
        },
    },
};

export const PageTransition = ({ children }: Props) => (
    <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
    >
        {children}
    </motion.div>
);
