import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../themes/color';

const recentTransactions = [
  { id: '1', description: 'Grocery Purchase', amount: -50.0, date: '2023-10-01' },
  { id: '2', description: 'Salary', amount: 1500.0, date: '2023-09-30' },
  { id: '3', description: 'Utility Bill Payment', amount: -100.0, date: '2023-09-29' },
];

export default function RecentTransactions() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
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
});
