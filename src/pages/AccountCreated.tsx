import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
  Platform,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useNavigation, useRoute } from '@react-navigation/native';
import COLORS from '../themes/color';

export default function AccountCreated() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { full_name, agency, account } = route.params as {
    full_name: string;
    agency: string;
    account: string;
  };

  const copyToClipboard = async (value: string, label: string) => {
    await Clipboard.setStringAsync(value);
    if (Platform.OS === 'android') {
      ToastAndroid.show(`${label} copied!`, ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Your account was successfully created.</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{full_name}</Text>

        <Text style={styles.label}>Agency</Text>
        <View style={styles.row}>
          <Text style={styles.value}>{agency}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(agency, 'Agency')}>
            <Text style={styles.copy}>Copy</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Account</Text>
        <View style={styles.row}>
          <Text style={styles.value}>{account}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(account, 'Account')}>
            <Text style={styles.copy}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.subtledark,
    marginBottom: 30,
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: COLORS.subtle,
    padding: 24,
    borderRadius: 10,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: COLORS.subtledark,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  copy: {
    marginLeft: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
