import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, font } from '../theme';

// Empty state: animated hi-five illustration + "Wishlists Coming Soon!" (orange).
export function WishlistsScreen() {
  return (
    <View style={styles.wrap}>
      <View style={styles.center}>
        <Image
          source={require('../../assets/figma/wishlist-animation.gif')}
          style={styles.art}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          Wishlists{'\n'}Coming Soon!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.appBg, paddingHorizontal: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 },
  art: { width: 248, height: 248 },
  title: {
    fontFamily: font.heading,
    fontSize: 26,
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 32,
  },
});
