import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from './src/navigators/TabNav';
import Details from './src/screens/Details';
import Menu from './src/screens/Menu';
import Favorites from "./src/screens/Favorites";
import Locations from "./src/screens/Locations";
import Cart from "./src/screens/Cart";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name='TabNav'
                        component={TabNav}
                    >
                    </Stack.Screen>
                    <Stack.Screen
                        name='Details'
                        component={Details}
                    >
                    </Stack.Screen>
                    <Stack.Screen
                        name='Menu'
                        component={Menu}
                    >
                    </Stack.Screen>
                    <Stack.Screen
                        name='Cart'
                        component={Cart}
                    >
                    </Stack.Screen>
                    <Stack.Screen
                        name='Favorites'
                        component={Favorites}
                    >
                    </Stack.Screen>
                    <Stack.Screen
                        name='Locations'
                        component={Locations}
                    >
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default App;