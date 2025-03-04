import SearchBar from "./searchBar";

export default function TopBar() {
  return (
    <div className="w-full h-[40px] flex flex-row items-center relative">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <SearchBar />
    </div>
  );
}
