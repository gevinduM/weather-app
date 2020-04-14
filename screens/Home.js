import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image,AsyncStorage} from 'react-native';
import { TextInput, Button, Card, Title  } from 'react-native-paper';

import Header from './Header'


const Home = (props) => {

    const [info,setInfo] = useState({
        name : "Loading ...",
        temp : "Loading ...",
        humidity : "Loading ...",
        desc : "Loading ...",
        icon : "Loading",
        cuntryCOde : "Loading"


    });


    let defaultCity;
 
    useEffect(()=>{
        console.log("useEffect");
        checkProps()
     },[props])
    
     const checkProps = async () =>{

        if(!props.route.params){

            const value = await AsyncStorage.getItem('selectedCity');
            
            if(value){
                defaultCity = value;
                getWeather();
            }else{
                fetch("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB67W-YnkrSafHq_6UOV5QeTNTNJXJG-lY", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${responseJson.location.lat},${responseJson.location.lng}&key=AIzaSyB67W-YnkrSafHq_6UOV5QeTNTNJXJG-lY`)
                    .then((responsegeocode) => responsegeocode.json())
                    .then((results) => {
                    
                        defaultCity = results.results[4].address_components[1].long_name;
                        getWeather();
                    })
                })
            }
        }else{
          
            console.log(props.route.params,"else");
            defaultCity = props.route.params.city;
            getWeather();
        }

    }

    const getWeather = () =>{

        console.log("getWeather request sent!");
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&APPID=bc9082ded5a6e79e94ea590f21fa58bc&units=metric`)
        .then(data=> data.json())
        .then(results =>{
           
            setInfo({
                name : results.name,
                temp : results.main.temp,
                humidity : results.main.humidity,
                desc : results.weather[0].description,
                icon : results.weather[0].icon,
                cuntryCOde : results.sys.country
            });

        })

    }


    return(
        <View style={{flex:1}}>
            <Header name={info.name} countrycode={info.cuntryCOde}/>

            <View style={{flex:0.5, alignItems:"center", justifyContent:'center'}}>
                <Image style={{marginLeft:10, width:132,height:132}} source={{ uri: 'https://api.openweathermap.org/img/w/'+info.icon+".png" }} />
            </View>

            <Card style={{margin:10}}>
                <Title style={styles.Title}>Temprature  : {info.temp} </Title>
                <Title style={styles.Title}>Humudity     : {info.humidity}</Title>
                <Title style={styles.Title}>Summary     : {info.desc}</Title>
               
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    Title:{
        margin:10
    }
});

export default Home;