// Jednostavna prijava za /admin: lozinka (secret ADMIN_PASSWORD) + potpisani kolačić.
import type { Env } from './lib';

const COOKIE = 'lk_admin';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 dana

const enc = new TextEncoder();

async function hmac(secret: string, data: string) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/[+/=]/g, (c) => ({ '+': '-', '/': '_', '=': '' })[c]!);
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

const secretOf = (env: Env) => env.SESSION_SECRET || env.ADMIN_PASSWORD || '';

export async function isAuthed(req: Request, env: Env) {
  if (!env.ADMIN_PASSWORD) return false;
  const cookie = req.headers.get('cookie') || '';
  const m = cookie.match(new RegExp(`${COOKIE}=([^;]+)`));
  if (!m) return false;
  const [exp, sig] = decodeURIComponent(m[1]).split('.');
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, await hmac(secretOf(env), exp));
}

export async function checkPassword(env: Env, password: string) {
  if (!env.ADMIN_PASSWORD) return false;
  // poredi HMAC vrednosti da dužina lozinke ne curi kroz vreme odgovora
  const k = secretOf(env);
  return safeEqual(await hmac(k, password), await hmac(k, env.ADMIN_PASSWORD));
}

export async function sessionCookie(env: Env) {
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE);
  const value = `${exp}.${await hmac(secretOf(env), exp)}`;
  return `${COOKIE}=${encodeURIComponent(value)}; Path=/admin; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}`;
}

export const clearCookie = `${COOKIE}=; Path=/admin; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;

/** POST zahtevi moraju doći sa istog sajta (zaštita od CSRF uz SameSite kolačić). */
export function sameOrigin(req: Request) {
  const origin = req.headers.get('origin');
  if (!origin) return true; // stariji pregledači; SameSite=Lax i dalje štiti
  return new URL(origin).host === new URL(req.url).host;
}
