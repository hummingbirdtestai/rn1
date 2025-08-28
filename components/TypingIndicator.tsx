import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

export default function TypingIndicator() {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20, scale: 0.9 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'spring', duration: 500 }}
      className="flex-row items-end mb-3 px-1"
    >
      {/* Avatar */}
      <MotiView
        from={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 400, delay: 200 }}
        className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full items-center justify-center mr-2 shadow-md"
        style={{
          shadowColor: '#14b8a6',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text className="text-white text-sm">🤖</Text>
      </MotiView>

      {/* Typing bubble */}
      <MotiView
        from={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 500, delay: 100 }}
        className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl rounded-bl-md px-3 py-2 shadow-lg"
        style={{
          shadowColor: '#0f766e',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <View className="flex-row items-center space-x-1">
          {/* Animated dots */}
          <View className="flex-row space-x-1">
            <MotiView
              from={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ 
                duration: 800, 
                loop: true,
                type: 'timing',
              }}
              className="w-2 h-2 bg-white rounded-full"
            />
            <MotiView
              from={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ 
                duration: 800, 
                loop: true,
                delay: 200,
                type: 'timing',
              }}
              className="w-2 h-2 bg-white rounded-full"
            />
            <MotiView
              from={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ 
                duration: 800, 
                loop: true,
                delay: 400,
                type: 'timing',
              }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </View>

          {/* Text */}
          <Text className="text-white/90 text-sm font-medium ml-1">
            Tutor is thinking...
          </Text>
        </View>
      </MotiView>
    </MotiView>
  );
}