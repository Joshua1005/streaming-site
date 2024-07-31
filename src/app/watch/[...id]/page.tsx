import { VideoWrapper } from "@/components/wrapper/video-wrapper";

interface Params {
  params: {
    id: string[];
  };
  searchParams: {};
}

const Watchpage = ({ params: { id } }: Params) => {
  return <VideoWrapper src={id[0]} />;
};

export default Watchpage;
