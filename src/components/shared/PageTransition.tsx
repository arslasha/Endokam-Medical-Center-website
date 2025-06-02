'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const pageVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
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
