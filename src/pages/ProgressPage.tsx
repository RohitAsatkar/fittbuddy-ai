
import { NavBar } from "@/components/nav-bar";
import { ProgressChart } from "@/components/progress-chart";

export default function ProgressPage() {
  return (
    <>
      <NavBar />
      <div className="container max-w-4xl mx-auto p-4 pb-20 md:pb-4">
        <h1 className="text-2xl font-bold mb-6">Your Progress</h1>
        <ProgressChart />
      </div>
    </>
  );
}
