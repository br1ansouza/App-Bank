import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import COLORS from '../themes/color';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../routes/types';

const recentTransactions = [
    { id: '1', description: 'Grocery Purchase', amount: -50.00, date: '2023-10-01' },
    { id: '2', description: 'Salary', amount: 1500.00, date: '2023-09-30' },
    { id: '3', description: 'Utility Bill Payment', amount: -100.00, date: '2023-09-29' },
];

export default function Profile() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showBalance, setShowBalance] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) throw new Error('Token not found');

                const res = await api.get('/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
        <ImageBackground
            source={require('../../assets/login/background.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceValue}>
                            {showBalance ? `$4200.00` : '******'}
                        </Text>
                        <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                            <Icon
                                name={showBalance ? 'eye-off' : 'eye'}
                                size={20}
                                color={COLORS.primary}
                                style={styles.eyeIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rightSection}>
                        <Text style={styles.title}>Hello, {user?.fullname}!</Text>
                        <Text style={styles.subtitle}>{user?.email}</Text>
                        <Text style={styles.subtitle}>(512) 555-1234</Text>
                    </View>
                </View>

                <View style={styles.statementSection}>
                    <Text style={styles.statementTitle}>Recent Transactions</Text>
                    <FlatList
                        data={recentTransactions}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.transactionItem}>
                                <Text style={styles.transactionDescription}>{item.description}</Text>
                                <Text style={styles.transactionAmount}>
                                    {item.amount < 0 ? '-' : '+'}${Math.abs(item.amount).toFixed(2)}
                                </Text>
                                <Text style={styles.transactionDate}>{item.date}</Text>
                            </View>
                        )}
                        style={styles.transactionList}
                    />
                </View>

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

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => {
                        AsyncStorage.removeItem('token');
                        navigation.navigate('Home');
                    }}
                >
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 30,
        marginTop: 20,
        width: '100%',
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.subtle,
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        width: '100%',
    },
    balanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.subtledark,
        borderRadius: 15,
        padding: 10,
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
    statementSection: {
        marginBottom: 20,
        backgroundColor: COLORS.subtle,
        borderRadius: 10,
        padding: 15,
    },
    statementTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10,
    },
    transactionList: {
        marginBottom: 20,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.subtledark,
    },
    transactionDescription: {
        fontSize: 16,
        color: COLORS.primary,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.red,
    },
    transactionDate: {
        fontSize: 12,
        color: COLORS.justdark,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
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
