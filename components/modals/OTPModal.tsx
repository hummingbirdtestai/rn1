import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { Shield, X } from 'lucide-react-native';
import BaseModal from './BaseModal';

interface OTPModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmitOTP: (otp: string) => void;
  phoneNumber?: string;
}

export default function OTPModal({ 
  isVisible, 
  onClose, 
  onSubmitOTP,
  phoneNumber 
}: OTPModalProps) {
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    if (otp.trim()) {
      onSubmitOTP(otp.trim());
      setOtp('');
    }
  };

  const handleClose = () => {
    setOtp('');
    onClose();
  };

  return (
    <BaseModal isVisible={isVisible} onClose={handleClose}>
      {/* Header */}
      <View className="flex-row items-center justify-between p-6 border-b border-slate-600/30">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full items-center justify-center mr-3">
            <Shield size={20} color="#ffffff" />
          </View>
          <Text className="text-xl font-bold text-slate-100">
            Enter OTP
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
        <Text className="text-slate-300 text-sm mb-2 text-center">
          We've sent a verification code to
        </Text>
        {phoneNumber && (
          <Text className="text-emerald-400 text-base font-semibold mb-4 text-center">
            {phoneNumber}
          </Text>
        )}
        <Text className="text-slate-400 text-xs mb-6 text-center">
          Enter the 6-digit code to continue
        </Text>

        {/* OTP Input */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200 }}
        >
          <TextInput
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter OTP"
            placeholderTextColor="#64748b"
            keyboardType="numeric"
            maxLength={6}
            className="bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-100 text-base text-center mb-6 tracking-widest"
            style={{
              shadowColor: '#10b981',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
              fontSize: 18,
              letterSpacing: 4,
            }}
          />
        </MotiView>

        {/* Buttons */}
        <View className="space-y-3">
          {/* Submit Button */}
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 300 }}
          >
            <Pressable
              onPress={handleSubmit}
              disabled={!otp.trim() || otp.length < 6}
              className={`rounded-xl py-3 px-6 shadow-lg active:scale-95 ${
                otp.trim() && otp.length >= 6
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                  : 'bg-slate-600/50'
              }`}
              style={{
                shadowColor: otp.trim() && otp.length >= 6 ? '#10b981' : '#64748b',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Text className={`text-center font-bold text-base ${
                otp.trim() && otp.length >= 6 ? 'text-white' : 'text-slate-400'
              }`}>
                Submit OTP
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

        {/* Resend Link */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 500 }}
          className="mt-4"
        >
          <Pressable className="py-2">
            <Text className="text-emerald-400 text-sm text-center font-medium">
              Didn't receive the code? Resend
            </Text>
          </Pressable>
        </MotiView>
      </View>
    </BaseModal>
  );
}