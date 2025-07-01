import React from 'react';
import { View } from 'react-native';
import { ExternalLink } from './ExternalLink';
import { MonoText, StyledText } from './StyledText';
import { masterStyles } from '@/constants/tokens';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View style={masterStyles.container}>
      <StyledText style={masterStyles.secondaryText}>
        Open up the code for this screen:
      </StyledText>
      <View style={masterStyles.codeContainer}>
        <MonoText>{path}</MonoText>
      </View>
      <StyledText style={masterStyles.secondaryText}>
        Change any of the text, save the file, and your app will automatically update.
      </StyledText>
      <View style={masterStyles.footerContainer}>
        <ExternalLink
          style={masterStyles.link}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <StyledText style={masterStyles.link}>
            Tap here if your app doesn't automatically update after making changes
          </StyledText>
        </ExternalLink>
      </View>
    </View>
  );
}
