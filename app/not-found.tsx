import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-black text-[#CCFF00]">404</h1>
      <h2 className="text-2xl font-bold uppercase text-white mt-2">PAGE NOT FOUND</h2>
      <p className="text-zinc-400 text-xs mt-2 max-w-sm">
        The lift or page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="mt-6 bg-[#CCFF00] text-black font-extrabold text-xs uppercase px-6 py-3 rounded-lg">
        Return Home
      </Link>
    </div>
  );
}