import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Animated,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, font } from '../theme';

// react-native-web draws a default blue focus ring on inputs; this clears it so
// our own coral focus border reads cleanly. (Web-only style prop, hence `any`.)
export const noOutline: any = { outlineStyle: 'none' };

// ---- Featured icon: 48px white rounded square with a dark glyph, pops in on mount.
export function FeaturedIcon({ name }: { name: keyof typeof Ionicons.glyphMap }) {
  const pop = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(pop, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 140,
      delay: 80,
    }).start();
  }, []);
  const scale = pop.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });
  return (
    <Animated.View style={[styles.featured, { opacity: pop, transform: [{ scale }] }]}>
      <Ionicons name={name} size={24} color={colors.ink900} />
    </Animated.View>
  );
}

// ---- Primary button: coral pill with a soft skeuomorphic edge + press squish.
export function PrimaryButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const press = useRef(new Animated.Value(0)).current;
  const scale = press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.97] });
  return (
    <Animated.View style={[styles.btnWrap, { transform: [{ scale }], opacity: disabled ? 0.55 : 1 }]}>
      <Pressable
        style={styles.btn}
        onPress={onPress}
        disabled={disabled}
        onPressIn={() =>
          Animated.spring(press, { toValue: 1, useNativeDriver: true, friction: 7, tension: 320 }).start()
        }
        onPressOut={() =>
          Animated.spring(press, { toValue: 0, useNativeDriver: true, friction: 5, tension: 220 }).start()
        }
      >
        <Text style={styles.btnText}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

// ---- Labelled text field used on the sign-up screen.
export function TextField({
  label,
  value,
  onChangeText,
  ...rest
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
} & TextInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, focused && styles.inputFocused, noOutline]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textMuted3}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  featured: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  btnWrap: { width: '100%' },
  btn: {
    backgroundColor: colors.primaryAlt,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.14)',
    paddingVertical: 13,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryDeep,
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  btnText: {
    fontFamily: font.semibold,
    fontSize: 15,
    color: colors.white,
    letterSpacing: 0.2,
  },
  fieldWrap: { width: '100%', gap: 6 },
  fieldLabel: {
    fontFamily: font.headingBold,
    fontSize: 11,
    letterSpacing: 0.6,
    color: colors.textMuted2,
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontFamily: font.regular,
    fontSize: 16,
    color: colors.ink900,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
    paddingHorizontal: 11,
    paddingVertical: 10,
  },
});
