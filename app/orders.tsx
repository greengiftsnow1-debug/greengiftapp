import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";
import { useRouter } from "expo-router";
import AppHeader from "../components/AppHeader";
<AppHeader title="My Profile" showBack={false} />
export default function OrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // Get logged-in user session
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      router.replace("/auth/login");
      return;
    }

    const userId = sessionData.session.user.id;

    // Fetch orders for the user
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading Orders...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>🧾 My Orders</Text>
        <Text style={{ marginTop: 20, color: "#666" }}>
          You have no orders yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🧾 My Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Order Items */}
            <Text style={styles.item}>
              Items: {item.items.length} product(s)
            </Text>

            {/* Date */}
            <Text style={styles.date}>
              Date: {new Date(item.created_at).toLocaleDateString()}
            </Text>

            {/* Address */}
            <Text style={styles.address}>
              📍 {item.customer_address}, {item.customer_pincode}
            </Text>

            {/* Payment + Total */}
            <Text style={styles.total}>Total: ₹{item.total_amount}</Text>
            <Text style={styles.status}>
              Status: {item.status.toUpperCase()}
            </Text>
            <Text style={styles.payment}>
              Payment: {item.payment_status.toUpperCase()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#4CAF50",
  },
  card: {
    backgroundColor: "#F1F8E9",
    padding: 1,
    borderRadius: 10,
    marginBottom: 12,
  },
  item: { fontSize: 16, fontWeight: "600" },
  date: { color: "#666", marginTop: 4 },
  address: { marginTop: 6, color: "#333" },
  total: { marginTop: 6, fontWeight: "bold", fontSize: 16 },
  status: { marginTop: 4, color: "#4CAF50", fontWeight: "bold" },
  payment: { marginTop: 2, color: "#000", fontWeight: "600" },
});
