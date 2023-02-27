import React, { useState } from "react"
import Head from "next/head"
import utilStyles from "@/styles/utils.module.css"
import Layout, { siteTitle } from "@/components/layout"
import { supabase } from '@/utils/supabase'

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
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
        <h1 className={utilStyles.headingMd}>Signup</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && (
          <p style={{ color: "green" }}>
            A magic link has been sent to your email!
          </p>
        )}
        <form onSubmit={handleSignup} className={utilStyles.flexCol}>
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
            Signup
          </button>
        </form>
      </div>
    </Layout>
  )
}
