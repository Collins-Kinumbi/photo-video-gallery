import { fetchData, params } from "@/app/utils/utils";
import Image from "next/image";

export default async function Home() {
  //trending photos endpoint
  const trendingImagesUrl = "https://api.pexels.com/v1/curated";

  //fetching data
  const trendingPhotos = await fetchData(trendingImagesUrl, params(80, 1));
  // console.log(trendingPhotos);
  const { photos } = trendingPhotos;
  return (
    <main>
      <div className="content">
        <h1>Today's trending photos</h1>
        <div className="photo-gallery">
          {photos &&
            photos.map((photo) => {
              return (
                <div className="photo-item">
                  <Image
                    src={photo.src.portrait}
                    alt={photo.alt}
                    width={800}
                    height={1200}
                  />
                  <div className="overlay">
                    <span>photo by {photo.photographer}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}
