import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import * as SecureStore from 'expo-secure-store';
//import Splash from './screens/Splash';
import Home from "./screens/Home";

const Stack = createStackNavigator();

function App({ navigation }) {
    const [user, setUser] = useState("")
    useEffect(() => {
        if (Platform.OS === "android" || Platform.OS === "ios") {
            SecureStore.getItemAsync("user").then(val => {
                setUser(val)
            })
        }
    }, [])

    async function login(user) {
        if (Platform.OS === "android" || Platform.OS === "ios") {
            await SecureStore.setItemAsync("user", user)
        }
        setUser(user)
    }
    async function logout() {
        if (Platform.OS === "android" || Platform.OS === "ios") {
            await SecureStore.deleteItemAsync("user")
        }
        setUser("")
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ?
                    <>
                        <Stack.Screen 
                            name="Home"
                            options={{
                                title: 'DDSS-DEMO • Home',
                            }}
                        >
                            {props => <Home {...props} logout={() => logout()} />}
                        </Stack.Screen>
                    </>
                    :
                    <>
                        <Stack.Screen
                            name="SignIn"
                            options={{
                                title: 'DDSS-DEMO • Sign in',
                            }}
                        >
                            {props => <SignIn {...props} login={login} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name="SignUp"
                            options={{
                                title: 'DDSS-DEMO • Sign up',
                            }}
                        >
                            {props => <SignUp {...props} register={() => navigation.navigate("Home")} />}
                        </Stack.Screen>
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;