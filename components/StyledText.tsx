import React from 'react';
import { Text, TextProps } from 'react-native';

export function StyledText(props: TextProps) {
  // Use font-sans (Poppins) by default, allow override via className
  return <Text {...props} className={['font-sans', props.className].filter(Boolean).join(' ')} />;
}

export function MonoText(props: TextProps) {
  // Use font-mono (SpaceMono) for code
  return <Text {...props} className={['font-mono', props.className].filter(Boolean).join(' ')} />;
}
