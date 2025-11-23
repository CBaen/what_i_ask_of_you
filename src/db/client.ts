import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// Helper to get the DB instance
// In Next.js on Cloudflare Pages, bindings are available in the request context
export const getDb = (d1: D1Database) => {
    return drizzle(d1, { schema });
};
