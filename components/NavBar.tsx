import React from "react"
import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="container flex items-center justify-between w-full h-24 border-b mb-5">
      <div className="">
        <h1 className="text-3xl font-bold text-indigo-600">
          <Link href="/">
            <a>GOT LIBRARY</a>
          </Link>
        </h1>
      </div>
      <div className=" flex gap-4 text-xl font-medium ">
        <Link href="/books">
          <a className="hover:text-indigo-600">Books</a>
        </Link>
        <Link href="/characters">
          <a className="hover:text-indigo-600">Characters</a>
        </Link>
        <Link href="/houses">
          <a className="hover:text-indigo-600">Houses</a>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
