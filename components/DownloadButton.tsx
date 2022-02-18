import React from 'react'

export type DownloadData = {
  content: string;
  format: "json" | "csv";
}

type DownloadButtonProps = {
  data: DownloadData
}

export default function DownloadButton({data}: DownloadButtonProps) {
  
  // function copied from https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
  // This could be done by directly using an <a> element with the attrs in the template but aleph adds a leading slash
  const downloadFile = () => {
    const href = "data:text/plain;charset=utf-8," + encodeURIComponent(data.content);
    const filename = "sherlock-results." + data.format;

    const element = document.createElement('a');
    element.setAttribute('href', href);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  return (
    <button className="download-button" onClick={downloadFile}>Download</button>
  )
}
