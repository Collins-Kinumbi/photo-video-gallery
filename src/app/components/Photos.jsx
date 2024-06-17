import Image from "next/image";
function Photos({ photos }) {
  function handlePhotoDownload(url, filename) {
    fetch(url, {
      headers: new Headers({
        Origin: window.location.origin,
      }),
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.setAttribute("download", filename);
        anchor.click();
        URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => console.error("Download error:", error));
  }

  return (
    <div className="photo-gallery">
      {photos &&
        photos.map((photo) => (
          <div className="photo-item" key={photo.id}>
            <Image
              src={photo.src.portrait}
              alt={photo.alt}
              width={800}
              height={1200}
              quality={100}
              placeholder="blur"
              blurDataURL="/images/placeholderImg.png"
              priority
            />
            <div className="overlay"></div>
            <div className="credit">photo by {photo.photographer}</div>
            <div
              className="download-icon"
              onClick={() =>
                handlePhotoDownload(
                  photo.src.original,
                  `${photo.alt && photo.alt} by ${photo.photographer}.jpg`
                )
              }
            >
              <Image src="/images/download.png" alt="" width={60} height={60} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Photos;
