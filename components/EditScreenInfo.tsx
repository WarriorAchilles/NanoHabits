import React from 'react';
import { View, Text } from 'react-native';
import { ExternalLink } from './ExternalLink';
import { masterStyles } from '@/constants/tokens';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View style={masterStyles.container}>
      <Text style={masterStyles.secondaryText}>
        Open up the code for this screen:
      </Text>
      <View style={masterStyles.codeContainer}>
        <Text style={{ fontFamily: 'SpaceMono-Regular' }}>{path}</Text>
      </View>
      <Text style={masterStyles.secondaryText}>
        Change any of the text, save the file, and your app will automatically update.
      </Text>
      <View style={masterStyles.footerContainer}>
        <ExternalLink
          style={masterStyles.link}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <Text style={masterStyles.link}>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}
