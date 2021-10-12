import React from "react"
import Footer from "./Footer"
import NavBar from "./NavBar"

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="flex flex-col items-center  min-h-screen py-2 ">
      <NavBar />
      <main className="container flex  flex-col items-center justify-center w-full flex-1 text-center my-5">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
