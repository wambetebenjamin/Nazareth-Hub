import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { kv } from "@vercel/kv";
import { DEMO_EMAIL, DEMO_PASSWORD } from "./site";

/**
 * Lightweight member store backing the credentials provider.
 * KV backed when configured, in-memory otherwise. Passwords are scrypt hashed;
 * nothing is ever stored in plain text.
 */

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  company?: string;
  hash: string;
  salt: string;
  createdAt: string;
};

const memory = new Map<string, StoredUser>();
const kvReady = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

const keyFor = (email: string) => `nazareth:user:${email.toLowerCase()}`;

function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString("hex");
}

export async function findUser(email: string): Promise<StoredUser | null> {
  const k = email.toLowerCase();
  if (kvReady) {
    try {
      const hit = await kv.get<StoredUser>(keyFor(k));
      if (hit) return hit;
    } catch {
      /* fall through to memory */
    }
  }
  return memory.get(k) ?? null;
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  company?: string;
}): Promise<StoredUser> {
  const salt = randomBytes(16).toString("hex");
  const user: StoredUser = {
    id: createHash("sha256").update(input.email.toLowerCase()).digest("hex").slice(0, 16),
    name: input.name,
    email: input.email.toLowerCase(),
    company: input.company,
    hash: hashPassword(input.password, salt),
    salt,
    createdAt: new Date().toISOString(),
  };
  memory.set(user.email, user);
  if (kvReady) {
    try {
      await kv.set(keyFor(user.email), user);
    } catch {
      /* memory copy is sufficient */
    }
  }
  return user;
}

export function verifyPassword(user: StoredUser, password: string): boolean {
  const candidate = Buffer.from(hashPassword(password, user.salt), "hex");
  const expected = Buffer.from(user.hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

/** Seeded so /community and /account are reachable in preview environments. */
export { DEMO_EMAIL, DEMO_PASSWORD };

let seeded = false;
export async function ensureSeed(): Promise<void> {
  if (seeded) return;
  seeded = true;
  const existing = await findUser(DEMO_EMAIL);
  if (!existing) {
    await createUser({
      name: "Amina Odhiambo",
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      company: "Safari Analytics",
    });
  }
}
