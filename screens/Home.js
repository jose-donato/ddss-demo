import React from 'react';
import {View, Text, Button} from 'react-native';
import { callApi } from '../utils/api';

export default function Home({navigation, logout}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={logout} title="Logout" />
      <Button onPress={() => callApi()} title="Call API" />
    </View>
  );
};