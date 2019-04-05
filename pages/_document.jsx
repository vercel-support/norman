import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import config from 'config';
import htmlescape from 'htmlescape';

// eslint-disable-next-line no-underscore-dangle
const __NEXT_CONFIG__ = { ...config };

export default class JssDocument extends Document {
  render() {
    return (
      <html lang="id">
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:600" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/styles.css" />
        </Head>
        <Main />
        <script
            // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              __NEXT_CONFIG__ = ${htmlescape(__NEXT_CONFIG__)}
            `,
          }}
        />
        <NextScript />
      </html>
    );
  }
}
