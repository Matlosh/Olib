'use client';

import { Tab, Tabs } from "@heroui/react";
import ShelfCard from "../shelfCard/shelfCard";
import StatsCard from "@/app/_components/statsCard/statsCard";
import StatsChart from "@/app/_components/statsChart/statsChart";
import { PiBookFill, PiBooksFill, PiPercentBold } from "react-icons/pi";

type PublicLibraryProps = {
  libraryId: string,
  publicLibrary: PublicLibraryData,
  stats: StatsData
};

export default function PublicLibrary({
  libraryId,
  publicLibrary,
  stats
}: PublicLibraryProps) {
  const constructLibraryShelfUrl = (shelfId: string): string => {
    return `/libraries/${libraryId}/shelves/${shelfId}`;
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Tabs color="primary">
        <Tab key="shelves" title="Shelves" className="w-full">
          <div className="w-full flex flex-col gap-11">
            {publicLibrary.shelves.map(shelf => (
              <ShelfCard
                key={shelf.id} 
                shelf={shelf}
                isLastALink={true}
                viewMode={true}
                constructShelfUrl={constructLibraryShelfUrl}
              />
            ))}
          </div>
        </Tab>

        <Tab key="stats" title="Stats" className="w-full flex flex-col items-center justify-center">
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
        </Tab>
      </Tabs>
    </div>
  )
}