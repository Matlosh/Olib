import {getUserShelves} from "@/app/_actions/shelves/actions";
import ShelfCard from "@/app/_components/shelfCard/shelfCard";

export default async function Page() {
  const shelves = await getUserShelves();

  return (
    <div className="w-full">
      {!('message' in shelves) && shelves.map((shelf) => (
        <ShelfCard key={shelf.id} shelf={shelf} isLastALink={true} />
      ))}
    </div>
  );
}
