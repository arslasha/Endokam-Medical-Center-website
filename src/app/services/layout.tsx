// src/app/services/layout.tsx

import React from "react";

export default function ServicesLayout({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    return <>{children}</>; // Можно заменить на обёртку с Header/Footer, если нужно
}
