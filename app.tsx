import React, { FC } from 'react'

export default function App({ Page, pageProps }: { Page: FC, pageProps: Record<string, unknown> }) {
  return (
    <main>
      <header>
        <h1>Sherlock Deno Web</h1>
        <p>Search for users across 270+ websites in your browser</p>
      </header>
      <head>
        <title>Sherlock Deno Web</title>
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" href="./style/normalize.css" />
        <link rel="stylesheet" href="./style/app.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;500&family=Righteous&display=swap" rel="stylesheet"/>
      </head>
      <Page {...pageProps} />
    </main>
  )
}
