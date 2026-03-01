import { createContext, useContext, useState, ReactNode } from "react";

type ReportLanguage = "en" | "hi";

interface ReportTranslations {
  // Headers
  weeklyReport: string;
  weeklyProgress: string;
  generatedOn: string;
  reportPeriod: string;
  
  // Stats
  sessions: string;
  studyTime: string;
  quizzes: string;
  accuracy: string;
  grade: string;
  minutes: string;
  
  // Sections
  weeklySummary: string;
  whatChildStudied: string;
  dailyBreakdown: string;
  learningPatterns: string;
  quizAnalytics: string;
  topicPerformance: string;
  recommendations: string;
  parentTips: string;
  performanceCharts: string;
  skillAssessment: string;
  understandingDist: string;
  subjectPerformance: string;
  
  // Learning times
  morning: string;
  afternoon: string;
  evening: string;
  night: string;
  bestStudyTime: string;
  
  // Trends
  improving: string;
  declining: string;
  stable: string;
  
  // Grade labels
  excellent: string;
  veryGood: string;
  good: string;
  aboveAverage: string;
  average: string;
  needsImprovement: string;
  
  // Areas
  weakAreas: string;
  strongAreas: string;
  
  // Comparison
  classAvg: string;
  showClassAvg: string;
  hideClassAvg: string;
  
  // Actions
  downloadPdf: string;
  exportCharts: string;
  sendWhatsApp: string;
  
  // Quiz stats
  totalCorrect: string;
  avgAccuracy: string;
  bestQuiz: string;
  passRate: string;
  
  // Metrics
  totalSessions: string;
  totalMinutes: string;
  subjectsStudied: string;
  streak: string;
  currentStreak: string;
  longestStreak: string;
  daysStudied: string;
  engagementScore: string;
  
  // Recommendations
  recStartStudying: string;
  recKeepStreak: string;
  recExcellentStreak: string;
  recImproveQuiz: string;
  recExcellentQuiz: string;
  recFocusTopics: string;
  recIncreaseTime: string;
  recBestTime: string;
  
  // Parent Tips
  tipTalkDaily: string;
  tipPraise: string;
  tipScreenBalance: string;
  tipQuietPlace: string;
}

const translations: Record<ReportLanguage, ReportTranslations> = {
  en: {
    weeklyReport: "Weekly Progress Report",
    weeklyProgress: "Weekly Progress",
    generatedOn: "Generated on",
    reportPeriod: "Report Period: Last 7 Days",
    
    sessions: "Sessions",
    studyTime: "Study Time",
    quizzes: "Quizzes",
    accuracy: "Accuracy",
    grade: "Grade",
    minutes: "min",
    
    weeklySummary: "Weekly Summary (Last 7 Days)",
    whatChildStudied: "What Child Studied This Week",
    dailyBreakdown: "Daily Progress Breakdown",
    learningPatterns: "Learning Patterns",
    quizAnalytics: "Detailed Quiz Analytics",
    topicPerformance: "Topic-wise Performance",
    recommendations: "AI Recommendations",
    parentTips: "Tips for Parents",
    performanceCharts: "Performance Analytics",
    skillAssessment: "Skill Assessment",
    understandingDist: "Understanding Distribution",
    subjectPerformance: "Subject Performance",
    
    morning: "Morning (5am-12pm)",
    afternoon: "Afternoon (12pm-5pm)",
    evening: "Evening (5pm-9pm)",
    night: "Night (9pm-5am)",
    bestStudyTime: "Best Study Time",
    
    improving: "Improving",
    declining: "Declining",
    stable: "Stable",
    
    excellent: "Excellent",
    veryGood: "Very Good",
    good: "Good",
    aboveAverage: "Above Average",
    average: "Average",
    needsImprovement: "Needs Improvement",
    
    weakAreas: "Areas Needing Improvement",
    strongAreas: "Strong Areas",
    
    classAvg: "Class Avg",
    showClassAvg: "Show Class Avg",
    hideClassAvg: "Hide Class Avg",
    
    downloadPdf: "Download PDF",
    exportCharts: "Export Charts",
    sendWhatsApp: "Send WhatsApp",
    
    totalCorrect: "Total Correct",
    avgAccuracy: "Avg Accuracy",
    bestQuiz: "Best Quiz",
    passRate: "Pass Rate (≥50%)",
    
    totalSessions: "Total Sessions",
    totalMinutes: "Total Minutes",
    subjectsStudied: "Subjects Studied",
    streak: "Streak",
    currentStreak: "Current Streak",
    longestStreak: "Longest Streak",
    daysStudied: "Days Studied",
    engagementScore: "Engagement Score",
    
    recStartStudying: "🎯 Start today! Begin your study streak.",
    recKeepStreak: "🔥 Great! Keep your streak going, study daily.",
    recExcellentStreak: "🏆 Amazing! Your consistency is outstanding!",
    recImproveQuiz: "📖 Re-read topics to improve quiz accuracy.",
    recExcellentQuiz: "⭐ Quiz performance is excellent! Keep it up.",
    recFocusTopics: "⚠️ Focus on these topics:",
    recIncreaseTime: "⏰ Increase study time - aim for 30+ mins daily.",
    recBestTime: "📚 Best study time identified - continue studying at this time.",
    
    tipTalkDaily: "👨‍👩‍👧 Talk to your child about their studies for 10 minutes daily.",
    tipPraise: "🌟 Praise small achievements to build confidence.",
    tipScreenBalance: "📱 Balance screen time with study time.",
    tipQuietPlace: "🏠 Provide a quiet place for studying.",
  },
  hi: {
    weeklyReport: "Weekly Progress Report",
    weeklyProgress: "Weekly Progress",
    generatedOn: "Report Date",
    reportPeriod: "Report Period: Last 7 Days",
    
    sessions: "Sessions",
    studyTime: "Study Time",
    quizzes: "Quizzes",
    accuracy: "Accuracy",
    grade: "Grade",
    minutes: "min",
    
    weeklySummary: "Weekly Summary (Last 7 Days)",
    whatChildStudied: "What Your Child Studied This Week",
    dailyBreakdown: "Daily Progress Breakdown",
    learningPatterns: "Study Patterns",
    quizAnalytics: "Detailed Quiz Analytics",
    topicPerformance: "Topic-wise Performance",
    recommendations: "AI Suggestions",
    parentTips: "Tips for Parents",
    performanceCharts: "Performance Analytics",
    skillAssessment: "Skill Assessment",
    understandingDist: "Understanding Distribution",
    subjectPerformance: "Subject Performance",
    
    morning: "Morning (5am-12pm)",
    afternoon: "Afternoon (12pm-5pm)",
    evening: "Evening (5pm-9pm)",
    night: "Night (9pm-5am)",
    bestStudyTime: "Best Study Time",
    
    improving: "Improving",
    declining: "Decline",
    stable: "Stable",
    
    excellent: "Excellent",
    veryGood: "Very Good",
    good: "Good",
    aboveAverage: "Above Average",
    average: "Average",
    needsImprovement: "Needs Improvement",
    
    weakAreas: "Areas Needing Improvement",
    strongAreas: "Strong Areas",
    
    classAvg: "Class Avg",
    showClassAvg: "Show Class Avg",
    hideClassAvg: "Hide Class Avg",
    
    downloadPdf: "Download PDF",
    exportCharts: "Export Charts",
    sendWhatsApp: "Send via WhatsApp",
    
    totalCorrect: "Total Correct",
    avgAccuracy: "Avg Accuracy",
    bestQuiz: "Best Quiz",
    passRate: "Pass Rate (≥50%)",
    
    totalSessions: "Total Sessions",
    totalMinutes: "Total Minutes",
    subjectsStudied: "Subjects Studied",
    streak: "Streak",
    currentStreak: "Current Streak",
    longestStreak: "Longest Streak",
    daysStudied: "Days Studied",
    engagementScore: "Engagement Score",
    
    recStartStudying: "🎯 Start today! Begin studying and build your streak.",
    recKeepStreak: "🔥 Great going! Keep the streak alive, study daily.",
    recExcellentStreak: "🏆 Amazing! Your consistency is outstanding!",
    recImproveQuiz: "📖 Revise topics to improve quiz accuracy.",
    recExcellentQuiz: "⭐ Quiz performance is excellent! Keep it up.",
    recFocusTopics: "⚠️ Focus on these topics:",
    recIncreaseTime: "⏰ Increase study time - aim for at least 30 min daily.",
    recBestTime: "📚 Best study time identified - keep studying at this time.",
    
    tipTalkDaily: "👨‍👩‍👧 Talk to your child about studies for 10 min daily.",
    tipPraise: "🌟 Praise small achievements to build confidence.",
    tipScreenBalance: "📱 Balance screen time with study time.",
    tipQuietPlace: "🏠 Provide a quiet place for studying.",
  },
};

interface ReportLanguageContextType {
  language: ReportLanguage;
  setLanguage: (lang: ReportLanguage) => void;
  t: ReportTranslations;
}

const ReportLanguageContext = createContext<ReportLanguageContextType | undefined>(undefined);

export const ReportLanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<ReportLanguage>("en"); // Default to English

  return (
    <ReportLanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </ReportLanguageContext.Provider>
  );
};

export const useReportLanguage = () => {
  const context = useContext(ReportLanguageContext);
  if (!context) {
    throw new Error("useReportLanguage must be used within a ReportLanguageProvider");
  }
  return context;
};

export { translations };
export type { ReportLanguage, ReportTranslations };
