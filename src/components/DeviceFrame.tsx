import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { colors } from '../theme';

// On desktop-width browsers, render children inside a centered, rounded iPhone
// shell so every screen (onboarding + app) sits in the same device shape. On
// narrow widths (real phones) it's full-screen, so nothing changes on the actual
// test devices.
export function DeviceFrame({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();
  const framed = width >= 560;

  if (!framed) {
    return <View style={styles.fullPhone}>{children}</View>;
  }

  const frameHeight = Math.min(height - 48, 880);
  return (
    <View style={styles.stage}>
      <View style={[styles.device, { height: frameHeight }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullPhone: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
    backgroundColor: colors.appBg,
    overflow: 'hidden',
  },
  stage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efe9e2',
  },
  device: {
    width: 402,
    borderRadius: 46,
    backgroundColor: colors.appBg,
    overflow: 'hidden',
    borderWidth: 6,
    borderColor: '#1b1410',
    shadowColor: '#2c1a0e',
    shadowOpacity: 0.22,
    shadowRadius: 44,
    shadowOffset: { width: 0, height: 26 },
    elevation: 20,
  },
});
