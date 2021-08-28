import Head from 'next/head'
import Link from 'next/link'
import {YouTubePlayer} from "../components";

export default function Help() {
	return (
		<div className="container">
			<Head>
				<title>Video Page</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1 className="title">
					Video Page
				</h1>

				<YouTubePlayer mode={'player'}/>
			</main>
		</div>
	)
}
