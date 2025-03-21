import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// =================== Users ===================
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  gems: integer("gems").notNull().default(0),
  appearance: text("appearance"),  // JSON string for appearance settings
  inventory: text("inventory"),    // JSON string for inventory items
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// =================== Worlds ===================
export const worlds = pgTable("worlds", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  owner: text("owner"),
  width: integer("width").notNull().default(100),
  height: integer("height").notNull().default(60),
  blockSize: integer("block_size").notNull().default(32),
  gravity: integer("gravity").notNull().default(600),
  backgroundColor: text("background_color").notNull().default('#87CEEB'),
  locked: boolean("locked").notNull().default(false),
  lockId: text("lock_id"),
  playerCount: integer("player_count").notNull().default(0),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertWorldSchema = createInsertSchema(worlds).pick({
  name: true,
  owner: true,
});

// =================== Blocks ===================
export const blocks = pgTable("blocks", {
  id: serial("id").primaryKey(),
  worldId: integer("world_id").notNull(),
  gridX: integer("grid_x").notNull(),
  gridY: integer("grid_y").notNull(),
  type: integer("type").notNull(),
  durability: integer("durability"),
  lockId: text("lock_id"),
  ownerId: text("owner_id"),
  doorTarget: text("door_target"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// =================== Trees ===================
export const trees = pgTable("trees", {
  id: serial("id").primaryKey(),
  worldId: integer("world_id").notNull(),
  gridX: integer("grid_x").notNull(),
  gridY: integer("grid_y").notNull(),
  seedId: text("seed_id").notNull(),
  growthProgress: integer("growth_progress").notNull().default(0),
  growthStage: integer("growth_stage").notNull().default(0),
  harvestable: boolean("harvestable").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// =================== Player Sessions ===================
export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  sid: text("sid").notNull().unique(),
  data: text("data").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

// =================== Types ===================
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type World = typeof worlds.$inferSelect;
export type InsertWorld = z.infer<typeof insertWorldSchema>;

export type Block = typeof blocks.$inferSelect;
export type Tree = typeof trees.$inferSelect;
