import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, Animated } from 'react-native';
import { twMerge } from 'tailwindcss-react-native';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary shadow-lg';
      case 'secondary':
        return 'bg-secondary shadow-lg';
      case 'outline':
        return 'bg-transparent border-2 border-primary';
      case 'ghost':
        return 'bg-transparent';
      default:
        return 'bg-primary shadow-lg';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2';
      case 'medium':
        return 'px-6 py-4';
      case 'large':
        return 'px-8 py-5';
      default:
        return 'px-6 py-4';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return 'text-primary';
      default:
        return 'text-white';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={twMerge(
        'rounded-2xl items-center justify-center transition-all duration-200',
        getVariantStyles(),
        getSizeStyles(),
        (disabled || loading) && 'opacity-50',
        className
      )}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? '#FF6B35' : '#FFFFFF'} 
        />
      ) : (
        <Text className={twMerge(
          'text-lg font-semibold',
          getTextStyles()
        )}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
