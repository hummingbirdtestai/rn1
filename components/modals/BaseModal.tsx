import React from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { BlurView } from 'expo-blur';

interface BaseModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export default function BaseModal({ 
  isVisible, 
  onClose, 
  children, 
  showCloseButton = true 
}: BaseModalProps) {
  const { width, height } = Dimensions.get('window');
  const isMobile = width < 768;

  return (
    <AnimatePresence>
      {isVisible && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'timing', duration: 300 }}
          className="absolute inset-0 z-50 items-center justify-center"
          style={{ width, height }}
        >
          {/* Background Overlay with Blur */}
          <BlurView
            intensity={20}
            tint="dark"
            className="absolute inset-0"
          >
            <Pressable 
              onPress={onClose}
              className="flex-1 bg-black/40"
            />
          </BlurView>

          {/* Modal Content */}
          <MotiView
            from={{ 
              opacity: 0, 
              scale: 0.9, 
              translateY: 50 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              translateY: 0 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              translateY: 50 
            }}
            transition={{ 
              type: 'spring', 
              duration: 400,
              damping: 15,
              stiffness: 300
            }}
            className={`bg-slate-800 rounded-2xl border border-slate-600/50 shadow-2xl ${
              isMobile ? 'mx-4 w-full max-w-sm' : 'w-96'
            }`}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.5,
              shadowRadius: 30,
              elevation: 20,
            }}
          >
            {children}
          </MotiView>
        </MotiView>
      )}
    </AnimatePresence>
  );
}