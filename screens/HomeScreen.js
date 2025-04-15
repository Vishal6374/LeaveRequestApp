import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebase'; // Make sure path is correct
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name || "User");

          if (userData.role === 'admin') {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Logout Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userName}!</Text>

      {isAdmin && (
        <Button
          title="Go to Admin Panel"
          onPress={() => navigation.navigate("AdminPanel")}
        />
      )}

      <View style={styles.space} />

      <Button
        title="Request Leave"
        onPress={() => navigation.navigate("LeaveRequest")}
      />

      <View style={styles.space} />

      <Button
        title="Leave History"
        onPress={() => navigation.navigate("LeaveHistory")}
      />

      <View style={styles.space} />

      <Button
        title="Logout"
        onPress={handleLogout}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  space: {
    height: 20,
  },
});

export default HomeScreen;
