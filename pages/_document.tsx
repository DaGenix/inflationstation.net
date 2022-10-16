import * as React from 'react';
import Document, {Head, Html, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-213667339-1">
            </script>
            <script dangerouslySetInnerHTML={{ __html:
                `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-213667339-1');
                gtag('config', 'G-6JK3H6KGR0');
                `
            }} />
            <style>
                {".show-if-js{display:contents}"}
                {".show-no-js{display:none}"}
            </style>
            <noscript>
                <style>
                    {".show-if-js{display:none}"}
                    {".show-no-js{display:contents}"}
                </style>
            </noscript>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap" rel="stylesheet" />
            <link rel="canonical" href="https://www.inflationstation.net/" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
