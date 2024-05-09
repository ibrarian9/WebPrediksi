"use client"

import "./globals.css";
import React, {useEffect, useState} from "react";
import Loader from "@/components/common/Loader";

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <html lang="en">
        <body>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? <Loader/> : children}
        </div>
        </body>
        </html>
    );
}
