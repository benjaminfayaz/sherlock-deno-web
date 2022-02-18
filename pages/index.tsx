import React, { FormEvent, useState } from 'react'
import { SherlockScanner } from "sherlock/sherlock-scanner.ts"
import type { SiteResult } from "sherlock/types.ts"
import { WebFormatter } from "../adapter/web-formatter.ts"
import type { WebFormatterOptions } from "../adapter/web-formatter.ts"
import Results from "../components/Results.tsx";
import SearchForm from "../components/SearchForm.tsx";

export default function Home() {

  const [state, setState] = useState<Array<SiteResult>>([]);
  const [username, setUsername] = useState<string>("");

  const startScan = (username: string, options: WebFormatterOptions) => {
    setUsername(username);
    const formatter = new WebFormatter(options);

    const scanner = new SherlockScanner({
      formatter,
      username,
      timeout: 20, // due to https://github.com/checkerschaf/sherlock-deno/issues/7 we can't really use the timeout effectively
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
      <Results results={state} username={username}/>
    </>
  )
}
