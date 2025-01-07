import React, { useState } from 'react';
    import { View, StyleSheet, Alert } from 'react-native';
    import { Text, Input, Button } from 'react-native-elements';
    import { useNavigation } from '@react-navigation/native';
    import { useAuth } from '../context/AuthContext';

    const LoginScreen = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const navigation = useNavigation();
      const { signIn, signInWithGoogle } = useAuth();

      const handleLogin = async () => {
        if (!email || !password) {
          Alert.alert('Error', 'Please enter both email and password.');
          return;
        }

        try {
          await signIn(email, password);
          navigation.navigate('Home');
        } catch (error) {
          Alert.alert('Login Failed', error.message);
        }
      };

      const handleGoogleLogin = async () => {
        try {
          await signInWithGoogle();
          navigation.navigate('Home');
        } catch (error) {
          Alert.alert('Google Login Failed', error.message);
        }
      };

      return (
        <View style={styles.container}>
          <Text h4 style={styles.title}>
            Login
          </Text>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            containerStyle={styles.inputContainer}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            containerStyle={styles.inputContainer}
          />
          <Button
            title="Login"
            onPress={handleLogin}
            containerStyle={styles.buttonContainer}
          />
          <Button
            title="Login with Google"
            onPress={handleGoogleLogin}
            containerStyle={styles.buttonContainer}
          />
          <Text style={styles.registerText} onPress={() => navigation.navigate('Register')}>
            Don't have an account? Register here.
          </Text>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
      },
      title: {
        marginBottom: 20,
        textAlign: 'center',
      },
      inputContainer: {
        marginBottom: 10,
      },
      buttonContainer: {
        marginTop: 10,
      },
      registerText: {
        marginTop: 20,
        textAlign: 'center',
        color: 'blue',
        textDecorationLine: 'underline',
      },
    });

    export default LoginScreen;
