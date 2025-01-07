import React, { useState, useEffect } from 'react';
    import { View, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
    import { Text, Button } from 'react-native-elements';
    import { useNavigation, useRoute } from '@react-navigation/native';
    import { useDispatch } from 'react-redux';
    import { addToCart } from '../store/cartSlice';
    import { supabase } from '../supabase';

    const ProductDetailsScreen = () => {
      const [product, setProduct] = useState(null);
      const [loading, setLoading] = useState(true);
      const navigation = useNavigation();
      const route = useRoute();
      const { productId } = route.params;
      const dispatch = useDispatch();

      useEffect(() => {
        fetchProductDetails();
      }, [productId]);

      const fetchProductDetails = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();
          if (error) {
            console.error('Error fetching product details:', error);
          } else {
            setProduct(data);
          }
        } catch (error) {
          console.error('Unexpected error fetching product details:', error);
        } finally {
          setLoading(false);
        }
      };

      const handleAddToCart = () => {
        if (product) {
          dispatch(addToCart(product));
          navigation.navigate('Cart');
        }
      };

      if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }

      if (!product) {
        return (
          <View style={styles.container}>
            <Text>Product not found.</Text>
          </View>
        );
      }

      return (
        <ScrollView style={styles.container}>
          <Image
            source={{ uri: product.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.detailsContainer}>
            <Text h4 style={styles.title}>
              {product.name}
            </Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.stock}>
              Stock Available: {product.stock}
            </Text>
            <Button
              title="Add to Cart"
              onPress={handleAddToCart}
              containerStyle={styles.buttonContainer}
            />
          </View>
        </ScrollView>
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
      image: {
        width: '100%',
        height: 300,
        marginBottom: 10,
      },
      detailsContainer: {
        padding: 10,
      },
      title: {
        marginBottom: 10,
      },
      price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      description: {
        fontSize: 16,
        marginBottom: 10,
      },
      stock: {
        fontSize: 16,
        marginBottom: 10,
      },
      buttonContainer: {
        marginTop: 10,
      },
    });

    export default ProductDetailsScreen;
