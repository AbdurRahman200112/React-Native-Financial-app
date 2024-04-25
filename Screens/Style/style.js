import {StyleSheet} from 'react-native'
const style = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#ffff'
  },
  txtInput:{
   borderWidth:1.4,
   padding:20,
   width:'80%',
   margin:10,
   fontSize:18,
   borderRadius:16,
   borderColor:'white',
   color:'#ffff'
  },
  btnContainer:{
   flexDirection:'row',
   width:'80%',
   alignItems:'center',
  },
  btnStyle:{
   backgroundColor: '#0b7ffe',
   margin: 10,
   padding:10,
   borderRadius: 10,
   width: '40%',
  },
  btnStyle2: {
   borderColor: '#000',
   margin: 10,
   padding:10,
   borderRadius: 10,
   borderWidth: 1,
   width: '40%',
  },
  btnStyle3:{
   backgroundColor: '#FFEDE8',
   padding: 14,
   borderRadius: 29,
   width: '40%',
  },
  img: {
   height: 135,
   width: 135,
   margin: 10,
  },
  navigationContainer:{
   backgroundColor:'#1d6362'
  },
  row:{
   flexDirection:'row',
  },
  col:{
    width:'50%',
    alignItems:'center'
   },
  btnContainer1:{
    flexDirection:'row',
    margin:10
    },
  secBtnStyle:{
    backgroundColor:'#214c40',
    padding: 14,
    borderRadius: 10,
    margin:5,
    width:'45%'
   },
  headerBtnStyle:{
    backgroundColor:'#0b7ffe',
    padding: 10,
    borderRadius: 5,
    margin:5,
  },
  secBtnStyle2:{
    borderColor:'#0D6EFD',
    borderWidth:2,
    padding: 14,
    borderRadius: 10,
    color:'#0D6EFD',
    margin:5,
    width:'60%'
   },
  secBtnStyle2Hover:{
    backgroundColor:'#0D6EFD',
  },
  colFooter:{
    width:'25%',
    alignItems:'center',
  },
  profile:{
    borderRadius:100,
    height:100,
    width:100
   },
   btnStyle4:{
     borderColor: '#1f4b3f',
     padding: 14,
     marginTop: 20,
     width:'80%',
     borderWidth: 2,
   },
   serviceSlider:{
     height:170,
     width:320,
     borderRadius:15
   },
   serviceBtn:{
     backgroundColor: '#214c40',
     padding: 14,
     margin: 10,
     width:'100%',
     borderRadius:13,
     width:'80%'
   },
   dropdown: {
     backgroundColor: '#ffff',
     borderColor:'#ffff',
     borderWidth:1.4,
     color:'white'
   },
   dropdownContainer: {
     width: '80%',
     margin:10,
   },
   dropdownLabel: {
     color: '#ffff',
     fontSize:17,
     padding:16
   },
   placeholderStyle: {
     color: 'white',
     fontSize:18
   },
   arrowIconStyle: {
     color:'white'
    },
   }
  )
export default style;