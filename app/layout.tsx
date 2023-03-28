import {ReactNode} from "react";
import Script from 'next/script';
import { Manrope } from 'next/font/google';
import variables from "./layout.module.scss";
import "./root.scss"

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
})

export const metadata = {
    title: "Console Prices Adjusted for Inflation",
    description: "Game console prices adjusted for inflation",
    alternates: {
        canonical: "https://www.inflationstation.net/"
    },
    themeColor: variables.colorPrimary,
}

export default function Layout(props: {children: ReactNode}) {
    return (
        <html lang="en" className={manrope.className}>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-213667339-1"/>
            <Script id="google-analytics">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-213667339-1');
                gtag('config', 'G-6JK3H6KGR0');
                `}
            </Script>

            <body>
                <noscript>
                    <style>
                        {".show-if-js{display:none}"}
                        {".show-no-js{display:contents}"}
                    </style>
                </noscript>
                {props.children}
            </body>
        </html>
    );
}
