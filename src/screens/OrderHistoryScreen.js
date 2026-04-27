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
import { ArrowLeft, Clock, CheckCircle, XCircle, Truck } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const mockOrders = [
  {
    id: 'ORD001',
    restaurant: 'Choose Kigali',
    date: '2024-04-27',
    time: '12:30 PM',
    total: 19600,
    status: 'delivered',
    items: [
      { name: 'Tom Yummy', quantity: 2 },
      { name: 'Singapore Sling', quantity: 1 },
    ],
  },
  {
    id: 'ORD002',
    restaurant: 'Pizza Palace',
    date: '2024-04-26',
    time: '7:45 PM',
    total: 25000,
    status: 'cancelled',
    items: [
      { name: 'Margherita Pizza', quantity: 1 },
      { name: 'Caesar Salad', quantity: 1 },
    ],
  },
  {
    id: 'ORD003',
    restaurant: 'Burger Hub',
    date: '2024-04-25',
    time: '1:15 PM',
    total: 18500,
    status: 'in-progress',
    items: [
      { name: 'Classic Burger', quantity: 2 },
      { name: 'Fries', quantity: 1 },
    ],
  },
];

export default function OrderHistoryScreen() {
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

  const getStatusConfig = (status) => {
    switch (status) {
      case 'delivered':
        return {
          icon: CheckCircle,
          color: '#10B981',
          bgColor: '#10B981/10',
          text: 'Delivered',
        };
      case 'cancelled':
        return {
          icon: XCircle,
          color: '#EF4444',
          bgColor: '#EF4444/10',
          text: 'Cancelled',
        };
      case 'in-progress':
        return {
          icon: Truck,
          color: '#FF6B35',
          bgColor: '#FF6B35/10',
          text: 'On the way',
        };
      default:
        return {
          icon: Clock,
          color: '#6B7280',
          bgColor: '#6B7280/10',
          text: 'Processing',
        };
    }
  };

  const renderOrderItem = ({ item, index }) => {
    const itemAnim = new Animated.Value(0);
    const statusConfig = getStatusConfig(item.status);
    const StatusIcon = statusConfig.icon;
    
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
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
          className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100"
          activeOpacity={0.7}
        >
          <View className="flex-row justify-between items-start mb-3">
            <View className="flex-1">
              <Text className="text-gray-800 text-lg font-semibold">
                {item.restaurant}
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                {item.date} • {item.time}
              </Text>
            </View>
            <View className={`bg-${statusConfig.bgColor} px-3 py-1 rounded-full flex-row items-center`}>
              <StatusIcon size={14} color={statusConfig.color} />
              <Text className={`text-xs font-medium ml-1`} style={{ color: statusConfig.color }}>
                {statusConfig.text}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-gray-600 text-sm mb-1">
                {item.items.length} items
              </Text>
              <Text className="text-gray-500 text-xs">
                {item.items.slice(0, 2).map(i => i.name).join(', ')}
                {item.items.length > 2 && ` +${item.items.length - 2} more`}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-primary text-lg font-bold">
                Frw {item.total.toLocaleString()}
              </Text>
              <Text className="text-gray-400 text-xs">
                {item.id}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
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
              Order History
            </Text>
          </View>
        </View>

        {/* Orders List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6 pt-6"
        >
          <Animated.Text
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="text-gray-600 text-center mb-6"
          >
            Your recent orders
          </Animated.Text>

          {mockOrders.map((order, index) => (
            <View key={order.id}>
              {renderOrderItem({ item: order, index })}
            </View>
          ))}
        </ScrollView>

        <BottomTabNavigator activeTab="history" />
      </SafeAreaView>
    </View>
  );
}
