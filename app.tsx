import React, { FC } from 'react'

export default function App({ Page, pageProps }: { Page: FC, pageProps: Record<string, unknown> }) {
  return (
    <main>
      <head>
        <title>Sherlock Web</title>
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" href="./style/normalize.css" />
        <link rel="stylesheet" href="./style/app.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;500&family=Righteous&display=swap" rel="stylesheet" />
        {/* copied from https://css-tricks.com/emoji-as-a-favicon/ */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🕵️‍♂️</text></svg>"/>
      </head>
      <Page {...pageProps} />
    </main>
  )
}
