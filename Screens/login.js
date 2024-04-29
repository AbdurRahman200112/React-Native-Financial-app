import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity,StyleSheet, Text } from 'react-native';
import style from './Style/style';
import axios from 'axios';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.78:8080/login', {
        email_address: email,
        password: password
      });
      console.log(response.data.message);
      navigation.navigate('ADMIN DASHBOARD');
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Invalid email or password');
    }
  };
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#ffff' }}>
      <Image source={require('../img/logo2.png')} style={{ height: 45, width: 290 }} className="mb-3" />
      <Text>Welcome to Mavens Advisor</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 15, width: '80%', margin: 10, fontSize: 18, borderRadius: 5, borderColor: 'black', color: 'black' }}
        placeholder="Enter Your Email"
        placeholderTextColor="black"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 15, width: '80%', margin: 10, fontSize: 18, borderRadius: 5, borderColor: 'black', color: 'black' }}
        placeholder="Enter Your Password"
        secureTextEntry
        placeholderTextColor="black"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        <View style={{width:'200%',justifyContent:'end',alignItems:'center'}} className=" w-100">
        <TouchableOpacity style={style.btnStyle} onPress={handleLogin}>
          <Text className="text-white text-xl font-md text-center">Login</Text>
        </TouchableOpacity>
        <View style={styles.container}>
        <Text>
        Don't have an account?{' '}
        </Text>
       <TouchableOpacity onPress={() => navigation.navigate('SIGNUP')}>
          <Text style={{color:'#0b7ffe'}}>Sign Up</Text>
      </TouchableOpacity>
     </View>
    </View>
   </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Login;
