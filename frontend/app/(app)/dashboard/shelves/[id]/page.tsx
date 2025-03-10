import {getShelfBooks} from "@/app/_actions/shelves/actions";
import ShelfSegment from "@/app/_components/shelfSegment/shelfSegment";

type PageProps = {
  params: Promise<{ id: string }>
};

export default async function Page({
  params
}: PageProps) {
  const { id } = await params;
  const shelfBooks = await getShelfBooks(Number(id), 0);  

  return (
    <div>
      <ShelfSegment id={id} firstPageBooks={!('message' in shelfBooks) ? shelfBooks : []} />
    </div>
  );
}
