import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { FileText } from 'lucide-react-native';
import Markdown from 'react-native-markdown-display';

interface SummaryCardProps {
  summary: string;
  delay?: number;
}

export default function SummaryCard({ summary, delay = 0 }: SummaryCardProps) {
  const markdownStyles = {
    body: {
      color: '#f3f4f6',
      backgroundColor: 'transparent',
      fontSize: 16,
      lineHeight: 24,
    },
    heading1: {
      color: '#f3f4f6',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    heading2: {
      color: '#60a5fa',
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 12,
      marginTop: 20,
    },
    paragraph: {
      color: '#f3f4f6',
      marginBottom: 12,
      lineHeight: 22,
    },
    listItem: {
      color: '#f3f4f6',
      marginBottom: 6,
    },
    listItemBullet: {
      color: '#10b981',
    },
    strong: {
      color: '#34d399',
      fontWeight: '700',
      textShadowColor: '#0f766e',
      textShadowRadius: 3,
      backgroundColor: 'transparent',
    },
    em: {
      color: '#5eead4',
      fontStyle: 'italic',
      backgroundColor: 'transparent',
    },
    code_inline: {
      backgroundColor: '#374151',
      color: '#10b981',
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
    },
    blockquote: {
      backgroundColor: '#1f2937',
      borderLeftColor: '#10b981',
      borderLeftWidth: 4,
      paddingLeft: 16,
      paddingVertical: 8,
      marginVertical: 12,
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95, translateY: 20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ 
        type: 'spring', 
        duration: 600,
        delay: delay * 100
      }}
      className="mb-6"
    >
      <View className="flex-row items-center mb-4">
        <FileText size={24} color="#10b981" />
        <Text className="text-gray-100 text-lg font-semibold ml-2">
          📋 Learning Summary
        </Text>
      </View>
      
      <View className="bg-gray-800 rounded-xl p-6 border border-gray-600 shadow-lg">
        <Markdown style={markdownStyles}>
          {summary}
        </Markdown>
      </View>
    </MotiView>
  );
}