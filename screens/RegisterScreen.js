import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      navigation.navigate("Login");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Button title="Register" onPress={registerUser} />
      <Text onPress={() => navigation.navigate("Login")} style={styles.link}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginVertical: 5 },
  link: { marginTop: 10, color: "blue", textAlign: "center" },
});