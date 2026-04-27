import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, Clock, MapPin, Heart, ShoppingCart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function RestaurantDetailScreen({ route }) {
  const { restaurant } = route.params || {};
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const scrollY = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const mockMenuItems = [
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, basil',
      price: '$12.99',
      image: 'https://picsum.photos/seed/pizza1/80/80',
    },
    {
      id: '2',
      name: 'Caesar Salad',
      description: 'Romaine lettuce, parmesan, croutons',
      price: '$8.99',
      image: 'https://picsum.photos/seed/salad1/80/80',
    },
    {
      id: '3',
      name: 'Grilled Chicken',
      description: 'Herb-marinated chicken with vegetables',
      price: '$15.99',
      image: 'https://picsum.photos/seed/chicken1/80/80',
    },
  ];

  const renderMenuItem = ({ item, index }) => {
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
        <TouchableOpacity className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
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
                {item.price}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => console.log('Add to cart')}
              className="bg-primary rounded-full p-2"
            >
              <ShoppingCart size={16} color="white" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Animated Header */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#FF6B35',
          opacity: headerOpacity,
        }}
        className="h-24"
      />

      <SafeAreaView className="flex-1">
        {/* Header with Back Button */}
        <View className="absolute top-0 left-0 right-0 z-50 flex-row justify-between items-center px-6 pt-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white/20 backdrop-blur-sm rounded-full p-2"
            activeOpacity={0.8}
          >
            <ArrowLeft size={20} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            className="bg-white/20 backdrop-blur-sm rounded-full p-2"
            activeOpacity={0.8}
          >
            <Heart size={20} color={isFavorite ? "white" : "white"} fill={isFavorite ? "white" : "none"} />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          className="flex-1"
        >
          {/* Hero Image */}
          <View className="relative">
            <Image
              source={{ uri: restaurant?.image || 'https://picsum.photos/seed/restaurant/400/250' }}
              className="w-full h-64"
              resizeMode="cover"
            />
            <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <Animated.Text
                style={{ opacity: fadeAnim }}
                className="text-white text-3xl font-bold"
              >
                {restaurant?.name || 'Choose Kigali'}
              </Animated.Text>
            </View>
          </View>

          {/* Restaurant Info */}
          <Animated.View
            style={{ opacity: fadeAnim }}
            className="px-6 pt-6 pb-4"
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Star size={16} color="#FF6B35" fill="#FF6B35" />
                <Text className="text-gray-800 ml-1 font-medium">4.8</Text>
                <Text className="text-gray-500 ml-1">(200+ reviews)</Text>
              </View>
              <View className="flex-row items-center">
                <Clock size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-1">25-30 min</Text>
              </View>
            </View>

            <View className="flex-row items-center mb-6">
              <MapPin size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-2">
                Kigali, Rwanda • 2.5 km away
              </Text>
            </View>

            <Text className="text-gray-700 text-base leading-relaxed">
              Experience the best of world cuisine with African influences. 
              From authentic pizzas to premium coffee, we offer a diverse menu 
              that caters to all tastes.
            </Text>
          </Animated.View>

          {/* Menu Section */}
          <View className="px-6 pt-4 pb-8">
            <Text className="text-gray-800 text-2xl font-bold mb-6">
              Popular Items
            </Text>
            
            <View>
              {mockMenuItems.map((item, index) => (
                <View key={item.id}>
                  {renderMenuItem({ item, index })}
                </View>
              ))}
            </View>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
}
