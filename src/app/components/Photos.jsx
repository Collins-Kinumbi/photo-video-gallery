import Image from "next/image";
function Photos({ photos }) {
  return (
    <div className="photo-gallery">
      {photos &&
        photos.map((photo, index) => (
          <div className="photo-item" key={photo.id}>
            <Image
              src={photo.src.portrait}
              alt={photo.alt}
              width={800}
              height={1200}
              priority
            />
            <div className="overlay"></div>
            <div className="credit">photo by {photo.photographer}</div>
          </div>
        ))}
    </div>
  );
}

export default Photos;
