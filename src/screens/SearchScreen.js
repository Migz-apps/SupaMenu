import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, QrCode, ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.8);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('Home');
    }
  };

  const handleQRScan = () => {
    // Handle QR scanning
    console.log('QR Scan');
    navigation.navigate('Home');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-8">
          <View className="flex-row justify-between items-center mb-8">
            <Text className="text-white text-sm font-medium">9:41</Text>
            <View className="flex-row space-x-1">
              <View className="w-4 h-3 bg-white rounded-sm"></View>
              <View className="w-4 h-3 bg-white rounded-sm"></View>
              <View className="w-6 h-3 bg-white rounded-sm"></View>
            </View>
          </View>

          {/* Back Button */}
          <TouchableOpacity
            onPress={handleBack}
            className="mb-6"
            activeOpacity={0.8}
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>

          {/* Search Bar */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white rounded-2xl px-4 py-4 flex-row items-center shadow-lg mb-8"
          >
            <Search size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-gray-800 text-base"
              placeholder="Search for your preferred restaurant"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
          </Animated.View>

          {/* OR Text */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="items-center mb-8"
          >
            <Text className="text-white text-xl font-medium">or</Text>
          </Animated.View>

          {/* QR Code Button */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            }}
            className="items-center mb-12"
          >
            <TouchableOpacity
              onPress={handleQRScan}
              className="bg-white rounded-3xl p-8 shadow-2xl"
              activeOpacity={0.8}
            >
              <QrCode size={80} color="#FF6B35" />
            </TouchableOpacity>
          </Animated.View>

          {/* Bottom Text */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="items-center flex-1 justify-end pb-8"
          >
            <Text className="text-white text-2xl font-bold text-center">
              Scan, Pay & Enjoy!
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
