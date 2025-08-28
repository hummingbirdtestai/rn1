import React, { useState } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import Sidebar from "@/components/Sidebar";
import HomePage from "@/components/HomePage";
import AdaptiveChat from "@/components/AdaptiveChat";
import AnalyticsPage from "@/components/AnalyticsPage";

export default function LayoutWithSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { width } = Dimensions.get("window");
  const isMobile = width < 768;
  const sidebarWidth = 240;

  const [currentView, setCurrentView] = useState<"home" | "exam" | "subject" | "analytics">("analytics");
  const [analyticsRoute, setAnalyticsRoute] = useState("/analytics/prep-overview");
  const [examId, setExamId] = useState<string | null>(null);
  const [subjectId, setSubjectId] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-slate-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={(open) => setSidebarOpen(open)}
        onExamSelect={(exam) => {
          setExamId(exam.id);
          setSubjectId(null);
          setCurrentView("exam");
          if (isMobile) setSidebarOpen(false);
        }}
        onSubjectSelect={(subject) => {
          setSubjectId(subject.id);
          setCurrentView("subject");
          if (isMobile) setSidebarOpen(false);
        }}
        onProfileClick={() => isMobile && setSidebarOpen(false)}
        isMobile={isMobile}
        onHomeClick={() => {
          setCurrentView("home");
          setExamId(null);
          setSubjectId(null);
          if (isMobile) setSidebarOpen(false);
        }}
        onAnalyticsNavigate={(route) => {
          setAnalyticsRoute(route);
          setCurrentView("analytics");
          if (isMobile) setSidebarOpen(false);
        }}
      />

      {/* Main Content */}
      <View
        className="flex-1"
        style={{ marginLeft: !isMobile ? sidebarWidth : 0 }}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: isMobile ? 16 : 32,
            paddingVertical: isMobile ? 16 : 24,
            flexGrow: 1,
            width: '100%',
          }}
          style={{ width: '100%' }}
        >
          {currentView === "home" && <HomePage />}
          {currentView === "analytics" && <AnalyticsPage route={analyticsRoute} />}
          {(currentView === "exam" || currentView === "subject") && (
            <AdaptiveChat examId={examId || ""} subjectId={subjectId || ""} />
          )}
        </ScrollView>
      </View>
    </View>
  );
}
