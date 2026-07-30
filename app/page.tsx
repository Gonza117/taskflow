import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 bg-slate-950">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}