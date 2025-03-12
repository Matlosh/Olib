import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-xl">Not found</h2>
        <p>The requested resource could not be found.</p>
      </div>
      <Link
        href={`/`}
        className="duration-150 text-secondary hover:text-tertiary text-xl" 
        >Return to home</Link>
    </div>
  );
}