import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
    id: text("id").primaryKey(), // Supabase Auth ID
    email: text("email").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
    isPremium: integer("is_premium", { mode: "boolean" }).default(false),
    killSwitchToken: text("kill_switch_token").unique(), // Unencrypted, for emergency stop
});

export const contacts = sqliteTable("contacts", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    role: text("role"), // e.g., "The Executor"
    proxyName: text("proxy_name"),
    proxyContactMethod: text("proxy_contact_method", { mode: "json" }), // { type: 'EMAIL', value: '...' }
    proxyDelayMinutes: integer("proxy_delay_minutes").default(240), // Default 4 hours
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const contactMethods = sqliteTable("contact_methods", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    contactId: text("contact_id").notNull().references(() => contacts.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // 'EMAIL' | 'SMS'
    value: text("value").notNull(), // email address or phone number
    label: text("label"), // e.g., "Work Phone"
    isPrimary: integer("is_primary", { mode: "boolean" }).default(false),
});

export const triggers = sqliteTable("triggers", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // 'INACTIVITY' | 'DATE'
    config: text("config", { mode: "json" }).notNull(), // { days: 30 } or { date: '2025-12-31' }
    status: text("status").default("ARMED"), // 'ARMED' | 'TRIGGERED' | 'DISARMED'
    lastCheckIn: integer("last_check_in", { mode: "timestamp" }),
});

export const contactStatus = sqliteTable("contact_status", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    contactId: text("contact_id").notNull().references(() => contacts.id, { onDelete: "cascade" }),
    triggerId: text("trigger_id").notNull().references(() => triggers.id, { onDelete: "cascade" }),
    status: text("status").default("PENDING"), // 'PENDING' | 'SENT' | 'ACKNOWLEDGED' | 'FAILED' | 'ESCALATED'
    lastAttempt: integer("last_attempt", { mode: "timestamp" }),
});

export const pointers = sqliteTable("pointers", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    encryptedData: text("encrypted_data").notNull(), // The actual secret/link (AES-GCM)
    iv: text("iv").notNull(), // Initialization Vector for the encryption
    category: text("category").notNull(), // 'FINANCIAL', 'DIGITAL', 'LEGAL', etc.
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const pointerAssignees = sqliteTable("pointer_assignees", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    pointerId: text("pointer_id").notNull().references(() => pointers.id, { onDelete: "cascade" }),
    contactId: text("contact_id").notNull().references(() => contacts.id, { onDelete: "cascade" }),
    status: text("status").default("PENDING"), // 'PENDING' | 'COMPLETED'
    fallbackContactId: text("fallback_contact_id").references(() => contacts.id),
    fallbackDate: integer("fallback_date", { mode: "timestamp" }),
});
