import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../../contexts/cartContext';

export default function CheckoutScreen() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const handlePlaceOrder = () => {
    if (!name || !address || !phone) {
      Alert.alert('Error', 'Please fill all details before placing the order.');
      return;
    }

    // You can send this data to Firestore here if needed
    Alert.alert('Success', 'Order placed successfully!');
    clearCart();
    router.replace('/(tabs)/index'as any);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 Checkout</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Delivery Address</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Enter delivery address"
        multiline
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.total}>Total Payable: ₹{total}</Text>

      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#4CAF50' },
  label: { marginTop: 10, marginBottom: 4, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
