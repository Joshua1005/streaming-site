import { auth } from "@/auth";
import { UploadVideoForm } from "@/components/video/upload-video-form";
import { VideoPlayer } from "@/components/video/video-player";
import { redirect } from "next/navigation";

async function HomePage() {
  const session = await auth();
  if (!session) return redirect("/signin");

  return (
    <main className={"grid place-items-center m-20"}>
      <VideoPlayer enableKeyEvent={true} src={"videoplayback.mp4"} />
    </main>
  );
}

export default HomePage;
