import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/db/client";
import { triggers, contacts, contactStatus, contactMethods } from "@/db/schema";
import { eq, and, lt, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
    try {
        const { env } = getRequestContext();
        const db = getDb(env.DB);
        const now = new Date();

        // 1. Check for Triggers (Inactivity / Date)
        // Find ARMED triggers
        const armedTriggers = await db.query.triggers.findMany({
            where: eq(triggers.status, "ARMED"),
        });

        for (const trigger of armedTriggers) {
            let shouldTrigger = false;
            const config = trigger.config as any;

            if (trigger.type === "DATE") {
                if (new Date(config.date) <= now) {
                    shouldTrigger = true;
                }
            } else if (trigger.type === "INACTIVITY") {
                const lastCheckIn = trigger.lastCheckIn ? new Date(trigger.lastCheckIn) : new Date();
                const daysInactive = (now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24);
                if (daysInactive >= config.days) {
                    shouldTrigger = true;
                }
            }

            if (shouldTrigger) {
                // Update Trigger Status
                await db
                    .update(triggers)
                    .set({ status: "TRIGGERED" })
                    .where(eq(triggers.id, trigger.id));

                // Create ContactStatus entries for all contacts
                const userContacts = await db.query.contacts.findMany({
                    where: eq(contacts.userId, trigger.userId),
                });

                for (const contact of userContacts) {
                    await db.insert(contactStatus).values({
                        contactId: contact.id,
                        triggerId: trigger.id,
                        status: "PENDING",
                        lastAttempt: null,
                    });
                }
            }
        }

        // 2. Process Triggered Events (Notifications & Escalation)
        // Find TRIGGERED triggers
        const triggeredEvents = await db.query.triggers.findMany({
            where: eq(triggers.status, "TRIGGERED"),
        });

        for (const trigger of triggeredEvents) {
            // Find pending or sent statuses
            const statuses = await db.query.contactStatus.findMany({
                where: and(eq(contactStatus.triggerId, trigger.id)),
                with: {
                    contact: {
                        with: {
                            methods: true,
                        },
                    },
                },
            });

            for (const status of statuses) {
                const contact = status.contact;

                // Scenario A: Initial Send (PENDING)
                if (status.status === "PENDING") {
                    // Send to Primary Methods
                    // TODO: Integrate Email/SMS Provider here
                    console.log(`[SIMULATION] Sending Initial Message to ${contact.name}`);

                    await db
                        .update(contactStatus)
                        .set({ status: "SENT", lastAttempt: now })
                        .where(eq(contactStatus.id, status.id));
                }

                // Scenario B: Escalation (SENT -> ESCALATED)
                if (status.status === "SENT" && status.lastAttempt) {
                    const lastAttempt = new Date(status.lastAttempt);
                    const minutesSince = (now.getTime() - lastAttempt.getTime()) / (1000 * 60);
                    const delay = contact.proxyDelayMinutes || 240; // Default 4 hours

                    if (minutesSince >= delay) {
                        // Send to Proxy
                        // TODO: Integrate Email/SMS Provider here
                        console.log(`[SIMULATION] Escalating to Proxy ${contact.proxyName} for ${contact.name}`);

                        await db
                            .update(contactStatus)
                            .set({ status: "ESCALATED" })
                            .where(eq(contactStatus.id, status.id));
                    }
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Cron job failed:", error);
        return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
    }
}
