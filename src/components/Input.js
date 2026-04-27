import React from 'react';
import { TextInput, View, Text, Animated } from 'react-native';

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  error,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  className = '',
  ...props
}) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-gray-700 text-sm font-medium mb-2">
          {label}
        </Text>
      )}
      <View className={`bg-gray-50 rounded-2xl px-4 py-4 flex-row items-center border border-gray-200 ${error ? 'border-red-500' : ''} ${className}`}>
        {icon && (
          <View className="mr-3">
            {icon}
          </View>
        )}
        <TextInput
          className="flex-1 text-gray-800 text-base"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          {...props}
        />
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}
