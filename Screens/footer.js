import * as React from 'react';
import {View,Image,ScrollView,SafeAreaView,Text,TouchableOpacity} from 'react-native';
import style from './Style/style';
const Footer = ( {navigation} ) =>{
 return (
  <View style={{backgroundColor:'#0b7ffe',height:60,justifyContent:'center'}} className="">
   <View style={style.row}>
    <View style={style.colFooter}>
     <TouchableOpacity onPress={() => navigation.navigate('OUR SERVICES')}>
      <Text className="text-white text-md">Services</Text>
     </TouchableOpacity>
    </View>
   <View style={style.colFooter}>
     <TouchableOpacity>
      <Text className="text-white text-md">Privacy Policy</Text>
     </TouchableOpacity>
   </View>
   <View style={style.colFooter}>
    <TouchableOpacity>
     <Text className="text-white text-md">Follow Us</Text>
    </TouchableOpacity>
   </View>
    <View style={style.colFooter}>
     <TouchableOpacity>
      <Text className="text-white text-md">Site Map</Text>
     </TouchableOpacity>
    </View>
   </View>
  </View>
  )
}
export default Footer;