import React from 'react'

export type DownloadData = {
  content: string;
  format: "json" | "csv";
}

type DownloadButtonProps = {
  data: DownloadData
}

// TODO remove trailing slash in rendered <a> element
export default function DownloadButton({data}: DownloadButtonProps) {
  return (
    <a className="download-button" href={"data:text/plain;charset=utf-8," + encodeURIComponent(data.content)} download={"sherlock-results." + data.format}>Download</a>
  )
}
