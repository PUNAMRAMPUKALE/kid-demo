import { Outlet, Link } from "@tanstack/react-router";
import MascotParade from "./components/MascotParade";

export default function App() {
  return (
    <div className="min-h-full">
      <header className="w-full bg-skyblue/80 backdrop-blur sticky top-0 z-10 shadow-soft">
        <div className="flex items-center justify-between py-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎈</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-inky">Kid Demo</h1>
          </div>
          <nav className="flex gap-4 text-inky">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/quiz" className="hover:underline">Quiz</Link>
            <Link to="/rewards" className="hover:underline">Rewards</Link>
            <Link to="/parent" className="hover:underline">Parent</Link>
          </nav>
        </div>
      </header>

      <MascotParade />

      <main className="px-0">
        <section className="px-4 sm:px-6 py-6 sm:py-10">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
