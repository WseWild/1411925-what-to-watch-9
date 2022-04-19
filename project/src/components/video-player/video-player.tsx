import {useState, useEffect, useRef} from 'react';

type VideoPlayerProps = {
  src: string,
  title: string,
  poster: string,
  autoplay: boolean,
  activeFilmCard: string,
}


function VideoPlayer( {src, poster, title, autoplay, activeFilmCard} :VideoPlayerProps ) : JSX.Element  {
  const [autoPlayStatus, setAutoPlay] = useState(autoplay);


  const videoRef = useRef<HTMLVideoElement | null>(null);


  useEffect(() => {
    let timeOutId;
    function playVidep() {
      if (videoRef.current !== null) {
        videoRef.current.play();
      }

    }

    if (videoRef.current === null) {
      return;
    }


    if (autoPlayStatus) {

      timeOutId = window.setTimeout(playVidep, 1000);
      return;
    }
    videoRef.current.load();
    window.clearTimeout(timeOutId);

  }, [autoPlayStatus]);

  return (
    <video poster={poster} title={title} autoPlay={autoPlayStatus} ref={videoRef}  src={src} muted width="280" height="175"
      onMouseOver={(({target}) => {
        setAutoPlay(true);
      })}
      onMouseLeave={(({target}) => {
        setAutoPlay(false);
      })}
    />
  );
}

export default VideoPlayer;
