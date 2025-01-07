import React from 'react';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    import { Provider } from 'react-redux';
    import { store } from './store';
    import {
      HomeScreen,
      ProductDetailsScreen,
      CartScreen,
      CheckoutScreen,
      OrdersScreen,
      LoginScreen,
      ProfileScreen,
      RegisterScreen
    } from './screens';
    import { AuthProvider } from './context/AuthContext';

    const Stack = createStackNavigator();

    const App = () => {
      return (
        <Provider store={store}>
          <AuthProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} />
                <Stack.Screen name="Orders" component={OrdersScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
        </Provider>
      );
    };

    export default App;
