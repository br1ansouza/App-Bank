import React, { useRef, useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import COLORS from '../themes/color';
import Icon from 'react-native-vector-icons/Ionicons';
import { PieChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
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
        <View style={[styles.background, { backgroundColor: COLORS.background }]}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
                <View style={styles.topSection}>
                    <View style={styles.balanceContainer}>
                        <Animated.Text
                            style={[
                                styles.balanceValue,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ translateX: slideAnim }],
                                },
                            ]}
                        >
                            {showBalance ? `$4200.00` : '******'}
                        </Animated.Text>

                        <TouchableOpacity onPress={toggleBalance}>
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
                    {recentTransactions.map((item) => (
                        <View key={item.id} style={styles.transactionItem}>
                            <Text style={styles.transactionDescription}>{item.description}</Text>
                            <Text style={styles.transactionAmount}>
                                {item.amount < 0 ? '-' : '+'}${Math.abs(item.amount).toFixed(2)}
                            </Text>
                            <Text style={styles.transactionDate}>{item.date}</Text>
                        </View>
                    ))}
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

                <View style={styles.chartsSection}>
                    <View style={styles.chartCard}>
                        <Text style={styles.statementTitle}>Spending by Category</Text>
                        <PieChart
                            data={[
                                { name: 'Groceries', amount: 50, color: '#f39c12', legendFontColor: COLORS.primary, legendFontSize: 14 },
                                { name: 'Bills', amount: 100, color: '#e74c3c', legendFontColor: COLORS.primary, legendFontSize: 14 },
                                { name: 'Education', amount: 230, color: '#009ddd', legendFontColor: COLORS.primary, legendFontSize: 14 },
                                { name: 'Salary', amount: 1200, color: '#27ae60', legendFontColor: COLORS.primary, legendFontSize: 14 },
                            ]}
                            width={Dimensions.get('window').width - 100}
                            height={180}
                            chartConfig={{
                                backgroundColor: COLORS.background,
                                backgroundGradientFrom: COLORS.background,
                                backgroundGradientTo: COLORS.background,
                                color: () => COLORS.primary,
                                labelColor: () => COLORS.subtledark,
                            }}
                            accessor="amount"
                            backgroundColor="transparent"
                            paddingLeft="10"
                            absolute
                        />
                    </View>

                    <Text style={[styles.statementTitle, { marginTop: 30 }]}>Balance Overview</Text>
                    <LineChart
                        data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [
                                {
                                    data: [500, 1200, 900, 1400, 1300, 1500],
                                    color: () => COLORS.primary,
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width - 60}
                        height={220}
                        yAxisLabel="$"
                        chartConfig={{
                            backgroundColor: COLORS.background,
                            backgroundGradientFrom: COLORS.background,
                            backgroundGradientTo: COLORS.background,
                            decimalPlaces: 0,
                            color: () => COLORS.primary,
                            labelColor: () => COLORS.subtledark,
                            propsForDots: {
                                r: '4',
                                strokeWidth: '1',
                                stroke: COLORS.subtle,
                            },
                        }}
                        bezier
                        withInnerLines={false}
                        withShadow={true}
                        withDots={true}
                        style={{
                            borderRadius: 12,
                            marginTop: 10,
                        }}
                    />
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
            </ScrollView>
        </View >);
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
    statementSection: {
        backgroundColor: COLORS.light,
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.subtledark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
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
    chartsSection: {
        marginTop: 40,
        marginBottom: 40,
        marginHorizontal: 20,
    },
    chartCard: {
        backgroundColor: COLORS.light,
        borderRadius: 12,
        padding: 16,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: COLORS.subtledark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }
      
});
