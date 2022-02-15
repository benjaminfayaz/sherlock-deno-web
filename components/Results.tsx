import React, { useRef, useEffect } from 'react'
import { SiteResult } from 'sherlock/types.ts';
import "../style/results.css"
import { ScannerResult } from 'sherlock/enums.ts';

type ResultsProps = {
  results: SiteResult[];
  username: string;
}

export default function Results({ results, username }: ResultsProps) {
  const listElement = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (results.length > 0) {
      (listElement.current?.lastChild as HTMLLIElement).scrollIntoView();
    }
  }, [results])

  const renderIcon = (result: ScannerResult) => {
    switch (result) {
      case "SUCCESS":
        return <span className="result-success">{"+"}</span>

      default:
        return <span className="result-error">{"-"}</span>
    }
  }

  return (
    <div className={"results-container " + (results.length > 0 ? "results-active" : "")}>
      {(results.length > 0) && (
        <div className="result-username">
          <span className="result-icon-wrapper">[<span className="result-success">{">"}</span>]</span>
          <span className="result-success">Input Username:</span>
          <span className="result-value">{username}</span>
        </div>
      )}
      <ul ref={listElement}>
        {results.map(result => (
          <li key={result.url}>
            <span className="result-icon-wrapper">[{renderIcon(result.result)}]</span>
            <span className={`result-${result.result === "SUCCESS" ? "success" : "error"}`}>{result.siteName}:</span>
            <a className="result-value" href={result.url} target="_blank">{result.url}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
