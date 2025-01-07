import React, { useState, useEffect } from 'react';
    import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
    import { Text, ListItem } from 'react-native-elements';
    import { supabase } from '../supabase';

    const OrdersScreen = () => {
      const [orders, setOrders] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        fetchOrders();
      }, []);

      const fetchOrders = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', supabase.auth.currentUser?.id)
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching orders:', error);
          } else {
            setOrders(data);
          }
        } catch (error) {
          console.error('Unexpected error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      };

      const renderItem = ({ item }) => (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Order ID: {item.id}</ListItem.Title>
            <ListItem.Subtitle>
              Total: ${item.total.toFixed(2)}
            </ListItem.Subtitle>
            <Text>
              Items: {item.items.map((i) => i.name).join(', ')}
            </Text>
            <Text>
              Address: {item.address}
            </Text>
            <Text>
              Payment Info: {item.paymentInfo}
            </Text>
          </ListItem.Content>
        </ListItem>
      );

      if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }

      return (
        <View style={styles.container}>
          {orders.length === 0 ? (
            <Text style={styles.noOrdersText}>No orders found.</Text>
          ) : (
            <FlatList
              data={orders}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      noOrdersText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
      },
    });

    export default OrdersScreen;
