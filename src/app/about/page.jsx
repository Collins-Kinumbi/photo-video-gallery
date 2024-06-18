function page() {
  return (
    <main>
      <div className="content">
        <div className="about">
          <p>
            This photo gallery / video site is my fun portfolio project I did
            using the{" "}
            <a
              href="https://www.pexels.com/api"
              rel="noopener noreferrer"
              target="_blank"
            >
              Pexels API
            </a>{" "}
            to fetch picture and video data and used the Next js framework to
            build it. You can search for photos and videos and also download
            photos in their original quality.
          </p>
          <p>
            My GitHub is{" "}
            <a
              href="https://github.com/Collins-Kinumbi"
              rel="noopener noreferrer"
              target="_blank"
            >
              Collins Kinumbi
            </a>{" "}
            and my Twitter is{" "}
            <a
              href="https://x.com/collinsKinumbi"
              rel="noopener noreferrer"
              target="_blank"
            >
              @collinsKinumbi
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default page;
