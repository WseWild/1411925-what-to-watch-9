import {
  useEffect,
  useRef
} from 'react';
import type { FilmCardPlayerProps } from './type';

const VIDEO_DELAY = 1000;

export default function FilmCardPlayer({src, poster, isPlayed} : FilmCardPlayerProps) : JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timeoutId = isPlayed && setTimeout(() => {
      videoRef.current?.play();
    }, VIDEO_DELAY);

    !isPlayed && videoRef.current?.load();

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [isPlayed]);

  return (
    <video
      className="player__video"
      ref={videoRef}
      src={src}
      poster={poster}
      muted
    />
  );
}
