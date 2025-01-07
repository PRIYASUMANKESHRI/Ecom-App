import React, { useState, useEffect } from 'react';
    import { View, StyleSheet, Alert } from 'react-native';
    import { Text, Button, Input } from 'react-native-elements';
    import { useAuth } from '../context/AuthContext';

    const ProfileScreen = () => {
      const { user, signOut, updateProfile } = useAuth();
      const [displayName, setDisplayName] = useState('');
      const [email, setEmail] = useState('');

      useEffect(() => {
        if (user) {
          setDisplayName(user.displayName || '');
          setEmail(user.email || '');
        }
      }, [user]);

      const handleUpdateProfile = async () => {
        try {
          await updateProfile({ displayName });
          Alert.alert('Success', 'Profile updated successfully!');
        } catch (error) {
          Alert.alert('Error', 'Failed to update profile.');
        }
      };

      const handleSignOut = async () => {
        try {
          await signOut();
        } catch (error) {
          Alert.alert('Error', 'Failed to sign out.');
        }
      };

      return (
        <View style={styles.container}>
          <Text h4 style={styles.title}>
            Profile
          </Text>
          <Text style={styles.emailText}>Email: {email}</Text>
          <Input
            placeholder="Display Name"
            value={displayName}
            onChangeText={setDisplayName}
            containerStyle={styles.inputContainer}
          />
          <Button
            title="Update Profile"
            onPress={handleUpdateProfile}
            containerStyle={styles.buttonContainer}
          />
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            containerStyle={styles.buttonContainer}
          />
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
      emailText: {
        fontSize: 16,
        marginBottom: 10,
      },
      inputContainer: {
        marginBottom: 10,
      },
      buttonContainer: {
        marginTop: 10,
      },
    });

    export default ProfileScreen;
