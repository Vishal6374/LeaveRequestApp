import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function LeaveRequestScreen({ navigation }) {
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (!userDoc.exists()) {
        Alert.alert('User data not found');
        return;
      }

      const userData = userDoc.data();

      await addDoc(collection(db, 'leaveRequests'), {
        userEmail: user.email,
        name: userData.name,
        department: userData.department,
        year: userData.year,
        leaveType,
        reason,
        status: 'Pending',
        createdAt: new Date(),
      });

      Alert.alert('Leave request submitted!');
      setLeaveType('');
      setReason('');
    } catch (error) {
      console.error('Leave request failed:', error);
      Alert.alert('Error submitting leave request.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Leave Type</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Sick Leave"
        value={leaveType}
        onChangeText={setLeaveType}
      />

      <Text style={styles.label}>Reason</Text>
      <TextInput
        style={styles.input}
        placeholder="Reason for leave"
        value={reason}
        onChangeText={setReason}
      />

      <Button title="Submit Request" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
