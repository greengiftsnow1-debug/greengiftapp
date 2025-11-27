import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase";
import AppHeader from "../../components/AppHeader";
<AppHeader title="My Profile" showBack={false} />

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      // user not logged in → redirect to login screen
      router.replace("/auth/login");
      return;
    }

    const user = sessionData.session.user;

    // Fetch profile info from USERS table
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setProfile(data);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth/login");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileBox}>
        <Image
          source={require("../../assets/avtar.png")}
          style={styles.avatar}
        />

        <Text style={styles.name}>{profile?.name || "Green Gifter"}</Text>
        <Text style={styles.phone}>{profile?.phone || "Phone not added"}</Text>
        <Text style={styles.email}>{profile?.email}</Text>
      </View>

      <View style={styles.menuBox}>
        <Text style={styles.sectionTitle}>Your Activity</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/orders")}>
          <Text style={styles.menuText}>🛍️ My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/payments")}>
          <Text style={styles.menuText}>💳 Payment History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/terms")}>
          <Text style={styles.menuText}>📜 Terms & Conditions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  profileBox: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  phone: {
    fontSize: 16,
    color: "#666",
  },
  email: {
    fontSize: 15,
    color: "#777",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  menuBox: {
    width: "100%",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: "#F1F8E9",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
