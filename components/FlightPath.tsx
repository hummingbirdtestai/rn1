// src/components/FlightPath.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { supabase } from "@/lib/supabaseClient";
import { MotiView } from "moti";
import { Bird } from "lucide-react-native";

interface SubjectProgress {
  subject_id: string;
  subject_name?: string;
  total_pyqs: number;
  total_recursive: number;
  attempted_pyqs: number;
  correct_pyqs: number;
  attempted_recursive: number;
  correct_recursive: number;
  total_attempted: number;
  total_correct: number;
  progress_percent: number;
}

export default function FlightPath({ studentId }: { studentId: string }) {
  const [progress, setProgress] = useState<SubjectProgress[]>([]);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(2); // highlight Pharmacology for demo

  useEffect(() => {
    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from("student_subject_progress")
        .select("*, subjects(name)")
        .eq("student_id", studentId);

      if (error) {
        console.error("Error fetching progress:", error);
      } else {
        const formatted = (data || []).map((row: any) => ({
          ...row,
          subject_name: row.subjects?.name || row.subject_id.slice(0, 6),
        }))
        .sort((a, b) => (b.progress_percent || 0) - (a.progress_percent || 0)); // Sort by progress descending
        setProgress(formatted);
      }
    };

    fetchProgress();
  }, [studentId]);

  return (
    <View className="bg-slate-900 p-6 rounded-2xl mb-6">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <View className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center mr-3">
          <Bird size={20} color="#fff" />
        </View>
        <View>
          <Text className="text-xl font-bold text-white">
            NEETPG Flight Path
          </Text>
          <Text className="text-sm text-slate-300">
            {progress.length} subjects • Your journey to mastery
          </Text>
        </View>
      </View>

      {/* Subjects Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {progress.map((subj, index) => {
          const isCurrent = index === currentSubjectIndex;
          const percent = subj.progress_percent || 0;
          const total = subj.total_pyqs + subj.total_recursive;

          const borderColor =
            percent >= 70
              ? "#10b981"
              : percent >= 50
              ? "#f59e0b"
              : "#ef4444";

          const shadowColor =
            percent >= 70
              ? "#10b981"
              : percent >= 50
              ? "#f59e0b"
              : "#ef4444";

          return (
            <Pressable
              key={subj.subject_id}
              className="flex flex-col items-center w-28 mr-4"
              onPress={() => console.log("Selected:", subj.subject_name)}
            >
              {/* Animated Circle */}
              <View className="relative">
                {/* Base Ring */}
                <View className="w-24 h-24 rounded-full border-4 border-slate-700 items-center justify-center">
                  {/* Progress Arc */}
                  <MotiView
                    from={{ rotate: "0deg" }}
                    animate={{ rotate: `${(percent / 100) * 360}deg` }}
                    transition={{ type: "timing", duration: 1200 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, ${borderColor} 0deg, ${borderColor} ${(percent / 100) * 360}deg, transparent ${(percent / 100) * 360}deg, transparent 360deg)`,
                      borderRadius: '50%',
                      mask: 'radial-gradient(circle, transparent 36px, black 40px)',
                      WebkitMask: 'radial-gradient(circle, transparent 36px, black 40px)',
                      shadowColor: shadowColor,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.4,
                      shadowRadius: 8,
                      elevation: 6,
                    }}
                  />
                  <Text className="text-lg font-bold text-white">
                    {percent}%
                  </Text>
                </View>

                {/* Pulsing Hummingbird for current subject */}
                {isCurrent && (
                  <MotiView
                    from={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{
                      loop: true,
                      type: "timing",
                      duration: 1500,
                    }}
                    className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-teal-400/40 items-center justify-center"
                  >
                    <Bird size={18} color="#06b6d4" />
                  </MotiView>
                )}
              </View>

              {/* Subject Name */}
              <Text className="mt-2 text-sm font-semibold text-white text-center">
                {subj.subject_name}
              </Text>

              {/* Attempted vs Total */}
              <Text className="text-xs text-slate-400">
                {subj.total_correct}/{total}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}