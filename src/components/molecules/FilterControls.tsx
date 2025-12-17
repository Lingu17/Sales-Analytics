import React from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

interface FilterControlsProps {
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  minRevenue: number;
  onMinRevenueChange: (value: number) => void;
  onApplyFilter: () => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  selectedYear,
  onYearChange,
  minRevenue,
  onMinRevenueChange,
  onApplyFilter,
}) => {
  const years = [2022, 2023, 2024];

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Filter by Year
        </label>
        <div className="flex gap-2">
          <Button
            variant={selectedYear === null ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onYearChange(null)}
          >
            All Years
          </Button>
          {years.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onYearChange(year)}
            >
              {year}
            </Button>
          ))}
        </div>
      </div>

      <div className="min-w-[200px]">
        <Input
          label="Minimum Revenue ($)"
          type="number"
          value={minRevenue}
          onChange={(e) => onMinRevenueChange(Number(e.target.value))}
          placeholder="Enter minimum revenue"
        />
      </div>

      <Button onClick={onApplyFilter}>
        Apply Filters
      </Button>
    </div>
  );
};
