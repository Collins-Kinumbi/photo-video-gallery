function Video({ videos, addToRefs }) {
  return (
    <div className="video-gallery">
      {videos &&
        videos.map((video, index) => (
          <div className="video-item" key={video.id} ref={addToRefs}>
            <video controls poster={video.image} muted>
              <source
                src={video.video_files[0].link}
                type={video.video_files[0].file_type}
              />
            </video>
            <div className="credit">By {video.user.name}</div>
          </div>
        ))}
    </div>
  );
}

export default Video;
