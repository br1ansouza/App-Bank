import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import COLORS from '../themes/color';

export default function SpendingCategory() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending by Category</Text>
      <PieChart
        data={[
          {
            name: 'Groceries',
            amount: 50,
            color: '#f39c12',
            legendFontColor: COLORS.primary,
            legendFontSize: 14,
          },
          {
            name: 'Bills',
            amount: 100,
            color: '#e74c3c',
            legendFontColor: COLORS.primary,
            legendFontSize: 14,
          },
          {
            name: 'Education',
            amount: 230,
            color: '#009ddd',
            legendFontColor: COLORS.primary,
            legendFontSize: 14,
          },
          {
            name: 'Salary',
            amount: 1200,
            color: '#27ae60',
            legendFontColor: COLORS.primary,
            legendFontSize: 14,
          },
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
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.light,
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 15,
  },
});
