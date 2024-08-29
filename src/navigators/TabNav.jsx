import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../theme/theme';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Menu from '../screens/Menu';
import Favorites from '../screens/Favorites';
import Locations from '../screens/Locations';


const Tab = createBottomTabNavigator();

const TabNav = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown: false, 
                tabBarHideOnKeyboard: true, 
                tabBarShowLabel: true, 
                tabBarStyle: styles.tabBarStyle,
                activeTintColor: COLORS.primary,
                inactiveTintColor: COLORS.grey,
            }}
        > 

            <Tab.Screen name='Home' component={Home} options={{
                tabBarIcon: ({focused, color, size}) => (
                    <Entypo 
                        name='shop' 
                        size={25}
                        color={focused ? COLORS.primary : COLORS.grey}
                        style={styles.icon}
                    />
                )
            }}/>

            <Tab.Screen name='Menu'component={Menu} options={{
                tabBarIcon: ({focused, color, size}) => (
                    <FontAwesome5 
                        name='cookie-bite' 
                        size={24}
                        color={focused ? COLORS.primary : COLORS.grey}
                        style={styles.icon}
                    />
                )
            }}/>   

            <Tab.Screen name='Cart'component={Cart} options={{
                tabBarIcon: ({focused, color, size}) => (
                    <FontAwesome5 
                        name='shopping-bag' 
                        size={24}
                        color={focused ? COLORS.primary : COLORS.grey}
                        style={styles.icon}
                    />
                )
            }}/>

            <Tab.Screen name='Favorites'component={Favorites} options={{
                tabBarIcon: ({focused, color, size}) => (
                    <Ionicons 
                        name='heart' 
                        size={24}
                        color={focused ? COLORS.primary : COLORS.grey}
                        style={styles.icon}
                    />
                )
            }}/>           

            <Tab.Screen name='Locations'component={Locations} options={{
                tabBarIcon: ({focused, color, size}) => (
                    <Ionicons 
                        name='location' 
                        size={24}
                        color={focused ? COLORS.primary : COLORS.grey}
                        style={styles.icon}
                    />
                )
            }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'absolute',
        bottom: 0,
        elevation: 0,
        borderColor: COLORS.black,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 4
        },
        alignItems: 'flex-end'
    },
});

export default TabNav;