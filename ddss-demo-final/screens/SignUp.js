import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {
    Input,
    Card,
    Button
} from 'react-native-elements';
import { register as apiRegister } from "../utils/api"


const SignUp = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [signUpError, setSignUpError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        setSignUpError("")
        if(password !== passwordConfirm) {
            setSignUpError("Password and password confirm are different")
            return;
        }
        try {
            setLoading(true)
            const data = await apiRegister(username, password)
            setLoading(false)
            if (data.success) {
                navigation.navigate("SignIn")
            } else {
                setSignUpError("Error happened.")
            }
        } catch (err) {
            setLoading(false)
            setSignUpError("Error happened.")
        }
    };

    //useEffect(() => { }, [SignUpErrors]);

    return (
        <View style={{ paddingVertical: 20 }}>
            <Card>
                <Input
                    label={'Username'}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
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
                {loading && <ActivityIndicator size="large" />}
                <Text style={{ color: 'red', marginLeft: 10, fontSize: 10 }}>
                    {signUpError && signUpError}
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
}

export default SignUp;