import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "../../lib/supabase";
import AppHeader from "../../components/AppHeader";
<AppHeader title="My Profile" showBack={false} />

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // Email + Password Sign In / Sign Up
 // EMAIL LOGIN OR SIGNUP
const handleSubmit = async () => {
  if (!email || !password) {
    Alert.alert("Missing Fields", "Email & password are required.");
    return;
  }

  if (isSignup && (!fullName || !phone)) {
    Alert.alert("Missing Info", "Full name & phone number required.");
    return;
  }

  try {
    if (isSignup) {
      // 1. Create Supabase Auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const userId = data.user?.id;
      const userEmail = data.user?.email;

      if (!userId) {
        Alert.alert("Signup Error", "User not created.");
        return;
      }

      // 2. Insert into users table
      const { error: insertError } = await supabase.from("profiles").insert({
        id: userId,
        name: fullName,
        mobile: phone,
        email: userEmail,
      });

      if (insertError) {
        console.log("Insert error:", insertError);
        Alert.alert("Error", insertError.message);
        return;
      }

    } else {
      // LOGIN
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    }

    // 3. Redirect after successful auth
    router.replace("/(tabs)/profile");

  } catch (e: any) {
    Alert.alert("Auth Error", e.message);
  }
};



  // Google Login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "greengift://auth/callback",
      },
    });

    if (error) Alert.alert("Google Login Error", error.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSignup ? "Create Your GreenGift Account" : "Welcome Back 🌿"}
      </Text>

      {isSignup && (
        <>
          <TextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
          />
        </>
      )}

      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isSignup ? "Sign Up" : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <Text style={styles.switchText}>
          {isSignup ? "Already have an account? Login" : "New user? Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 30, textAlign: "center", color: "#4CAF50" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15 },
  button: { backgroundColor: "#4CAF50", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  switchText: { color: "#4CAF50", textAlign: "center", marginTop: 15, fontSize: 16 },
  googleButton: { marginTop: 20, padding: 14, borderRadius: 8, borderWidth: 1, borderColor: "#ccc" },
  googleText: { textAlign: "center", fontSize: 16 },
});
