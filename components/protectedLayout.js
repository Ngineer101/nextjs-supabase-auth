import React, { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "@/styles/layout.module.css"
import utilStyles from "@/styles/utils.module.css"
import { supabase } from '@/utils/supabase'

const name = "Blog of John Doe"
const siteTitle = "Authorization with Next.js"

export default function ProtectedLayout({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          router.push("/logout")
        } else {
          if (!data.session) {
            router.push("/login")
          }

          setUser(data)
          localStorage.setItem("user", JSON.stringify(data))
        }
      } catch (error) {
        router.push("/logout")
      }
    }

    verifyUser()
  }, [])

  if (user) {
    return (
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn authorization and authentication with Next.js and Supabase"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <header className={styles.header}>
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpeg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
            <Link href="/logout">Logout</Link>
          </>
        </header>

        <main>{children}</main>

        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      </div>
    )
  }
}
