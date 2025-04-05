import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../themes/color';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../routes/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api from '../services/api';
import RecentTransactions from '../components/RecentTransactions';
import SpendingCategory from '../components/SpendingCategory';
import BalanceOverview from '../components/BalanceOverview';
import VirtualCard from '../components/VirtualCard';

export default function Interface() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showBalance, setShowBalance] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    const toggleBalance = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 10,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setShowBalance(!showBalance);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        });
    };

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) throw new Error('Token not found');
                const res = await api.get('/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data.user);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.background, { backgroundColor: COLORS.background }]}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.topSection}>
                    <View style={styles.balanceContainer}>
                        <Animated.Text style={[styles.balanceValue, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}>
                            {showBalance ? `$4200.00` : '******'}
                        </Animated.Text>
                        <TouchableOpacity onPress={toggleBalance}>
                            <Icon name={showBalance ? 'eye-off' : 'eye'} size={20} color={COLORS.primary} style={styles.eyeIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rightSection}>
                    <Text style={styles.title}>Hello, {user?.name}!</Text>
                    <Text style={styles.subtitle}>{user?.email}</Text>
                        <Text style={styles.subtitle}>(512) 555-1234</Text>
                    </View>
                </View>

                <RecentTransactions />

                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>View Offers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Budgeting Tools</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Financial Insights</Text>
                    </TouchableOpacity>
                </View>

                <VirtualCard name={user?.name || '...' } />
                <SpendingCategory />
                <BalanceOverview />
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => {
                        AsyncStorage.removeItem('token');
                        navigation.navigate('home');
                    }}
                >
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        paddingHorizontal: 12,
        paddingTop: 30,
        paddingBottom: 60,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.subtle,
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        marginTop: 20,
        width: '100%',
    },
    balanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.subtledark,
        borderRadius: 15,
        paddingHorizontal: 22,
        height: 40,
    },
    balanceValue: {
        fontSize: 18,
        color: COLORS.light,
        fontWeight: 'bold',
        marginRight: 5,
    },
    eyeIcon: {
        marginLeft: 5,
    },
    rightSection: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.subtledark,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 30,
    },
    actionButton: {
        flex: 1,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        paddingVertical: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    actionButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    logoutButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginTop: 120,
        alignSelf: 'center',
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
