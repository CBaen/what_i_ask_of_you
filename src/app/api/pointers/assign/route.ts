import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/db/client";
import { pointerAssignees } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const assignPointerSchema = z.object({
    pointerId: z.string(),
    assignments: z.array(
        z.object({
            contactId: z.string(),
            fallbackContactId: z.string().optional(),
            fallbackDate: z.string().optional(), // ISO Date string
        })
    ),
});

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { pointerId, assignments } = assignPointerSchema.parse(body);

        const { env } = getRequestContext();
        const db = getDb(env.DB);

        // Clear existing assignments for this pointer?
        // Or just add/update? For now, let's assume we replace assignments for simplicity in this call
        // A more robust API would handle add/remove separately
        await db.delete(pointerAssignees).where(eq(pointerAssignees.pointerId, pointerId));

        for (const assignment of assignments) {
            await db.insert(pointerAssignees).values({
                pointerId,
                contactId: assignment.contactId,
                fallbackContactId: assignment.fallbackContactId,
                fallbackDate: assignment.fallbackDate ? new Date(assignment.fallbackDate) : null,
                status: "PENDING",
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to assign pointer:", error);
        return NextResponse.json({ error: "Failed to assign pointer" }, { status: 500 });
    }
}
