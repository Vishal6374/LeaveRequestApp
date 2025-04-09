import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const LeaveRequestScreen = ({ navigation }) => {
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    if (!leaveType || !reason || !date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await addDoc(collection(db, 'leaveRequests'), {
        userId: auth.currentUser.uid,
        leaveType,
        reason,
        date,
        status: 'Pending',
        createdAt: Timestamp.now(),
      });
      Alert.alert('Success', 'Leave request submitted');
      setLeaveType('');
      setReason('');
      setDate('');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave Request</Text>

      <TextInput
        placeholder="Leave Type (e.g. Sick)"
        style={styles.input}
        value={leaveType}
        onChangeText={setLeaveType}
      />
      <TextInput
        placeholder="Reason"
        style={styles.input}
        value={reason}
        onChangeText={setReason}
      />
      <TextInput
        placeholder="Date (e.g. 2025-04-10)"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <Button title="Submit Request" onPress={handleSubmit} />
    </View>
  );
};

export default LeaveRequestScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8
  }
});
