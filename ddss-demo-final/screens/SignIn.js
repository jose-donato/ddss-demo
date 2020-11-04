import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {
    Input,
    Card,
    Button
} from 'react-native-elements';
import {login as apiLogin} from "../utils/api"

const SignIn = ({ navigation, login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signInError, setSignInError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSignIn = async () => {
        setSignInError("")
        try {
            setLoading(true)
            const data = await apiLogin(username, password)
            setLoading(false)
            if(data.success) {
                login(data.token) //call function that comes from App (to set token to secure-store or jwt local variable)
            } else {
                setSignInError("Wrong credentials")
            }
        } catch(err) {
            setSignInError("Wrong credentials")
            setLoading(false)
        }
    };

    return (
        <View>
            <Card>
                <Input
                    accessibilityLabel="signin_usernameInput"
                    label={'Username'}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <Input
                    accessibilityLabel="signin_passwordInput"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {loading && <ActivityIndicator size="large" />}
                <Text style={{ color: 'red', marginLeft: 10, fontSize: 10 }}>
                    {signInError && signInError}
                </Text>
                <Button
                    accessibilityLabel="signin_submitButton"
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