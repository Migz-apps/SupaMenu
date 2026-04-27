import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, CreditCard, Plus, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function CheckoutScreen() {
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('card');
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

  const addresses = [
    {
      id: 'home',
      type: 'Home',
      address: 'KG 123 St, Kigali, Rwanda',
      isDefault: true,
    },
    {
      id: 'work',
      type: 'Work',
      address: 'KN 456 Ave, Kigali Business Center',
      isDefault: false,
    },
  ];

  const paymentMethods = [
    {
      id: 'card',
      type: 'Credit Card',
      last4: '1234',
      isDefault: true,
    },
    {
      id: 'mobile',
      type: 'Mobile Money',
      number: '+250 788 123 456',
      isDefault: false,
    },
  ];

  const orderSummary = {
    subtotal: 16000,
    delivery: 2000,
    tax: 1600,
    total: 19600,
  };

  const handlePlaceOrder = () => {
    Alert.alert(
      'Confirm Order',
      'Are you ready to place your order?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Place Order', 
          onPress: () => {
            navigation.navigate('OrderTracking');
          }
        },
      ]
    );
  };

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
              Checkout
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          {/* Delivery Address */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white mx-6 mt-6 rounded-2xl p-4 shadow-sm"
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-gray-800 text-lg font-semibold">
                Delivery Address
              </Text>
              <TouchableOpacity>
                <Plus size={20} color="#FF6B35" />
              </TouchableOpacity>
            </View>
            
            {addresses.map((address) => (
              <TouchableOpacity
                key={address.id}
                onPress={() => setSelectedAddress(address.id)}
                className={`flex-row items-start p-3 rounded-xl mb-2 border ${
                  selectedAddress === address.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200'
                }`}
              >
                <View className="mt-1">
                  <MapPin size={16} color={selectedAddress === address.id ? '#FF6B35' : '#6B7280'} />
                </View>
                <View className="ml-3 flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-gray-800 font-medium">
                      {address.type}
                    </Text>
                    {address.isDefault && (
                      <View className="bg-primary/10 px-2 py-1 rounded-full ml-2">
                        <Text className="text-primary text-xs">Default</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-gray-500 text-sm mt-1">
                    {address.address}
                  </Text>
                </View>
                <View className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAddress === address.id
                    ? 'border-primary'
                    : 'border-gray-300'
                }`}>
                  {selectedAddress === address.id && (
                    <Check size={12} color="#FF6B35" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Payment Method */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white mx-6 mt-6 rounded-2xl p-4 shadow-sm"
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-gray-800 text-lg font-semibold">
                Payment Method
              </Text>
              <TouchableOpacity>
                <Plus size={20} color="#FF6B35" />
              </TouchableOpacity>
            </View>
            
            {paymentMethods.map((payment) => (
              <TouchableOpacity
                key={payment.id}
                onPress={() => setSelectedPayment(payment.id)}
                className={`flex-row items-center p-3 rounded-xl mb-2 border ${
                  selectedPayment === payment.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200'
                }`}
              >
                <View className="mt-1">
                  <CreditCard size={16} color={selectedPayment === payment.id ? '#FF6B35' : '#6B7280'} />
                </View>
                <View className="ml-3 flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-gray-800 font-medium">
                      {payment.type}
                    </Text>
                    {payment.isDefault && (
                      <View className="bg-primary/10 px-2 py-1 rounded-full ml-2">
                        <Text className="text-primary text-xs">Default</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-gray-500 text-sm mt-1">
                    {payment.last4 || payment.number}
                  </Text>
                </View>
                <View className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPayment === payment.id
                    ? 'border-primary'
                    : 'border-gray-300'
                }`}>
                  {selectedPayment === payment.id && (
                    <Check size={12} color="#FF6B35" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Order Summary */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white mx-6 mt-6 rounded-2xl p-4 shadow-sm mb-24"
          >
            <Text className="text-gray-800 text-lg font-semibold mb-4">
              Order Summary
            </Text>
            
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Subtotal</Text>
                <Text className="text-gray-800">Frw {orderSummary.subtotal.toLocaleString()}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Delivery Fee</Text>
                <Text className="text-gray-800">Frw {orderSummary.delivery.toLocaleString()}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Tax</Text>
                <Text className="text-gray-800">Frw {orderSummary.tax.toLocaleString()}</Text>
              </View>
              <View className="border-t border-gray-200 pt-3">
                <View className="flex-row justify-between">
                  <Text className="text-gray-800 text-lg font-semibold">Total</Text>
                  <Text className="text-primary text-xl font-bold">
                    Frw {orderSummary.total.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>

        {/* Place Order Button */}
        <View className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={handlePlaceOrder}
            className="bg-primary rounded-2xl py-4 items-center shadow-lg"
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-semibold">
              Place Order • Frw {orderSummary.total.toLocaleString()}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
