import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AppHeader from "../components/AppHeader";
<AppHeader title="My Profile" showBack={false} />
const payments = [
  { id: '1', amount: 370, method: 'UPI', date: '2025-07-14' },
  { id: '2', amount: 480, method: 'Razorpay', date: '2025-07-12' },
];

export default function PaymentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>💳 Payment History</Text>
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.amount}>₹{item.amount}</Text>
            <Text style={styles.detail}>Method: {item.method}</Text>
            <Text style={styles.detail}>Date: {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#4CAF50', marginBottom: 16 },
  card: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  amount: { fontSize: 18, fontWeight: 'bold' },
  detail: { fontSize: 14, color: '#555', marginTop: 4 },
});
