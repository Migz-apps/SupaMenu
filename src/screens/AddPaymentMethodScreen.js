import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Smartphone } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddPaymentMethodScreen() {
  const [paymentType, setPaymentType] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    provider: '',
    phoneNumber: '',
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
    // Handle saving payment method
    navigation.goBack();
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

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
              Add Payment Method
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6 pt-6"
        >
          {/* Payment Type Selection */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white rounded-2xl p-4 shadow-sm mb-6"
          >
            <Text className="text-gray-800 font-semibold mb-4">
              Payment Type
            </Text>
            
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => setPaymentType('card')}
                className={`flex-1 p-4 rounded-2xl border-2 flex-row items-center justify-center ${
                  paymentType === 'card'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200'
                }`}
                activeOpacity={0.8}
              >
                <CreditCard size={20} color={paymentType === 'card' ? '#FF6B35' : '#6B7280'} />
                <Text className={`ml-2 font-medium ${
                  paymentType === 'card' ? 'text-primary' : 'text-gray-600'
                }`}>
                  Credit Card
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setPaymentType('mobile')}
                className={`flex-1 p-4 rounded-2xl border-2 flex-row items-center justify-center ${
                  paymentType === 'mobile'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200'
                }`}
                activeOpacity={0.8}
              >
                <Smartphone size={20} color={paymentType === 'mobile' ? '#FF6B35' : '#6B7280'} />
                <Text className={`ml-2 font-medium ${
                  paymentType === 'mobile' ? 'text-primary' : 'text-gray-600'
                }`}>
                  Mobile Money
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Payment Form */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            {paymentType === 'card' ? (
              <>
                <Text className="text-gray-800 font-semibold mb-4">
                  Card Information
                </Text>
                
                <View className="mb-4">
                  <Text className="text-gray-700 text-sm mb-2">Card Number</Text>
                  <TextInput
                    className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800 border border-gray-200"
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor="#9CA3AF"
                    value={formData.cardNumber}
                    onChangeText={(value) => handleInputChange('cardNumber', formatCardNumber(value))}
                    keyboardType="numeric"
                    maxLength={19}
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-gray-700 text-sm mb-2">Cardholder Name</Text>
                  <TextInput
                    className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800 border border-gray-200"
                    placeholder="John Doe"
                    placeholderTextColor="#9CA3AF"
                    value={formData.cardName}
                    onChangeText={(value) => handleInputChange('cardName', value)}
                  />
                </View>

                <View className="flex-row space-x-3">
                  <View className="flex-1 mb-4">
                    <Text className="text-gray-700 text-sm mb-2">Expiry Date</Text>
                    <TextInput
                      className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800 border border-gray-200"
                      placeholder="MM/YY"
                      placeholderTextColor="#9CA3AF"
                      value={formData.expiry}
                      onChangeText={(value) => handleInputChange('expiry', formatExpiry(value))}
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>
                  
                  <View className="flex-1 mb-4">
                    <Text className="text-gray-700 text-sm mb-2">CVV</Text>
                    <TextInput
                      className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800 border border-gray-200"
                      placeholder="123"
                      placeholderTextColor="#9CA3AF"
                      value={formData.cvv}
                      onChangeText={(value) => handleInputChange('cvv', value)}
                      keyboardType="numeric"
                      maxLength={4}
                      secureTextEntry
                    />
                  </View>
                </View>
              </>
            ) : (
              <>
                <Text className="text-gray-800 font-semibold mb-4">
                  Mobile Money Information
                </Text>
                
                <View className="mb-4">
                  <Text className="text-gray-700 text-sm mb-2">Provider</Text>
                  <View className="flex-row space-x-3">
                    {['MTN', 'Airtel'].map((provider) => (
                      <TouchableOpacity
                        key={provider}
                        onPress={() => handleInputChange('provider', provider)}
                        className={`flex-1 p-3 rounded-xl border-2 ${
                          formData.provider === provider
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200'
                        }`}
                        activeOpacity={0.8}
                      >
                        <Text className={`text-center font-medium ${
                          formData.provider === provider ? 'text-primary' : 'text-gray-600'
                        }`}>
                          {provider}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View className="mb-4">
                  <Text className="text-gray-700 text-sm mb-2">Phone Number</Text>
                  <TextInput
                    className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800 border border-gray-200"
                    placeholder="+250 788 123 456"
                    placeholderTextColor="#9CA3AF"
                    value={formData.phoneNumber}
                    onChangeText={(value) => handleInputChange('phoneNumber', value)}
                    keyboardType="phone-pad"
                  />
                </View>
              </>
            )}

            {/* Save Button */}
            <TouchableOpacity
              onPress={handleSave}
              className="bg-primary rounded-2xl py-4 items-center shadow-lg mt-6"
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-semibold">
                Save Payment Method
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
