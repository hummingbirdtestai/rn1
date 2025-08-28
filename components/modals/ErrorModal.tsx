import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { TriangleAlert as AlertTriangle, X } from 'lucide-react-native';
import BaseModal from './BaseModal';

interface ErrorModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function ErrorModal({ 
  isVisible, 
  onClose,
  title = "Error",
  message = "Something went wrong. Please try again."
}: ErrorModalProps) {
  return (
    <BaseModal isVisible={isVisible} onClose={onClose}>
      {/* Header */}
      <View className="flex-row items-center justify-between p-6 border-b border-slate-600/30">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-full items-center justify-center mr-3">
            <AlertTriangle size={20} color="#ffffff" />
          </View>
          <Text className="text-xl font-bold text-slate-100">
            {title}
          </Text>
        </View>
        <Pressable
          onPress={onClose}
          className="w-8 h-8 rounded-full bg-slate-700/50 items-center justify-center active:scale-95"
        >
          <X size={16} color="#94a3b8" />
        </Pressable>
      </View>

      {/* Content */}
      <View className="p-6">
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200 }}
        >
          <Text className="text-slate-300 text-base mb-6 text-center leading-6">
            {message}
          </Text>
        </MotiView>

        {/* Close Button */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 300 }}
        >
          <Pressable
            onPress={onClose}
            className="rounded-xl py-3 px-6 bg-gradient-to-r from-red-600 to-rose-600 shadow-lg active:scale-95"
            style={{
              shadowColor: '#ef4444',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text className="text-white text-center font-bold text-base">
              Close
            </Text>
          </Pressable>
        </MotiView>
      </View>
    </BaseModal>
  );
}