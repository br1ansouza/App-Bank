import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ImageBackground,
} from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../themes/color';

const background = require('../../assets/login/background.png');
const logo = require('../../assets/login/logo.png');

export default function Home() {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />

          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9063/9063313.png' }}
            style={styles.cardImage}
            resizeMode="contain"
          />

          <Text style={styles.subtitle}>A financial world without complexity!</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Get Started</Text>
              <Image
                source={require('../../assets/home/creditcard.gif')}
                style={styles.gif}
              />
            </View>
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
    width: 280,
    height: 80,
    marginBottom: 30,
  },
  cardImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
    shadowColor: COLORS.primary,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.subtledark,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 120,
    borderRadius: 10,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: 28,
    height: 28,
    marginLeft: 8,
  },
});
