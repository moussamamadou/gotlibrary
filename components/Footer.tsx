import Link from "next/link"
import React from "react"

const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full h-24 border-t">
      Develop By Moussa Mamadou with
      <Link href="https://anapioficeandfire.com/">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-indigo-600"
        >
          &nbsp;anapioficeandfire.com
        </a>
      </Link>
    </footer>
  )
}

export default Footer
