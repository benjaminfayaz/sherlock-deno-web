import React, { FormEvent, useState } from 'react'
import { SherlockScanner } from "sherlock/sherlock-scanner.ts"
import type { SiteResult } from "sherlock/types.ts"
import { WebFormatter } from "../adapter/web-formatter.ts"
import type { WebFormatterOptions } from "../adapter/web-formatter.ts"
import Results from "../components/Results.tsx";
import SearchForm from "../components/SearchForm.tsx";
import DownloadButton from "../components/DownloadButton.tsx";
import type { DownloadData } from '../components/DownloadButton.tsx';
import { useDeno } from "aleph/framework/react/mod.ts";
import GithubBanner from "../components/GithubBanner.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default function Home() {

  const [results, setResults] = useState<Array<SiteResult>>([]);
  const [username, setUsername] = useState<string>("");
  const [downloadData, setDownloadData] = useState<DownloadData | undefined>();

  const environment = useDeno(() => Deno.env.get("ALEPH_ENV") as "development" | "production");

  const startScan = (username: string, options: WebFormatterOptions) => {
    setUsername(username);
    const formatter = new WebFormatter(options);

    const scanner = new SherlockScanner({
      formatter,
      username,
      timeout: 20, // due to https://github.com/checkerschaf/sherlock-deno/issues/7 we can't really use the timeout effectively
      proxyConfig: {
        url: environment === "production" ? "https://sherlock.benjaminfayaz.de/proxy/" : "http://localhost:3000/",
        headers: {
          "x-requested-with": "XMLHttpRequest"
        }
      }
    });

    scanner.scan();
    formatter.resultsObserve.bind(data => {
      setResults(prevState => prevState.concat(data!));
    })

    if (options.exportFormat !== undefined) {
      formatter.exportObserve.bind(data => {
        if (data !== undefined || data !== "") {
          setDownloadData({ format: options.exportFormat!, content: data! });
        }
      })
    }
  }

  return (
    <>
      <Header />
      <GithubBanner />
      <SearchForm onSubmit={startScan} />
      <Results results={results} username={username} />
      {downloadData !== undefined &&
        <DownloadButton data={downloadData} />
      }
      <Footer />
    </>
  )
}
