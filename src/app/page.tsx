import { VideoCard } from "@/components/wrapper/video-card";

function Homepage() {
  return (
    <main className={"mt-20 grid grid-cols-6 gap-2"}>
      {Array.from({ length: 8 }, (_, index) => {
        return <VideoCard />;
      })}
    </main>
  );
}

export default Homepage;
