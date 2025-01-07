import React, { useState } from 'react';
    import { View, StyleSheet, Alert } from 'react-native';
    import { Text, Button, Input } from 'react-native-elements';
    import { useSelector, useDispatch } from 'react-redux';
    import { clearCart } from '../store/cartSlice';
    import { useNavigation } from '@react-navigation/native';
    import { supabase } from '../supabase';

    const CheckoutScreen = () => {
      const cartItems = useSelector((state) => state.cart.items);
      const dispatch = useDispatch();
      const navigation = useNavigation();
      const [address, setAddress] = useState('');
      const [paymentInfo, setPaymentInfo] = useState('');

      const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
      };

      const handleCheckout = async () => {
        if (cartItems.length === 0) {
          Alert.alert('Cart Empty', 'Please add items to your cart before checking out.');
          return;
        }

        if (!address || !paymentInfo) {
          Alert.alert('Missing Information', 'Please provide your address and payment information.');
          return;
        }

        try {
          const orderData = {
            items: cartItems,
            total: calculateTotal(),
            address: address,
            paymentInfo: paymentInfo,
            user_id: supabase.auth.currentUser?.id,
            created_at: new Date().toISOString(),
          };

          const { error } = await supabase.from('orders').insert([orderData]);

          if (error) {
            console.error('Error saving order:', error);
            Alert.alert('Error', 'There was an error processing your order. Please try again.');
          } else {
            Alert.alert('Order Successful', 'Your order has been placed successfully!');
            dispatch(clearCart());
            navigation.navigate('Orders');
          }
        } catch (error) {
          console.error('Unexpected error during checkout:', error);
          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
      };

      return (
        <View style={styles.container}>
          <Text h4 style={styles.title}>
            Checkout
          </Text>
          <Input
            placeholder="Shipping Address"
            value={address}
            onChangeText={setAddress}
            containerStyle={styles.inputContainer}
          />
          <Input
            placeholder="Payment Information"
            value={paymentInfo}
            onChangeText={setPaymentInfo}
            containerStyle={styles.inputContainer}
          />
          <Text style={styles.totalText}>
            Total: ${calculateTotal().toFixed(2)}
          </Text>
          <Button
            title="Place Order"
            onPress={handleCheckout}
            containerStyle={styles.buttonContainer}
          />
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
      },
      title: {
        marginBottom: 20,
        textAlign: 'center',
      },
      inputContainer: {
        marginBottom: 10,
      },
      totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginVertical: 10,
      },
      buttonContainer: {
        marginTop: 20,
      },
    });

    export default CheckoutScreen;
