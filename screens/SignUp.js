import React, { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import {
    Input,
    Card,
    FormValidationMessage,
    Button
} from 'react-native-elements';


const SignUp = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [SignUpErrors, setSignUpErrors] = useState({});

    const handleSignUp = () => {

        const data = {
            username: username,
            password: password,
            password_confirmation: passwordConfirm
        };

        const messages = {
            required: field => `${field} is required`,
            'username.alpha': 'Username contains unallowed characters',
            'username.username': 'Please enter a valid username address',
            'password.min':
                'Password is too short. Must be greater than 6 characters',
            'password.confirmed': 'Passwords do not match'
        };

        signUp({ username, password });
    };

    useEffect(() => {}, [SignUpErrors]);

    return (
        <View style={{ paddingVertical: 20 }}>
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
                    label={'Password'}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Input
                    label={'Password Confirm'}
                    placeholder="Enter password again"
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    secureTextEntry
                />
                <Text style={{ color: 'red', marginLeft: 10, fontSize: 10 }}>
                    {SignUpErrors ? SignUpErrors.password : null}
                </Text>

                <Button
                    buttonStyle={{ margin: 10, marginTop: 50 }}
                    backgroundColor="#03A9F4"
                    title="SIGN UP"
                    onPress={() => handleSignUp()}
                />
                <Text style={{ marginLeft: 80 }} onPress={() => navigation.navigate("SignIn")}>
                    Already Signed Up? Sign In
                </Text>
            </Card>
        </View>
    );
};

export default SignUp;