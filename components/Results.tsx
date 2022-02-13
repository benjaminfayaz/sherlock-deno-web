import React, { useRef, useEffect } from 'react'
import { SiteResult } from 'sherlock/types.ts';
import "../style/results.css"

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

  return (
    <div className={"results-container " + (results.length > 0 ? "results-active" : "")}>
      {(results.length > 0) && (
        <div className="result-username">
          <span className="result-icon-wrapper">[<span className="result-icon">{">"}</span>]</span>
          <span className="result-key">Input Username:</span>
          <span className="result-value">{username}</span>
        </div>
      )}
      <ul ref={listElement}>
        {results.map(result => (
          <li key={result.url}>
            <span className="result-icon-wrapper">[<span className="result-icon">{"+"}</span>]</span>
            <span className="result-key">{result.siteName}:</span>
            <a className="result-value" href={result.url} target="_blank">{result.url}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
