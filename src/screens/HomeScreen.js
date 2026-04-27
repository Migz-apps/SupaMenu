import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Home, Bell, Square, Clock, ShoppingCart, ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const { width, height } = Dimensions.get('window');

const mockRestaurants = [
  {
    id: '1',
    name: 'Choose Kigali',
    categories: 'World, African, Pizzeria, Coffee',
    image: 'https://picsum.photos/seed/restaurant1/100/100',
  },
  {
    id: '2',
    name: 'Choose Kigali',
    categories: 'World, African, Pizzeria, Coffee',
    image: 'https://picsum.photos/seed/restaurant2/100/100',
  },
  {
    id: '3',
    name: 'Choose Kigali',
    categories: 'World, African, Pizzeria, Coffee',
    image: 'https://picsum.photos/seed/restaurant3/100/100',
  },
  {
    id: '4',
    name: 'Choose Kigali',
    categories: 'World, African, Pizzeria, Coffee',
    image: 'https://picsum.photos/seed/restaurant4/100/100',
  },
  {
    id: '5',
    name: 'Choose Kigali',
    categories: 'World, African, Pizzeria, Coffee',
    image: 'https://picsum.photos/seed/restaurant5/100/100',
  },
  {
    id: '6',
    name: 'Choose Kigali',
    categories: 'World, African, Pizzeria, Coffee',
    image: 'https://picsum.photos/seed/restaurant6/100/100',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const renderRestaurantItem = ({ item, index }) => {
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
        <TouchableOpacity
          onPress={() => handleRestaurantPress(item)}
          className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center">
            <Image
              source={{ uri: item.image }}
              className="w-16 h-16 rounded-xl"
              resizeMode="cover"
            />
            <View className="ml-4 flex-1">
              <Text className="text-gray-800 text-lg font-semibold">
                {item.name}
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                {item.categories}
              </Text>
            </View>
            <View className="w-2 h-2 bg-primary rounded-full"></View>
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
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-800 text-sm font-medium">9:41</Text>
            <View className="flex-row space-x-1">
              <View className="w-4 h-3 bg-gray-800 rounded-sm"></View>
              <View className="w-4 h-3 bg-gray-800 rounded-sm"></View>
              <View className="w-6 h-3 bg-gray-800 rounded-sm"></View>
            </View>
          </View>

          {/* Search Bar */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-gray-100 rounded-2xl px-4 py-3 flex-row items-center"
          >
            <ArrowLeft size={20} color="#6B7280" />
            <Search size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-gray-800 text-base"
              placeholder="Search..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </Animated.View>
        </View>

        {/* Content */}
        <View className="flex-1 px-6 pt-6">
          <Animated.Text
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="text-primary text-2xl font-bold mb-6"
          >
            Nearby Restaurant
          </Animated.Text>

          {/* Restaurant List */}
          <FlatList
            data={mockRestaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            ItemSeparatorComponent={() => <View className="h-2" />}
          />
        </View>

        {/* Bottom Navigation */}
        <BottomTabNavigator activeTab="menu" />
      </SafeAreaView>
    </View>
  );
}
