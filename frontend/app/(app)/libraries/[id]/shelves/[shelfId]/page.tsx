import { getPublicLibraryShelf, getPublicLibraryShelfBooks } from "@/app/_actions/libraries/actions";
import ShelfSegment from "@/app/_components/shelfSegment/shelfSegment";
import ReturnHomeButton from "./returnHomeButton";

type PageProps = {
  params: Promise<{ id: string, shelfId: string }>
};

export default async function Page({
  params
}: PageProps) {
  const { id, shelfId } = await params;
  const shelf = await getPublicLibraryShelf(Number(id), Number(shelfId));
  const firstPageBooks = await getPublicLibraryShelfBooks(Number(id), Number(shelfId), 0);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <ReturnHomeButton libraryId={id} />

      {!('message' in firstPageBooks) && !('message' in shelf) ?
        <ShelfSegment
          id={shelfId}
          libraryId={id}
          shelfData={shelf}
          firstPageBooks={firstPageBooks}
          viewMode={true}
        />
        :
        <div>
          <h3 className="text-xl font-bold">Couldn&apos;t fetch shelf data. Please try again.</h3>
        </div> 
      }
    </div>
  );
}