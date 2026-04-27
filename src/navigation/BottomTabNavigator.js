import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Home, Bell, Square, Clock, ShoppingCart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function BottomTabNavigator({ activeTab = 'home' }) {
  const navigation = useNavigation();
  
  const tabs = [
    {
      id: 'home',
      icon: Home,
      label: 'Home',
      onPress: () => navigation.navigate('Home'),
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notifications',
      onPress: () => console.log('Notifications'),
    },
    {
      id: 'menu',
      icon: Square,
      label: 'Menu',
      onPress: () => console.log('Menu'),
    },
    {
      id: 'history',
      icon: Clock,
      label: 'History',
      onPress: () => console.log('History'),
    },
    {
      id: 'cart',
      icon: ShoppingCart,
      label: 'Cart',
      onPress: () => console.log('Cart'),
    },
  ];

  const getTabStyle = (tabId) => {
    const isActive = activeTab === tabId;
    return {
      backgroundColor: isActive ? '#FF6B35' : 'transparent',
      transform: [
        {
          scale: isActive ? 1.1 : 1,
        },
      ],
    };
  };

  const getIconColor = (tabId) => {
    return activeTab === tabId ? '#FFFFFF' : '#6B7280';
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <View className="flex-row justify-around items-center py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={tab.onPress}
              className={`rounded-2xl p-3 transition-all duration-200 ${
                activeTab === tab.id ? 'bg-primary shadow-lg' : ''
              }`}
              activeOpacity={0.7}
            >
              <Icon
                size={24}
                color={getIconColor(tab.id)}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
