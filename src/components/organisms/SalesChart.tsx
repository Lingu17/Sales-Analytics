import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '../atoms/Card';
import { ChartType } from '../molecules/ChartTypeSelector';

interface SalesData {
  _id: string;
  year: number;
  month: string;
  revenue: number;
  units: number;
  product: string;
  region: string;
}

interface SalesChartProps {
  data: SalesData[];
  chartType: ChartType;
  title: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export const SalesChart: React.FC<SalesChartProps> = ({ data, chartType, title }) => {
  // Transform data for different chart types
  const transformedData = React.useMemo(() => {
    if (chartType === 'pie') {
      // Group by year for pie chart
      const yearlyData = data.reduce((acc, item) => {
        if (!acc[item.year]) {
          acc[item.year] = { year: item.year, revenue: 0 };
        }
        acc[item.year].revenue += item.revenue;
        return acc;
      }, {} as Record<number, { year: number; revenue: number }>);

      return Object.values(yearlyData).map(item => ({
        name: `${item.year}`,
        value: item.revenue,
      }));
    }

    // For bar and line charts, use monthly data
    return data.map(item => ({
      name: `${item.month.slice(0, 3)} ${item.year}`,
      revenue: item.revenue,
      units: item.units,
      year: item.year,
    }));
  }, [data, chartType]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={transformedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {transformedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card title={title}>
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available for the selected filters
        </div>
      ) : (
        renderChart()
      )}
    </Card>
  );
};
