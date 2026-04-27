import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddAddressScreen() {
  const [addressType, setAddressType] = useState('home');
  const [formData, setFormData] = useState({
    address: '',
    details: '',
    instructions: '',
  });
  
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.address.trim()) {
      Alert.alert('Error', 'Please enter a valid address');
      return;
    }
    
    // Handle saving address
    navigation.goBack();
  };

  const handleUseCurrentLocation = () => {
    // Handle getting current location
    Alert.alert('Location', 'Getting your current location...');
  };

  const addressTypes = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'other', label: 'Other' },
  ];

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
              Add Address
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6 pt-6"
        >
          {/* Address Type Selection */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white rounded-2xl p-4 shadow-sm mb-6"
          >
            <Text className="text-gray-800 font-semibold mb-4">
              Address Type
            </Text>
            
            <View className="flex-row space-x-3">
              {addressTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => setAddressType(type.id)}
                  className={`flex-1 p-3 rounded-xl border-2 ${
                    addressType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200'
                  }`}
                  activeOpacity={0.8}
                >
                  <Text className={`text-center font-medium ${
                    addressType === type.id ? 'text-primary' : 'text-gray-600'
                  }`}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Address Form */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <Text className="text-gray-800 font-semibold mb-4">
              Address Information
            </Text>
            
            <View className="mb-4">
              <Text className="text-gray-700 text-sm mb-2">Street Address</Text>
              <View className="relative">
                <TextInput
                  className="bg-gray-50 rounded-xl px-4 py-3 pr-12 text-gray-800 border border-gray-200"
                  placeholder="Enter your street address"
                  placeholderTextColor="#9CA3AF"
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                />
                <TouchableOpacity
                  onPress={handleUseCurrentLocation}
                  className="absolute right-3 top-3"
                >
                  <Navigation size={20} color="#FF6B35" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 text-sm mb-2">Apartment/Suite/Floor (Optional)</Text>
              <TextInput
                className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800 border border-gray-200"
                placeholder="Apt 4B, Floor 2, Suite 100"
                placeholderTextColor="#9CA3AF"
                value={formData.details}
                onChangeText={(value) => handleInputChange('details', value)}
              />
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 text-sm mb-2">Delivery Instructions (Optional)</Text>
              <TextInput
                className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800 border border-gray-200 h-24"
                placeholder="e.g., Ring the doorbell, Call upon arrival, Leave at the gate"
                placeholderTextColor="#9CA3AF"
                value={formData.instructions}
                onChangeText={(value) => handleInputChange('instructions', value)}
                multiline
                textAlignVertical="top"
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              onPress={handleSave}
              className="bg-primary rounded-2xl py-4 items-center shadow-lg"
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-semibold">
                Save Address
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Location Tips */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-blue-50 rounded-2xl p-4 mt-6 mb-8"
          >
            <View className="flex-row items-start">
              <MapPin size={20} color="#3B82F6" />
              <View className="ml-3 flex-1">
                <Text className="text-blue-800 font-semibold mb-1">
                  Location Tips
                </Text>
                <Text className="text-blue-600 text-sm">
                  • Be as specific as possible with your address
                  • Include landmarks if helpful
                  • Add delivery instructions for easier access
                </Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
