import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../services/api';

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get('/profile').then((res) => setUser(res.data.user));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      {user && (
        <>
          <Text>Name: {user.email}</Text>
          <Text>Agency: {user.agency}</Text>
          <Text>Account: {user.account}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 16 },
});
