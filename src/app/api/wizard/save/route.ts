import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/db/client";
import { contacts, contactMethods, triggers, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validation Schema
const saveProtocolSchema = z.object({
    userId: z.string(),
    triggerConfig: z.object({
        type: z.enum(["INACTIVITY", "DATE"]),
        config: z.any(), // JSON
    }),
    contacts: z.array(
        z.object({
            name: z.string(),
            role: z.string().optional(),
            proxyName: z.string().optional(),
            proxyContactMethod: z.any().optional(), // JSON
            proxyDelayMinutes: z.number().default(240),
            methods: z.array(
                z.object({
                    type: z.enum(["EMAIL", "SMS"]),
                    value: z.string(),
                    label: z.string().optional(),
                    isPrimary: z.boolean().default(false),
                })
            ),
        })
    ),
});

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, triggerConfig, contacts: contactList } = saveProtocolSchema.parse(body);

        // Get DB instance from Cloudflare context
        const { env } = getRequestContext();
        const db = getDb(env.DB);

        // 1. Save/Update Trigger
        // Check if trigger exists
        const existingTrigger = await db.query.triggers.findFirst({
            where: eq(triggers.userId, userId),
        });

        let triggerId = existingTrigger?.id;

        if (existingTrigger) {
            await db
                .update(triggers)
                .set({
                    type: triggerConfig.type,
                    config: triggerConfig.config,
                    status: "ARMED",
                    lastCheckIn: new Date(),
                })
                .where(eq(triggers.id, triggerId!));
        } else {
            const result = await db
                .insert(triggers)
                .values({
                    userId,
                    type: triggerConfig.type,
                    config: triggerConfig.config,
                    status: "ARMED",
                    lastCheckIn: new Date(),
                })
                .returning({ id: triggers.id });
            triggerId = result[0].id;
        }

        // 2. Save Contacts & Methods
        // For simplicity in Phase 1, we'll wipe and recreate contacts for the user
        // In a real app, we might want to diff/update
        // First, delete existing contacts (cascade will delete methods)
        await db.delete(contacts).where(eq(contacts.userId, userId));

        for (const contact of contactList) {
            const [newContact] = await db
                .insert(contacts)
                .values({
                    userId,
                    name: contact.name,
                    role: contact.role,
                    proxyName: contact.proxyName,
                    proxyContactMethod: contact.proxyContactMethod,
                    proxyDelayMinutes: contact.proxyDelayMinutes,
                })
                .returning({ id: contacts.id });

            // Insert Methods
            if (contact.methods && contact.methods.length > 0) {
                await db.insert(contactMethods).values(
                    contact.methods.map((m: any) => ({
                        contactId: newContact.id,
                        type: m.type,
                        value: m.value,
                        label: m.label,
                        isPrimary: m.isPrimary,
                    }))
                );
            }
        }

        return NextResponse.json({ success: true, triggerId });
    } catch (error) {
        console.error("Failed to save protocol:", error);
        return NextResponse.json({ error: "Failed to save protocol" }, { status: 500 });
    }
}
