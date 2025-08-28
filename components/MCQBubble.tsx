import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MotiView } from 'moti';
import Markdown from 'react-native-markdown-display';
import { MCQOption } from '@/types/learning';

interface MCQBubbleProps {
  options: MCQOption;
  onSelect: (option: keyof MCQOption) => void;
  disabled?: boolean;
}

export default function MCQBubble({ options, onSelect, disabled = false }: MCQBubbleProps) {
  const optionKeys = Object.keys(options) as (keyof MCQOption)[];

  const markdownStyles = {
    body: {
      color: '#f1f5f9',
      backgroundColor: 'transparent',
      fontSize: 14,
      lineHeight: 20,
      margin: 0,
    },
    paragraph: {
      color: '#f1f5f9',
      marginBottom: 0,
      lineHeight: 20,
      fontSize: 14,
    },
    strong: {
      color: '#34d399',
      fontWeight: '700',
      backgroundColor: 'transparent',
    },
    em: {
      color: '#5eead4',
      fontStyle: 'italic',
      backgroundColor: 'transparent',
    },
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30, scale: 0.95 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'spring', duration: 700, delay: 300 }}
      className="w-full mb-4 px-1"
    >
      {/* Mobile: Single Column Layout (hidden on desktop) */}
      <View className="lg:hidden space-y-3">
        {optionKeys.map((key, index) => (
          <MotiView
            key={key}
            from={{ opacity: 0, translateY: 20, scale: 0.9 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            transition={{ 
              type: 'spring', 
              duration: 500, 
              delay: 200 * index + 400 
            }}
            className="w-full"
          >
            <Pressable
              onPress={() => !disabled && onSelect(key)}
              disabled={disabled}
              className={`
                p-4 rounded-xl border border-slate-600/50 min-h-[56px] shadow-lg
                ${disabled 
                  ? 'bg-slate-800/40 opacity-60' 
                  : 'bg-slate-800/90 active:bg-slate-700/95 active:scale-[0.98]'
                }
              `}
              style={{
                shadowColor: disabled ? '#64748b' : '#3b82f6',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: disabled ? 0.1 : 0.15,
                shadowRadius: 6,
                elevation: disabled ? 2 : 4,
              }}
            >
              <View className="flex-row items-center space-x-3">
                {/* Option Letter Circle */}
                <MotiView
                  from={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: 'spring', 
                    duration: 400, 
                    delay: 200 * index + 600 
                  }}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center shadow-md flex-shrink-0"
                  style={{
                    shadowColor: '#3b82f6',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Text className="text-white font-bold text-sm">{key}</Text>
                </MotiView>
                
                {/* Option text */}
                <View className="flex-1">
                  <Markdown style={markdownStyles}>
                    {options[key]}
                  </Markdown>
                </View>
              </View>
            </Pressable>
          </MotiView>
        ))}
      </View>

      {/* Desktop: 2x2 Grid Layout (hidden on mobile) */}
      <View className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
        {optionKeys.map((key, index) => (
          <MotiView
            key={key}
            from={{ opacity: 0, translateY: 20, scale: 0.9 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            transition={{ 
              type: 'spring', 
              duration: 500, 
              delay: 200 * index + 400 
            }}
            className="w-full"
          >
            <Pressable
              onPress={() => !disabled && onSelect(key)}
              disabled={disabled}
              className={`
                p-4 rounded-xl border border-slate-600/50 min-h-[60px] shadow-lg
                ${disabled 
                  ? 'bg-slate-800/40 opacity-60' 
                  : 'bg-slate-800/90 hover:bg-slate-700/95 active:scale-[0.98]'
                }
              `}
              style={{
                shadowColor: disabled ? '#64748b' : '#3b82f6',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: disabled ? 0.1 : 0.15,
                shadowRadius: 6,
                elevation: disabled ? 2 : 4,
              }}
            >
              <View className="flex-row items-center space-x-3">
                {/* Option Letter Circle */}
                <MotiView
                  from={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: 'spring', 
                    duration: 400, 
                    delay: 200 * index + 600 
                  }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center shadow-md flex-shrink-0"
                  style={{
                    shadowColor: '#3b82f6',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Text className="text-white font-bold text-sm">{key}</Text>
                </MotiView>
                
                {/* Option text */}
                <View className="flex-1">
                  <Markdown style={markdownStyles}>
                    {options[key]}
                  </Markdown>
                </View>
              </View>
            </Pressable>
          </MotiView>
        ))}
      </View>
    </MotiView>
  );
}