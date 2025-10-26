import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../../contexts/cartContext';

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {item.image ? (
                  <Image
                    source={
                      typeof item.image === 'string'
                        ? { uri: item.image }
                        : item.image
                    }
                    style={styles.image}
                  />
                ) : null}
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text>₹{item.price}</Text>
                  {item.message && (
                    <Text style={styles.message}>💌 {item.message}</Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={{ color: 'red' }}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.total}>Total: ₹{total}</Text>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              
               router.push('/(tabs)/checkout'); 
            }}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
            <Text style={styles.clearText}>Clear Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#4CAF50' },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  image: { width: 60, height: 60, borderRadius: 8 },
  name: { fontSize: 16, fontWeight: 'bold' },
  message: { fontSize: 14, color: '#555' },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },

  checkoutButton: {
    marginTop: 12,
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  clearButton: {
    marginTop: 12,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearText: { color: '#fff', fontWeight: 'bold' },
});
