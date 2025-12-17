import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Mock sales data based on realistic e-commerce patterns
const mockSalesData = [
  // 2024 Data
  { year: 2024, month: "January", revenue: 125000, units: 850, product: "Electronics", region: "North America" },
  { year: 2024, month: "February", revenue: 132000, units: 920, product: "Electronics", region: "North America" },
  { year: 2024, month: "March", revenue: 145000, units: 1050, product: "Electronics", region: "North America" },
  { year: 2024, month: "April", revenue: 138000, units: 980, product: "Electronics", region: "North America" },
  { year: 2024, month: "May", revenue: 155000, units: 1120, product: "Electronics", region: "North America" },
  { year: 2024, month: "June", revenue: 162000, units: 1180, product: "Electronics", region: "North America" },
  { year: 2024, month: "July", revenue: 148000, units: 1020, product: "Electronics", region: "North America" },
  { year: 2024, month: "August", revenue: 171000, units: 1250, product: "Electronics", region: "North America" },
  { year: 2024, month: "September", revenue: 158000, units: 1100, product: "Electronics", region: "North America" },
  { year: 2024, month: "October", revenue: 185000, units: 1350, product: "Electronics", region: "North America" },
  { year: 2024, month: "November", revenue: 195000, units: 1420, product: "Electronics", region: "North America" },
  { year: 2024, month: "December", revenue: 210000, units: 1580, product: "Electronics", region: "North America" },

  // 2023 Data
  { year: 2023, month: "January", revenue: 98000, units: 720, product: "Electronics", region: "North America" },
  { year: 2023, month: "February", revenue: 105000, units: 780, product: "Electronics", region: "North America" },
  { year: 2023, month: "March", revenue: 112000, units: 820, product: "Electronics", region: "North America" },
  { year: 2023, month: "April", revenue: 108000, units: 790, product: "Electronics", region: "North America" },
  { year: 2023, month: "May", revenue: 118000, units: 860, product: "Electronics", region: "North America" },
  { year: 2023, month: "June", revenue: 125000, units: 920, product: "Electronics", region: "North America" },
  { year: 2023, month: "July", revenue: 115000, units: 840, product: "Electronics", region: "North America" },
  { year: 2023, month: "August", revenue: 135000, units: 980, product: "Electronics", region: "North America" },
  { year: 2023, month: "September", revenue: 128000, units: 920, product: "Electronics", region: "North America" },
  { year: 2023, month: "October", revenue: 142000, units: 1050, product: "Electronics", region: "North America" },
  { year: 2023, month: "November", revenue: 155000, units: 1150, product: "Electronics", region: "North America" },
  { year: 2023, month: "December", revenue: 168000, units: 1280, product: "Electronics", region: "North America" },

  // 2022 Data
  { year: 2022, month: "January", revenue: 85000, units: 620, product: "Electronics", region: "North America" },
  { year: 2022, month: "February", revenue: 88000, units: 650, product: "Electronics", region: "North America" },
  { year: 2022, month: "March", revenue: 92000, units: 680, product: "Electronics", region: "North America" },
  { year: 2022, month: "April", revenue: 89000, units: 660, product: "Electronics", region: "North America" },
  { year: 2022, month: "May", revenue: 95000, units: 710, product: "Electronics", region: "North America" },
  { year: 2022, month: "June", revenue: 98000, units: 730, product: "Electronics", region: "North America" },
  { year: 2022, month: "July", revenue: 91000, units: 680, product: "Electronics", region: "North America" },
  { year: 2022, month: "August", revenue: 102000, units: 760, product: "Electronics", region: "North America" },
  { year: 2022, month: "September", revenue: 96000, units: 720, product: "Electronics", region: "North America" },
  { year: 2022, month: "October", revenue: 108000, units: 810, product: "Electronics", region: "North America" },
  { year: 2022, month: "November", revenue: 115000, units: 860, product: "Electronics", region: "North America" },
  { year: 2022, month: "December", revenue: 125000, units: 950, product: "Electronics", region: "North America" },
];

export const initializeSalesData = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingData = await ctx.db.query("salesData").first();
    if (existingData) {
      return { message: "Data already initialized" };
    }

    // Insert mock data
    for (const data of mockSalesData) {
      await ctx.db.insert("salesData", data);
    }

    return { message: "Sales data initialized successfully" };
  },
});

export const getSalesData = query({
  args: {
    year: v.optional(v.number()),
    minRevenue: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let data;

    if (args.year !== undefined) {
      data = await ctx.db
        .query("salesData")
        .withIndex("by_year", (q) => q.eq("year", args.year!))
        .collect();
    } else {
      data = await ctx.db.query("salesData").collect();
    }

    // Apply revenue filter if provided
    if (args.minRevenue !== undefined) {
      return data.filter(item => item.revenue >= args.minRevenue!);
    }

    return data;
  },
});

export const getYearlySummary = query({
  args: {},
  handler: async (ctx) => {
    const allData = await ctx.db.query("salesData").collect();
    
    const yearlyData = allData.reduce((acc, item) => {
      if (!acc[item.year]) {
        acc[item.year] = { year: item.year, totalRevenue: 0, totalUnits: 0 };
      }
      acc[item.year].totalRevenue += item.revenue;
      acc[item.year].totalUnits += item.units;
      return acc;
    }, {} as Record<number, { year: number; totalRevenue: number; totalUnits: number }>);

    return Object.values(yearlyData).sort((a, b) => a.year - b.year);
  },
});
