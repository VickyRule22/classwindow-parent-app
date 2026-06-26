import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from '../components/StatusBar';
import { FeaturedIcon, PrimaryButton, noOutline } from './ui';
import { colors, font } from '../theme';

const CODE_LEN = 4;

// Step 2: enter the 4-digit code we "sent". Four boxes with auto-advance + backspace,
// a resend countdown, and a back arrow to the sign-up screen.
export function VerifyEmailScreen({
  email,
  onBack,
  onVerify,
}: {
  email: string;
  onBack: () => void;
  onVerify: () => void;
}) {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LEN).fill(''));
  const [seconds, setSeconds] = useState(42);
  const refs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const setDigit = (i: number, v: string) => {
    const ch = v.replace(/[^0-9]/g, '').slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = ch;
      return next;
    });
    if (ch && i < CODE_LEN - 1) refs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
      setDigit(i - 1, '');
    }
  };

  const complete = digits.every((d) => d !== '');
  const mm = Math.floor(seconds / 60);
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <View style={styles.root}>
      <StatusBar tint="dark" />

      <Pressable style={styles.back} onPress={onBack} hitSlop={8}>
        <Ionicons name="arrow-back" size={20} color={colors.ink700} />
      </Pressable>

      <View style={styles.content}>
        <View style={styles.header}>
          <FeaturedIcon name="mail-outline" />
          <View style={styles.headingText}>
            <Text style={styles.title}>Check your email</Text>
            <Text style={styles.sub}>
              We sent a {CODE_LEN}-digit code to{'\n'}
              <Text style={styles.email}>{email || 'olivia@untitledui.com'}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.codeRow}>
          {digits.map((d, i) => (
            <TextInput
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChangeText={(v) => setDigit(i, v)}
              onKeyPress={(e) => onKey(i, e)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              style={[styles.codeBox, d ? styles.codeBoxFilled : null, noOutline]}
            />
          ))}
        </View>

        <PrimaryButton label="Verify email" onPress={onVerify} disabled={!complete} />

        <View style={styles.resendRow}>
          <Text style={styles.resendMuted}>Didn't receive it? </Text>
          <Pressable hitSlop={6} onPress={() => setSeconds(42)}>
            <Text style={styles.resendLink}>Click to resend</Text>
          </Pressable>
          <Text style={styles.resendTimer}>
            {'  '}({mm}:{ss})
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fef9f5' },
  back: {
    margin: 16,
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 56, paddingTop: 26, gap: 24 },
  header: { alignItems: 'center', gap: 24, width: '100%' },
  headingText: { alignItems: 'center', gap: 8 },
  title: { fontFamily: font.headingBold, fontSize: 22, color: colors.ink900, textAlign: 'center' },
  sub: { fontFamily: font.medium, fontSize: 16, color: colors.ink700, textAlign: 'center', lineHeight: 22 },
  email: { fontFamily: font.semibold, color: colors.ink700 },
  codeRow: { flexDirection: 'row', gap: 8 },
  codeBox: {
    width: 64,
    height: 64,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.brandSolid,
    backgroundColor: colors.white,
    textAlign: 'center',
    fontFamily: font.heading,
    fontSize: 40,
    color: '#ec623c',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  codeBoxFilled: { backgroundColor: '#fff8f1' },
  resendRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' },
  resendMuted: { fontFamily: font.medium, fontSize: 16, color: colors.ink700 },
  resendLink: { fontFamily: font.semibold, fontSize: 16, color: '#ec623c' },
  resendTimer: { fontFamily: font.medium, fontSize: 16, color: colors.textMuted2 },
});
