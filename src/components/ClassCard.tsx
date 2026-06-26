import React, { useRef } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import { Avatar } from './Avatar';
import { colors, font, shadowSoft } from '../theme';
import type { ClassRow } from '../data';

export function ClassCard({ row, onPress }: { row: ClassRow; onPress?: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;
  const spring = (to: number) =>
    Animated.spring(scale, { toValue: to, useNativeDriver: true, friction: 7, tension: 300 }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
    <Pressable
      style={styles.card}
      onPress={onPress}
      onPressIn={() => spring(0.97)}
      onPressOut={() => spring(1)}
    >
      <Animated.View style={styles.top}>
        <Avatar initials={row.initials} gradient={row.gradient} size={42} fontSize={16} />
        <View style={styles.info}>
          <Text style={styles.name}>{row.name}</Text>
          <Text style={styles.meta}>{row.meta}</Text>
          <Text style={styles.school}>{row.school}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeTxt}>{row.unread}</Text>
        </View>
      </Animated.View>
      <View style={styles.divider} />
      <View style={styles.bottom}>
        <Text style={styles.last}>{row.lastPost}</Text>
        <Text style={styles.view}>View class →</Text>
      </View>
    </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 6,
    ...shadowSoft,
  },
  top: { flexDirection: 'row', alignItems: 'flex-start', gap: 15 },
  info: { flex: 1, gap: 1 },
  name: { fontFamily: font.headingBold, fontSize: 15, color: colors.textDark2 },
  meta: { fontFamily: font.regular, fontSize: 12, color: colors.textMuted2 },
  school: { fontFamily: font.regular, fontSize: 11, color: colors.textMuted3 },
  badge: {
    backgroundColor: colors.primaryAlt,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTxt: { fontFamily: font.headingBold, fontSize: 11, color: colors.white },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.cardDivider },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  last: { fontFamily: font.regular, fontSize: 11, color: colors.textMuted3 },
  view: { fontFamily: font.semibold, fontSize: 12, color: colors.primaryAlt },
});
