import  React, {useState} from 'react';
import {View,Text,ScrollView,TouchableOpacity,TextInput,Image,SafeAreaView,ImageBackground} from 'react-native';
import style from './Style/style';
import Footer from './footer';
import { Entypo, Feather } from '@expo/vector-icons';
const Contact = ( {navigation} ) =>{
 const [full_name, setFull_name] = React.useState('');
 const [email_address, setEmail_address] = React.useState('');
 const [message, setMessage] = React.useState('');
 const [SuccessMessage, setSuccessMessage] = useState('');
 const handleContactForm = () => {
 const userData = {
   full_name: full_name,
   email_address: email_address,
   message: message,
 };
  fetch('http://192.168.0.78:8080/contactData', {
   method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
      body: JSON.stringify(userData),
    })
    .then(response => {
      if (!response.ok) {
       throw new Error('Failed to Submit');
      }
        return response.json();
      })
      .then(data => {
      console.log("Thankyou For Submitting a form. Our Team Contact you soon!")
      setSuccessMessage('Thank you For Submitting a form. Our Team will contact you soon!');
      })
      .catch(error => {
        console.error('Error signing up:', error.message);
      });
  };
  return(
   <SafeAreaView style={{backgroundColor:'white'}}>
    <ScrollView>
     <View style={style.row}>
      <Text className="text-4xl ml-4 font-semibold mt-9" style={{color:'#000'}}>Having more than <Text style={{color:'#0d6efd'}}>25 years </Text>of Experience</Text>
     </View>
     <View style={style.row}>
       <Text className="text-lg mt-2 ml-4">Do you immediately need an SME (Subject {"\n"}Matter Expert) like CFO,
         CSO, or COO who can provide strategic guidance.</Text>
       </View>
       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../img/bg-6.png')} style={{ width: '90%',height:282 }} />
       </View>
       <View className="justify-center items-center">
        <View className='bg-white items-center rounded-2xl' style={{height:300,width:'90%'}}>
          <View className="justify-center items-center flex-1">
           <Text className="text-2xl  font-roboto font-semibold">Tell Us About Yourself</Text>
            <View className="w-80 items-center">
             <Text className="text-black text-sm font-roboto font-normal">We’d love to talk about how we can help you.</Text>
            </View>
          </View>
          <View className="container" style={{backgroundColor:'#FFFFFF'}}>
           <View className="flex flex-row mt-10 items-center">
             <Entypo name="email" size={33} color="#43a8fb" />
             <View className="flex flex-col ml-3">
              <Text className="text-xl font-medium">Email</Text>
              <Text>info@mavensadvisor.com</Text>
             </View>
             <Feather name="phone-call" size={32} color="#43a8fb" />
              <View className="flex flex-col ml-3">
               <Text className="text-xl font-medium">Call</Text>
               <Text>+44 7441 441789</Text>
              </View>
             </View>
             <View className="flex flex-row mt-10 w-100 justify-center items-center">
               <Feather name="map-pin" size={33} color="#43a8fb" />
                <View className="flex flex-col ml-3">
                 <Text className="text-xl font-medium">Location</Text>
                 <Text>Detroit, Michigan, United States.</Text>
                </View>
               </View>
             </View>
            </View>
          <View>
          <View className="mt-4 ">
          <Text className="mb-2 mt-2 text-md">Full Name</Text>
          <TextInput
            className="border-gray-300 border-2 p-2 w-80 rounded-lg "
            placeholderTextColor="gray"
            placeholder="Full Name"
            onChangeText={text => setFull_name(text)}
            value={full_name}
           />
           <Text className="mt-2 mb-2 text-md">Email Address</Text>
           <TextInput
             className="border-gray-300 border-2 p-2 w-80 rounded-lg "
             placeholderTextColor="gray"
             placeholder="example@gmail.com"
             onChangeText={text => setEmail_address(text)}
             value={email_address}
           />
           <Text className="mt-2 mb-2 text-md">Write Message</Text>
           <TextInput
             className="border-gray-300 border-2 p-2 w-80 rounded-lg mb-6"
             placeholderTextColor="gray"
             placeholder="Message"
             multiline={true}
             onChangeText={text => setMessage(text)}
             numberOfLines={6}
             value={message}
           />
         </View>
         <TouchableOpacity className="mb-10 border-2 p-4 rounded-xl" style={{borderColor:'#0b7ffe'}} onPress={handleContactForm}>
           <Text style={{color:'#0b7ffe'}} className="text-black-400 text-center font-bold text-base">SEND US MESSAGES</Text>
         </TouchableOpacity>
          </View>
          <View style={{width:'78%'}} className="mb-10">
            {SuccessMessage ? <Text className="container bg-sky-100 items-center mb-2 p-3 justify-center rounded-xl" style={{ color: '#000' }}>{SuccessMessage}</Text> : null}
          </View>

          <Footer navigation={navigation}/>
         </View>
      </ScrollView>
    </SafeAreaView>
    )
}
export default Contact;