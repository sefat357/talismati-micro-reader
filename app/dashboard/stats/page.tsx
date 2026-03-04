import { ReadingAnalyticsCard } from "@/components/ui/analytics-dashboard";
import { ReadingAreaChart } from "@/components/ui/reading-area-chart";

export default function StatsPage() {
    return (
        <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                    Analytics
                </h1>
                <p className="text-zinc-400 text-sm">
                    A deep dive into your reading habits and velocity.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 relative z-10">
                {/* The 3D Component */}
                <ReadingAnalyticsCard />

                {/* The New Area Chart */}
                <div className="flex xl:py-8 w-full">
                    <ReadingAreaChart />
                </div>
            </div>
        </div>
    );
}
