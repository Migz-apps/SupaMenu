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
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const handleSignIn = () => {
    navigation.navigate('Search');
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log('Google login');
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login
    console.log('Facebook login');
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log('Forgot password');
  };

  const handleRegister = () => {
    navigation.navigate('Welcome');
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
              <Text className="text-white/90 text-sm mt-2">Sign in to continue</Text>
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
            {/* Input Fields */}
            <View className="space-y-4 mb-8">
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

              <View className="bg-gray-50 rounded-2xl px-4 py-4 flex-row items-center border border-gray-200">
                <Lock size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-gray-800 text-base"
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleSignIn}
              className="bg-primary rounded-2xl py-4 items-center shadow-lg mb-6"
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-semibold">Sign In</Text>
            </TouchableOpacity>

            {/* OR Separator */}
            <View className="flex-row items-center justify-center mb-6">
              <View className="flex-1 h-px bg-gray-300"></View>
              <Text className="px-4 text-gray-500 text-sm">OR</Text>
              <View className="flex-1 h-px bg-gray-300"></View>
            </View>

            {/* Social Login Buttons */}
            <View className="space-y-3 mb-8">
              <TouchableOpacity
                onPress={handleGoogleLogin}
                className="bg-white border border-gray-300 rounded-2xl py-4 flex-row items-center justify-center shadow-sm"
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
                  className="w-5 h-5 mr-3"
                />
                <Text className="text-gray-700 text-base font-medium">Login with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleFacebookLogin}
                className="bg-blue-600 rounded-2xl py-4 flex-row items-center justify-center shadow-sm"
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' }}
                  className="w-5 h-5 mr-3"
                />
                <Text className="text-white text-base font-medium">Login with facebook</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Links */}
            <View className="space-y-4">
              <View className="flex-row justify-center">
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text className="text-primary text-sm font-medium">Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-center">
                <Text className="text-gray-600 text-sm">
                  Don't have a account?{' '}
                </Text>
                <TouchableOpacity onPress={handleRegister}>
                  <Text className="text-primary text-sm font-semibold">Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
