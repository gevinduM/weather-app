import React from 'react';
import { StyleSheet, View} from 'react-native';
import Search from './screens/Search'
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Tab = createMaterialBottomTabNavigator();

export default  App = () => {

  return (
    <NavigationContainer>
       <Tab.Navigator
          initialRouteName="Home"
          activeColor="#f0edf6"
          inactiveColor="black"
          barStyle={{ backgroundColor: '#53D769' }}
       >
        <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
        <Tab.Screen 
            name="Search" 
            component={Search} 
            options={{
              tabBarLabel: 'Search',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="city" color={color} size={26} />
              ),
            }}
        />
      </Tab.Navigator>
    </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

