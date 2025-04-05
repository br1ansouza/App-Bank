import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import COLORS from '../themes/color';

export default function BalanceOverview() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Balance Overview</Text>
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
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.subtledark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  chart: {
    borderRadius: 12,
    marginTop: 10,
  },
});
