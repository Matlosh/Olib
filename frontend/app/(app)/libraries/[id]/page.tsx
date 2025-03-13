import { getPublicLibraryStats } from "@/app/_actions/libraries/actions";
import PublicLibrary from "@/app/_components/publicLibrary/publicLibrary";
import { getPublicLibrary } from "@/app/_utils/cacheFunctions";

type PageProps = {
  params: Promise<{ id: string }>
};

export default async function Page({
  params
}: PageProps) {
  const { id } = await params;
  const publicLibrary = await getPublicLibrary(Number(id));
  const stats = await getPublicLibraryStats(Number(id));

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {!('message' in publicLibrary) && !('message' in stats) &&
        <PublicLibrary
          publicLibrary={publicLibrary}
          stats={stats}  
        />}
    </div>
  );
}