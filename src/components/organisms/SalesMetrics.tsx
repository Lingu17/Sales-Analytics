import React from 'react';
import { Card } from '../atoms/Card';

interface SalesData {
  _id: string;
  year: number;
  month: string;
  revenue: number;
  units: number;
  product: string;
  region: string;
}

interface SalesMetricsProps {
  data: SalesData[];
}

export const SalesMetrics: React.FC<SalesMetricsProps> = ({ data }) => {
  const metrics = React.useMemo(() => {
    if (data.length === 0) {
      return {
        totalRevenue: 0,
        totalUnits: 0,
        averageRevenue: 0,
        monthsCount: 0,
      };
    }

    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalUnits = data.reduce((sum, item) => sum + item.units, 0);
    const averageRevenue = totalRevenue / data.length;
    const monthsCount = data.length;

    return {
      totalRevenue,
      totalUnits,
      averageRevenue,
      monthsCount,
    };
  }, [data]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(metrics.totalRevenue)}
          </p>
        </div>
      </Card>

      <Card>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Total Units Sold</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatNumber(metrics.totalUnits)}
          </p>
        </div>
      </Card>

      <Card>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Average Monthly Revenue</p>
          <p className="text-2xl font-bold text-purple-600">
            {formatCurrency(metrics.averageRevenue)}
          </p>
        </div>
      </Card>

      <Card>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Data Points</p>
          <p className="text-2xl font-bold text-orange-600">
            {metrics.monthsCount} months
          </p>
        </div>
      </Card>
    </div>
  );
};
