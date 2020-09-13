import React, { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';


const SignIn = ({ navigation, login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [SignUpErrors, setSignUpErrors] = useState({});


    const handleSignIn = () => {

        const data = {
            username: username,
            password: password
        };

        const messages = {
            required: field => `${field} is required`,
            'username.alpha': 'Username contains unallowed characters',
            'username.username': 'Please enter a valid username address',
            'password.min': 'Wrong Password?'
        };
        //navigation.navigate("Home")
        login(username)
        //signIn({ username, password });
    };

    return (
        <View>
            <Card>
                <Input
                    label={'Username'}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.username : null}
                />
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    errorStyle={{ color: 'red' }}
                    errorMessage={SignUpErrors ? SignUpErrors.password : null}
                />
                <Button
                    buttonStyle={{ margin: 10, marginTop: 50 }}
                    title="Sign in"
                    onPress={() => handleSignIn()}
                />
                <Text style={{ marginLeft: 100 }} onPress={() => navigation.navigate("SignUp")}>
                    No Acount? Sign Up
                </Text>
            </Card>
        </View>
    );
};

export default SignIn;