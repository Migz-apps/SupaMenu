import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Moon, Globe, Shield, HelpCircle, ChevronRight, Info, MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(true);
  const [biometric, setBiometric] = useState(false);
  
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

  const settingSections = [
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Receive order updates and offers',
          type: 'toggle',
          value: notifications,
          onToggle: setNotifications,
          icon: Bell,
        },
        {
          id: 'darkmode',
          title: 'Dark Mode',
          subtitle: 'Reduce eye strain in low light',
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
          icon: Moon,
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English',
          type: 'navigation',
          icon: Globe,
          onPress: () => navigation.navigate('LanguageSettings'),
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          id: 'location',
          title: 'Location Services',
          subtitle: 'Allow app to access your location',
          type: 'toggle',
          value: location,
          onToggle: setLocation,
          icon: MapPin,
        },
        {
          id: 'biometric',
          title: 'Biometric Login',
          subtitle: 'Use fingerprint or face recognition',
          type: 'toggle',
          value: biometric,
          onToggle: setBiometric,
          icon: Shield,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help Center',
          subtitle: 'Get help and support',
          type: 'navigation',
          icon: HelpCircle,
          onPress: () => navigation.navigate('Help'),
        },
        {
          id: 'about',
          title: 'About',
          subtitle: 'App version and information',
          type: 'navigation',
          icon: Info,
          onPress: () => navigation.navigate('About'),
        },
      ],
    },
  ];

  const renderSettingItem = ({ item, index }) => {
    const itemAnim = new Animated.Value(0);
    const Icon = item.icon;
    
    React.useEffect(() => {
      Animated.timing(itemAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 50,
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
          className="bg-white rounded-2xl p-4 mb-2 shadow-sm border border-gray-100"
          activeOpacity={0.7}
          disabled={item.type === 'toggle'}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <Icon size={20} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold">
                  {item.title}
                </Text>
                <Text className="text-gray-500 text-sm mt-1">
                  {item.subtitle}
                </Text>
              </View>
            </View>
            
            {item.type === 'toggle' ? (
              <Switch
                value={item.value}
                onValueChange={item.onToggle}
                trackColor={{ false: '#E5E7EB', true: '#FF6B35' }}
                thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E5E7EB"
              />
            ) : (
              <ChevronRight size={20} color="#9CA3AF" />
            )}
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
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-gray-800 text-xl font-semibold ml-4">
              Settings
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6 pt-6"
        >
          {settingSections.map((section, sectionIndex) => (
            <View key={section.title} className="mb-6">
              <Animated.Text
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
                className="text-gray-600 text-sm font-medium mb-3 px-2"
              >
                {section.title}
              </Animated.Text>
              
              {section.items.map((item, index) => (
                <View key={item.id}>
                  {renderSettingItem({ item, index })}
                </View>
              ))}
            </View>
          ))}
          
          {/* App Version */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="items-center py-6 mb-6"
          >
            <Text className="text-gray-400 text-sm">
              SupaMenu v1.0.0
            </Text>
            <Text className="text-gray-400 text-xs mt-1">
              Made with ❤️ in Rwanda
            </Text>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
