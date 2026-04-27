import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const mockCartItems = [
  {
    id: '1',
    name: 'Tom Yummy',
    description: 'Spicy and sour soup with shrimp',
    price: 5000,
    quantity: 2,
    image: 'https://picsum.photos/seed/tomyummy/80/80',
  },
  {
    id: '2',
    name: 'Singapore Sling',
    description: 'Classic cocktail with gin and cherry',
    price: 6000,
    quantity: 1,
    image: 'https://picsum.photos/seed/singaporesling/80/80',
  },
  {
    id: '3',
    name: 'White Russian',
    description: 'Creamy cocktail with vodka and coffee liqueur',
    price: 5000,
    quantity: 1,
    image: 'https://picsum.photos/seed/whiterussian/80/80',
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const navigation = useNavigation();
  
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          onPress: () => setCartItems(prev => prev.filter(item => item.id !== id)),
          style: 'destructive'
        },
      ]
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const renderCartItem = ({ item, index }) => {
    const itemAnim = new Animated.Value(0);
    
    React.useEffect(() => {
      Animated.timing(itemAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={{
          opacity: itemAnim,
          transform: [
            {
              translateY: itemAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
          <View className="flex-row">
            <Image
              source={{ uri: item.image }}
              className="w-20 h-20 rounded-xl"
              resizeMode="cover"
            />
            <View className="ml-4 flex-1">
              <Text className="text-gray-800 text-lg font-semibold">
                {item.name}
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                {item.description}
              </Text>
              <Text className="text-primary text-lg font-bold mt-2">
                Frw {item.price.toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              className="p-2"
            >
              <Trash2 size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
          
          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-2">
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, -1)}
                className="p-1"
              >
                <Minus size={16} color="#6B7280" />
              </TouchableOpacity>
              <Text className="mx-4 text-gray-800 font-medium">
                {item.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, 1)}
                className="p-1"
              >
                <Plus size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <Text className="text-gray-800 font-semibold">
              Frw {(item.price * item.quantity).toLocaleString()}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  if (cartItems.length === 0) {
    return (
      <View className="flex-1 bg-gray-50">
        <SafeAreaView className="flex-1">
          {/* Header */}
          <View className="bg-white px-6 pt-4 pb-4 shadow-sm">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color="#374151" />
              </TouchableOpacity>
              <Text className="text-gray-800 text-xl font-semibold ml-4">
                Cart
              </Text>
            </View>
          </View>

          {/* Empty Cart */}
          <View className="flex-1 items-center justify-center px-6">
            <ShoppingBag size={80} color="#D1D5DB" />
            <Text className="text-gray-500 text-xl font-semibold mt-4">
              Your cart is empty
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              Add some delicious items to get started
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              className="bg-primary rounded-2xl px-8 py-4 mt-6"
            >
              <Text className="text-white font-semibold">Browse Restaurants</Text>
            </TouchableOpacity>
          </View>

          <BottomTabNavigator activeTab="cart" />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="bg-white px-6 pt-4 pb-4 shadow-sm">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-gray-800 text-xl font-semibold ml-4">
              Cart ({cartItems.length})
            </Text>
          </View>
        </View>

        {/* Cart Items */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6 pt-6"
        >
          {cartItems.map((item, index) => (
            <View key={item.id}>
              {renderCartItem({ item, index })}
            </View>
          ))}
          
          {/* More drinks link */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('RestaurantDetail')}
            className="items-center py-4 mb-4"
          >
            <Text className="text-primary font-medium">
              more drinks →
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Checkout Section */}
        <View className="bg-white px-6 py-4 border-t border-gray-200">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-600 text-lg">Total</Text>
            <Text className="text-primary text-2xl font-bold">
              Frw {calculateTotal().toLocaleString()}
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={handleCheckout}
            className="bg-primary rounded-2xl py-4 items-center shadow-lg"
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-semibold">
              Proceed to checkout
            </Text>
          </TouchableOpacity>
        </View>

        <BottomTabNavigator activeTab="cart" />
      </SafeAreaView>
    </View>
  );
}
