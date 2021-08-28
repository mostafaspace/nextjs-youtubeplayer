import Head from 'next/head'
import {YouTubePlayer} from "../components";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Home Page
        </h1>

        <YouTubePlayer />

      </main>

    </div>
  )
}
