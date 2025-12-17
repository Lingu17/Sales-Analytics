import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  salesData: defineTable({
    year: v.number(),
    month: v.string(),
    revenue: v.number(),
    units: v.number(),
    product: v.string(),
    region: v.string(),
  }).index("by_year", ["year"])
    .index("by_year_month", ["year", "month"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
