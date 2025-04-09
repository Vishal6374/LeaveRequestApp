import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // adjust path if needed

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login'); // 👈 send user back to Login
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen!</Text>
      <TouchableOpacity
            style={{ marginTop: 20, backgroundColor: '#4CAF50', padding: 10, borderRadius: 10 }}
            onPress={() => navigation.navigate('LeaveRequest')}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Request Leave</Text>
          </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
