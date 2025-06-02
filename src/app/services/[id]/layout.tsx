// src/app/services/[id]/layout.tsx

import React from "react";

export default function ServiceLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
