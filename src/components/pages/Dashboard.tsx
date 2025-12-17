import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { SalesChart } from '../organisms/SalesChart';
import { SalesMetrics } from '../organisms/SalesMetrics';
import { FilterControls } from '../molecules/FilterControls';
import { ChartTypeSelector, ChartType } from '../molecules/ChartTypeSelector';
import { Button } from '../atoms/Button';
import { toast } from 'sonner';

export const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [minRevenue, setMinRevenue] = useState<number>(0);
  const [appliedFilters, setAppliedFilters] = useState({
    year: undefined as number | undefined,
    minRevenue: 0,
  });
  const [chartType, setChartType] = useState<ChartType>('bar');

  const initializeSalesData = useMutation(api.salesData.initializeSalesData);
  const salesData = useQuery(api.salesData.getSalesData, appliedFilters);
  const yearlySummary = useQuery(api.salesData.getYearlySummary);

  useEffect(() => {
    // Initialize data on component mount
    initializeSalesData()
      .then((result) => {
        if (result.message === "Sales data initialized successfully") {
          toast.success("Sales data loaded successfully!");
        }
      })
      .catch((error) => {
        console.error("Failed to initialize sales data:", error);
      });
  }, [initializeSalesData]);

  const handleApplyFilters = () => {
    setAppliedFilters({
      year: selectedYear || undefined,
      minRevenue,
    });
    toast.success("Filters applied successfully!");
  };

  const handleResetFilters = () => {
    setSelectedYear(null);
    setMinRevenue(0);
    setAppliedFilters({
      year: undefined,
      minRevenue: 0,
    });
    toast.success("Filters reset!");
  };

  if (salesData === undefined || yearlySummary === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Analyze sales performance across 2022-2024 with interactive charts and filters
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <FilterControls
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
                minRevenue={minRevenue}
                onMinRevenueChange={setMinRevenue}
                onApplyFilter={handleApplyFilters}
              />
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleResetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-900">Chart Type</h3>
              <ChartTypeSelector
                selectedType={chartType}
                onTypeChange={setChartType}
              />
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-8">
          <SalesMetrics data={salesData || []} />
        </div>

        {/* Charts */}
        <div className="space-y-8">
          <SalesChart
            data={salesData || []}
            chartType={chartType}
            title={`Sales Performance ${appliedFilters.year ? `- ${appliedFilters.year}` : '(All Years)'}`}
          />

          {yearlySummary && yearlySummary.length > 0 && (
            <SalesChart
              data={yearlySummary.map(item => ({
                _id: `yearly-${item.year}`,
                year: item.year,
                month: 'Summary',
                revenue: item.totalRevenue,
                units: item.totalUnits,
                product: 'All Products',
                region: 'All Regions',
              }))}
              chartType="bar"
              title="Yearly Revenue Summary"
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            * This dashboard uses mock sales data for demonstration purposes. 
            Data represents realistic e-commerce sales patterns but is not from actual business operations.
          </p>
        </div>
      </div>
    </div>
  );
};
