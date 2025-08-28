// components/AdaptiveChat.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  Pressable,
  Dimensions,
  Linking,
  Platform,
} from "react-native";
import { MotiView } from "moti";
import { supabase } from "@/lib/supabaseClient";
import ConfettiCannon from "react-native-confetti-cannon";
import { useAuth } from "../contexts/AuthContext";

import ChatBubble from "@/components/ChatBubble";
import MCQBubble from "@/components/MCQBubble";
import GlowingChip from "@/components/GlowingChip";
import MediaCard from "@/components/MediaCard";
import LearningGapTree from "@/components/LearningGapTree";
import Summary from "@/components/Summary";
import TypingIndicator from "@/components/TypingIndicator";
import LearningGapTags from "@/components/LearningGapTags";

interface AdaptiveChatProps {
  examId: string;
  subjectId: string;
}

export default function AdaptiveChat({ examId, subjectId }: AdaptiveChatProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState(0);

  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const { user, loading } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const confettiRef = useRef<ConfettiCannon>(null);

  const { width } = Dimensions.get("window");
  const isMobile = width < 768;

  // ✅ Auto scroll
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, isTyping, phase]);

  // ✅ Fetch data when subject changes
  useEffect(() => {
    if (subjectId && user) fetchData();
  }, [examId, subjectId, user]);

  const baseSelect =
    "id, exam_id, subject_id, primary_seq, " +
    "lg_mcqs, lg_buzzwords, lg_final_summary, " +
    "lg_high_yield_images, lg_learning_gap_tags, " +
    "lg_recommended_videos, lg_recursive_learning_gaps";

  const fetchData = async () => {
    if (!user) return;

    const { data: progress } = await supabase
      .from("student_progress")
      .select("last_completed_seq, last_phase, last_mcq_index, is_completed")
      .eq("student_id", user.id)
      .eq("subject_id", subjectId)
      .maybeSingle();

    let query;
    let isNewTopic = false;

    if (progress?.last_completed_seq) {
      if (progress.is_completed) {
        query = supabase
          .from("mcq_bank")
          .select(baseSelect)
          .eq("subject_id", subjectId)
          .gt("primary_seq", progress.last_completed_seq)
          .order("primary_seq", { ascending: true })
          .limit(1);
        isNewTopic = true;
      } else {
        query = supabase
          .from("mcq_bank")
          .select(baseSelect)
          .eq("subject_id", subjectId)
          .eq("primary_seq", progress.last_completed_seq)
          .limit(1);
      }
    } else {
      query = supabase
        .from("mcq_bank")
        .select(baseSelect)
        .eq("subject_id", subjectId)
        .order("primary_seq", { ascending: true })
        .limit(1);
      isNewTopic = true;
    }

    const { data, error } = await query;
    if (error) {
      console.error("❌ Error fetching mcqs:", error);
      return;
    }

    if (data) {
      setRecords(data);
      setCurrentIdx(0);
      setPhase(isNewTopic ? 0 : progress?.last_phase || 0);
      setIsCompleted(false);

      // ✅ restore MCQ state
      if (!isNewTopic && progress?.last_phase === 4) {
        if (progress.last_mcq_index > 0) {
          setShowOptions(true);
          const answeredSoFar = data[0].lg_mcqs.slice(0, progress.last_mcq_index);
          const restoredMsgs = answeredSoFar.map((mcq: any, idx: number) => ({
            id: `restore-${idx}`,
            type: "student",
            content: `Previously answered: ${mcq.correct_answer}: ${mcq.options[mcq.correct_answer]}`,
          }));
          setMessages(restoredMsgs);
        } else {
          setShowOptions(true);
          setMessages([]);
        }
      } else {
        setShowOptions(false);
        setMessages([]);
      }

      // ✅ load bookmarks
      const { data: bmData } = await supabase
        .from("student_bookmarks")
        .select("element_id")
        .eq("student_id", user.id);
      if (bmData) setBookmarkedIds(new Set(bmData.map((b) => b.element_id)));
    }
  };

  const current = records[currentIdx];

  // ✅ Save phase progress
  const savePhaseProgress = async (newPhase: number) => {
    if (!user || !current) return;
    await supabase.from("student_progress").upsert(
      {
        student_id: user.id,
        subject_id: subjectId,
        last_completed_seq: current?.primary_seq,
        last_phase: newPhase,
        last_mcq_index: 0,
        is_completed: false,
        updated_at: new Date(),
      },
      { onConflict: "student_id,subject_id" }
    );
  };

  // ✅ Save student answer
  const saveAnswer = async (mcqId: string, selectedOption: string) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("student_answers")
      .insert([
        {
          student_id: user.id,
          mcq_id: mcqId,
          selected_option: selectedOption,
        },
      ])
      .select("id, student_id, mcq_id, selected_option, correct_answer, is_correct");

    if (error) {
      console.error("❌ Error saving answer:", error);
    } else {
      console.log("✅ Answer saved:", data?.[0]);
    }
  };

  // ✅ Handle MCQ select
  const handleOptionSelect = async (selectedOption: string) => {
    if (!current?.lg_mcqs) return;
    const answeredCount = messages.filter((m) => m.type === "student").length;
    const mcq = current?.lg_mcqs?.[answeredCount];
    if (!mcq) return;

    // Save answer (only 3 fields)
    await saveAnswer(mcq.id, selectedOption);

    // Update local chat state
    const isCorrect = selectedOption === mcq.correct_answer;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "student",
        content: `I choose ${selectedOption}: ${mcq.options[selectedOption]}`,
        isCorrect,
      },
    ]);
    setShowOptions(false);

    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const tutorMessage = isCorrect
          ? mcq.feedback.correct
          : `${mcq.feedback.wrong}\n\n💡 Learning Gap: ${mcq.learning_gap}\n\n✅ Correct: ${mcq.correct_answer}: ${mcq.options[mcq.correct_answer]}`;
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), type: "tutor", content: tutorMessage },
        ]);
        if (isCorrect && answeredCount + 1 === current?.lg_mcqs?.length) {
          setIsCompleted(true);
        } else if (current?.lg_mcqs?.[answeredCount + 1]) {
          setTimeout(() => setShowOptions(true), 1000);
        } else {
          setIsCompleted(true);
        }
      }, 800);
    }, 500);
  };

  // 🚨 Session checks
  if (loading)
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-slate-400">Loading session...</Text>
      </View>
    );
  if (!user)
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-slate-200 text-lg font-bold">
          🔒 Please login to access Adaptive MCQs
        </Text>
      </View>
    );
  if (!current)
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-slate-400">Select exam & subject to begin</Text>
      </View>
    );

  return (
    <View className="flex-1 bg-slate-900">
      <StatusBar backgroundColor="#0f172a" barStyle="light-content" />
      {isCompleted && (
        <ConfettiCannon
          ref={confettiRef}
          count={200}
          origin={{ x: width / 2, y: 0 }}
          autoStart
          fadeOut
        />
      )}
      <View className="flex-1 w-full">
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 w-full"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: isMobile ? 16 : 24,
            paddingVertical: 24,
            width: "100%",
          }}
        >
          {/* Phase 0 - Summary */}
          {phase === 0 && (
            <MotiView className="space-y-6 w-full">
              {current?.lg_final_summary && (
                <Summary
                  content={current.lg_final_summary}
                  bookmarkedIds={bookmarkedIds}
                  onBookmarkToggle={(id, text) =>
                    toggleBookmark(id, "flashcard", { text })
                  }
                />
              )}
              <Pressable
                onPress={async () => {
                  setPhase(1);
                  await savePhaseProgress(1);
                }}
                className="bg-emerald-600 p-3 rounded-xl items-center"
              >
                <Text className="text-white font-bold">
                  Next → Key Concepts
                </Text>
              </Pressable>
            </MotiView>
          )}

          {/* Phase 1 - Buzzwords */}
          {phase === 1 && (
            <MotiView className="space-y-6 w-full">
              <Text className="text-2xl font-bold text-slate-100">
                🔑 Key Concepts
              </Text>
              <View className="flex-row flex-wrap">
                {current?.lg_buzzwords?.map((bw: any, i: number) => (
                  <GlowingChip
                    key={bw.id}
                    item={bw}
                    delay={i}
                    isBookmarked={bookmarkedIds.has(bw.id)}
                    onBookmarkToggle={(id, text) =>
                      toggleBookmark(id, "buzzword", { text })
                    }
                    onPress={() => {
                      const query = encodeURIComponent(`${bw.text} summary`);
                      const url = `https://www.google.com/search?q=${query}`;
                      Platform.OS === "web"
                        ? window.open(url, "_blank")
                        : Linking.openURL(url);
                    }}
                  />
                ))}
              </View>
              <Pressable
                onPress={async () => {
                  setPhase(2);
                  await savePhaseProgress(2);
                }}
                className="bg-indigo-600 p-3 rounded-xl items-center"
              >
                <Text className="text-white font-bold">
                  Next → Learning Gaps
                </Text>
              </Pressable>
            </MotiView>
          )}

          {/* Phase 2 - Gaps + Tags */}
          {phase === 2 && (
            <MotiView className="space-y-6 w-full">
              <LearningGapTree
                learningGaps={current?.lg_recursive_learning_gaps || []}
                completedLevels={[]}
                bookmarkedIds={bookmarkedIds}
                onBookmarkToggle={(gapId, gapText) =>
                  toggleBookmark(gapId, "learning_gap", { gap: gapText })
                }
              />
              <LearningGapTags
                tags={current?.lg_learning_gap_tags || []}
                bookmarkedTags={bookmarkedIds}
                onBookmarkToggle={(tagId, tagText) =>
                  toggleBookmark(tagId, "tag", { tag: tagText })
                }
              />
              <Pressable
                onPress={async () => {
                  setPhase(3);
                  await savePhaseProgress(3);
                }}
                className="bg-purple-600 p-3 rounded-xl items-center"
              >
                <Text className="text-white font-bold">
                  Next → Images & Videos
                </Text>
              </Pressable>
            </MotiView>
          )}

          {/* Phase 3 - Media */}
          {phase === 3 && (
            <MotiView className="space-y-6 w-full">
              {current?.lg_high_yield_images?.map((img: any, i: number) => (
                <MediaCard
                  key={img.id || i}
                  item={img}
                  type="image"
                  delay={i}
                  isBookmarked={bookmarkedIds.has(img.id)}
                  onBookmarkToggle={() =>
                    toggleBookmark(img.id, "image", { description: img.description })
                  }
                />
              ))}
              {current?.lg_recommended_videos?.map((vid: any, i: number) => (
                <MediaCard
                  key={vid.id || i}
                  item={vid}
                  type="video"
                  delay={i}
                  isBookmarked={bookmarkedIds.has(vid.id)}
                  onBookmarkToggle={() =>
                    toggleBookmark(vid.id, "video", { description: vid.description })
                  }
                />
              ))}
              <Pressable
                onPress={async () => {
                  setPhase(4);
                  setShowOptions(true);
                  await savePhaseProgress(4);
                }}
                className="bg-blue-600 p-3 rounded-xl items-center"
              >
                <Text className="text-white font-bold">
                  Next → Start Questions
                </Text>
              </Pressable>
            </MotiView>
          )}

          {/* Phase 4 - MCQs */}
          {phase === 4 && (
            <View className="w-full">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {showOptions && current?.lg_mcqs && (() => {
                const mcqIndex = messages.filter((m) => m.type === "student").length;
                const mcq = current?.lg_mcqs?.[mcqIndex];
                if (!mcq) return null;
                return (
                  <ChatBubble
                    message={{
                      id: mcq.id,
                      type: "tutor",
                      content: mcq.stem,
                    }}
                    isBookmarked={bookmarkedIds.has(mcq.id)}
                    onToggleBookmark={() =>
                      toggleBookmark(mcq.id, "mcq", { stem: mcq.stem })
                    }
                  />
                );
              })()}
              {isTyping && <TypingIndicator />}
              {showOptions && current?.lg_mcqs && (
                <MCQBubble
                  options={
                    current?.lg_mcqs?.[
                      messages.filter((m) => m.type === "student").length
                    ]?.options || {}
                  }
                  onSelect={handleOptionSelect}
                />
              )}
              {isCompleted && (
                <Pressable
                  onPress={fetchData}
                  className="bg-emerald-600 p-3 rounded-xl items-center mt-4"
                >
                  <Text className="text-white font-bold">Next Topic →</Text>
                </Pressable>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
