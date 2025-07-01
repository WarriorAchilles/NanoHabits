import { StyleSheet } from 'react-native';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const colors = {
  light: {
    text: '#1A1A1A',
    background: '#F8F6F1',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    divider: '#1A1A1A',
    link: '#3B82F6',
  },
  dark: {
    text: '#F8F6F1',
    background: '#1A1A1A',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    divider: '#F8F6F1',
    link: '#3B82F6',
  },
};

export const fontFamilies = {
  regular: 'Poppins-Regular',
  light: 'Poppins-Light',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
  mono: 'SpaceMono-Regular',
};

export const fontWeights = {
  light: '300',
  medium: '500',
  bold: 'bold',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 32,
};

export const masterStyles = StyleSheet.create({
  // Layout containers
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light.background,
  },
  // Typography
  titleBold: {
    color: colors.light.text,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
    fontFamily: fontFamilies.bold,
    fontSize: 20,
  },
  titleLight: {
    color: colors.light.text,
    fontWeight: '300',
    marginBottom: spacing.lg,
    fontFamily: fontFamilies.light,
    fontSize: 20,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: colors.light.divider,
    marginBottom: spacing.lg,
  },
  // EditScreenInfo
  secondaryText: {
    color: colors.light.text,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: fontFamilies.medium,
  },
  codeContainer: {
    backgroundColor: colors.light.background,
    borderRadius: 4,
    paddingHorizontal: spacing.xs,
    marginVertical: spacing.sm,
  },
  footerContainer: {
    marginTop: spacing.md,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  link: {
    color: colors.light.link,
    textAlign: 'center',
    fontFamily: fontFamilies.medium,
    paddingVertical: spacing.md,
  },
  container: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
});
