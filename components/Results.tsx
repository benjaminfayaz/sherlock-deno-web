import React from 'react'
import { SiteResult } from 'sherlock/types.ts';

type ResultsProps = {
  results: SiteResult[];
}

export default function Results({results}: ResultsProps) {
  return (
    <div>
      <ul>
        {results.map(result => (<li key={result.url}>{result.siteName}: {result.result}</li>))}
      </ul>
    </div>
  )
}
