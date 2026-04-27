import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, MapPin, CreditCard, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

export default function ProfileScreen() {
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

  const menuItems = [
    {
      id: 'personal',
      title: 'Personal Information',
      subtitle: 'Update your personal details',
      icon: User,
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: 'addresses',
      title: 'Delivery Addresses',
      subtitle: 'Manage your delivery locations',
      icon: MapPin,
      onPress: () => navigation.navigate('AddressManagement'),
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      subtitle: 'Add or remove payment methods',
      icon: CreditCard,
      onPress: () => navigation.navigate('PaymentMethods'),
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'App preferences and notifications',
      icon: Settings,
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Get help with the app',
      icon: HelpCircle,
      onPress: () => navigation.navigate('Help'),
    },
    {
      id: 'logout',
      title: 'Log Out',
      subtitle: 'Sign out of your account',
      icon: LogOut,
      onPress: () => handleLogout(),
      isDestructive: true,
    },
  ];

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  const renderMenuItem = ({ item, index }) => {
    const itemAnim = new Animated.Value(0);
    const Icon = item.icon;
    
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
          onPress={item.onPress}
          className={`bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 ${
            item.isDestructive ? 'border-red-100' : ''
          }`}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center">
            <View className={`w-10 h-10 rounded-full flex items-center justify-center ${
              item.isDestructive ? 'bg-red-100' : 'bg-gray-100'
            }`}>
              <Icon 
                size={20} 
                color={item.isDestructive ? '#EF4444' : '#6B7280'} 
              />
            </View>
            <View className="ml-4 flex-1">
              <Text className={`font-semibold ${
                item.isDestructive ? 'text-red-600' : 'text-gray-800'
              }`}>
                {item.title}
              </Text>
              <Text className={`text-sm mt-1 ${
                item.isDestructive ? 'text-red-400' : 'text-gray-500'
              }`}>
                {item.subtitle}
              </Text>
            </View>
            <ChevronRight 
              size={20} 
              color={item.isDestructive ? '#EF4444' : '#9CA3AF'} 
            />
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
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color="#374151" />
              </TouchableOpacity>
              <Text className="text-gray-800 text-xl font-semibold ml-4">
                Profile
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
        >
          {/* Profile Header */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white mx-6 mt-6 rounded-2xl p-6 shadow-sm"
          >
            <View className="items-center">
              <Image
                source={{ uri: 'https://picsum.photos/seed/avatar/100/100' }}
                className="w-24 h-24 rounded-full mb-4"
                resizeMode="cover"
              />
              <Text className="text-gray-800 text-xl font-semibold">
                John Doe
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                john.doe@example.com
              </Text>
              <Text className="text-gray-400 text-xs mt-2">
                +250 788 123 456
              </Text>
            </View>
          </Animated.View>

          {/* Menu Items */}
          <View className="px-6 pt-6 pb-24">
            <Animated.Text
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
              className="text-gray-600 text-center mb-6"
            >
              Account Settings
            </Animated.Text>

            {menuItems.map((item, index) => (
              <View key={item.id}>
                {renderMenuItem({ item, index })}
              </View>
            ))}
          </View>
        </ScrollView>

        <BottomTabNavigator />
      </SafeAreaView>
    </View>
  );
}
