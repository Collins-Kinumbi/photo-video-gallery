import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchForm from "./SearchForm";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <Image
              src="/images/logo.gif"
              width={45}
              height={45}
              alt="logo gif"
              priority
            />
          </Link>
        </li>
        <li>
          <SearchForm />
        </li>
        <li>
          <Link href="/">
            <Image src="/images/photo.png" width={45} height={45} />
          </Link>
        </li>
        <li>
          <Link href="/vidoes">
            <Image src="/images/video.png" width={45} height={45} />
          </Link>
        </li>
        <li>
          <Image
            className="about-logo"
            src="/images/question.gif"
            width={45}
            height={45}
          />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
