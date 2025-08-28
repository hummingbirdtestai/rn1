import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function HomePage() {
  return (
    <View>
      {/* Header */}
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-white">
          Welcome to <Text className="text-teal-400">HummingBird</Text>
        </Text>
      </View>

      {/* Intro Section */}
      <View className="bg-slate-800 rounded-xl p-6 mb-8 shadow-lg">
        <Text className="text-2xl font-semibold text-white mb-3">
          NEETPG Preparation Platform
        </Text>
        <Text className="text-slate-300">
          Your comprehensive study companion for medical entrance exams. Prepare smarter with{" "}
          <Text className="font-semibold text-teal-300">interactive chat</Text>,{" "}
          <Text className="font-semibold text-teal-300">mind maps</Text>, and{" "}
          <Text className="font-semibold text-teal-300">analytics</Text>.
        </Text>
      </View>

      {/* Features */}
      <View className="gap-4">
        <View className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <Text className="text-lg font-semibold text-blue-400 mb-2">Interactive Chat</Text>
          <Text className="text-slate-300 text-sm">
            Practice MCQs with AI-powered tutoring and instant explanations.
          </Text>
        </View>

        <View className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <Text className="text-lg font-semibold text-green-400 mb-2">Mind Maps</Text>
          <Text className="text-slate-300 text-sm">
            Visualize and revise complex concepts with clarity.
          </Text>
        </View>

        <View className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <Text className="text-lg font-semibold text-purple-400 mb-2">Analytics</Text>
          <Text className="text-slate-300 text-sm">
            Track your progress and focus on weak areas.
          </Text>
        </View>

        <View className="bg-slate-700 rounded-lg p-6 border border-slate-600">
          <Text className="text-lg font-semibold text-orange-400 mb-2">Exam Catalog</Text>
          <Text className="text-slate-300 text-sm">
            Access curated content for NEETPG, FMGE, INICET, and more.
          </Text>
        </View>
      </View>

      {/* CTA Button */}
      <Pressable
        onPress={() => router.push("/adaptive-chat")}
        className="bg-emerald-600 mt-8 p-4 rounded-xl items-center"
      >
        <Text className="text-white font-bold">Start Learning →</Text>
      </Pressable>
    </View>
  );
}
