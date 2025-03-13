import { getUserStats } from "@/app/_actions/user/actions";
import StatsCard from "@/app/_components/statsCard/statsCard";
import StatsChart from "@/app/_components/statsChart/statsChart";
import { PiBookFill, PiBooksFill, PiPercentBold } from "react-icons/pi";

export default async function Page() {
  const stats = await getUserStats();

  return (
    <div className="py-8 flex flex-col items-center">
      {!('message' in stats) ?
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-3 gap-4">
          <StatsCard
            value={stats.booksCount.toString()} 
            description="Books count"
            icon={<PiBookFill className="text-lg text-white" />}
            color="green"
          />

          <StatsCard
            value={stats.shelvesCount.toString()} 
            description="Shelves count"
            icon={<PiBooksFill className="text-lg text-white" />}
            color="blue"
          />

          <StatsCard
            value={stats.averageScore.toFixed(2)} 
            description="Average score"
            icon={<PiPercentBold className="text-lg text-white" />}
            color="yellow"
          />

          <StatsChart
            stats={stats}
            className="lg:col-start-1 lg:col-end-4"   
          />
        </div> 
        :
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold">There are no stats yet.</h2> 
        </div>
      } 
    </div>
  );
}