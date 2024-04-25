import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled, useColorScheme } from 'nativewind';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

function DarkMode() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <StyledPressable
      onPress={toggleColorScheme}
      className="items-center justify-center dark:bg-slate-800 mr-6"
    >
      <StyledText selectable={false} className="dark:text-white">
        <Ionicons
          name={colorScheme === 'dark' ? 'moon' : 'sunny'}
          size={24}
          color={colorScheme === 'dark' ? 'white' : '#000'}
        />
      </StyledText>
    </StyledPressable>
  );
}

export default DarkMode;
