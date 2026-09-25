import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "./context/PlanContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FitLog — Workout Library",
  description: "A dark, no-nonsense gym companion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="bg-neutral-950 text-neutral-100 antialiased min-h-screen flex flex-col justify-between">
        <PlanProvider>
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}