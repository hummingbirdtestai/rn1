import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { Bookmark, BookmarkCheck } from 'lucide-react-native';
import Markdown from 'react-native-markdown-display';

interface LearningGap {
  id: string;
  level: number;
  confusion: string;
  gap: string;
}

interface LearningGapTreeProps {
  learningGaps: LearningGap[];
  completedLevels?: number[];
  currentLevel?: number;
  bookmarkedIds?: Set<string>; // ✅ from AdaptiveChat
  onBookmarkToggle?: (id: string, text: string) => void; // ✅ callback
}

export default function LearningGapTree({
  learningGaps = [],
  completedLevels = [],
  currentLevel,
  bookmarkedIds = new Set(),
  onBookmarkToggle,
}: LearningGapTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (id: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedNodes(newExpanded);
  };

  const markdownStyles = {
    body: { color: '#f1f5f9', fontSize: 14, lineHeight: 20 },
    paragraph: { color: '#f1f5f9', lineHeight: 20, fontSize: 14 },
    strong: { color: '#34d399', fontWeight: '700' },
    em: { color: '#5eead4', fontStyle: 'italic' },
  };

  const getNodeStatus = (level: number) => {
    if (completedLevels.includes(level)) return 'completed';
    if (currentLevel === level) return 'current';
    return 'pending';
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case 'completed':
        return { border: 'border-emerald-500/60', bg: 'bg-emerald-900/20', text: 'text-emerald-100', shadow: '#10b981' };
      case 'current':
        return { border: 'border-blue-500/60', bg: 'bg-blue-900/20', text: 'text-blue-100', shadow: '#3b82f6' };
      default:
        return { border: 'border-slate-600/40', bg: 'bg-slate-800/20', text: 'text-slate-300', shadow: '#64748b' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <FontAwesome name="check-circle" size={18} color="#10b981" />;
      case 'current': return <FontAwesome name="clock-o" size={18} color="#3b82f6" />;
      default: return <Feather name="alert-circle" size={18} color="#64748b" />;
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30, scale: 0.95 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'spring', duration: 800, delay: 300 }}
      className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/40 shadow-lg mb-4"
      style={{
        shadowColor: '#8b5cf6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center space-x-3 mb-4">
        <MotiView
          from={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 600, delay: 500 }}
          className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg items-center justify-center shadow-md"
        >
          <MaterialCommunityIcons name="brain" size={16} color="#ffffff" />
        </MotiView>
        <View className="flex-1">
          <Text className="text-lg font-bold text-slate-100">Learning Gaps</Text>
          <Text className="text-sm text-purple-300/90">
            {completedLevels.length} of {learningGaps?.length || 0} gaps addressed
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="mb-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-xs text-slate-400 font-medium">Progress</Text>
          <Text className="text-xs text-slate-400 font-medium">
            {learningGaps?.length > 0
              ? Math.round((completedLevels.length / learningGaps.length) * 100)
              : 0}%
          </Text>
        </View>
        <View className="w-full bg-slate-700/60 rounded-full h-2 overflow-hidden">
          <MotiView
            from={{ width: '0%' }}
            animate={{
              width: `${
                learningGaps?.length > 0
                  ? (completedLevels.length / learningGaps.length) * 100
                  : 0
              }%`,
            }}
            transition={{ type: 'spring', duration: 1200, delay: 600 }}
            className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 h-2 rounded-full"
          />
        </View>
      </View>

      {/* Tree Nodes */}
      <ScrollView className="space-y-4" showsVerticalScrollIndicator={false}>
        {learningGaps?.map((gap, index) => {
          const status = getNodeStatus(gap.level);
          const colors = getStatusColors(status);
          const isExpanded = expandedNodes.has(gap.id);

          return (
            <MotiView
              key={gap.id}
              from={{ opacity: 0, translateX: -30, scale: 0.9 }}
              animate={{ opacity: 1, translateX: 0, scale: 1 }}
              transition={{
                type: 'spring',
                duration: 500,
                delay: index * 150 + 700,
              }}
              className={`rounded-xl border ${colors.border} ${colors.bg} mb-2`}
              style={{
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 6,
                elevation: 3,
              }}
            >
              {/* Node Header */}
              <Pressable
                onPress={() => toggleNode(gap.id)}
                className="w-full p-3 active:bg-slate-700/30"
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-1 pr-2">
                    <View className="flex-row items-center space-x-2 mb-2">
                      {getStatusIcon(status)}
                      <Text className="text-xs text-slate-400 uppercase font-bold tracking-wide">
                        Level {gap.level} Confusion
                      </Text>
                    </View>
                    <Markdown style={markdownStyles}>{gap.confusion}</Markdown>
                  </View>

                  <View className="flex-row items-center space-x-2">
                    {/* ✅ Persistent Bookmark */}
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation();
                        onBookmarkToggle?.(gap.id, gap.gap);
                      }}
                      className="w-8 h-8 rounded-full items-center justify-center"
                    >
                      <MotiView
                        animate={{
                          scale: bookmarkedIds.has(gap.id) ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ type: 'spring', duration: 300 }}
                      >
                        {bookmarkedIds.has(gap.id) ? (
                          <BookmarkCheck size={16} color="#fbbf24" fill="#fbbf24" />
                        ) : (
                          <Bookmark size={16} color="#94a3b8" />
                        )}
                      </MotiView>
                    </Pressable>

                    {/* Expand Arrow */}
                    <MotiView
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ type: 'spring', duration: 300 }}
                    >
                      <Feather name="chevron-right" size={16} color="#94a3b8" />
                    </MotiView>
                  </View>
                </View>
              </Pressable>

              {/* Expanded Gap */}
              <AnimatePresence>
                {isExpanded && (
                  <MotiView
                    from={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', duration: 400 }}
                    className="px-3 pb-3"
                  >
                    <View className="bg-slate-900/40 rounded-lg p-3 border border-slate-600/20">
                      <View className="flex-row space-x-2">
                        <View className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg items-center justify-center">
                          <FontAwesome
                            name="lightbulb-o"
                            size={12}
                            color="#ffffff"
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="text-xs text-yellow-400 mb-1 uppercase font-bold">
                            Knowledge Gap
                          </Text>
                          <Markdown style={markdownStyles}>{gap.gap}</Markdown>
                        </View>
                      </View>
                    </View>
                  </MotiView>
                )}
              </AnimatePresence>
            </MotiView>
          );
        })}
      </ScrollView>

      {/* Footer */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 500, delay: 1000 }}
        className="mt-4 pt-3 border-t border-slate-600/30 items-center"
      >
        <Text className="text-xs text-slate-400 text-center font-medium">
          Tap on any level to explore the specific knowledge gap
        </Text>
      </MotiView>
    </MotiView>
  );
}
