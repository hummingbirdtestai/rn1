import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MotiView } from 'moti';
import Markdown from 'react-native-markdown-display';
import { Ionicons } from '@expo/vector-icons';
import { ChatMessage } from '@/types/learning';

interface ChatBubbleProps {
  message: ChatMessage;
  isBookmarked?: boolean;              // ✅ NEW
  onToggleBookmark?: () => void;       // ✅ NEW
}

export default function ChatBubble({ message, isBookmarked, onToggleBookmark }: ChatBubbleProps) {
  const isStudent = message.type === 'student';
  
  const markdownStyles = {
    body: {
      color: '#ffffff',
      backgroundColor: 'transparent',
      fontSize: 16,
      lineHeight: 24,
      margin: 0,
      fontFamily: 'System',
    },
    paragraph: {
      color: '#ffffff',
      marginBottom: 8,
      lineHeight: 24,
      fontSize: 16,
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
    table: {
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.15)',
      borderRadius: 12,
      marginVertical: 16,
      backgroundColor: 'rgba(0,0,0,0.2)',
      overflow: 'hidden',
    },
    thead: {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    tbody: {
      backgroundColor: 'transparent',
    },
    th: {
      color: '#ffffff',
      fontWeight: '700',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.15)',
      textAlign: 'left',
      fontSize: 15,
    },
    td: {
      color: '#f1f5f9',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.08)',
      fontSize: 15,
    },
    list_item: {
      color: '#ffffff',
      marginLeft: 16,
      marginBottom: 6,
      fontSize: 16,
    },
    bullet_list: {
      marginVertical: 8,
    },
    ordered_list: {
      marginVertical: 8,
    },
    code_inline: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: '#fbbf24',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      fontSize: 14,
      fontFamily: 'monospace',
    },
    blockquote: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderLeftWidth: 4,
      borderLeftColor: isStudent ? '#8b5cf6' : '#14b8a6',
      paddingLeft: 16,
      paddingVertical: 12,
      marginVertical: 12,
      borderRadius: 8,
    },
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20, scale: 0.95 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ 
        type: 'spring', 
        duration: 600,
        delay: 100,
      }}
      className={`flex-row items-end mb-3 px-1 ${
        isStudent ? 'flex-row-reverse' : ''
      }`}
    >
      {/* Avatar */}
      <MotiView
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: 'spring',
          duration: 500,
          delay: 300,
        }}
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
          isStudent ? 'bg-gradient-to-br from-indigo-500 to-purple-600 ml-2' : 'bg-gradient-to-br from-teal-500 to-cyan-600 mr-2'
        }`}
        style={{
          shadowColor: isStudent ? '#6366f1' : '#14b8a6',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons 
          name={isStudent ? 'person' : 'school'} 
          size={18} 
          color="white" 
        />
      </MotiView>

      {/* Message bubble */}
      {(() => {
        const bubbleClasses = `max-w-[85%] px-3 py-2 shadow-lg relative ${
          isStudent 
            ? 'bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl rounded-br-md' 
            : 'bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl rounded-bl-md'
        }`;
        
        return (
      <MotiView
        from={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: 'spring',
          duration: 600,
          delay: 200,
        }}
        className={bubbleClasses}
        style={{
          shadowColor: isStudent ? '#4f46e5' : '#0f766e',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <Markdown style={markdownStyles}>
          {message.content}
        </Markdown>

        {/* ✅ Bookmark toggle only for tutor messages */}
        {!isStudent && onToggleBookmark && (
          <Pressable
            onPress={onToggleBookmark}
            className="absolute top-2 right-2 p-2"
          >
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={20}
              color={isBookmarked ? "#34d399" : "#94a3b8"}
            />
          </Pressable>
        )}

        {/* Feedback icons for student answers */}
        {isStudent && typeof message.isCorrect === 'boolean' && (
          <MotiView
            from={{ scale: 0, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ 
              type: 'spring',
              duration: 600,
              delay: 400,
            }}
            className="mt-2 flex-row justify-end"
          >
            <View className={`w-5 h-5 rounded-full items-center justify-center shadow-sm ${
              message.isCorrect ? 'bg-emerald-500' : 'bg-red-500'
            }`}>
              <Ionicons
                name={message.isCorrect ? 'checkmark' : 'close'}
                size={12}
                color="white"
              />
            </View>
          </MotiView>
        )}
      </MotiView>
        );
      })()}
    </MotiView>
  );
}
