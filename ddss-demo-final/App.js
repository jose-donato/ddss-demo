import React, { useEffect, useState } from 'react';
import { Platform, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import * as SecureStore from 'expo-secure-store';
//import Splash from './screens/Splash';
import Home from './screens/Home';

const Stack = createStackNavigator();

function App({ navigation }) {
  const [jwt, setJwt] = useState('');
  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      SecureStore.getItemAsync('jwt').then((val) => {
        setJwt(val);
      });
    }
  }, []);

  async function login(jwt) {
    //make api call to login
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      await SecureStore.setItemAsync('jwt', jwt);
    }
    setJwt(jwt);
  }
  async function logout() {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      await SecureStore.deleteItemAsync('jwt');
    }
    setJwt('');
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {jwt ? (
          <Stack.Screen
            name="Home"
            options={{
              headerTitle: 'DDSS-DEMO • Home',
              headerRight: () => (
                <Button color="#2089DC" onPress={logout} title="Logout" />
              ),
            }}>
            {(props) => <Home {...props} logout={() => logout()} jwt={jwt} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              options={{
                title: 'DDSS-DEMO • Sign in',
              }}>
              {(props) => <SignIn {...props} login={login} />}
            </Stack.Screen>
            <Stack.Screen
              name="SignUp"
              options={{
                title: 'DDSS-DEMO • Sign up',
              }}>
              {(props) => (
                <SignUp
                  {...props}
                  register={() => navigation.navigate('Home')}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
