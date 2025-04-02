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
import COLORS from '../themes/color';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../services/api';

const background = require('../../assets/login/background.png');

export default function CreateAccount() {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [focusedInput, setFocusedInput] = useState<'full_name' | 'email' | 'password' | 'confirm' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<any>();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignUp = async () => {
    if (!full_name || !email || !password || !confirm) {
      ToastAndroid.show('Please fill in all fields.', ToastAndroid.LONG);
      return;
    }
    if (password !== confirm) {
      ToastAndroid.show('Passwords do not match.', ToastAndroid.LONG);
      return;
    }

    try {
      const response = await api.post('/users', {
        full_name,
        email,
        password,
      });

      const { agency, account } = response.data;

      navigation.navigate('AccountCreated', {
        full_name,
        agency,
        account,
      });
    } catch (error) {
      console.error(error);
      ToastAndroid.show('Error creating account.', ToastAndroid.LONG);
    }
  };

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <Animated.View style={{ ...styles.animatedContainer, opacity: fadeAnim }}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Create an account so you can explore all the existing features
          </Text>

          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'full_name' && { borderColor: COLORS.primary },
              ]}
              placeholder="Full Name"
              placeholderTextColor={COLORS.primary}
              keyboardType="default"
              autoCapitalize="words"
              value={full_name}
              onFocus={() => setFocusedInput('full_name')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'email' && { borderColor: COLORS.primary },
              ]}
              placeholder="Email"
              placeholderTextColor={COLORS.primary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'password' && { borderColor: COLORS.primary },
              ]}
              placeholder="Password"
              placeholderTextColor={COLORS.primary}
              secureTextEntry={!showPassword}
              value={password}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'confirm' && { borderColor: COLORS.primary },
              ]}
              placeholder="Confirm Password"
              placeholderTextColor={COLORS.primary}
              secureTextEntry={!showConfirmPassword}
              value={confirm}
              onFocus={() => setFocusedInput('confirm')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={setConfirm}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }}>
            <Text style={{ color: COLORS.subtledark, fontSize: 14, fontWeight: 'bold' }}>
              Already have an account?
            </Text>
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
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.subtledark,
        textAlign: 'center',
        marginBottom: 50,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        width: '100%',
        paddingHorizontal: 10,
        gap: 8,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.subtle,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: COLORS.primary,
        borderWidth: 1,
        borderColor: COLORS.light,
        elevation: 2,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 19,
        paddingHorizontal: 170,
        borderRadius: 8,
        marginTop: 30,
        elevation: 20,
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    buttonText: {
        color: COLORS.light,
        fontSize: 16,
        fontWeight: 'bold',
    },
    socialTitle: {
        fontSize: 14,
        color: COLORS.subtledark,
        marginBottom: 10,
        marginTop: 80,
    },
    socialIconsContainer: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    socialIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
});