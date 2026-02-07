// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  let sessionId = request.cookies.get('cart_session')?.value;
  if (!sessionId) {

    sessionId = uuidv4();
    response.cookies.set('cart_session', sessionId, {
      // httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
  }

  return response;
}