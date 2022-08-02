/* eslint-disable */
import axios from 'axios'
import Stripe from 'stripe'
import { showAlert } from './alerts'

const stripe = Stripe(
  'pk_test_51LQ52MJBAyP1kqM6YJjajwqXHiDHJSWAjxAgUU0c8WXpWnRXp6ELsUwhk1GIBUx6gzXLbHGFzuDE7xSSZCwYmkD200Yj2z7XPQ'
)

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from API
    const session = await axios({
      method: 'GET',
      url: `https://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    })
    
    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    })
  } catch (error) {
    console.log(error)
    showAlert('error', error)
  }
}
