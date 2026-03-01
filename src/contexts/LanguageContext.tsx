import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

// Common translations used across the app - English primary, Hinglish secondary
export const translations: Translations = {
  // Navigation & Common
  'app.name': { en: 'Study Buddy AI', hi: 'Study Buddy AI' },
  'nav.home': { en: 'Home', hi: 'Home' },
  'nav.login': { en: 'Login', hi: 'Login Karo' },
  'nav.signup': { en: 'Sign Up', hi: 'Sign Up Karo' },
  'nav.logout': { en: 'Logout', hi: 'Logout' },
  'nav.dashboard': { en: 'Dashboard', hi: 'Dashboard' },
  'nav.progress': { en: 'Progress', hi: 'Progress' },
  
  // Auth
  'auth.email': { en: 'Email', hi: 'Email' },
  'auth.password': { en: 'Password', hi: 'Password' },
  'auth.newPassword': { en: 'New Password', hi: 'Naya Password' },
  'auth.confirmPassword': { en: 'Confirm Password', hi: 'Password Confirm Karo' },
  'auth.loginButton': { en: 'Login', hi: 'Login Karo' },
  'auth.signupButton': { en: 'Sign Up', hi: 'Sign Up Karo' },
  'auth.forgotPassword': { en: 'Forgot Password?', hi: 'Password Bhool Gaye?' },
  'auth.resetPassword': { en: 'Reset Password', hi: 'Password Reset Karo' },
  'auth.adminId': { en: 'Admin ID', hi: 'Admin ID' },
  'auth.schoolId': { en: 'School ID', hi: 'School ID' },
  'auth.loggingIn': { en: 'Logging in...', hi: 'Login ho raha hai...' },
  'auth.enterAdmin': { en: 'Enter Admin Panel', hi: 'Admin Panel mein jao' },
  'auth.adminLogin': { en: 'Admin Login', hi: 'Admin Login' },
  'auth.schoolLogin': { en: 'School Login', hi: 'School Login' },
  'auth.studentLogin': { en: 'Student Login', hi: 'Student Login' },
  'auth.loginAsStudent': { en: 'Login as Student', hi: 'Student ke roop mein Login karo' },
  'auth.loginAsSchool': { en: 'Login as School', hi: 'School ke roop mein Login karo' },
  'auth.loginAsAdmin': { en: 'Login as Admin', hi: 'Admin ke roop mein Login karo' },
  'auth.passwordResetRequired': { en: 'Password Reset Required', hi: 'Password Reset Zaroori Hai' },
  'auth.mustResetPassword': { en: 'You must reset your password before continuing.', hi: 'Aage badhne se pehle password reset karna hoga.' },
  'auth.updating': { en: 'Updating...', hi: 'Update ho raha hai...' },
  'auth.updatePassword': { en: 'Update Password', hi: 'Password Update Karo' },
  
  // Dashboard
  'dashboard.welcome': { en: 'Welcome', hi: 'Welcome' },
  'dashboard.totalStudents': { en: 'Total Students', hi: 'Total Students' },
  'dashboard.totalSchools': { en: 'Total Schools', hi: 'Total Schools' },
  'dashboard.activeSchools': { en: 'Active Schools', hi: 'Active Schools' },
  'dashboard.bannedSchools': { en: 'Banned Schools', hi: 'Banned Schools' },
  'dashboard.unpaidFees': { en: 'Unpaid Fees', hi: 'Unpaid Fees' },
  'dashboard.loading': { en: 'Loading...', hi: 'Loading ho raha hai...' },
  'dashboard.search': { en: 'Search...', hi: 'Search karo...' },

  // School Dashboard
  'school.dashboardTitle': { en: 'School Dashboard', hi: 'School Dashboard' },
  'school.dashboardLoading': { en: 'Loading dashboard...', hi: 'Dashboard load ho raha hai...' },
  'school.accessSuspendedTitle': { en: 'Access Suspended', hi: 'Access Band Hai' },
  'school.accessSuspendedDesc': { en: "Your school's dashboard access has been suspended due to unpaid fees. Please contact the admin to resolve this issue.", hi: 'Fees pending hone ki wajah se aapka dashboard access band hai. Admin se contact karo.' },
  'school.bannedDesc': { en: 'Your school has been banned. Please contact admin.', hi: 'Aapka school ban hai. Admin se contact karo.' },
  'school.removeStudentFailed': { en: 'Failed to remove student. Please try again.', hi: 'Student remove nahi hua. Dobara try karo.' },
  'school.today': { en: 'Today', hi: 'Aaj' },
  'school.improving': { en: 'Improving', hi: 'Improve ho raha' },
  'school.pendingApprovalsTitle': { en: 'Pending Student Approvals', hi: 'Pending Student Approvals' },
  'school.pendingApprovalsDesc': { en: 'Review and approve students to allow them access.', hi: 'Students ko review karke approve karo taaki unhe access mile.' },
  'school.selectedCount': { en: 'selected', hi: 'selected' },
  'school.selectAll': { en: 'Select All', hi: 'Sab Select Karo' },
  'school.deselect': { en: 'Deselect', hi: 'Deselect' },
  'school.approveAll': { en: 'Approve All', hi: 'Sab Approve Karo' },
  'school.rejectAll': { en: 'Reject All', hi: 'Sab Reject Karo' },
  'school.noPendingTitle': { en: 'No pending approvals!', hi: 'Koi pending approval nahi!' },
  'school.noPendingDesc': { en: 'All students have been reviewed.', hi: 'Sab students review ho chuke hain.' },
  'school.searchStudents': { en: 'Search students...', hi: 'Student search karo...' },
  'school.allClasses': { en: 'All Classes', hi: 'All Classes' },
  'school.studentActivity': { en: 'Student Activity', hi: 'Student Activity' },
  'school.noApprovedTitle': { en: 'No approved students yet.', hi: 'Abhi koi approved student nahi.' },
  'school.noApprovedDesc': { en: 'Approve pending students to see them here.', hi: 'Pending students ko approve karo, phir yahan dikhenge.' },
  'school.table.student': { en: 'Student', hi: 'Student' },
  'school.table.today': { en: 'Today', hi: 'Aaj' },
  'school.table.topicStudied': { en: 'Topic Studied', hi: 'Topic' },
  'school.table.trend': { en: 'Trend', hi: 'Trend' },
  'school.table.sessions': { en: 'Sessions', hi: 'Sessions' },
  'school.table.actions': { en: 'Actions', hi: 'Actions' },
  'school.yes': { en: 'Yes', hi: 'Haan' },
  'school.no': { en: 'No', hi: 'Nahi' },
  'school.studied': { en: 'Studied', hi: 'Padha' },
  'school.notYet': { en: 'Not Yet', hi: 'Abhi Nahi' },
  'school.topicLabel': { en: 'Topic', hi: 'Topic' },
  'school.trendLabel': { en: 'Trend', hi: 'Trend' },
  'school.viewReport': { en: 'View Report', hi: 'Report Dekho' },
  'school.rejectStudentTitle': { en: 'Reject Student Registration', hi: 'Student Registration Reject' },
  'school.rejectStudentDesc': { en: "You are about to reject {name}'s registration. Please provide a reason (optional):", hi: '{name} ka registration reject hone wala hai. Reason (optional) likho:' },
  'school.rejectReasonPlaceholder': { en: 'Enter reason for rejection (e.g., Invalid details, Not a student of this school, etc.)', hi: 'Rejection ka reason likho (jaise: galat details, is school ka student nahi, etc.)' },
  'school.rejectStudentsTitle': { en: 'Reject {count} Students', hi: '{count} Students Reject' },
  'school.rejectStudentsDesc': { en: 'You are about to reject {count} students. Please provide a reason (optional):', hi: 'Aap {count} students ko reject karne wale ho. Reason (optional) likho:' },
  'school.removeStudentTitle': { en: 'Remove Student', hi: 'Student Hatao' },
  'school.removeStudentDesc': { en: 'Are you sure you want to remove {name} from your school? This will permanently delete their account and all study data.', hi: 'Kya aap {name} ko school se hatana chahte ho? Isse account aur pura study data permanently delete ho jaega.' },

  // Trends
  'trend.improving': { en: 'Improving', hi: 'Improve' },
  'trend.declining': { en: 'Declining', hi: 'Down' },
  'trend.stable': { en: 'Stable', hi: 'Stable' },

  // Student Progress
  'progress.title': { en: 'Progress Report', hi: 'Progress Report' },
  'progress.overallGrade': { en: 'Overall Grade', hi: 'Overall Grade' },
  'progress.downloadPdf': { en: 'Download PDF', hi: 'PDF Download' },
  'progress.totalSessions': { en: 'Total Sessions', hi: 'Total Sessions' },
  'progress.studyTime': { en: 'Study Time', hi: 'Study Time' },
  'progress.avgScore': { en: 'Avg Score', hi: 'Avg Score' },
  'progress.consistency': { en: 'Consistency', hi: 'Consistency' },
  'progress.streak': { en: 'Streak', hi: 'Streak' },
  'progress.quizzes': { en: 'Quizzes', hi: 'Quizzes' },
  'progress.quizAccuracy': { en: 'Quiz Accuracy', hi: 'Quiz Accuracy' },
  'progress.improvementOverTime': { en: 'Improvement Over Time (Last 30 Days)', hi: 'Last 30 Din ka Improvement' },
  'progress.startStudyingEmpty': { en: 'Start studying to see your progress!', hi: 'Progress dekhne ke liye padhai shuru karo!' },
  'progress.skillAssessment': { en: 'Skill Assessment', hi: 'Skill Assessment' },
  'progress.subjectPerformance': { en: 'Subject Performance', hi: 'Subject Performance' },
  'progress.noDataYet': { en: 'No data available yet', hi: 'Abhi data nahi hai' },
  'progress.weeklyComparison': { en: 'Weekly Comparison', hi: 'Weekly Comparison' },
  'progress.weeklyStudyPattern': { en: 'Weekly Study Pattern', hi: 'Weekly Study Pattern' },
  'progress.understandingLevels': { en: 'Understanding Levels', hi: 'Understanding Levels' },
  'progress.recentQuizPerformance': { en: 'Recent Quiz Performance', hi: 'Recent Quiz Performance' },
  'progress.correctLabel': { en: 'correct', hi: 'sahi' },
  'progress.strongAreas': { en: 'Strong Areas', hi: 'Strong Areas' },
  'progress.keepStudyingStrengths': { en: 'Keep studying to identify your strengths!', hi: 'Apni strengths jaanne ke liye padhte raho!' },
  'progress.areasToImprove': { en: 'Areas to Improve', hi: 'Improve karne wale Areas' },
  'progress.noWeakAreasYet': { en: 'Great job! No weak areas identified yet.', hi: 'Shabaash! Abhi koi weak area nahi mila.' },
  'progress.downloadFailedTitle': { en: 'Download Failed', hi: 'Download Fail' },
  'progress.downloadFailedDesc': { en: 'Could not generate PDF. Please try again.', hi: 'PDF nahi ban paya. Dobara try karo.' },

  // Tabs
  'tab.schools': { en: 'Schools', hi: 'Schools' },
  'tab.students': { en: 'Students', hi: 'Students' },
  'tab.reports': { en: 'Send Reports', hi: 'Reports Bhejo' },
  'tab.studentReports': { en: 'Student Reports', hi: 'Student Reports' },
  
  // Actions
  'action.add': { en: 'Add', hi: 'Add Karo' },
  'action.edit': { en: 'Edit', hi: 'Edit Karo' },
  'action.delete': { en: 'Delete', hi: 'Delete Karo' },
  'action.ban': { en: 'Ban', hi: 'Ban Karo' },
  'action.unban': { en: 'Unban', hi: 'Unban Karo' },
  'action.approve': { en: 'Approve', hi: 'Approve Karo' },
  'action.reject': { en: 'Reject', hi: 'Reject Karo' },
  'action.save': { en: 'Save', hi: 'Save Karo' },
  'action.cancel': { en: 'Cancel', hi: 'Cancel' },
  'action.confirm': { en: 'Confirm', hi: 'Confirm' },
  'action.send': { en: 'Send', hi: 'Bhejo' },
  'action.view': { en: 'View', hi: 'Dekho' },
  'action.addSchool': { en: 'Add School', hi: 'School Add Karo' },
  'action.sendReport': { en: 'Send Report', hi: 'Report Bhejo' },
  'action.viewReport': { en: 'View Report', hi: 'Report Dekho' },
  'action.markPaid': { en: 'Mark Paid', hi: 'Paid Mark Karo' },
  'action.markUnpaid': { en: 'Mark Unpaid', hi: 'Unpaid Mark Karo' },
  
  // School
  'school.name': { en: 'School Name', hi: 'School ka Naam' },
  'school.district': { en: 'District', hi: 'District' },
  'school.state': { en: 'State', hi: 'State' },
  'school.email': { en: 'Email', hi: 'Email' },
  'school.whatsapp': { en: 'WhatsApp', hi: 'WhatsApp' },
  'school.students': { en: 'Students', hi: 'Students' },
  'school.feePaid': { en: 'Fee Paid', hi: 'Fee Paid' },
  'school.feeUnpaid': { en: 'Fee Unpaid', hi: 'Fee Pending' },
  'school.banned': { en: 'Banned', hi: 'Banned' },
  'school.active': { en: 'Active', hi: 'Active' },
  'school.credentials': { en: 'School Credentials', hi: 'School Credentials' },
  'school.credentialsSave': { en: 'Save these credentials! They cannot be recovered.', hi: 'Ye credentials save karo! Ye recover nahi honge.' },
  
  // Student
  'student.name': { en: 'Name', hi: 'Naam' },
  'student.class': { en: 'Class', hi: 'Class' },
  'student.parentWhatsapp': { en: 'Parent WhatsApp', hi: 'Parent ka WhatsApp' },
  'student.approved': { en: 'Approved', hi: 'Approved' },
  'student.pending': { en: 'Pending', hi: 'Pending' },
  
  // Messages
  'msg.success': { en: 'Success', hi: 'Success' },
  'msg.error': { en: 'Error', hi: 'Error' },
  'msg.loading': { en: 'Loading...', hi: 'Loading ho raha hai...' },
  'msg.noData': { en: 'No data found', hi: 'Koi data nahi mila' },
  'msg.confirmDelete': { en: 'Are you sure you want to delete?', hi: 'Kya aap delete karna chahte ho?' },
  'msg.confirmBan': { en: 'Are you sure you want to ban?', hi: 'Kya aap ban karna chahte ho?' },
  'msg.passwordsMismatch': { en: 'Passwords do not match', hi: 'Passwords match nahi ho rahe' },
  'msg.passwordTooShort': { en: 'Password must be at least 8 characters', hi: 'Password kam se kam 8 characters ka hona chahiye' },
  'msg.reportSent': { en: 'Report sent successfully', hi: 'Report successfully bhej di gayi' },
  'msg.schoolAdded': { en: 'School added successfully', hi: 'School successfully add ho gaya' },
  
  // Landing
  'landing.hero': { en: 'AI-Powered Education for Every Student', hi: 'Har Student ke liye AI-Powered Education' },
  'landing.heroSub': { en: 'Personalized learning that adapts to you', hi: 'Aapke hisaab se personalized learning' },
  'landing.getStarted': { en: 'Get Started', hi: 'Shuru Karo' },
  'landing.learnMore': { en: 'Learn More', hi: 'Aur Jaano' },
  
  // Language toggle
  'language.toggle': { en: 'Hinglish', hi: 'English' },
  'language.current': { en: 'English', hi: 'Hinglish' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('appLanguage');
    return (stored === 'en' || stored === 'hi') ? stored : 'en';
  });

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
