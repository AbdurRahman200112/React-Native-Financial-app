import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';

const ChatDetailScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const email_address = route.params.email_address;
      const response = await axios.get(`http://192.168.0.78:8080/messages/${email_address}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError(error.message);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('http:///192.168.0.78:8080/new_message', {
        email_address: 'user@example.com',
        admin_email: 'admin@example.com',
        message: newMessage
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching messages: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index} style={[styles.messageContainer, { width: message.message.length > 50 ? '100%' : '50%' }]}>
            <View style={{ backgroundColor: '#F3F0EC', padding: 15, borderRadius: 10 }}>
              <Text style={styles.message}>{message.message}</Text>
              <Text style={styles.timestamp}>{formatDate(message.timestamp)}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
          style={styles.input}
          multiline
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  messagesContainer: {
    flex: 1,
  },
  messageContainer: {
    paddingBottom: 15,
    borderBottomColor: '#E5E5E5',
  },
  message: {
    fontSize: 14,
    color: 'black',
  },
  timestamp: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ECEFF1',
    borderRadius: 10,
    marginRight: 10,
  },
});

export default ChatDetailScreen;
