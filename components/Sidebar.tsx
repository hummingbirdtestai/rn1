<<<<<<< HEAD
// src/components/Sidebar.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { MotiView } from "moti";
import { Chrome as Home, Map, GitBranch, CircleAlert as AlertCircle, Radar, Clock, Navigation, ChartBar as BarChart3, Zap, Target, RotateCcw, BookMarked, Award, Users, UserCheck, UsersRound, Heart, TrendingUp, ChevronRight, ChevronDown, Bird, User, LogOut } from "lucide-react-native";

// modals
=======
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { MotiView } from "moti";
import {
  Chrome as Home,
  Map,
  GitBranch,
  CircleAlert as AlertCircle,
  Radar,
  Clock,
  Navigation,
  ChartBar as BarChart3,
  Zap,
  Target,
  RotateCcw,
  BookMarked,
  Award,
  Users,
  UserCheck,
  UsersRound,
  Heart,
  TrendingUp,
  ChevronRight,
  Bird,
  User,
  LogOut,
} from "lucide-react-native";

>>>>>>> ed10f2b (Add files via upload)
import PhoneLoginModal from "./modals/PhoneLoginModal";
import OTPModal from "./modals/OTPModal";
import RegistrationModal from "./modals/RegistrationModal";
import ErrorModal from "./modals/ErrorModal";
<<<<<<< HEAD

import { useAuth } from "../contexts/AuthContext";


// ✅ API Base URL
=======
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

// ✅ API Base URL (still used for fetching exams)
>>>>>>> ed10f2b (Add files via upload)
const API_BASE = "https://pyq-learninng-gap-chat-production.up.railway.app";

interface Subject {
  id: string;
  name: string;
  exam_id: string;
}
interface Exam {
  id: string;
  name: string;
  subjects?: Subject[];
}

interface NavigationItem {
  id: string;
  name: string;
  icon: any;
  route: string;
}

interface NavigationGroup {
  id: string;
  name: string;
  icon: any;
  items: NavigationItem[];
}

const navigationGroups: NavigationGroup[] = [
  {
<<<<<<< HEAD
    id: 'learning-path',
    name: 'My Learning Path',
    icon: Map,
    items: [
      { id: 'prep-overview', name: 'Prep Overview', icon: Home, route: '/analytics/prep-overview' },
      { id: 'mastery-map', name: 'Mastery Map', icon: Map, route: '/analytics/mastery-map' },
      { id: 'gap-chains', name: 'Gap Chains', icon: GitBranch, route: '/analytics/gap-chains' },
      { id: 'root-causes', name: 'Root Causes', icon: AlertCircle, route: '/analytics/root-causes' },
      { id: 'neural-radar', name: 'Neural Radar', icon: Radar, route: '/analytics/neural-radar' },
      { id: 'time-to-mastery', name: 'Time-to-Mastery Clock', icon: Clock, route: '/analytics/time-to-mastery' },
      { id: 'mentor-flight-path', name: 'Mentor Flight Path', icon: Navigation, route: '/analytics/mentor-flight-path' },
    ]
  },
  {
    id: 'study-efficiency',
    name: 'Study Efficiency & Revision',
    icon: BarChart3,
    items: [
      { id: 'study-sessions', name: 'Study Sessions', icon: BarChart3, route: '/analytics/study-sessions' },
      { id: 'speed-accuracy', name: 'Speed & Accuracy', icon: Zap, route: '/analytics/speed-accuracy' },
      { id: 'confidence-reality', name: 'Confidence vs Reality', icon: Target, route: '/analytics/confidence-reality' },
      { id: 'smart-revision', name: 'Smart Revision', icon: RotateCcw, route: '/analytics/smart-revision' },
      { id: 'quick-fix-lessons', name: 'Quick Fix Lessons', icon: Zap, route: '/analytics/quick-fix-lessons' },
      { id: 'mistakes-correct', name: 'Mistakes to Correct', icon: AlertCircle, route: '/analytics/mistakes-correct' },
    ]
  },
  {
    id: 'knowledge-assets',
    name: 'Knowledge Assets',
    icon: BookMarked,
    items: [
      { id: 'flashcards-bookmarks', name: 'Flashcards & Bookmarks', icon: BookMarked, route: '/analytics/flashcards-bookmarks' },
      { id: 'achievements-rewards', name: 'Achievements & Rewards', icon: Award, route: '/analytics/achievements-rewards' },
    ]
  },
  {
    id: 'peer-cohorts',
    name: 'Peer & Cohorts',
    icon: Users,
    items: [
      { id: 'peer-comparison', name: 'Peer Comparison', icon: Users, route: '/analytics/peer-comparison' },
      { id: 'buddy-mode', name: 'Buddy Mode', icon: UserCheck, route: '/analytics/buddy-mode' },
      { id: 'dynamic-cohorts', name: 'Dynamic Cohorts', icon: UsersRound, route: '/analytics/dynamic-cohorts' },
      { id: 'wellness-balance', name: 'Wellness & Balance', icon: Heart, route: '/analytics/wellness-balance' },
    ]
  },
  {
    id: 'performance-simulation',
    name: 'Performance Simulation',
    icon: TrendingUp,
    items: [
      { id: 'rank-score-simulator', name: 'Rank & Score Simulator', icon: TrendingUp, route: '/analytics/rank-score-simulator' },
    ]
  }
=======
    id: "learning-path",
    name: "My Learning Path",
    icon: Map,
    items: [
      { id: "prep-overview", name: "Prep Overview", icon: Home, route: "/analytics/prep-overview" },
      { id: "mastery-map", name: "Mastery Map", icon: Map, route: "/analytics/mastery-map" },
      { id: "gap-chains", name: "Gap Chains", icon: GitBranch, route: "/analytics/gap-chains" },
      { id: "root-causes", name: "Root Causes", icon: AlertCircle, route: "/analytics/root-causes" },
      { id: "neural-radar", name: "Neural Radar", icon: Radar, route: "/analytics/neural-radar" },
      { id: "time-to-mastery", name: "Time-to-Mastery Clock", icon: Clock, route: "/analytics/time-to-mastery" },
      { id: "mentor-flight-path", name: "Mentor Flight Path", icon: Navigation, route: "/analytics/mentor-flight-path" },
    ],
  },
  {
    id: "study-efficiency",
    name: "Study Efficiency & Revision",
    icon: BarChart3,
    items: [
      { id: "study-sessions", name: "Study Sessions", icon: BarChart3, route: "/analytics/study-sessions" },
      { id: "speed-accuracy", name: "Speed & Accuracy", icon: Zap, route: "/analytics/speed-accuracy" },
      { id: "confidence-reality", name: "Confidence vs Reality", icon: Target, route: "/analytics/confidence-reality" },
      { id: "smart-revision", name: "Smart Revision", icon: RotateCcw, route: "/analytics/smart-revision" },
      { id: "quick-fix-lessons", name: "Quick Fix Lessons", icon: Zap, route: "/analytics/quick-fix-lessons" },
      { id: "mistakes-correct", name: "Mistakes to Correct", icon: AlertCircle, route: "/analytics/mistakes-correct" },
    ],
  },
  {
    id: "knowledge-assets",
    name: "Knowledge Assets",
    icon: BookMarked,
    items: [
      { id: "flashcards-bookmarks", name: "Flashcards & Bookmarks", icon: BookMarked, route: "/analytics/flashcards-bookmarks" },
      { id: "achievements-rewards", name: "Achievements & Rewards", icon: Award, route: "/analytics/achievements-rewards" },
    ],
  },
  {
    id: "peer-cohorts",
    name: "Peer & Cohorts",
    icon: Users,
    items: [
      { id: "peer-comparison", name: "Peer Comparison", icon: Users, route: "/analytics/peer-comparison" },
      { id: "buddy-mode", name: "Buddy Mode", icon: UserCheck, route: "/analytics/buddy-mode" },
      { id: "dynamic-cohorts", name: "Dynamic Cohorts", icon: UsersRound, route: "/analytics/dynamic-cohorts" },
      { id: "wellness-balance", name: "Wellness & Balance", icon: Heart, route: "/analytics/wellness-balance" },
    ],
  },
  {
    id: "performance-simulation",
    name: "Performance Simulation",
    icon: TrendingUp,
    items: [{ id: "rank-score-simulator", name: "Rank & Score Simulator", icon: TrendingUp, route: "/analytics/rank-score-simulator" }],
  },
>>>>>>> ed10f2b (Add files via upload)
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  onExamSelect?: (exam: Exam) => void;
  onSubjectSelect?: (subject: Subject) => void;
  onProfileClick?: () => void;
  isMobile: boolean;
  onHomeClick?: () => void;
  onAnalyticsNavigate?: (route: string) => void;
}

export default function Sidebar({
  isOpen,
  onToggle,
  onExamSelect,
  onSubjectSelect,
  onProfileClick,
  isMobile,
  onHomeClick,
  onAnalyticsNavigate,
}: SidebarProps) {
  const [isExamsExpanded, setIsExamsExpanded] = useState(false);
  const [isSubjectsExpanded, setIsSubjectsExpanded] = useState(false);
<<<<<<< HEAD
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['learning-path']));
  const [activeItem, setActiveItem] = useState('prep-overview');
=======
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(["learning-path"]));
  const [activeItem, setActiveItem] = useState("prep-overview");
>>>>>>> ed10f2b (Add files via upload)
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const sidebarWidth = 240;

<<<<<<< HEAD
  // 🔹 Auth from context
  const { session, login, logout } = useAuth();

  // modal states
=======
  const { session, logout } = useAuth();

>>>>>>> ed10f2b (Add files via upload)
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);
<<<<<<< HEAD
  const [tempUserId, setTempUserId] = useState<string | null>(null);
=======
>>>>>>> ed10f2b (Add files via upload)

  // fetch exams/subjects
  useEffect(() => {
    fetchExams();
  }, []);

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
<<<<<<< HEAD
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
=======
    newExpanded.has(groupId) ? newExpanded.delete(groupId) : newExpanded.add(groupId);
>>>>>>> ed10f2b (Add files via upload)
    setExpandedGroups(newExpanded);
  };

  const fetchExams = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/exams/with-subjects`);
      const data = await res.json();
      setExams(data.exams || []);
    } catch (err) {
      console.error("Error fetching exams:", err);
    }
  };

  const handleAnalyticsItemClick = (item: NavigationItem) => {
    setActiveItem(item.id);
    onAnalyticsNavigate?.(item.route);
<<<<<<< HEAD
    if (isMobile) {
      onToggle(false);
    }
=======
    if (isMobile) onToggle(false);
>>>>>>> ed10f2b (Add files via upload)
  };

  const handleExamSelect = (exam: Exam) => {
    setSelectedExam(exam);
    setSubjects(exam.subjects || []);
    setIsSubjectsExpanded(false);
    setIsExamsExpanded(false);
    onExamSelect?.(exam);
  };

  const handleSubjectSelect = (subject: Subject) => {
    if (!session) {
      setShowPhoneModal(true);
      return;
    }
    setSelectedSubject(subject);
    setIsSubjectsExpanded(false);
    onSubjectSelect?.(subject);
  };

  // 🔹 OTP flow
  const handleSendOTP = async (phone: string) => {
<<<<<<< HEAD
  try {
    const res = await fetch(`${API_BASE}/auth/otp/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country_code: "+91",   // ✅ required
        phone                // ✅ required
      }),
    });
    if (!res.ok) {
      const errMsg = await res.text();
      throw new Error(`Failed to send OTP: ${errMsg}`);
    }

    setPendingPhone(phone);
    setShowPhoneModal(false);
    setShowOTPModal(true);
  } catch (err) {
    console.error("Send OTP failed:", err);
    setShowError(true);
  }
};

  const handleSubmitOTP = async (otp: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: pendingPhone, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP failed");

      // check if user exists
      const profileRes = await fetch(`${API_BASE}/users/phone/${pendingPhone}`);
      if (profileRes.ok) {
        const profile = await profileRes.json();
        login(data.token, profile); // ✅ save in context
        setShowOTPModal(false);
        setPendingPhone(null);
      } else {
        // user not found -> registration
        setTempUserId(data.userId);
        setShowOTPModal(false);
        setShowRegModal(true);
      }
=======
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone: "+91" + phone });
      if (error) throw error;
      setPendingPhone(phone);
      setShowPhoneModal(false);
      setShowOTPModal(true);
    } catch (err) {
      console.error("Send OTP failed:", err);
      setShowError(true);
    }
  };

  const handleSubmitOTP = async (otp: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: "+91" + pendingPhone,
        token: otp,
        type: "sms",
      });
      if (error) throw error;
      setShowOTPModal(false);
      setPendingPhone(null);
>>>>>>> ed10f2b (Add files via upload)
    } catch (err) {
      console.error("OTP verification failed:", err);
      setShowError(true);
    }
  };

<<<<<<< HEAD
  const handleRegister = async (name: string) => {
  try {
    if (!pendingPhone) throw new Error("Missing phone");

    const res = await fetch(`${API_BASE}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country_code: "+91",   // ✅ required
        phone: pendingPhone,   // ✅ required
        name                  // ✅ required
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");

    // save session
    login(localStorage.getItem("auth_token") || "", data);

    setShowRegModal(false);
    setPendingPhone(null);
    setTempUserId(null);
  } catch (err) {
    console.error("Registration failed:", err);
    setShowError(true);
  }
};

=======
  // 🔹 Registration directly in Supabase users table
  const handleRegister = async (name: string) => {
    try {
      if (!pendingPhone) throw new Error("Missing phone");
      if (!session?.user?.id) throw new Error("Missing Supabase auth user id");

      const { error } = await supabase.from("users").insert([
        {
          id: session.user.id, // 🔑 use supabase.auth uid
          phone: pendingPhone,
          country_code: "+91",
          name,
          is_active: true,
        },
      ]);
      if (error) throw error;

      setShowRegModal(false);
      setPendingPhone(null);
    } catch (err) {
      console.error("Registration failed:", err);
      setShowError(true);
    }
  };
>>>>>>> ed10f2b (Add files via upload)

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 z-40"
        >
          <Pressable onPress={() => onToggle(false)} className="flex-1" />
        </MotiView>
      )}

      {/* Sidebar */}
      <MotiView
        from={{ translateX: isMobile ? -sidebarWidth : 0 }}
        animate={{ translateX: isMobile && !isOpen ? -sidebarWidth : 0 }}
        className="fixed left-0 top-0 bg-slate-900 border-r border-slate-700/50 z-50 shadow-2xl"
        style={{ width: sidebarWidth, height: "100%" }}
      >
        {/* Header */}
        <MotiView className="flex-row items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/60">
          <Pressable
            onPress={() => {
              if (isMobile) onToggle(false);
              onHomeClick?.();
            }}
            className="flex-row items-center flex-1"
          >
            <View className="w-8 h-8 rounded-lg bg-teal-500 items-center justify-center mr-3">
              <Bird size={16} color="#fff" />
            </View>
            <Text className="text-slate-100 text-lg font-bold">HummingBird</Text>
          </Pressable>
        </MotiView>

        <ScrollView className="flex-1 p-2">
          {/* Analytics Navigation Groups */}
          {navigationGroups.map((group) => {
            const isExpanded = expandedGroups.has(group.id);
            const IconComponent = group.icon;
            
            return (
              <View key={group.id} className="mb-2">
                <Pressable
                  onPress={() => toggleGroup(group.id)}
                  className="flex-row items-center p-3 bg-slate-800/40 rounded-xl"
                >
                  <IconComponent size={16} color="#94a3b8" />
                  <Text className="flex-1 text-slate-300 ml-2 font-medium">
                    {group.name}
                  </Text>
                  <MotiView
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ type: 'spring', duration: 300 }}
                  >
                    <ChevronRight size={16} color="#64748b" />
                  </MotiView>
                </Pressable>
                
                {isExpanded && (
                  <MotiView
                    from={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ type: 'spring', duration: 400 }}
                    className="ml-4 mt-1"
                  >
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isActive = activeItem === item.id;
                      
                      return (
                        <Pressable
                          key={item.id}
                          onPress={() => handleAnalyticsItemClick(item)}
                          className={`flex-row items-center p-2 rounded-lg mb-1 ${
                            isActive
                              ? "bg-teal-600/30 border border-teal-500/50"
                              : "bg-slate-800/30 hover:bg-slate-700/40"
                          }`}
                        >
                          <ItemIcon 
                            size={14} 
                            color={isActive ? "#5eead4" : "#94a3b8"} 
                          />
                          <Text
                            className={`text-sm ml-2 ${
                              isActive ? "text-teal-300 font-medium" : "text-slate-400"
                            }`}
                          >
                            {item.name}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </MotiView>
                )}
              </View>
            );
          })}

          {/* Exams */}
          <Pressable
            onPress={() => {
              setIsExamsExpanded(!isExamsExpanded);
              // Collapse analytics groups when opening legacy sections
              setExpandedGroups(new Set());
            }}
            className="flex-row items-center p-3 bg-slate-800/40 rounded-xl"
          >
            <Award size={16} color="#94a3b8" />
            <Text className="flex-1 text-slate-300 ml-2">
              {selectedExam ? selectedExam.name : "Exams"}
            </Text>
            <ChevronRight
              size={16}
              color="#64748b"
              style={{
                transform: [{ rotate: isExamsExpanded ? "90deg" : "0deg" }],
              }}
            />
          </Pressable>
          {isExamsExpanded &&
            exams.map((exam) => (
              <Pressable
                key={exam.id}
                onPress={() => handleExamSelect(exam)}
                className={`p-2 ml-4 rounded-lg ${
                  selectedExam?.id === exam.id
                    ? "bg-teal-600/30 border border-teal-500/50"
                    : "bg-slate-800/30"
                }`}
              >
                <Text
                  className={`text-sm ${
                    selectedExam?.id === exam.id
                      ? "text-teal-300"
                      : "text-slate-400"
                  }`}
                >
                  {exam.name}
                </Text>
              </Pressable>
            ))}

          {/* Subjects */}
          {selectedExam && subjects.length > 0 && (
            <>
              <Pressable
                onPress={() => {
                  setIsSubjectsExpanded(!isSubjectsExpanded);
                  // Collapse analytics groups when opening legacy sections
                  setExpandedGroups(new Set());
                }}
                className="flex-row items-center p-3 bg-slate-800/40 rounded-xl mt-2"
              >
                <BookMarked size={16} color="#94a3b8" />
                <Text className="flex-1 text-slate-300 ml-2">
                  {selectedSubject ? selectedSubject.name : "Subjects"}
                </Text>
                <ChevronRight
                  size={16}
                  color="#64748b"
                  style={{
                    transform: [{ rotate: isSubjectsExpanded ? "90deg" : "0deg" }],
                  }}
                />
              </Pressable>
              {isSubjectsExpanded &&
                subjects.map((subject) => (
                  <Pressable
                    key={subject.id}
                    onPress={() => handleSubjectSelect(subject)}
                    className={`p-2 ml-4 rounded-lg ${
                      selectedSubject?.id === subject.id
                        ? "bg-teal-600/30 border border-teal-500/50"
                        : "bg-slate-800/30"
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        selectedSubject?.id === subject.id
                          ? "text-teal-300"
                          : "text-slate-400"
                      }`}
                    >
                      {subject.name}
                    </Text>
                  </Pressable>
                ))}
            </>
          )}

          {/* Profile */}
          <Pressable
            onPress={() => {
              if (!session) {
                setShowPhoneModal(true);
                return;
              }
              onProfileClick?.();
            }}
            className="flex-row items-center p-3 mt-2 bg-slate-800/40 rounded-xl"
          >
            <User size={16} color="#94a3b8" />
            <Text className="ml-2 text-slate-300">Profile</Text>
          </Pressable>

          {/* Login / Logout */}
          <Pressable
            onPress={() => (session ? logout() : setShowPhoneModal(true))}
            className="flex-row items-center p-3 mt-2 bg-slate-800/40 rounded-xl"
          >
            <LogOut size={16} color="#94a3b8" />
            <Text className="ml-2 text-slate-300">
              {session ? "Logout" : "Login"}
            </Text>
          </Pressable>
        </ScrollView>
      </MotiView>

      {/* Modals */}
<<<<<<< HEAD
      <PhoneLoginModal
        isVisible={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        onSendOTP={handleSendOTP}
      />
      <OTPModal
        isVisible={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onSubmitOTP={handleSubmitOTP}
        phoneNumber={pendingPhone || ""}
      />
      <RegistrationModal
        isVisible={showRegModal}
        onClose={() => setShowRegModal(false)}
        onRegister={handleRegister}
      />
=======
      <PhoneLoginModal isVisible={showPhoneModal} onClose={() => setShowPhoneModal(false)} onSendOTP={handleSendOTP} />
      <OTPModal isVisible={showOTPModal} onClose={() => setShowOTPModal(false)} onSubmitOTP={handleSubmitOTP} phoneNumber={pendingPhone || ""} />
      <RegistrationModal isVisible={showRegModal} onClose={() => setShowRegModal(false)} onRegister={handleRegister} />
>>>>>>> ed10f2b (Add files via upload)
      <ErrorModal isVisible={showError} onClose={() => setShowError(false)} />
    </>
  );
}
