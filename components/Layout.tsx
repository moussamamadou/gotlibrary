import Head from "next/head"
import React from "react"
import Footer from "./Footer"
import NavBar from "./NavBar"

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="flex flex-col items-center  min-h-screen py-2 ">
      <Head>
        <title> GOT LIBRARY</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="container text-xl flex  flex-col  w-full flex-1 text-center my-5">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
