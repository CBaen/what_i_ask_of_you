import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/db/client";
import { pointers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const savePointerSchema = z.object({
    userId: z.string(),
    pointers: z.array(
        z.object({
            id: z.string().optional(), // If present, update
            title: z.string(),
            description: z.string().optional(),
            encryptedData: z.string(),
            iv: z.string(),
            category: z.string(),
        })
    ),
});

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, pointers: items } = savePointerSchema.parse(body);

        const { env } = getRequestContext();
        const db = getDb(env.DB);

        const results = [];

        for (const item of items) {
            if (item.id) {
                // Update existing
                await db
                    .update(pointers)
                    .set({
                        title: item.title,
                        description: item.description,
                        encryptedData: item.encryptedData,
                        iv: item.iv,
                        category: item.category,
                    })
                    .where(eq(pointers.id, item.id));
                results.push({ id: item.id, status: "updated" });
            } else {
                // Create new
                const [newItem] = await db
                    .insert(pointers)
                    .values({
                        userId,
                        title: item.title,
                        description: item.description,
                        encryptedData: item.encryptedData,
                        iv: item.iv,
                        category: item.category,
                    })
                    .returning({ id: pointers.id });
                results.push({ id: newItem.id, status: "created" });
            }
        }

        return NextResponse.json({ success: true, results });
    } catch (error) {
        console.error("Failed to save pointers:", error);
        return NextResponse.json({ error: "Failed to save pointers" }, { status: 500 });
    }
}
