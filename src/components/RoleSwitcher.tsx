import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, LayoutChangeEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, font, shadowSoft } from '../theme';

export type Role = 'parent' | 'teacher';

const OPTIONS: { key: Role; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'parent', label: 'Parent', icon: 'person-outline' },
  { key: 'teacher', label: 'Teacher', icon: 'school-outline' },
];

// "Viewing as" segmented control for accounts that are both a parent and a
// teacher. Shows the current view and the alternative at once, with a thumb that
// springs between them.
export function RoleSwitcher({ role, onChange }: { role: Role; onChange: (r: Role) => void }) {
  const [w, setW] = useState(0);
  const x = useRef(new Animated.Value(role === 'parent' ? 0 : 1)).current;
  const idx = role === 'parent' ? 0 : 1;

  useEffect(() => {
    Animated.spring(x, { toValue: idx, useNativeDriver: true, friction: 9, tension: 90 }).start();
  }, [idx]);

  const pad = 4;
  const thumbW = w > 0 ? (w - pad * 2) / 2 : 0;
  const translateX = x.interpolate({ inputRange: [0, 1], outputRange: [0, thumbW] });

  return (
    <View style={styles.section}>
      <Text style={styles.label}>VIEWING AS</Text>
      <View
        style={styles.track}
        onLayout={(e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width)}
      >
        {thumbW > 0 && (
          <Animated.View style={[styles.thumb, { width: thumbW, transform: [{ translateX }] }]} />
        )}
        {OPTIONS.map((o) => {
          const active = o.key === role;
          return (
            <Pressable key={o.key} style={styles.segment} onPress={() => onChange(o.key)}>
              <Ionicons
                name={o.icon}
                size={18}
                color={active ? colors.primaryDeep : colors.textMuted}
              />
              <Text
                style={[styles.segText, { color: active ? colors.primaryDeep : colors.textMuted }]}
              >
                {o.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.caption}>
        {role === 'parent'
          ? "You're viewing Class Window as a parent."
          : 'Switched to your teacher view.'}
      </Text>
    </View>
  );
}

// Small current-mode chip for the app header so the active view is always
// visible. Tapping it jumps to the switcher in Profile.
export function RoleChip({ role, onPress }: { role: Role; onPress: () => void }) {
  const teacher = role === 'teacher';
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={[styles.chip, teacher ? styles.chipTeacher : styles.chipParent]}
    >
      <Ionicons
        name={teacher ? 'school' : 'person'}
        size={13}
        color={teacher ? colors.white : colors.primaryDeep}
      />
      <Text style={[styles.chipText, { color: teacher ? colors.white : colors.primaryDeep }]}>
        {teacher ? 'Teacher' : 'Parent'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: { gap: 10 },
  label: {
    fontFamily: font.headingBold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: colors.sectionLabel,
  },
  track: {
    flexDirection: 'row',
    backgroundColor: colors.pillInactive,
    borderRadius: 14,
    padding: 4,
  },
  thumb: {
    position: 'absolute',
    left: 4,
    top: 4,
    bottom: 4,
    backgroundColor: colors.white,
    borderRadius: 11,
    ...shadowSoft,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  segText: { fontFamily: font.bold, fontSize: 14 },
  caption: {
    fontFamily: font.medium,
    fontSize: 12,
    color: colors.textMuted,
    paddingLeft: 2,
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  chipParent: { backgroundColor: colors.reactionLikedBg },
  chipTeacher: { backgroundColor: colors.primary },
  chipText: { fontFamily: font.extrabold, fontSize: 11, letterSpacing: 0.2 },
});
