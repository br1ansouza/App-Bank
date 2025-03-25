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
} from 'react-native';
import COLORS from '../themes/color';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const background = require('../../assets/login/background.png');

export default function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [focusedInput, setFocusedInput] = useState<'email' | 'password' | 'confirm' | null>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<any>();


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
                <Animated.View style={{ ...styles.animatedContainer, opacity: fadeAnim }}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>
                        Create an account so you can explore all the existing features
                    </Text>

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
                            secureTextEntry
                            value={password}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                            onChangeText={setPassword}
                        />
                    </View>

                    <View style={styles.inputRow}>
                        <TextInput
                            style={[
                                styles.input,
                                focusedInput === 'confirm' && { borderColor: COLORS.primary },
                            ]}
                            placeholder="Confirm Password"
                            placeholderTextColor={COLORS.primary}
                            secureTextEntry
                            value={confirm}
                            onFocus={() => setFocusedInput('confirm')}
                            onBlur={() => setFocusedInput(null)}
                            onChangeText={setConfirm}
                        />
                    </View>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }}>
                        <Text style={{ color: COLORS.subtledark, fontSize: 14, fontWeight: 'bold' }}>
                            Already have an account?
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.socialTitle}>Or continue with</Text>

                    <View style={styles.socialIconsContainer}>
                        <TouchableOpacity>
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/299/299409.png' }}
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2175/2175193.png' }}
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/733/733609.png' }}
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>
                    </View>


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
        height: 80,
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: 1,
    },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
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
        color: COLORS.subtle,
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.subtledark,
        textAlign: 'center',
        marginBottom: 50,
    },
    loginRedirect: {
        marginTop: 20,
        marginBottom: 30,
      },
      
      loginRedirectText: {
        color: COLORS.subtle,
        fontSize: 14,
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
