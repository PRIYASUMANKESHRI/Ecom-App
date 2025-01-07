import React, { useState } from 'react';
    import { View, StyleSheet, Alert } from 'react-native';
    import { Text, Input, Button } from 'react-native-elements';
    import { useNavigation } from '@react-navigation/native';
    import { useAuth } from '../context/AuthContext';

    const RegisterScreen = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const navigation = useNavigation();
      const { signUp } = useAuth();

      const handleRegister = async () => {
        if (!email || !password) {
          Alert.alert('Error', 'Please enter both email and password.');
          return;
        }

        try {
          await signUp(email, password);
          navigation.navigate('Home');
        } catch (error) {
          Alert.alert('Registration Failed', error.message);
        }
      };

      return (
        <View style={styles.container}>
          <Text h4 style={styles.title}>
            Register
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
            title="Register"
            onPress={handleRegister}
            containerStyle={styles.buttonContainer}
          />
          <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
            Already have an account? Login here.
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
      loginText: {
        marginTop: 20,
        textAlign: 'center',
        color: 'blue',
        textDecorationLine: 'underline',
      },
    });

    export default RegisterScreen;
