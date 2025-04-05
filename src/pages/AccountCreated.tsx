import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
  Platform,
  Animated,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../themes/color';

export default function AccountCreated() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { full_name, agency, account } = route.params as {
    full_name: string;
    agency: string;
    account: string;
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const copyToClipboard = async (value: string, label: string) => {
    await Clipboard.setStringAsync(value);
    if (Platform.OS === 'android') {
      ToastAndroid.show(`${label} copied!`, ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Your account was successfully created.</Text>

        <View style={styles.infoBox}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{full_name}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Agency</Text>
            <View style={styles.row}>
              <Text style={styles.value}>{agency}</Text>
              <TouchableOpacity onPress={() => copyToClipboard(agency, 'Agency')}>
                <Icon name="copy-outline" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Account</Text>
            <View style={styles.row}>
              <Text style={styles.value}>{account}</Text>
              <TouchableOpacity onPress={() => copyToClipboard(account, 'Account')}>
                <Icon name="copy-outline" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.notice}>
          Please make sure to store your account information securely and avoid sharing it with others.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: 'center',
  },
  animatedContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.subtledark,
    marginBottom: 24,
  },
  notice: {
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.subtledark,
    marginBottom: 32,
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: COLORS.light,
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: COLORS.subtledark,
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
