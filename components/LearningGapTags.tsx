import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { Tag, Bookmark, BookmarkCheck, Hash } from 'lucide-react-native';

interface LearningGapTag {
  id: string;
  tag: string;
}

interface LearningGapTagsProps {
  tags: LearningGapTag[];
  onTagPress?: (tag: LearningGapTag) => void;
  onBookmarkToggle?: (tagId: string) => void;
  bookmarkedTags?: Set<string>;
  title?: string;
  maxHeight?: number;
}

export default function LearningGapTags({
  tags = [],
  onTagPress,
  onBookmarkToggle,
  bookmarkedTags = new Set(),
  title = "Learning Gap Tags",
  maxHeight = 300,
}: LearningGapTagsProps) {
  const [localBookmarks, setLocalBookmarks] = useState<Set<string>>(new Set());

  const handleBookmarkToggle = (tagId: string) => {
    const newBookmarks = new Set(localBookmarks);
    if (newBookmarks.has(tagId)) {
      newBookmarks.delete(tagId);
    } else {
      newBookmarks.add(tagId);
    }
    setLocalBookmarks(newBookmarks);
    onBookmarkToggle?.(tagId);
  };

  const isBookmarked = (tagId: string) => {
    return bookmarkedTags.has(tagId) || localBookmarks.has(tagId);
  };

  const formatTagText = (tag: string) => {
    return tag
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getTagColor = (index: number) => {
    const colors = [
      { bg: 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20', border: 'border-blue-500/30', text: 'text-blue-200' },
      { bg: 'bg-gradient-to-r from-purple-600/20 to-violet-600/20', border: 'border-purple-500/30', text: 'text-purple-200' },
      { bg: 'bg-gradient-to-r from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30', text: 'text-emerald-200' },
      { bg: 'bg-gradient-to-r from-orange-600/20 to-amber-600/20', border: 'border-orange-500/30', text: 'text-orange-200' },
      { bg: 'bg-gradient-to-r from-pink-600/20 to-rose-600/20', border: 'border-pink-500/30', text: 'text-pink-200' },
      { bg: 'bg-gradient-to-r from-cyan-600/20 to-sky-600/20', border: 'border-cyan-500/30', text: 'text-cyan-200' },
    ];
    return colors[index % colors.length];
  };

  if (!tags || tags.length === 0) {
    return (
      <MotiView
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 600 }}
        className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/40 shadow-lg"
      >
        <View className="flex-row items-center justify-center">
          <Hash size={20} color="#64748b" />
          <Text className="text-slate-400 ml-2 text-center">
            No learning gap tags available
          </Text>
        </View>
      </MotiView>
    );
  }

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30, scale: 0.95 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'spring', duration: 800, delay: 200 }}
      className="bg-slate-800/60 rounded-xl border border-slate-700/40 shadow-lg mb-6"
      style={{
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-slate-700/30">
        <View className="flex-row items-center">
          <MotiView
            from={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 600, delay: 400 }}
            className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg items-center justify-center mr-3 shadow-md"
          >
            <Tag size={16} color="#ffffff" />
          </MotiView>
          <View className="flex-1">
            <Text className="text-lg font-bold text-slate-100">{title}</Text>
            <Text className="text-sm text-indigo-300/90">
              {tags.length} learning gap{tags.length !== 1 ? 's' : ''} identified
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <View className="w-6 h-6 bg-amber-500/20 rounded-full items-center justify-center mr-1">
            <Text className="text-amber-400 text-xs font-bold">
              {Array.from(new Set([...bookmarkedTags, ...localBookmarks])).length}
            </Text>
          </View>
          <Bookmark size={14} color="#fbbf24" />
        </View>
      </View>

      {/* Tags Container */}
      <ScrollView
        className="p-4"
        showsVerticalScrollIndicator={false}
        style={{ maxHeight }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-row flex-wrap">
          {tags.map((tag, index) => {
            const colors = getTagColor(index);
            const bookmarked = isBookmarked(tag.id);

            return (
              <MotiView
                key={tag.id}
                from={{ opacity: 0, scale: 0.8, translateY: 20 }}
                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                transition={{ 
                  type: 'spring', 
                  duration: 600, 
                  delay: index * 100 + 600 
                }}
                className="mb-3 mr-3"
              >
                <View 
                  className={`${colors.bg} rounded-full border ${colors.border} overflow-hidden shadow-lg`}
                  style={{
                    shadowColor: colors.border.includes('blue') ? '#3b82f6' : 
                                colors.border.includes('purple') ? '#8b5cf6' :
                                colors.border.includes('emerald') ? '#10b981' :
                                colors.border.includes('orange') ? '#f59e0b' :
                                colors.border.includes('pink') ? '#ec4899' : '#06b6d4',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <View className="flex-row items-center">
                    {/* Tag Content */}
                    <Pressable
                      onPress={() => onTagPress?.(tag)}
                      className="flex-1 px-4 py-2 active:bg-black/10"
                    >
                      <View className="flex-row items-center">
                        <Hash size={12} color={colors.text.includes('blue') ? '#93c5fd' : 
                                              colors.text.includes('purple') ? '#c4b5fd' :
                                              colors.text.includes('emerald') ? '#6ee7b7' :
                                              colors.text.includes('orange') ? '#fcd34d' :
                                              colors.text.includes('pink') ? '#f9a8d4' : '#67e8f9'} />
                        <Text className={`${colors.text} font-medium text-sm ml-1`}>
                          {formatTagText(tag.tag)}
                        </Text>
                      </View>
                    </Pressable>

                    {/* Separator */}
                    <View className="w-px h-6 bg-white/10" />

                    {/* Bookmark Button */}
                    <Pressable
                      onPress={() => handleBookmarkToggle(tag.id)}
                      className="px-3 py-2 active:bg-black/10"
                    >
                      <MotiView
                        animate={{
                          scale: bookmarked ? [1, 1.3, 1] : 1,
                          rotate: bookmarked ? [0, 15, -15, 0] : 0,
                        }}
                        transition={{ type: 'spring', duration: 400 }}
                      >
                        {bookmarked ? (
                          <BookmarkCheck size={14} color="#fbbf24" fill="#fbbf24" />
                        ) : (
                          <Bookmark size={14} color="#94a3b8" />
                        )}
                      </MotiView>
                    </Pressable>
                  </View>
                </View>
              </MotiView>
            );
          })}
        </View>

        {/* Empty State Message */}
        {tags.length === 0 && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 800 }}
            className="flex-1 items-center justify-center py-8"
          >
            <View className="w-16 h-16 bg-slate-700/50 rounded-full items-center justify-center mb-4">
              <Tag size={24} color="#64748b" />
            </View>
            <Text className="text-slate-400 text-center text-base">
              No learning gap tags to display
            </Text>
            <Text className="text-slate-500 text-center text-sm mt-1">
              Tags will appear here as you progress through the content
            </Text>
          </MotiView>
        )}
      </ScrollView>

      {/* Footer */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 500, delay: 1000 }}
        className="px-4 py-3 border-t border-slate-700/30 bg-slate-900/20"
      >
        <Text className="text-xs text-slate-400 text-center font-medium">
          Tap tags to explore • Bookmark important concepts for later review
        </Text>
      </MotiView>
    </MotiView>
  );
}