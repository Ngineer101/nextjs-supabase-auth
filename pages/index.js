import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"
import utilStyles from "../styles/utils.module.css"

const allPostsData = [
	{
		id: "ssg-ssr",
		title: "When to use static generation vs server-side rendering",
		date: "2023-01-01",
	},
	{
		id: "pre-rendering",
		title: "Two forms of pre-rendering",
		date: "2023-01-01",
	},
]

export default function Home() {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>
					<Link href='/login'>Log in</Link> to read these blog posts
				</p>
			</section>

			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>{title}</Link>
							<br />
							{id}
							<br />
							{date}
						</li>
					))}
				</ul>
			</section>
		</Layout>
	)
}
