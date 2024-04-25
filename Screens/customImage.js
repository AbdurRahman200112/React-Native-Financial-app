import React from 'react';
import {Image} from 'react-native'
import style from './Style/style';
const CustomImage = () =>{
    return(
      <Image
        source={require('../img/logo2.png')}
        style={{ width: 175, height: 27 }}
       />
    )
}
export default CustomImage;