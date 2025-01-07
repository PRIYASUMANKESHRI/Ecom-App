import React from 'react';
    import { View, FlatList, StyleSheet } from 'react-native';
    import { Text, ListItem, Button } from 'react-native-elements';
    import { useSelector, useDispatch } from 'react-redux';
    import { removeFromCart } from '../store/cartSlice';
    import { useNavigation } from '@react-navigation/native';

    const CartScreen = () => {
      const cartItems = useSelector((state) => state.cart.items);
      const dispatch = useDispatch();
      const navigation = useNavigation();

      const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
      };

      const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
      };

      const renderItem = ({ item }) => (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>${item.price}</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            title="Remove"
            onPress={() => handleRemoveFromCart(item.id)}
          />
        </ListItem>
      );

      return (
        <View style={styles.container}>
          {cartItems.length === 0 ? (
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          ) : (
            <>
              <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              />
              <Text style={styles.totalText}>
                Total: ${calculateTotal().toFixed(2)}
              </Text>
              <Button
                title="Proceed to Checkout"
                onPress={() => navigation.navigate('Checkout')}
                containerStyle={styles.checkoutButton}
              />
            </>
          )}
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
      },
      emptyCartText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
      },
      totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginVertical: 10,
      },
      checkoutButton: {
        marginTop: 10,
      },
    });

    export default CartScreen;
