import ShelfCard from "@/app/_components/shelfCard/shelfCard";
import ShelfForm from "@/app/_components/shelfForm/shelfForm";

export default function Page() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold">Your library</h2>

      <ShelfCard />
      <ShelfForm />
    </div>
  );
}
