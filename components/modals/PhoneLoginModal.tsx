import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { Phone, X } from 'lucide-react-native';
import BaseModal from './BaseModal';

interface PhoneLoginModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSendOTP: (phoneNumber: string) => void;
}

export default function PhoneLoginModal({ 
  isVisible, 
  onClose, 
  onSendOTP 
}: PhoneLoginModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    if (phoneNumber.trim()) {
      onSendOTP(phoneNumber.trim());
      setPhoneNumber('');
    }
  };

  const handleClose = () => {
    setPhoneNumber('');
    onClose();
  };

  return (
    <BaseModal isVisible={isVisible} onClose={handleClose}>
      {/* Header */}
      <View className="flex-row items-center justify-between p-6 border-b border-slate-600/30">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full items-center justify-center mr-3">
            <Phone size={20} color="#ffffff" />
          </View>
          <Text className="text-xl font-bold text-slate-100">
            Login with Phone Number
          </Text>
        </View>
        <Pressable
          onPress={handleClose}
          className="w-8 h-8 rounded-full bg-slate-700/50 items-center justify-center active:scale-95"
        >
          <X size={16} color="#94a3b8" />
        </Pressable>
      </View>

      {/* Content */}
      <View className="p-6">
        <Text className="text-slate-300 text-sm mb-4 text-center">
          Enter your phone number to receive an OTP for secure login
        </Text>

        {/* Phone Input */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200 }}
        >
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number with +91"
            placeholderTextColor="#64748b"
            keyboardType="phone-pad"
            className="bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-100 text-base mb-6"
            style={{
              shadowColor: '#3b82f6',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          />
        </MotiView>

        {/* Buttons */}
        <View className="space-y-3">
          {/* Send OTP Button */}
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 300 }}
          >
            <Pressable
              onPress={handleSubmit}
              disabled={!phoneNumber.trim()}
              className={`rounded-xl py-3 px-6 shadow-lg active:scale-95 ${
                phoneNumber.trim()
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                  : 'bg-slate-600/50'
              }`}
              style={{
                shadowColor: phoneNumber.trim() ? '#3b82f6' : '#64748b',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Text className={`text-center font-bold text-base ${
                phoneNumber.trim() ? 'text-white' : 'text-slate-400'
              }`}>
                Send OTP
              </Text>
            </Pressable>
          </MotiView>

          {/* Cancel Button */}
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 400 }}
          >
            <Pressable
              onPress={handleClose}
              className="rounded-xl py-3 px-6 bg-slate-700/50 border border-slate-600/50 active:scale-95"
            >
              <Text className="text-slate-300 text-center font-semibold text-base">
                Cancel
              </Text>
            </Pressable>
          </MotiView>
        </View>
      </View>
    </BaseModal>
  );
}