import React, { FormEvent, useState } from 'react'
import { SherlockScanner } from "sherlock/sherlock-scanner.ts"
import type { SiteResult } from "sherlock/types.ts"
import { WebFormatter } from "../adapter/web-formatter.ts"
import Results from "../components/Results.tsx";
import SearchForm from "../components/SearchForm.tsx";

export default function Home() {

  const [state, setState] = useState<Array<SiteResult>>([]);

  const startScan = (username: string) => {
    const formatter = new WebFormatter();

    const scanner = new SherlockScanner({
      formatter,
      username,
      timeout: 2,
      proxyConfig: {
        url: "http://localhost:3000/",
        headers: {
          "x-requested-with": "XMLHttpRequest"
        }
      }
    });

    scanner.scan();
    formatter.observe.bind(data => {
      setState(prevState => prevState.concat(data!));
    })
  }

  return (
    <>
      <head>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <SearchForm onSubmit={startScan} />
      <Results results={state}/>
    </>
  )
}
