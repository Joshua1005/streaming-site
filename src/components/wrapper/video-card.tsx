"use client";

import { useVideo } from "@/hooks/use-video";
import { useEffect, useRef } from "react";
import {
  VideoContainer,
  VideoControls,
  VideoPlayer,
  VideoSlider,
} from "@/components/ui/video";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const VideoCard = () => {
  const router = useRouter();
  const video = useVideo();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    video.setDuration(videoRef.current.duration || 0);
  }, []);

  return (
    <article
      className={"group cursor-pointer"}
      onMouseEnter={() => video.changeIsPlaying(videoRef)}
      onMouseLeave={() => {
        video.changeCurrentTime(videoRef, 0);
        video.changeIsPlaying(videoRef);
      }}
      onClick={(e) => {
        if (
          e.target instanceof HTMLElement &&
          e.target.closest(`[data-role="video-controls"]`)
        )
          return;
        router.push("/watch/videoplayback.mp4");
      }}
    >
      <VideoContainer className={"group-hover:rounded-none"}>
        <VideoPlayer
          muted
          ref={videoRef}
          onLoadedData={(e) => video.setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) =>
            video.setCurrentTime(e.currentTarget.currentTime)
          }
          src="videoplayback.mp4"
        />
        <VideoControls
          data-role="video-controls"
          className={"group-hover:block hidden"}
        >
          <VideoSlider
            max={video.state.duration}
            value={[video.state.currentTime]}
            onValueChange={(currentTimeList) =>
              video.changeCurrentTime(videoRef, currentTimeList[0])
            }
          />
        </VideoControls>
      </VideoContainer>
      <section className={"flex gap-2 py-2"}>
        <div>
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className={"flex-1"}>
          <h3 className={"font-medium line-clamp-2"}>Jan Joshua De Guzman</h3>
          <p className={"text-xs text-muted-foreground"}>Joshua de Guzman</p>
        </div>
      </section>
    </article>
  );
};

export { VideoCard };
