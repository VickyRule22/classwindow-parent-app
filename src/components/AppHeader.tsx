import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Logo } from './Logo';
import { StatusBar } from './StatusBar';
import { colors } from '../theme';

// Top nav: brand lockup, with a thin warm divider underneath.
export function AppHeader() {
  return (
    <View style={styles.wrap}>
      <StatusBar />
      <View style={styles.topNav}>
        <Logo />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.headerBg },
  topNav: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
});
