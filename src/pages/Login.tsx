import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Animated,
} from 'react-native';
import COLORS from '../themes/color';
import { Image } from 'expo-image';

const agGif = require('../../assets/login/ag.gif');
const ccGif = require('../../assets/login/cc.gif');

export default function Login() {
    const [agencia, setAgencia] = useState('');
    const [conta, setConta] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={{ ...styles.animatedContainer, opacity: fadeAnim }}>
                <Text style={styles.title}>Acessar Conta</Text>

                <View style={styles.inputRow}>
                    <Image source={agGif} style={styles.gif} />
                    <TextInput
                        style={styles.input}
                        placeholder="Agência"
                        placeholderTextColor={COLORS.primary}
                        keyboardType="numeric"
                        value={agencia}
                        onChangeText={setAgencia}
                    />
                </View>

                <View style={styles.inputRow}>
                    <Image source={ccGif} style={styles.gif} />
                    <TextInput
                        style={styles.input}
                        placeholder="Conta Corrente"
                        placeholderTextColor={COLORS.primary}
                        keyboardType="numeric"
                        value={conta}
                        onChangeText={setConta}
                    />
                </View>


                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.link}>
                    <Text style={styles.linkText}>Criar conta</Text>
                </TouchableOpacity>
            </Animated.View>
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
    animatedContainer: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.light,
        marginBottom: 40,
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
    },
    gif: {
        width: 40,
        height: 40,
        marginLeft: 10,
        borderRadius: 6,
    },
    button: {
        backgroundColor: COLORS.accent,
        paddingVertical: 14,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginTop: 10,
        elevation: 3,
    },
    buttonText: {
        color: COLORS.primary,
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
});
