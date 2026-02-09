// app/lib/ratelimit.ts
import { db } from './firebase';
import { doc, getDoc, setDoc, runTransaction } from 'firebase/firestore';

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export async function checkRateLimit(key: string): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const now = Date.now();
  const rateLimitRef = doc(db, 'rate_limits', key);

  try {
    return await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(rateLimitRef);
      const current = docSnap.data() as RateLimitRecord | undefined;

      if (!current || now > current.resetTime) {
        const newRecord = {
          count: 1,
          resetTime: now + RATE_LIMIT_WINDOW,
        };
        transaction.set(rateLimitRef, newRecord);
        return { allowed: true, remaining: MAX_REQUESTS - 1, resetTime: newRecord.resetTime };
      }

      if (current.count >= MAX_REQUESTS) {
        return {
          allowed: false,
          remaining: 0,
          resetTime: current.resetTime,
        };
      }

      const updatedRecord = {
        count: current.count + 1,
        resetTime: current.resetTime,
      };
      transaction.set(rateLimitRef, updatedRecord);

      return {
        allowed: true,
        remaining: MAX_REQUESTS - updatedRecord.count,
        resetTime: updatedRecord.resetTime,
      };
    });
  } catch (error) {
    console.error('Rate limit check error:', error);
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetTime: now + RATE_LIMIT_WINDOW };
  }
}