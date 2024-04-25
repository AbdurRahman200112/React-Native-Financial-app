import * as React from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView } from 'react-native';
import style from './Style/style';
import Footer from './footer';
import CustomImage from './customImage';

const SignUp = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSignUp = () => {
    const userData = {
      email_address: emailAddress,
      user_name: userName,
      password: password,
      confirm_password: confirmPassword
    };
    fetch('http://192.168.0.79:8080/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to sign up');
        }
        return response.json();
      })
      .then(data => {
        navigation.navigate('LOGIN');
      })
      .catch(error => {
        console.error('Error signing up:', error.message);
      });
  };
  return (
   <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#ffff' }}>
    <Image source={require('../img/logo2.png')} style={{ height: 45, width: 290, marginBottom: 3 }} />
    <TextInput
     style={styles.input}
     placeholder="Enter Your Email"
     placeholderTextColor="black"
     value={emailAddress}
     onChangeText={text => setEmailAddress(text)}
   />
   <TextInput
     style={styles.input}
     placeholder="Enter Your Username"
     placeholderTextColor="black"
     value={userName}
     onChangeText={text => setUserName(text)}
   />
   <TextInput
    style={styles.input}
    secureTextEntry
    placeholder="Enter New Password"
    placeholderTextColor="black"
    value={password}
    onChangeText={text => setPassword(text)}
   />
   <TextInput
    style={styles.input}
    secureTextEntry
    placeholder="Confirm Password"
    placeholderTextColor="black"
    value={confirmPassword}
    onChangeText={text => setConfirmPassword(text)}
   />
   <View style={{width:'200%',justifyContent:'end',alignItems:'center'}} className=" w-100">
    <TouchableOpacity style={style.btnStyle} onPress={handleSignUp}>
      <Text className="text-white text-xl font-md text-center">Sign Up</Text>
    </TouchableOpacity>
    <View style={styles.container}>
    <Text>Have an account?{' '}</Text>
    <TouchableOpacity onPress={() => navigation.navigate('LOGIN')}>
     <Text style={{color:'#0b7ffe'}}>Login</Text>
    </TouchableOpacity>
    </View>
    </View>
   </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 15,
    width: '80%',
    margin: 10,
    fontSize: 18,
    borderRadius: 5,
    borderColor: 'black',
    color: 'black',
  },
   container: {
    flexDirection: 'row',
   },
});

export default SignUp;
