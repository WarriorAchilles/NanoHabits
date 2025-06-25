# NativeWind Setup

This project has been configured with [NativeWind](https://www.nativewind.dev/) for styling React Native components using Tailwind CSS utility classes.

## Installation

The following dependencies are already installed:

```bash
npm install nativewind
npm install --save-dev tailwindcss@latest prettier prettier-plugin-tailwindcss
```

## Configuration

- `tailwind.config.js`: Tailwind CSS configuration with NativeWind preset and custom colors
- `package.json`: Contains NativeWind and related dependencies

## Custom Color Palette

This project includes a custom color palette designed for optimal readability and dark mode support:

### Base Colors
- `off-black`: `#1A1A1A` - Main text color in light mode
- `off-white`: `#F8F6F1` - Main background color in light mode

### Semantic Colors (with Dark Mode Support)
- `text-primary`: Main text color (off-black in light, off-white in dark)
- `bg-primary`: Main background color (off-white in light, off-black in dark)
- `text-secondary`: Secondary text color (gray in light, light gray in dark)
- `bg-secondary`: Secondary background color (light gray in light, dark gray in dark)

## Usage

NativeWind allows you to use Tailwind CSS classes directly in your React Native components using the `className` prop.

### Basic Usage with Custom Colors

```tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 bg-bg-primary p-4">
      <Text className="text-text-primary text-xl font-bold mb-2">
        Welcome to NanoHabits
      </Text>
      <Text className="text-text-secondary">
        Built with NativeWind
      </Text>
    </View>
  );
}
```

### Using Base Colors Directly

```tsx
<View className="bg-off-white dark:bg-off-black">
  <Text className="text-off-black dark:text-off-white">
    Direct color usage
  </Text>
</View>
```

### Dark Mode Support

```tsx
<View className="bg-bg-primary">
  <Text className="text-text-primary">
    Automatically adapts to light/dark mode
  </Text>
  <Text className="text-text-secondary">
    Secondary text also adapts
  </Text>
</View>
```

### Available Features

- **All Tailwind CSS utilities**: Colors, spacing, typography, flexbox, etc.
- **Responsive design**: Use responsive prefixes like `sm:`, `md:`, `lg:`
- **Dark mode**: Use `dark:` prefix for dark mode styles or semantic colors
- **Custom classes**: Define custom classes in your `tailwind.config.js`

### Example with Multiple Classes

```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ButtonExample() {
  return (
    <View className="flex-1 justify-center items-center bg-bg-primary">
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
  <Text className="text-sm md:text-base lg:text-lg text-text-primary">
    Responsive text
  </Text>
</View>
```

### Dark Mode Support

```tsx
<View className="bg-bg-primary">
  <Text className="text-text-primary">
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
5. **Semantic colors**: Use `text-primary`, `bg-primary`, etc. for consistent theming

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