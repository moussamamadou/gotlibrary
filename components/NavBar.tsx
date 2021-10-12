import React from "react"
import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="flex items-center justify-center w-full h-24 border-b mb-5">
      <div className="">
        <h1 className="text-3xl font-bold text-indigo-600">
          <Link href="/">
            <a>GOT LIBRARY</a>
          </Link>
        </h1>
      </div>
    </nav>
  )
}

export default NavBar
