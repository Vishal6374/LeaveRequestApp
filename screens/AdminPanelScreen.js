import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const AdminPanelScreen = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'leaveRequests'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'leaveRequests', id), { status });
      fetchRequests(); // Refresh list
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <FlatList
        data={requests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Name: {item.userEmail}</Text>
            <Text>Type: {item.leaveType}</Text>
            <Text>Reason: {item.reason}</Text>
            <Text>Status: {item.status}</Text>

            {item.status === 'Pending' && (
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: 'green' }]}
                  onPress={() => updateStatus(item.id, 'Approved')}
                >
                  <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: 'red' }]}
                  onPress={() => updateStatus(item.id, 'Rejected')}
                >
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default AdminPanelScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    padding: 15,
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    borderRadius: 10
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  button: {
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5
  },
  buttonText: { color: 'white', textAlign: 'center' }
});
