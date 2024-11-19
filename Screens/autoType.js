import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AutoType = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      currentIndex++;

      if (currentIndex === text.length) {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return <Text style={styles.text}>{displayedText}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default AutoType;
