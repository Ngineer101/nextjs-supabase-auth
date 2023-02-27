import React, { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import Layout, { siteTitle } from "../components/layout"
import utilStyles from "../styles/utils.module.css"
import { supabase } from '../utils/supabase'

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setError(data.message)
      } else {
        console.log(data)
        localStorage.setItem("user", JSON.stringify(data))
        router.push("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <h1 className={utilStyles.headingMd}>Login</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin} className={utilStyles.flexCol}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={utilStyles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={utilStyles.input}
            required
          />
          <button type="submit" className={utilStyles.button}>
            Login
          </button>
        </form>
      </div>
    </Layout>
  )
}
