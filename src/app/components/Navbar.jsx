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
              className="logo"
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
            <Image
              className="photo-logo"
              src="/images/photo.png"
              width={45}
              height={45}
              alt="photos"
            />
          </Link>
        </li>
        <li>
          <Link href="/videos">
            <Image
              className="videos-logo"
              src="/images/video.png"
              width={45}
              height={45}
              alt="vidoes"
            />
          </Link>
        </li>
        <li>
          <Link href="/about">
            <Image
              className="about-logo"
              src="/images/question.gif"
              width={45}
              height={45}
              alt="go to about page"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
