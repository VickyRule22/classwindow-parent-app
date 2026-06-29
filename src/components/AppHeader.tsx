import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Logo } from './Logo';
import { StatusBar } from './StatusBar';
import { RoleChip, Role } from './RoleSwitcher';
import { colors } from '../theme';

// Top nav: brand lockup on the left, current-view chip on the right (so the
// active parent/teacher view is always visible), thin warm divider underneath.
export function AppHeader({ role, onRolePress }: { role: Role; onRolePress: () => void }) {
  return (
    <View style={styles.wrap}>
      <StatusBar />
      <View style={styles.topNav}>
        <Logo />
        <RoleChip role={role} onPress={onRolePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.headerBg },
  topNav: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
});
