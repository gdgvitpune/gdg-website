// app/lib/firestore.ts
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: Timestamp;
}

const newsletterCollection = collection(db, 'newsletter_subscribers');

export async function addSubscriber(email: string) {
  try {
    const emailQuery = query(newsletterCollection, where('email', '==', email.toLowerCase()));
    const existingSubscribers = await getDocs(emailQuery);

    if (!existingSubscribers.empty) {
      return {
        success: false,
        error: 'This email is already subscribed.',
      };
    }

    const docRef = await addDoc(newsletterCollection, {
      email: email.toLowerCase().trim(),
      subscribedAt: Timestamp.now(),
    });

    return {
      success: true,
      id: docRef.id,
      message: 'Successfully subscribed!',
    };
  } catch (error: any) {
    console.error('Error adding subscriber:', error);
    
    // Check for specific Firebase errors
    if (error?.code === 'permission-denied' || error?.message?.includes('PERMISSION_DENIED')) {
      return {
        success: false,
        error: 'Database is not properly configured. Please contact support.',
      };
    }
    
    if (error?.message?.includes('Cloud Firestore API has not been used')) {
      return {
        success: false,
        error: 'Service is currently unavailable. Please try again later.',
      };
    }
    
    return {
      success: false,
      error: 'Failed to subscribe. Please try again.',
    };
  }
}