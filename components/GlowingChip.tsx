import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { Bookmark, BookmarkCheck } from 'lucide-react-native';

interface GlowingChipProps {
  item: {
    id: string;
    text: string;
  };
  delay?: number;
  onPress?: () => void;
  onBookmarkToggle?: (id: string, text: string) => void; // ✅ now passes both
  isBookmarked?: boolean;
}

export default function GlowingChip({
  item,
  delay = 0,
  onPress,
  onBookmarkToggle,
  isBookmarked = false,
}: GlowingChipProps) {
  const [localBookmark, setLocalBookmark] = useState(isBookmarked);

  const handleBookmarkToggle = () => {
    const newValue = !localBookmark;
    setLocalBookmark(newValue);
    if (onBookmarkToggle) {
      onBookmarkToggle(item.id, item.text); // ✅ send id + text upward
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.8, translateY: 20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ type: 'spring', duration: 600, delay }}
      className="mb-2 mr-2"
    >
      <View className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full border border-indigo-500/30 overflow-hidden shadow-lg">
        <View className="flex-row items-center">
          {/* Buzzword Text */}
          <Pressable
            onPress={onPress}
            className="flex-1 px-4 py-2 active:bg-indigo-500/10"
          >
            <Text className="text-indigo-200 font-medium text-sm">
              {item.text}
            </Text>
          </Pressable>

          {/* Separator */}
          <View className="w-px h-6 bg-indigo-500/20" />

          {/* Bookmark Toggle Button */}
          <Pressable
            onPress={handleBookmarkToggle}
            className="px-3 py-2 active:bg-indigo-500/10"
          >
            <MotiView
              animate={{
                scale: localBookmark ? [1, 1.2, 1] : 1,
              }}
              transition={{ type: 'spring', duration: 300 }}
            >
              {localBookmark ? (
                <BookmarkCheck size={16} color="#fbbf24" fill="#fbbf24" />
              ) : (
                <Bookmark size={16} color="#94a3b8" />
              )}
            </MotiView>
          </Pressable>
        </View>
      </View>
    </MotiView>
  );
}
