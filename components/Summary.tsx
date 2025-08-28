import React, { useState } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Bookmark, BookmarkCheck, ChevronLeft, ChevronRight } from 'lucide-react-native';
import Markdown from 'react-native-markdown-display';

interface FlashcardData {
  id: string;
  number: number;
  content: string;
}

interface SummaryProps {
  content: any; // string (markdown) or array of objects
  bookmarkedIds?: Set<string>; // ✅ all bookmarks passed from AdaptiveChat
  onBookmarkToggle?: (id: string, text: string) => void; // ✅ callback to persist in Supabase
}

export default function Summary({
  content,
  bookmarkedIds = new Set(),
  onBookmarkToggle,
}: SummaryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { width } = Dimensions.get('window');
  const isMobile = width < 768;

  // ✅ Parse flashcards from markdown OR JSON array
  const parseFlashcards = (input: any): FlashcardData[] => {
    if (Array.isArray(input)) {
      return input.map((item, index) => ({
        id: item.id || `card-${index + 1}`,
        number: index + 1,
        content: item.text || `Fact ${index + 1}`,
      }));
    }

    if (typeof input === 'string') {
      const lines = input.split('\n').filter((line) => line.trim());
      const dataLines = lines.filter(
        (line) =>
          line.startsWith('|') &&
          !line.includes('---') &&
          !line.includes('High-Yield Fact')
      );

      return dataLines.map((line, index) => {
        const parts = line
          .split('|')
          .map((part) => part.trim())
          .filter((part) => part);
        const number = parseInt(parts[0]) || index + 1;
        const content = parts[1] || `Fact ${index + 1}`;
        return {
          id: `card-${number}`,
          number,
          content,
        };
      });
    }

    return [];
  };

  const flashcards = parseFlashcards(content);
  const totalCards = flashcards.length;
  const currentCard = flashcards[currentIndex];

  const isBookmarked = (id: string) => bookmarkedIds.has(id);

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const handleSwipe = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const { translationX, velocityX } = nativeEvent;
      if (Math.abs(velocityX) > 500 || Math.abs(translationX) > width * 0.3) {
        if (translationX > 0) prevCard();
        else nextCard();
      }
    }
  };

  const flipCard = () => setIsFlipped(!isFlipped);

  const markdownStyles = {
    body: { color: '#f1f5f9', fontSize: 16, lineHeight: 24 },
    paragraph: { color: '#f1f5f9', lineHeight: 24, textAlign: 'center' },
    strong: { color: '#34d399', fontWeight: '700' },
    em: { color: '#5eead4', fontStyle: 'italic' },
  };

  if (!currentCard) return null;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30, scale: 0.95 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'spring', duration: 800, delay: 200 }}
      className="mb-6"
    >
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <MotiView
          from={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 600, delay: 400 }}
          className="w-10 h-10 bg-teal-600/20 rounded-xl mr-4 items-center justify-center"
        >
          <Feather name="layers" size={20} color="#5eead4" />
        </MotiView>

        <View className="flex-1">
          <Text className="text-lg font-semibold text-teal-100">
            High-Yield Flashcards
          </Text>
          <Text className="text-sm text-teal-300/80">
            {currentIndex + 1} of {totalCards}
          </Text>
        </View>

        <MotiView
          from={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 400, delay: 600 }}
        >
          <FontAwesome name="graduation-cap" size={20} color="#10b981" />
        </MotiView>
      </View>

      {/* Progress Bar */}
      <View className="mb-6">
        <View className="flex-row justify-between mb-2">
          <Text className="text-xs text-slate-400 font-medium">Progress</Text>
          <Text className="text-xs text-slate-400 font-medium">
            {Math.round(((currentIndex + 1) / totalCards) * 100)}%
          </Text>
        </View>
        <View className="w-full bg-slate-700/60 rounded-full h-2 overflow-hidden">
          <MotiView
            animate={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
            transition={{ type: 'spring', duration: 600 }}
            className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 h-2 rounded-full"
          />
        </View>
      </View>

      {/* Flashcard */}
      <PanGestureHandler onHandlerStateChange={handleSwipe}>
        <View className="relative">
          <MotiView
            key={currentCard.id}
            animate={{ rotateY: isFlipped ? '180deg' : '0deg' }}
            transition={{ type: 'spring', duration: 600 }}
            className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl border border-slate-600/40 shadow-2xl overflow-hidden"
            style={{ minHeight: isMobile ? 140 : 160 }}
          >
            {/* Card Header */}
            <View className="flex-row items-center justify-between px-4 py-1 bg-slate-800/60 border-b border-slate-600/30">
              <View className="flex-row items-center">
                <View className="w-6 h-6 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full items-center justify-center mr-2">
                  <Text className="text-white font-bold text-xs">
                    {currentCard.number}
                  </Text>
                </View>
                <Text className="text-slate-300 font-medium text-xs">
                  High-Yield Fact
                </Text>
              </View>

              {/* ✅ Bookmark persists via AdaptiveChat */}
              <Pressable
                onPress={() =>
                  onBookmarkToggle?.(currentCard.id, currentCard.content)
                }
                className={`w-7 h-7 rounded-full items-center justify-center ${
                  isBookmarked(currentCard.id)
                    ? 'bg-emerald-500/20'
                    : 'bg-slate-700/40'
                }`}
              >
                {isBookmarked(currentCard.id) ? (
                  <BookmarkCheck size={14} color="#10b981" fill="#10b981" />
                ) : (
                  <Bookmark size={14} color="#64748b" />
                )}
              </Pressable>
            </View>

            {/* Card Content */}
            <Pressable onPress={flipCard} className="px-4 py-2">
              <AnimatePresence>
                {!isFlipped ? (
                  <MotiView
                    key="front"
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Markdown style={markdownStyles}>
                      {currentCard.content}
                    </Markdown>
                  </MotiView>
                ) : (
                  <MotiView
                    key="back"
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <View className="bg-slate-700/40 rounded-xl p-3 border border-slate-600/30 mt-2">
                      <Text className="text-teal-300 text-sm font-medium text-center mb-1">
                        💡 Study Tip
                      </Text>
                      <Text className="text-slate-300 text-sm text-center leading-5">
                        Review this concept regularly and try to explain it in
                        your own words.
                      </Text>
                    </View>
                  </MotiView>
                )}
              </AnimatePresence>
            </Pressable>
          </MotiView>
        </View>
      </PanGestureHandler>

      {/* Controls */}
      <View className="flex-row items-center justify-between mt-6">
        <Pressable
          onPress={prevCard}
          disabled={totalCards <= 1}
          className="px-4 py-2 bg-slate-700/60 rounded-xl"
        >
          <ChevronLeft size={16} color="#94a3b8" />
          <Text className="ml-1 text-sm text-slate-300">Prev</Text>
        </Pressable>

        <Pressable
          onPress={nextCard}
          disabled={totalCards <= 1}
          className="px-4 py-2 bg-slate-700/60 rounded-xl"
        >
          <Text className="mr-1 text-sm text-slate-300">Next</Text>
          <ChevronRight size={16} color="#94a3b8" />
        </Pressable>
      </View>
    </MotiView>
  );
}
