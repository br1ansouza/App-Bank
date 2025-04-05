import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../themes/color';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  name: string;
}

export default function VirtualCard({ name }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.bankName}>EasyPay</Text>
        <Icon name="wifi" size={20} color={COLORS.light} />
      </View>

      <View style={styles.cardNumber}>
        <Text style={styles.number}>**** **** **** 1234</Text>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.label}>Card Holder</Text>
          <Text style={styles.info}>{name}</Text>
        </View>
        <View>
          <Text style={styles.label}>Valid Thru</Text>
          <Text style={styles.info}>12/28</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.accent,
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 30,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    minHeight: 180,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankName: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardNumber: {
    marginVertical: 20,
  },
  number: {
    color: COLORS.light,
    fontSize: 22,
    letterSpacing: 4,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: COLORS.subtle,
    fontSize: 12,
    marginBottom: 4,
  },
  info: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
