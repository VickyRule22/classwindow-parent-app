import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from '../components/StatusBar';
import { FeaturedIcon, PrimaryButton } from './ui';
import { colors, font } from '../theme';

// Step 3: success. Greets the parent by first name and hands off to the app.
export function VerifiedScreen({
  firstName,
  onContinue,
}: {
  firstName: string;
  onContinue: () => void;
}) {
  return (
    <View style={styles.root}>
      <StatusBar tint="dark" />
      <View style={styles.content}>
        <View style={styles.header}>
          <FeaturedIcon name="checkmark" />
          <View style={styles.headingText}>
            <Text style={styles.title}>You're all set!</Text>
            <Text style={styles.sub}>
              Welcome to Class Window, {firstName}.{'\n'}Your account is verified.
            </Text>
          </View>
        </View>
        <PrimaryButton label="Continue to Class Window" onPress={onContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fef9f5' },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 56, paddingTop: 112, gap: 24 },
  header: { alignItems: 'center', gap: 24, width: '100%' },
  headingText: { alignItems: 'center', gap: 8 },
  title: { fontFamily: font.headingBold, fontSize: 22, color: colors.ink900, textAlign: 'center' },
  sub: { fontFamily: font.medium, fontSize: 16, color: colors.ink700, textAlign: 'center', lineHeight: 22 },
});
