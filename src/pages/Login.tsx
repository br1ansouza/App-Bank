import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ImageBackground,
  ToastAndroid,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import COLORS from '../themes/color';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';


const agGif = require('../../assets/login/ag3.gif');
const ccGif = require('../../assets/login/cc3.gif');
const keyGif = require('../../assets/login/key3.gif');
const logo = require('../../assets/login/novalogo.png');
const background = require('../../assets/login/background.png');

export default function Login() {
  const [agency, setAgency] = useState('');
  const [account, setAccount] = useState('');
  const [focusedInput, setFocusedInput] = useState<'agency' | 'account' | 'password' | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', {
        agency,
        account,
        password,
      });
  
      await AsyncStorage.setItem('token', response.data.token);
  
      navigation.navigate('Profile');
    } catch (error: any) {
      console.error(error);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Login failed. Check your credentials.', ToastAndroid.SHORT);
      }
    }
  };

  const [password, setPassword] = useState('');

  const maskAccount = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '').slice(0, 8);
    if (cleaned.length <= 4) return cleaned;
    const start = cleaned.slice(0, 2);
    const end = cleaned.slice(-2);
    const masked = '*'.repeat(cleaned.length - 4);
    return `${start}${masked}${end}`;
  };

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <Animated.View style={{ ...styles.animatedContainer, opacity: fadeAnim }}>
          <Image source={logo} style={styles.logo} contentFit="contain" />

          <View style={styles.inputRow}>
            <Image source={agGif} style={styles.gif} />
            <TextInput
              style={[
                styles.input,
                focusedInput === 'agency' && { borderColor: COLORS.primary },
              ]}
              placeholder="Agency"
              placeholderTextColor={COLORS.primary}
              keyboardType="numeric"
              value={agency}
              onFocus={() => setFocusedInput('agency')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={setAgency}
            />
          </View>

          <View style={styles.inputRow}>
            <Image source={ccGif} style={styles.gif} />
            <TextInput
              style={[
                styles.input,
                focusedInput === 'account' && { borderColor: COLORS.primary },
              ]}
              placeholder="Current Account"
              placeholderTextColor={COLORS.primary}
              keyboardType="numeric"
              value={account.length < 8 ? account : maskAccount(account)}
              maxLength={8}
              onFocus={() => setFocusedInput('account')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={(text) => {
                const numeric = text.replace(/[^0-9]/g, '');
                if (numeric.length <= 8) {
                  setAccount(numeric);
                }
              }}
            />
          </View>

          <View style={styles.inputRow}>
          <Image source={keyGif} style={styles.gif} />
            <TextInput
              style={[
                styles.input,
                focusedInput === 'password' && { borderColor: COLORS.primary },
              ]}
              placeholder="Password"
              placeholderTextColor={COLORS.primary}
              secureTextEntry
              value={password}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={setPassword}
            />
          </View>


          <TouchableOpacity
            onPress={() =>
              Platform.OS === 'android' &&
              ToastAndroid.show('Visit a bank branch to recover your password.', ToastAndroid.LONG)
            }
          >
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccount}
            onPress={() => navigation.navigate('CreateAccount')}
          >
            <Text style={styles.createAccountText}>Create new account</Text>
          </TouchableOpacity>

        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  animatedContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 320,
    height: 150,
    marginBottom: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.light,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: COLORS.subtle,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.light,
    elevation: 2,
  },
  gif: {
    width: 40,
    height: 40,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 8,
    marginTop: 30,
    elevation: 10,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  buttonText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: COLORS.light,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  createAccount: {
    marginTop: 15,
  },
  createAccountText: {
    color: COLORS.subtledark,
    fontSize: 14,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: -8,
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
