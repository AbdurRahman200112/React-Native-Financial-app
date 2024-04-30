import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import CustomTabs from './components/customTabs';

const Chat = ({ navigation,route }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://192.168.0.78:8080/messages');
      const updatedMessages = response.data.map(message => ({
        ...message,
        unread: true
      }));
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toDateString();
  };

  const markAsRead = (email) => {
    const updatedMessages = messages.map(message => {
      if (message.email_address === email) {
        return { ...message, unread: false };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 712, backgroundColor: 'white' }}>
        {messages.reduce((acc, message, index) => {
          const existingMessageIndex = acc.findIndex((m) => m.email_address === message.email_address);
          if (existingMessageIndex !== -1) {
            acc[existingMessageIndex] = message;
          } else {
            acc.push(message);
          }
          return acc;
        }, []).map((message, index) => (
          <TouchableOpacity key={message.email_address} onPress={() => {
            navigation.navigate('ChatDetailScreen', { email_address: message.email_address });
            markAsRead(message.email_address); // Mark message as read when tapped
          }}>
            <View style={[styles.messageContainer, index !== messages.length - 1 && styles.borderBottom]}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{message.email_address}</Text>
                <Text>{message.message.split('\n')[0]}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 12 }}>{formatDate(message.timestamp)}</Text>
                {message.unread && <View className="mt-3" style={styles.unreadIndicator} />}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <CustomTabs navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    padding: 18,
    paddingBottom: 15,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    backgroundColor: '#0b7ffe',
    borderRadius: 5,
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default Chat;