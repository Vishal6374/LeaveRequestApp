import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const LeaveHistoryScreen = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const q = query(
          collection(db, 'leaveRequests'),
          where('userId', '==', auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const requests = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLeaveRequests(requests);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Leave History</Text>
      <FlatList
        data={leaveRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>Type: {item.leaveType}</Text>
            <Text style={styles.text}>Reason: {item.reason}</Text>
            <Text style={styles.text}>Date: {item.date}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default LeaveHistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    marginBottom: 15,
    borderRadius: 10
  },
  text: { fontSize: 16 }
});
