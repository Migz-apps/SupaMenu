import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Clock, CheckCircle, Phone, MessageCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function OrderTrackingScreen() {
  const [currentStep, setCurrentStep] = useState(2);
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

  const orderSteps = [
    {
      id: 1,
      title: 'Order Confirmed',
      time: '12:30 PM',
      description: 'Your order has been received',
      completed: true,
    },
    {
      id: 2,
      title: 'Preparing',
      time: '12:35 PM',
      description: 'Restaurant is preparing your food',
      completed: true,
      current: true,
    },
    {
      id: 3,
      title: 'On the way',
      time: 'Estimated 12:50 PM',
      description: 'Rider is picking up your order',
      completed: false,
    },
    {
      id: 4,
      title: 'Delivered',
      time: 'Estimated 1:00 PM',
      description: 'Enjoy your meal!',
      completed: false,
    },
  ];

  const orderInfo = {
    id: 'ORD001',
    restaurant: 'Choose Kigali',
    items: [
      { name: 'Tom Yummy', quantity: 2, price: 5000 },
      { name: 'Singapore Sling', quantity: 1, price: 6000 },
      { name: 'White Russian', quantity: 1, price: 5000 },
    ],
    total: 19600,
    deliveryAddress: 'KG 123 St, Kigali, Rwanda',
    estimatedDelivery: '12:50 PM - 1:00 PM',
  };

  const riderInfo = {
    name: 'Jean Mugisha',
    phone: '+250 788 123 456',
    photo: 'https://picsum.photos/seed/rider/60/60',
    vehicle: 'Motorcycle',
    plateNumber: 'RAB 123 C',
  };

  const renderOrderStep = ({ step, index }) => {
    const stepAnim = new Animated.Value(0);
    
    React.useEffect(() => {
      Animated.timing(stepAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 200,
        useNativeDriver: true,
      }).start();
    }, []);

    const isCompleted = step.completed;
    const isCurrent = step.current;

    return (
      <Animated.View
        style={{
          opacity: stepAnim,
          transform: [
            {
              translateY: stepAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
        className="flex-row mb-6"
      >
        <View className="items-center mr-4">
          <View className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isCompleted 
              ? 'bg-green-500' 
              : isCurrent 
                ? 'bg-primary' 
                : 'bg-gray-300'
          }`}>
            {isCompleted ? (
              <CheckCircle size={20} color="white" />
            ) : (
              <Text className="text-white font-semibold">
                {step.id}
              </Text>
            )}
          </View>
          {index < orderSteps.length - 1 && (
            <View className={`w-0.5 h-16 mt-2 ${
              isCompleted ? 'bg-green-500' : 'bg-gray-300'
            }`} />
          )}
        </View>
        
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className={`font-semibold ${
              isCurrent ? 'text-primary' : isCompleted ? 'text-gray-800' : 'text-gray-500'
            }`}>
              {step.title}
            </Text>
            <Text className={`text-sm ${
              isCurrent ? 'text-primary' : 'text-gray-500'
            }`}>
              {step.time}
            </Text>
          </View>
          <Text className="text-gray-600 text-sm mt-1">
            {step.description}
          </Text>
        </View>
      </Animated.View>
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
              Track Order
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          {/* Order Status */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white mx-6 mt-6 rounded-2xl p-4 shadow-sm"
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-gray-800 text-lg font-semibold">
                Order {orderInfo.id}
              </Text>
              <View className="bg-primary/10 px-3 py-1 rounded-full">
                <Text className="text-primary text-sm font-medium">
                  {orderSteps[currentStep - 1]?.title}
                </Text>
              </View>
            </View>
            
            <Text className="text-gray-600 text-sm">
              Estimated delivery: {orderInfo.estimatedDelivery}
            </Text>
          </Animated.View>

          {/* Progress Steps */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white mx-6 mt-4 rounded-2xl p-4 shadow-sm"
          >
            {orderSteps.map((step, index) => (
              <View key={step.id}>
                {renderOrderStep({ step, index })}
              </View>
            ))}
          </Animated.View>

          {/* Rider Info */}
          {currentStep >= 3 && (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
              className="bg-white mx-6 mt-4 rounded-2xl p-4 shadow-sm"
            >
              <Text className="text-gray-800 font-semibold mb-4">
                Delivery Partner
              </Text>
              
              <View className="flex-row items-center">
                <Image
                  source={{ uri: riderInfo.photo }}
                  className="w-16 h-16 rounded-full mr-4"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold">
                    {riderInfo.name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {riderInfo.vehicle} • {riderInfo.plateNumber}
                  </Text>
                  <View className="flex-row mt-2">
                    <TouchableOpacity
                      onPress={() => console.log('Call rider')}
                      className="bg-green-500 rounded-full p-2 mr-3"
                    >
                      <Phone size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => console.log('Message rider')}
                      className="bg-blue-500 rounded-full p-2"
                    >
                      <MessageCircle size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Order Summary */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white mx-6 mt-4 mb-6 rounded-2xl p-4 shadow-sm"
          >
            <Text className="text-gray-800 font-semibold mb-4">
              Order Details
            </Text>
            
            <View className="mb-4">
              <Text className="text-gray-600 text-sm mb-2">
                {orderInfo.restaurant}
              </Text>
              <View className="flex-row items-center mb-2">
                <MapPin size={14} color="#6B7280" />
                <Text className="text-gray-500 text-sm ml-2">
                  {orderInfo.deliveryAddress}
                </Text>
              </View>
            </View>

            <View className="border-t border-gray-200 pt-3">
              <Text className="text-gray-800 font-medium mb-2">Items</Text>
              {orderInfo.items.map((item, index) => (
                <View key={index} className="flex-row justify-between mb-2">
                  <Text className="text-gray-600">
                    {item.quantity}x {item.name}
                  </Text>
                  <Text className="text-gray-800">
                    Frw {(item.price * item.quantity).toLocaleString()}
                  </Text>
                </View>
              ))}
              <View className="border-t border-gray-200 mt-3 pt-3">
                <View className="flex-row justify-between">
                  <Text className="text-gray-800 font-semibold">Total</Text>
                  <Text className="text-primary font-bold">
                    Frw {orderInfo.total.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
