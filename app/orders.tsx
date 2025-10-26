import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Dummy orders (replace with Firestore later)
const orders = [
  { id: '1', item: 'Jade Plant + Clay Pot', date: '2025-07-14', total: 370 },
  { id: '2', item: 'Snake Plant + Ceramic Pot', date: '2025-07-12', total: 480 },
];

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🧾 My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.item}>{item.item}</Text>
            <Text style={styles.date}>Date: {item.date}</Text>
            <Text style={styles.total}>Total: ₹{item.total}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#4CAF50' },
  card: {
    backgroundColor: '#F1F8E9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  item: { fontSize: 16, fontWeight: '600' },
  date: { color: '#666', marginTop: 4 },
  total: { color: '#000', marginTop: 6 },
});
