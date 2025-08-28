import React, { useState } from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import { MotiView } from 'moti';
import { ExternalLink, Search, Film, Image as ImageIcon, Bookmark, BookmarkCheck } from 'lucide-react-native';

interface MediaItem {
  id: string;
  keywords: string[];
  description: string;
  search_query: string;
}

interface MediaCardProps {
  item: MediaItem;
  type: 'image' | 'video';
  delay?: number;
  onBookmarkToggle?: (id: string) => void;
  isBookmarked?: boolean;
}

export default function MediaCard({
  item,
  type,
  delay = 0,
  onBookmarkToggle,
  isBookmarked = false,
}: MediaCardProps) {
  const [localBookmark, setLocalBookmark] = useState(isBookmarked);

  const handleSearchPress = () => {
    const searchUrl =
      type === 'video'
        ? `https://www.youtube.com/results?search_query=${encodeURIComponent(item.search_query)}`
        : `https://www.google.com/search?q=${encodeURIComponent(item.search_query)}&tbm=isch`;

    Linking.openURL(searchUrl);
  };

  const toggleBookmark = () => {
    const newValue = !localBookmark;
    setLocalBookmark(newValue);
    if (onBookmarkToggle) {
      onBookmarkToggle(item.id);
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95, translateY: 20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{
        type: 'spring',
        duration: 600,
        delay: delay * 150,
      }}
      className="mb-3"
    >
      <View
        className="bg-slate-800/80 rounded-xl border border-slate-600/40 overflow-hidden shadow-lg"
        style={{
          shadowColor: type === 'video' ? '#ec4899' : '#f59e0b',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        {/* Header */}
        <View className="p-3">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center mr-2 ${
                  type === 'video'
                    ? 'bg-gradient-to-br from-pink-500 to-rose-600'
                    : 'bg-gradient-to-br from-amber-500 to-orange-600'
                }`}
              >
                {type === 'video' ? (
                  <Film size={14} color="#ffffff" />
                ) : (
                  <ImageIcon size={14} color="#ffffff" />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-slate-100 font-bold text-sm">
                  {type === 'video' ? 'Video Resource' : 'High-Yield Image'}
                </Text>
                <Text className="text-slate-400 text-xs">
                  {type === 'video' ? 'Educational content' : 'Visual learning aid'}
                </Text>
              </View>
            </View>

            {/* Bookmark Toggle Button */}
            <Pressable
              onPress={toggleBookmark}
              className={`w-8 h-8 rounded-full items-center justify-center active:scale-95 ${
                localBookmark ? 'bg-amber-500/20' : 'bg-slate-700/40'
              }`}
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

          {/* Description */}
          <Text className="text-slate-200 text-sm leading-5 mb-3">
            {item.description}
          </Text>

          {/* Keywords */}
          {item.keywords?.length > 0 && (
            <View className="flex-row flex-wrap mb-3">
              {item.keywords.map((kw, idx) => (
                <View
                  key={idx}
                  className="bg-slate-700/50 px-2 py-1 rounded-full mr-2 mb-2"
                >
                  <Text className="text-xs text-slate-300">#{kw}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Search Button */}
          <Pressable
            onPress={handleSearchPress}
            className={`flex-row items-center justify-center rounded-lg py-2 px-3 shadow-md active:scale-95 ${
              type === 'video'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600'
                : 'bg-gradient-to-r from-amber-600 to-orange-600'
            }`}
            style={{
              shadowColor: type === 'video' ? '#ec4899' : '#f59e0b',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Search size={14} color="#ffffff" />
            <Text className="text-white font-bold ml-2 text-sm">
              Search on {type === 'video' ? 'YouTube' : 'Google Images'}
            </Text>
            <ExternalLink size={12} color="#ffffff" style={{ marginLeft: 6 }} />
          </Pressable>
        </View>
      </View>
    </MotiView>
  );
}
