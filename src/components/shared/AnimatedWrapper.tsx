// components/AnimatedWrapper.tsx
'use client';

import { AnimatePresence } from 'framer-motion';

export default function AnimatedWrapper({ children }: { children: React.ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}