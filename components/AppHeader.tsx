import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AppHeader({ title, showBack = true }) {
  const router = useRouter();

  return (
    <View
      style={{
        paddingVertical: 14,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        elevation: 3,
        shadowColor: "#0003",
      }}
    >
      {showBack && (
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      )}

      <Text style={{ fontSize: 20, fontWeight: "600", color: "#2E2E2E" }}>
        {title}
      </Text>
    </View>
  );
}
