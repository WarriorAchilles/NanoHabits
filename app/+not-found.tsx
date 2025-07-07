import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { masterStyles } from '@/constants/tokens';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={masterStyles.centeredContainer}>
        <Text style={masterStyles.titleBold}>This screen doesn't exist.</Text>

        <Link href="/(tabs)/habitsTab" style={masterStyles.link}>
          <Text style={masterStyles.link}>Back to habits screen</Text>
        </Link>
      </View>
    </>
  );
}
