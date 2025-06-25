import React from 'react';
import { Text, TextProps } from 'react-native';

export function MonoText(props: TextProps) {
  return (
    <Text 
      {...props} 
      className="text-text-primary font-mono"
      style={[props.style, { fontFamily: 'SpaceMono' }]} 
    />
  );
}
