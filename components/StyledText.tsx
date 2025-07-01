import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors } from '@/constants/tokens';

export function StyledText(props: TextProps & { variant?: 'mono' | 'default', weight?: 'light' | 'medium' | 'bold', color?: string, size?: number }) {
  const { style, variant = 'default', weight = 'medium', color, size, ...rest } = props;
  let fontFamily = 'Poppins-Regular';
  if (variant === 'mono') fontFamily = 'SpaceMono-Regular';
  if (weight === 'light') fontFamily = 'Poppins-Light';
  if (weight === 'medium') fontFamily = 'Poppins-Medium';
  if (weight === 'bold') fontFamily = 'Poppins-Bold';
  return (
    <Text
      {...rest}
      style={[
        { fontFamily, color: color || colors.light.text, fontSize: size },
        style,
      ]}
    />
  );
}

export function MonoText(props: TextProps) {
  // Use font-mono (SpaceMono) for code
  return <Text {...props} className={['font-mono', props.className].filter(Boolean).join(' ')} />;
}
