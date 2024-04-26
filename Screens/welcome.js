import React from 'react';
import {SafeAreaView, View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native';

export default function Welcome({navigation}){
return(
<SafeAreaView className="bg-white h-full">
 <View className="flex-1 justify-center">
   <Image source={require('../img/Revenue-bro.png')} style={{height:450,width:'100%'}}/>
   <Text className="text-center text-4xl font-bold mt-5">Welcome to Mavens Advisor</Text>
   <View className="mt-10 justify-center items-center">
    <TouchableOpacity onPress={() => navigation.navigate('LOGIN')} className="justify-center items-center p-4 rounded-3xl" style={{backgroundColor:'#0B7FFE',width:'90%'}}>
      <Text className="text-xl text-white ">Login</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('SIGNUP')} className="mt-5 justify-center items-center p-3 rounded-3xl" style={{backgroundColor:'#ffff',width:'90%',borderWidth:1.5}}>
      <Text className="text-xl text-black">Sign Up</Text>
    </TouchableOpacity>
    </View>
  </View>
</SafeAreaView>
)
}

