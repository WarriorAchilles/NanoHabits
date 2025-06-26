import React from 'react';
import { View } from 'react-native';
import { ExternalLink } from './ExternalLink';
import { MonoText, StyledText } from './StyledText';
import Colors from '@/constants/Colors';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View className="items-center mx-12">
        <StyledText className="text-text-secondary text-base leading-6 text-center font-medium">
          Open up the code for this screen:
        </StyledText>

        <View className="bg-bg-secondary rounded px-1 my-2">
          <MonoText>{path}</MonoText>
        </View>

        <StyledText className="text-text-secondary text-base leading-6 text-center font-medium">
          Change any of the text, save the file, and your app will automatically update.
        </StyledText>
      </View>

      <View className="mt-4 mx-5 items-center">
        <ExternalLink
          className="py-4"
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <StyledText className="text-center text-blue-500 font-medium">
            Tap here if your app doesn't automatically update after making changes
          </StyledText>
        </ExternalLink>
      </View>
    </View>
  );
}
