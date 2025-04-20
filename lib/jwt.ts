import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms'; // ✅ Add this import

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'your-secret';

export function signJwt(
  payload: object,
  expiresIn: number | StringValue = '7d' // ✅ This is the key fix
): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}
