import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import { useCart } from "../../contexts/cartContext";
import { getDistance } from "../../utils/distanceCalculator";
import AppHeader from "../../components/AppHeader";
<AppHeader title="My Profile" showBack={false} />

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price, 0);

  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const [storePin, setStorePin] = useState("462022");
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const DELIVERY_RATE = 8;

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      router.replace("/auth/login");
      return;
    }
    setUser(data.session.user);
  };

  // AUTO-CALCULATE DELIVERY CHARGE WHEN PIN ENTERED
  useEffect(() => {
    if (pincode.length === 6) {
      const distance = getDistance(storePin, pincode);
      if (distance) {
        setDeliveryCharge(Math.ceil(distance * DELIVERY_RATE));
      } else {
        setDeliveryCharge(0);
      }
    }
  }, [pincode, storePin]);

  const placeOrder = async () => {
    if (!name || !phone || !address || !pincode) {
      Alert.alert("Missing Info", "Please fill all fields.");
      return;
    }

    if (!deliveryCharge) {
      Alert.alert("Error", "Delivery not available at this PIN.");
      return;
    }

    const subtotal = calculateSubtotal();
    const total_amount = subtotal + deliveryCharge;

    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      customer_name: name,
      customer_email: user.email,
      customer_phone: phone,
      customer_address: address,
      customer_pincode: pincode,
      items: cart,
      delivery_charge: deliveryCharge,
      subtotal,
      total_amount,
      payment_method: "UPI",
      payment_status: "pending",
      status: "new",
    });

    if (error) {
      Alert.alert("Order Failed", error.message);
      return;
    }

    clearCart();
    router.replace("/(tabs)/profile");
    Alert.alert("Success", "Your order has been placed!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Checkout</Text>

      <Text style={styles.label}>Select Nursery</Text>

      <View style={styles.storeContainer}>
        <TouchableOpacity
          style={[styles.storeBtn, storePin === "462022" && styles.activeStore]}
          onPress={() => setStorePin("462022")}
        >
          <Text style={styles.storeBtnText}>Patel Nagar (462022)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.storeBtn, storePin === "462026" && styles.activeStore]}
          onPress={() => setStorePin("462026")}
        >
          <Text style={styles.storeBtnText}>C21 Mall (462026)</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Delivery Details</Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        keyboardType="numeric"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <TextInput
        placeholder="Complete Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Pincode"
        keyboardType="numeric"
        maxLength={6}
        value={pincode}
        onChangeText={setPincode}
        style={styles.input}
      />

      {/* BILL SECTION */}
      <View style={styles.billBox}>
        <Text style={styles.billText}>Subtotal: ₹{calculateSubtotal()}</Text>
        <Text style={styles.billText}>
          Delivery Charge: ₹{deliveryCharge || "-"}
        </Text>
        <Text style={styles.totalText}>
          Total: ₹{calculateSubtotal() + deliveryCharge}
        </Text>
      </View>

      <TouchableOpacity style={styles.orderBtn} onPress={placeOrder}>
        <Text style={styles.orderBtnText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 40, backgroundColor: "#fff" },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
  },
  label: { fontSize: 16, fontWeight: "600", marginTop: 15 },

  storeContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  storeBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    alignItems: "center",
  },
  activeStore: {
    backgroundColor: "#4CAF50",
  },
  storeBtnText: {
    fontWeight: "600",
    color: "#000",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },

  billBox: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
  },
  billText: { fontSize: 16 },
  totalText: { fontSize: 20, fontWeight: "900", marginTop: 10 },

  orderBtn: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 12,
    marginTop: 25,
  },
  orderBtnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
