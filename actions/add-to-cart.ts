'use server'

import { cookies } from "next/headers";

export const handleAddToCart = async (formData: FormData) => {
  const productId = formData.get('productId') as string;
  const quantity = formData.get('quantity') as string;
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('cart_session')?.value
  const response = await fetch(`${process.env.BASE_URL}/api/cart`, {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
    headers: {
      'sessionId': sessionId ?? ''
    }
  });
  const data = await response.json();

  return data;
}