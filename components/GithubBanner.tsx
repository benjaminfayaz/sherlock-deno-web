import React from 'react'
import "../style/github-banner.css"

export default function GithubBanner() {
  return (
    <section className="github-banner-container">
      <a className="github-banner-item github-banner-item-small" target="_blank" href="https://github.com/checkerschaf/sherlock-deno">
        <div className="github-banner-image-container">
          <img src="/github.png" />
        </div>
        <span>sherlock-deno</span>
      </a>
      <a className="github-banner-item github-banner-item-large" target="_blank" href="https://github.com/benjaminfayaz/sherlock-deno-web">
        <div className="github-banner-image-container">
          <img src="/github.png" />
        </div>
        <span>sherlock-deno-web</span>
      </a>
      <a className="github-banner-item github-banner-item-small" target="_blank" href="https://github.com/sherlock-project/sherlock">
        <div className="github-banner-image-container">
          <img src="/github.png" />
        </div>
        <span>sherlock</span>
      </a>
    </section>
  )
}
