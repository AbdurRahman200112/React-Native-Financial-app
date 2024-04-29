import React from 'react';
import { View, Text } from 'react-native';

const CustomHeader = ({ email }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{email}</Text>
    </View>
  );
};

export default CustomHeader;
