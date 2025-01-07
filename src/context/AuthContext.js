
    import React, { createContext, useState, useEffect, useContext } from 'react';
    import { supabase } from '../supabase';
    import * as Google from 'expo-auth-session/providers/google';
    import * as WebBrowser from 'expo-web-browser';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    WebBrowser.maybeCompleteAuthSession();

    const AuthContext = createContext();

    const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        iosClientId: 'YOUR_IOS_CLIENT_ID',
        webClientId: 'YOUR_WEB_CLIENT_ID',
      });

      useEffect(() => {
        const loadSession = async () => {
          const session = await supabase.auth.getSession();
          if (session?.data?.session) {
            setUser(session.data.session.user);
          }
          setLoading(false);
        };

        loadSession();

        supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            setUser(session.user);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        });
      }, []);

      useEffect(() => {
        if (response?.type === 'success') {
          const { access_token } = response.authentication;
          signInWithGoogle(access_token);
        }
      }, [response]);

      const signIn = async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) {
            throw error;
          }
          setUser(data.user);
        } catch (error) {
          throw error;
        }
      };

      const signUp = async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) {
            throw error;
          }
          setUser(data.user);
        } catch (error) {
          throw error;
        }
      };

      const signOut = async () => {
        try {
          await supabase.auth.signOut();
          setUser(null);
        } catch (error) {
          throw error;
        }
      };

      const signInWithGoogle = async (access_token) => {
        try {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: access_token,
          });
          if (error) {
            throw error;
          }
          setUser(data.user);
        } catch (error) {
          throw error;
        }
      };

      const updateProfile = async (profileData) => {
        try {
          const { data, error } = await supabase.auth.updateUser(profileData);
          