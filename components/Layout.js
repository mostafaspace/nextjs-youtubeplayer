import { useRouter } from 'next/router';
import Link from 'next/link'

export function Layout({children}){
	const router = useRouter();

	return (
		<div>
			<ul>
				<li><Link href="/"><a className={router.pathname === "/" ? "active" : ""} >Home</a></Link></li>
				<li><Link href="/video"><a className={router.pathname === "/video" ? "active" : ""} >Video</a></Link></li>
				<li><Link href="/gif"><a className={router.pathname === "/gif" ? "active" : ""} >Gif</a></Link></li>
			</ul>
			{children}
		</div>
	)
}
