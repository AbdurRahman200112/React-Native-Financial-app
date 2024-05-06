import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('screen');
const SlideItem = ({item}) => {
  const translateYImage = new Animated.Value(40);
  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();
  return (
   <View style={styles.container}>
    <Animated.Image
     source={item.img}
     resizeMode="contain"
     style={[
       styles.image,
     ]}
       className="mt-10"
     />
      <View style={styles.content}>
        <Text className="text-2xl font-bold" style={{color:'#0b7ffe'}}>{item.title}</Text>
        <Text className="w-60 text-center text-base m-3 font-medium" style={{color:'#0b7ffe'}}>{item.description}</Text>
        <TouchableOpacity className="bg-white w-40 items-center border-2 p-2 py-3" style={{borderColor:'#0b7ffe'}} >
        <Text className="text-base font-medium" style={{color:'#0b7ffe'}}>{item.button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SlideItem;
const styles = StyleSheet.create({
  container: {
    width,
    height:420,
    alignItems: 'center',

    justifyContent:'top',
    alignItems:'center',
    flex:1
  },
  image: {
    height:350,
    width:350,
    marginBottom:40
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});