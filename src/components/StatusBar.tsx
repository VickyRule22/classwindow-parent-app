import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// iPhone-style status bar (9:41 + signal/wifi/battery). Shared by the app header
// and the onboarding screens. `tint="light"` flips it for dark/gradient backdrops.
export function StatusBar({ tint = 'dark' }: { tint?: 'dark' | 'light' }) {
  const fg = tint === 'light' ? colors.white : colors.textDark;
  return (
    <View style={styles.statusBar}>
      <Text style={[styles.time, { color: fg }]}>9:41</Text>
      <View style={styles.statusRight}>
        <Ionicons name="cellular" size={15} color={fg} />
        <Ionicons name="wifi" size={15} color={fg} />
        <Ionicons name="battery-full" size={22} color={fg} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
  time: { fontFamily: 'NunitoSans-SemiBold', fontSize: 15, letterSpacing: -0.2 },
  statusRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
