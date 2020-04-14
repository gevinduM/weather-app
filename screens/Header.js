import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Appbar, TextInput} from 'react-native-paper';


const Header = ({name,countrycode}) =>{
  
    
    return(
        <Appbar.Header theme ={{colors:{primary:'#53D769'}}}>

            {countrycode ?  <Image  source={{uri:`https://www.countryflags.io/${countrycode}/flat/64.png`}} style={{marginLeft:10, width:32,height:32}}/> : <Text></Text>} 
           
            <Appbar.Content title={name} subtitle="Weather"/>
           
            {countrycode ?  <Image  source={{uri:`https://www.countryflags.io/${countrycode}/flat/64.png`}} style={{marginLeft:10, width:32,height:32}}/> : <Text></Text>} 
           
      </Appbar.Header>
    )
}

export default Header;