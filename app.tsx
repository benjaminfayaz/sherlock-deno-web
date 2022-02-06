import React, { FC, useEffect, useState } from 'react'
import {SherlockScanner} from "sherlock/sherlock-scanner.ts"
import {WebFormatter} from "./adapter/web-formatter.ts"

export default function App({ Page, pageProps }: { Page: FC, pageProps: Record<string, unknown> }) {
  const [state, setState] = useState<Array<string>>([]);
  
  const webFormatter = new WebFormatter();
  
  const scanner = new SherlockScanner({
      formatter: webFormatter,
      username: "benjamin",
      timeout: 2,
      proxyConfig: {
        url: "http://localhost:3000/",
        headers: {
          "x-requested-with": "XMLHttpRequest"
        }
      }
    });
    
    useEffect(() => {
    scanner.scan();
    webFormatter.observe.bind(data => {
       setState(prevState => prevState.concat(data));
    })
  }, [])

  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <h2>state {state.length}</h2>
      <ul>
       { state.map(item => (<li>{item}</li>))}
      </ul>
      <Page {...pageProps} />
    </main>
  )
}
