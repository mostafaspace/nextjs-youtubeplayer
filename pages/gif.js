import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import gifImg from '/public/200.gif'

export default function Help() {
	return (
		<div className="container">
			<Head>
				<title>Gif Page</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1 className="title">
					Gif Page
				</h1>

				<Image
					src={gifImg}
					alt="Gif Image"
				/>

			</main>
		</div>
	)
}
