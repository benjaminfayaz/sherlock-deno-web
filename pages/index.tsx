import React from 'react'
import Logo from '~/components/logo.tsx'

export default function Home() {

  return (
    <div className="page">
      <head>
        <title>Hello World - Aleph.js</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <p className="logo"><Logo /></p>
    </div>
  )
}
