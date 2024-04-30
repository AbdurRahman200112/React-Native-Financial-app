import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import {Feather } from '@expo/vector-icons';
import axios from 'axios';
import io from 'socket.io-client';
const ChatDetailScreen = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [adminEmail, setAdminEmail] = useState(route.params.adminEmail);
      const socket = io('http://192.168.0.78:8080');


//  useEffect(() => {
//    fetchAdminEmail(route.params.userEmail);
//    fetchMessages();
//  }, []);
     useEffect(() => {
//        fetchAdminEmail(route.params.userEmail);
        fetchMessages();
        socket.on('connect', () => {
          console.log('Connected to server');
        });

        // Listen for initial messages from the server
        socket.on('initial_messages', (initialMessages) => {
          setMessages(initialMessages);
        });

        // Listen for new messages from the server
        socket.on('new_message', (message) => {
          setMessages([...messages, message]);
        });

        // Clean up the socket connection when the component unmounts
        return () => {
          socket.disconnect();
        };
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
  const fetchAdminEmail = async (userEmail) => {
    try {
      const response = await axios.get(`http://192.168.0.78:8080/adminEmail/${userEmail}`);
      setAdminEmail(response.data.adminEmail);
    } catch (error) {
      console.error('Error fetching admin email:', error);
    }
  };
//  const sendMessage = async () => {
//    try {
//      await axios.post('http:///192.168.0.78:8080/new_message', {
//        email_address: route.params.userEmail,
//        admin_email: adminEmail,
//        message: newMessage
//      });
//      setNewMessage('');
//      fetchMessages();
//    } catch (error) {
//      console.error('Error sending message:', error);
//    }
//  };
//    const sendMessage = async () => {
//      try {
//        const adminEmail = "info@mavensadvisor.com";
//        const userEmail = route.params.email_address;
//
//        await axios.post('http://192.168.0.78:8080/new_message', {
//          email_address: userEmail,
//          admin_email: adminEmail,
//          message: newMessage
//        });
//        setNewMessage('');
//        fetchMessages();
//      } catch (error) {
//        console.error('Error sending message:', error);
//      }
//    };
    const sendMessage = () => {
      const { email_address } = route.params;
      socket.emit('new_message', {
        email_address,
        message: newMessage
      });
      setNewMessage('');
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
        <TouchableOpacity  style={{backgroundColor:'#0b7ffe'}} onPress={sendMessage} className="p-3 rounded-3xl">
            <Feather name="send" size={18} color="#ffff" />
        </TouchableOpacity>
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