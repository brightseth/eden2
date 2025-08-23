import Link from "next/link";
import RevenueForecasting from "@/components/RevenueForecasting";
import SpiritROICalculator from "@/components/SpiritROICalculator";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-8 inline-block">
          ← BACK
        </Link>

        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl mb-4">ANALYTICS</h1>
          <p className="text-xl opacity-60">REVENUE FORECASTING & INVESTMENT INTELLIGENCE</p>
        </div>

        {/* $SPIRIT ROI Calculator */}
        <div className="mb-12">
          <SpiritROICalculator />
        </div>

        {/* Agent Revenue Forecasting */}
        <div className="mb-12">
          <RevenueForecasting />
        </div>

        {/* Investment Disclaimer */}
        <div className="border border-white/30 border-dashed p-6 text-center">
          <p className="text-sm opacity-80 mb-2">
            INVESTMENT ANALYSIS FOR EDUCATIONAL PURPOSES
          </p>
          <p className="text-xs opacity-60">
            Revenue projections are based on historical data and current trends. Past performance does not guarantee future results. 
            Cryptocurrency investments carry significant risk and should be considered speculative.
          </p>
        </div>
      </div>
    </div>
  );
}