import React, { useState, useEffect } from 'react';
    import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
    import { SearchBar, ListItem, Text, Button } from 'react-native-elements';
    import { useNavigation } from '@react-navigation/native';
    import { supabase } from '../supabase';

    const HomeScreen = () => {
      const [products, setProducts] = useState([]);
      const [search, setSearch] = useState('');
      const [loading, setLoading] = useState(true);
      const navigation = useNavigation();

      useEffect(() => {
        fetchProducts();
      }, []);

      const fetchProducts = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase.from('products').select('*');
          if (error) {
            console.error('Error fetching products:', error);
          } else {
            setProducts(data);
          }
        } catch (error) {
          console.error('Unexpected error fetching products:', error);
        } finally {
          setLoading(false);
        }
      };

      const handleSearch = (text) => {
        setSearch(text);
      };

      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );

      const renderItem = ({ item }) => (
        <ListItem
          bottomDivider
          onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
        >
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>${item.price}</ListItem.Subtitle>
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
          <SearchBar
            placeholder="Search products..."
            onChangeText={handleSearch}
            value={search}
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
          />
          {filteredProducts.length === 0 ? (
            <Text style={styles.noProductsText}>No products found.</Text>
          ) : (
            <FlatList
              data={filteredProducts}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
          <Button
            title="Go to Cart"
            onPress={() => navigation.navigate('Cart')}
            containerStyle={styles.buttonContainer}
          />
          <Button
            title="Go to Orders"
            onPress={() => navigation.navigate('Orders')}
            containerStyle={styles.buttonContainer}
          />
          <Button
            title="Go to Profile"
            onPress={() => navigation.navigate('Profile')}
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
      searchContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
      },
      searchInputContainer: {
        backgroundColor: '#f0f0f0',
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      noProductsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
      },
      buttonContainer: {
        marginVertical: 5,
      },
    });

    export default HomeScreen;
