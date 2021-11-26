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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
