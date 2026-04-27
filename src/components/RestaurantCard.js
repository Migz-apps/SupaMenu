import React from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { twMerge } from 'tailwindcss-react-native';
import { Star, Clock, MapPin } from 'lucide-react-native';

export default function RestaurantCard({
  restaurant,
  onPress,
  className = '',
  ...props
}) {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <TouchableOpacity
        onPress={() => onPress && onPress(restaurant)}
        className={twMerge(
          'bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100',
          className
        )}
        activeOpacity={0.7}
        {...props}
      >
        <View className="flex-row items-center">
          <Image
            source={{ uri: restaurant.image }}
            className="w-16 h-16 rounded-xl"
            resizeMode="cover"
          />
          <View className="ml-4 flex-1">
            <Text className="text-gray-800 text-lg font-semibold">
              {restaurant.name}
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              {restaurant.categories}
            </Text>
            {restaurant.rating && (
              <View className="flex-row items-center mt-2">
                <Star size={12} color="#FF6B35" fill="#FF6B35" />
                <Text className="text-gray-600 text-xs ml-1">
                  {restaurant.rating}
                </Text>
                {restaurant.deliveryTime && (
                  <>
                    <Clock size={12} color="#6B7280" className="ml-3" />
                    <Text className="text-gray-600 text-xs ml-1">
                      {restaurant.deliveryTime}
                    </Text>
                  </>
                )}
              </View>
            )}
          </View>
          <View className="w-2 h-2 bg-primary rounded-full"></View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
