# NativeWind Setup

This project has been configured with [NativeWind](https://www.nativewind.dev/) for styling React Native components using Tailwind CSS utility classes.

## Installation

The following dependencies are already installed:

```bash
npm install nativewind
npm install --save-dev tailwindcss@latest prettier prettier-plugin-tailwindcss
```

## Configuration

- `tailwind.config.js`: Tailwind CSS configuration with NativeWind preset
- `package.json`: Contains NativeWind and related dependencies

## Usage

NativeWind allows you to use Tailwind CSS classes directly in your React Native components using the `className` prop.

### Basic Usage

```tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-bold text-gray-800 mb-2">
        Welcome to NanoHabits
      </Text>
      <Text className="text-gray-600">
        Built with NativeWind
      </Text>
    </View>
  );
}
```

### Available Features

- **All Tailwind CSS utilities**: Colors, spacing, typography, flexbox, etc.
- **Responsive design**: Use responsive prefixes like `sm:`, `md:`, `lg:`
- **Dark mode**: Use `dark:` prefix for dark mode styles
- **Custom classes**: Define custom classes in your `tailwind.config.js`

### Example with Multiple Classes

```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ButtonExample() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <TouchableOpacity 
        className="bg-blue-500 px-6 py-3 rounded-lg shadow-lg active:bg-blue-600"
        onPress={() => console.log('Button pressed!')}
      >
        <Text className="text-white font-semibold text-lg">
          Press Me
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Responsive Design

```tsx
<View className="w-full md:w-1/2 lg:w-1/3">
  <Text className="text-sm md:text-base lg:text-lg">
    Responsive text
  </Text>
</View>
```

### Dark Mode Support

```tsx
<View className="bg-white dark:bg-gray-900">
  <Text className="text-gray-900 dark:text-white">
    Dark mode compatible text
  </Text>
</View>
```

## Benefits of NativeWind

- **No build step required**: No need to generate `styles.json` files
- **Latest Tailwind CSS**: Supports all modern Tailwind features
- **Better performance**: Optimized for React Native
- **TypeScript support**: Full TypeScript support out of the box
- **Active development**: Regularly updated and maintained

## Development Tips

1. **Use Prettier**: The project includes `prettier-plugin-tailwindcss` for automatic class sorting
2. **IntelliSense**: Most IDEs provide autocomplete for Tailwind classes
3. **Hot reload**: Changes to Tailwind classes work with hot reload
4. **Custom themes**: Extend the theme in `tailwind.config.js` for project-specific styles

## Troubleshooting

If you encounter issues:

1. **Restart the development server** after configuration changes
2. **Clear Metro cache**: `npx expo start --clear`
3. **Check Tailwind config**: Ensure `nativewind/preset` is included in presets
4. **Verify imports**: Make sure you're importing React Native components correctly

## Resources

- [NativeWind Documentation](https://www.nativewind.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Native Documentation](https://reactnative.dev/) 