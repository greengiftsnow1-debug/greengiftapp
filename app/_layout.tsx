// app/_layout.tsx
import { Slot } from 'expo-router';
import React from 'react';
import { AuthProvider } from '../contexts/authContext';
import { CartProvider } from '../contexts/cartContext';

export default function AppLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Slot />
      </CartProvider>
    </AuthProvider>
  );
}
