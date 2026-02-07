'use server'

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const updateCart = async (productId: string, quantity: number) => {

  const cookieStore = await cookies()
  const sessionId = cookieStore.get('cart_session')?.value
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/cart`, {
      method: 'PUT',
      headers: {
        'sessionId': sessionId ?? ''
      },
      body: JSON.stringify({ productId, quantity },)
    })
    console.log('update', response)
    if (response.status === 200) {
      console.log('updated')
      redirect('/cart')
    }
    return response.status
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    console.error('Error updating cart:', error)
    return 500
  }
}
// delete cart item
export const handleDeleteCart = async (productId: string) => {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('cart_session')?.value
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/cart`, {
      method: 'DELETE',
      headers: {
        'sessionId': sessionId ?? ''
      },
      body: JSON.stringify({ productId },)
    })

    if (response.status === 200) {
      redirect('/cart')
    }
    return response
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    console.error('Error deleting cart:', error)
  }
}
