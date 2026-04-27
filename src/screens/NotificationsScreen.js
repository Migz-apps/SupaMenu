import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, ShoppingBag, Truck, Star, Tag } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const mockNotifications = [
  {
    id: '1',
    type: 'order',
    title: 'Order Delivered',
    message: 'Your order from Choose Kigali has been delivered successfully',
    time: '2 hours ago',
    read: false,
    icon: ShoppingBag,
  },
  {
    id: '2',
    type: 'delivery',
    title: 'On the way',
    message: 'Your rider is on the way with your order',
    time: '3 hours ago',
    read: false,
    icon: Truck,
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Special Offer!',
    message: 'Get 20% off on all drinks today only',
    time: '1 day ago',
    read: true,
    icon: Tag,
  },
  {
    id: '4',
    type: 'review',
    title: 'Rate your order',
    message: 'How was your experience with Choose Kigali?',
    time: '2 days ago',
    read: true,
    icon: Star,
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);
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

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'order':
        return '#10B981';
      case 'delivery':
        return '#FF6B35';
      case 'promotion':
        return '#8B5CF6';
      case 'review':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const renderNotificationItem = ({ item, index }) => {
    const itemAnim = new Animated.Value(0);
    const NotificationIcon = item.icon;
    
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
          onPress={() => markAsRead(item.id)}
          className={`bg-white rounded-2xl p-4 mb-3 shadow-sm border ${
            !item.read ? 'border-l-4 border-l-primary' : 'border-gray-100'
          }`}
          activeOpacity={0.7}
        >
          <View className="flex-row items-start">
            <View className={`w-10 h-10 rounded-full flex items-center justify-center mr-3`}
                 style={{ backgroundColor: getNotificationColor(item.type) + '20' }}>
              <NotificationIcon size={20} color={getNotificationColor(item.type)} />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-start">
                <Text className="text-gray-800 font-semibold flex-1">
                  {item.title}
                </Text>
                {!item.read && (
                  <View className="w-2 h-2 bg-primary rounded-full ml-2 mt-2"></View>
                )}
              </View>
              <Text className="text-gray-600 text-sm mt-1">
                {item.message}
              </Text>
              <Text className="text-gray-400 text-xs mt-2">
                {item.time}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="bg-white px-6 pt-4 pb-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color="#374151" />
              </TouchableOpacity>
              <Text className="text-gray-800 text-xl font-semibold ml-4">
                Notifications
              </Text>
            </View>
            {unreadCount > 0 && (
              <View className="bg-primary rounded-full px-2 py-1">
                <Text className="text-white text-xs font-medium">
                  {unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Notifications List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6 pt-6"
        >
          {notifications.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Bell size={60} color="#D1D5DB" />
              <Text className="text-gray-500 text-lg font-semibold mt-4">
                No notifications yet
              </Text>
              <Text className="text-gray-400 text-center mt-2">
                We'll notify you when something important happens
              </Text>
            </View>
          ) : (
            <>
              <Animated.Text
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
                className="text-gray-600 text-center mb-6"
              >
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </Animated.Text>

              {notifications.map((notification, index) => (
                <View key={notification.id}>
                  {renderNotificationItem({ item: notification, index })}
                </View>
              ))}
            </>
          )}
        </ScrollView>

        <BottomTabNavigator activeTab="notifications" />
      </SafeAreaView>
    </View>
  );
}
