import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Phone, Mail } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
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
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProceed = () => {
    navigation.navigate('Login');
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Header */}
          <View className="bg-primary px-6 pt-4 pb-8 rounded-b-3xl">
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-white text-sm font-medium">9:41</Text>
              <View className="flex-row space-x-1">
                <View className="w-4 h-3 bg-white rounded-sm"></View>
                <View className="w-4 h-3 bg-white rounded-sm"></View>
                <View className="w-6 h-3 bg-white rounded-sm"></View>
              </View>
            </View>
            
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
              className="items-center"
            >
              <Text className="text-white text-4xl font-bold mb-2">SupaMenu</Text>
              <Text className="text-white text-xl">Welcome...</Text>
            </Animated.View>
          </View>

          {/* Form Content */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="px-6 pt-8 pb-6"
          >
            <Text className="text-gray-600 text-center mb-8">
              Please fill in the information
            </Text>

            {/* Input Fields */}
            <View className="space-y-4 mb-8">
              <View className="bg-gray-50 rounded-2xl px-4 py-4 flex-row items-center border border-gray-200">
                <User size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-gray-800 text-base"
                  placeholder="Full Name"
                  placeholderTextColor="#9CA3AF"
                  value={formData.fullName}
                  onChangeText={(value) => handleInputChange('fullName', value)}
                />
              </View>

              <View className="bg-gray-50 rounded-2xl px-4 py-4 flex-row items-center border border-gray-200">
                <Phone size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-gray-800 text-base"
                  placeholder="Phone Number"
                  placeholderTextColor="#9CA3AF"
                  value={formData.phoneNumber}
                  onChangeText={(value) => handleInputChange('phoneNumber', value)}
                  keyboardType="phone-pad"
                />
              </View>

              <View className="bg-gray-50 rounded-2xl px-4 py-4 flex-row items-center border border-gray-200">
                <Mail size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-gray-800 text-base"
                  placeholder="Your Email"
                  placeholderTextColor="#9CA3AF"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Buttons */}
            <View className="space-y-4">
              <TouchableOpacity
                onPress={handleProceed}
                className="bg-primary rounded-2xl py-4 items-center shadow-lg"
                activeOpacity={0.8}
              >
                <Text className="text-white text-lg font-semibold">Proceed</Text>
              </TouchableOpacity>

              <View className="flex-row items-center justify-center">
                <View className="flex-1 h-px bg-gray-300"></View>
                <Text className="px-4 text-gray-500 text-sm">OR</Text>
                <View className="flex-1 h-px bg-gray-300"></View>
              </View>

              <Text className="text-center text-gray-600 text-sm mb-4">
                If you have a PMG account
              </Text>

              <TouchableOpacity
                onPress={handleSignIn}
                className="bg-secondary rounded-2xl py-4 items-center shadow-lg"
                activeOpacity={0.8}
              >
                <Text className="text-white text-lg font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-600 text-sm">
                Don't have a account?{' '}
              </Text>
              <TouchableOpacity onPress={handleProceed}>
                <Text className="text-primary text-sm font-semibold">Register</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
