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
 } catch (error: unknown) {
    console.error('Error adding subscriber:', error);
    
    const errorMessage = error instanceof Error ? error.message : '';
    const errorCode = (error as { code?: string })?.code;
    
    // Log the actual error for debugging
    console.log('Error code:', errorCode);
    console.log('Error message:', errorMessage);
    
    if (errorCode === 'permission-denied') {
      return {
        success: false,
        error: 'Permission denied. Firestore rules are blocking writes.',
      };
    }
    
    if (errorMessage.includes('Cloud Firestore API has not been used')) {
      return {
        success: false,
        error: 'Service is currently unavailable. Please try again later.',
      };
    }
    
    return {
      success: false,
      error: 'Failed to subscribe. Please try again.',
    };
  }}