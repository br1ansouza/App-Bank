import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../themes/color';

export default function Home() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EasyPay</Text>

      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1808/1808899.png' }}
        style={styles.cardImage}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>Um mundo financeiro sem complexidades!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.light,
    marginBottom: 40,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  cardImage: {
    width: 300,
    height: 180,
    marginBottom: 40,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.accent,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.subtle,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
