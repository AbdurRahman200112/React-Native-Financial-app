import React, { useState, useEffect } from 'react';
import {View,Image,SafeAreaView,ScrollView,Text,TouchableOpacity,Dimensions,StyleSheet} from 'react-native';
import style from './Style/style';
import Footer from './footer';
import Slider from './slider';
const { width, height } = Dimensions.get('window');
const HomeScreen = ({navigation}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const CounterHeading = ({ maxValue, speed }) => {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter < maxValue) {
            return prevCounter + 1;
          } else {
            clearInterval(interval);
            return prevCounter;
          }
        });
      }, speed);
      return () => clearInterval(interval);
    }, []);
    return (
      <Text className="text-4xl font-black text-black m-1">
        {counter}
        <Text style={{ fontWeight: 'normal', color: '#0b7ffe' }}>+</Text>
      </Text>
    );
  };
 return(
   <SafeAreaView style={{backgroundColor:'#ffff'}}>
    <ScrollView>
     <View style={style.row}>
       <Text className="text-4xl ml-4 font-semibold mt-9" style={{color:'#000'}}>Empower Your {"\n"}<Text style={{color:'#0d6efd'}}>Business</Text> with Expert Financial Solution</Text>
     </View>
     <View style={style.row}>
       <Text className="text-lg ml-4">Unlock the full potential of your business with Mavens Advisor Financial Services.
       Trusted expertise in accounting and finance for the {"\n"}USA and UK markets.</Text>
     </View>
     <View className="flex flex-row m-2">
      <TouchableOpacity
       onPressIn={handleMouseEnter}
       onPressOut={handleMouseLeave}
       style={[style.secBtnStyle2,
         isHovered && style.secBtnStyle2Hover,
       ]}
       onPress={() =>
        navigation.navigate('SUBSCRIPTION FORM')}>
        <Text className="text-center text-lg"
         style={{color:'#0D6EFD'}}>
         Get Subscription Now
        </Text>
       </TouchableOpacity>
      </View>
      <View style={{alignItems:'center'}}>
       <Image source={require('../img/bg-4.png')} style={{width:'95%'}} className="rounded-xl"/>
     </View>
     <View className="mt-10 mb-10">
      <Text className="text-3xl mt-4 font-sans-serif ml-2 font-bold">Business <Text style={{color:'#0b7ffe'}}>Consulting</Text></Text>
      <Text className="text-xl text-left ml-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,{"\n"}as opposed to using 'Content here,</Text>
      <Slider/>
     </View>
     <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
      <Image  source={require('../img/image19.jpg')} style={{height:550}}/>
     </View>
     <View style={{alignItems:'center'}} className="mb-20">
      <Text className="text-3xl mt-12 font-sans-serif ml-2 font-bold">Continue Your <Text style={{color:'#0b7ffe',textAlign:'center'}}>Business</Text>{"\n"}With Us</Text>
      <View style={{flexDirection:'row'}}>
       <View style={style.col}>
        <Image source={require('../assets/working.png')}/>
         <CounterHeading maxValue={85} speed={1} />
          <Text className="text-base font-sm text-black">Total Clients</Text>
        </View>
        <View style={style.col}>
         <Image source={require('../assets/star.png')}/>
         <CounterHeading maxValue={95} speed={1} />
         <Text className="text-base font-sm text-black">Employees</Text>
        </View>
       </View>
      <View style={{flexDirection:'row'}}>
       <View style={style.col}>
        <Image source={require('../assets/doc.png')}/>
        <CounterHeading maxValue={90} speed={10} />
        <Text className="text-base font-sm text-black">Useful Programs</Text>
       </View>
       <View style={style.col}>
        <Image source={require('../assets/rocket.png')}/>
        <CounterHeading maxValue={75} speed={10} />
        <Text className="text-base font-sm text-black">Total Freelancer</Text>
      </View>
     </View>
    </View>
   </ScrollView>
  </SafeAreaView>
 )
}
export default HomeScreen;
const styles = StyleSheet.create({
container:{
   width:'80%',
   justifyContent:'center',
   alignItems:'center',
   flex:1,
}
})