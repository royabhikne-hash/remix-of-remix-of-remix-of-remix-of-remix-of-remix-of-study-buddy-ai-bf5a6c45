import React, { useEffect } from "react";
import { BookOpen, Users, GraduationCap, MessageCircle, TrendingUp, FileText, Shield, Zap, Star, ChevronRight, Brain, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

const Landing = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center animate-pulse">
          <BookOpen className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="container mx-auto py-4 px-4 relative z-20">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <img 
              src="/logo.png" 
              alt="Study Buddy AI" 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex-shrink-0 object-contain shadow-md"
            />
            <span className="text-base sm:text-xl font-extrabold text-foreground truncate">{t('app.name')}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <LanguageToggle />
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="text-xs sm:text-sm px-2 sm:px-4 font-semibold">
              {t('nav.login')}
            </Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/signup")} className="text-xs sm:text-sm px-3 sm:px-4 font-bold shadow-lg shadow-primary/25">
              {t('landing.getStarted')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 hero-gradient opacity-60" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-primary">
                {language === 'en' ? '🚀 India\'s #1 AI Study Companion' : '🚀 India का #1 AI Study Companion'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-[1.1] tracking-tight">
              {language === 'en' ? (
                <>Your Personal<br /><span className="gradient-text">AI Study Buddy</span><br />is Here</>
              ) : (
                <>तेरा Personal<br /><span className="gradient-text">AI Study Buddy</span><br />आ गया</>
              )}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {language === 'en' 
                ? "AI-powered study companion for Class 6-12. Smart chat, weekly tests, progress tracking & parent reports — all in one app."
                : "Class 6-12 ke liye AI study companion. Smart chat, weekly test, progress tracking & parent reports — sab ek app mein."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="hero" size="xl" onClick={() => navigate("/signup")} className="shadow-xl shadow-primary/30 font-bold text-base">
                <GraduationCap className="w-5 h-5" />
                {language === 'en' ? 'Start Studying Free' : 'Free Padhai Shuru Karo'}
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="hero-outline" size="xl" onClick={() => navigate("/school-login")} className="font-semibold">
                <Users className="w-5 h-5" />
                {t('auth.schoolLogin')}
              </Button>
              <Button variant="hero-outline" size="xl" onClick={() => navigate("/coaching-login")} className="font-semibold">
                <GraduationCap className="w-5 h-5" />
                {language === 'en' ? 'Coaching Login' : 'Coaching Login'}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-accent" />
                <span>{language === 'en' ? 'Safe & Secure' : 'सुरक्षित'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>{language === 'en' ? 'Instant AI Help' : 'तुरंत AI मदद'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>{language === 'en' ? 'CBSE, ICSE & More' : 'CBSE, ICSE और अन्य'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <StatItem value="5,000+" label={language === 'en' ? 'Students Ready' : 'Students'} />
            <StatItem value="6-12" label={language === 'en' ? 'All Classes' : 'सभी Classes'} />
            <StatItem value="4" label={language === 'en' ? 'Boards Supported' : 'Boards'} />
            <StatItem value="24/7" label={language === 'en' ? 'AI Available' : 'AI उपलब्ध'} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            {language === 'en' ? 'Everything You Need to ' : 'वो सब जो '}<span className="gradient-text">{language === 'en' ? 'Excel' : 'सफल'}</span>{language === 'en' ? '' : ' होने के लिए चाहिए'}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {language === 'en' ? 'Powerful features designed for Indian students' : 'Indian students ke liye powerful features'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard
            icon={<MessageCircle className="w-6 h-6" />}
            title={language === 'en' ? "AI Study Chat" : "AI Study Chat"}
            description={language === 'en' 
              ? "Chat with AI while studying. Upload notes, ask doubts, get step-by-step explanations instantly."
              : "Padhai karte waqt AI se chat karo. Notes upload karo, doubts poocho, turant samjho."}
            color="primary"
          />
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title={language === 'en' ? "Weekly Smart Test" : "Weekly Smart Test"}
            description={language === 'en'
              ? "AI generates personalized weekly tests based on what you studied. 70% current + 30% weak topics."
              : "AI tumhare padhe topics se weekly test banata hai. 70% current + 30% weak topics."}
            color="accent"
          />
          <FeatureCard
            icon={<BarChart3 className="w-6 h-6" />}
            title={language === 'en' ? "WPS Progress Score" : "WPS Progress Score"}
            description={language === 'en'
              ? "Weekly Performance Score tracks accuracy, improvement, weak topics & consistency automatically."
              : "Weekly Performance Score automatically accuracy, improvement aur consistency track karta hai."}
            color="purple"
          />
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            title={language === 'en' ? "Rankings & Leaderboard" : "Rankings & Leaderboard"}
            description={language === 'en'
              ? "Compete with school & district peers. Climb the leaderboard and earn achievement badges."
              : "School aur district ke students se compete karo. Leaderboard mein upar aao."}
            color="primary"
          />
          <FeatureCard
            icon={<FileText className="w-6 h-6" />}
            title={language === 'en' ? "Parent Reports" : "Parent Reports"}
            description={language === 'en'
              ? "Weekly PDF reports with WPS score sent to parents via WhatsApp. Full transparency."
              : "WPS score ke saath weekly PDF report parents ko WhatsApp pe jaata hai."}
            color="accent"
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title={language === 'en' ? "School Dashboard" : "School Dashboard"}
            description={language === 'en'
              ? "Schools and coaching centers manage students, track performance & approve subscriptions."
              : "Schools aur coaching centers students ko manage karte hain, performance track karte hain."}
            color="purple"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">
            {language === 'en' ? 'How It ' : 'Kaise '}<span className="gradient-text">{language === 'en' ? 'Works' : 'Kaam Karta Hai'}</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <StepCard step={1} title={language === 'en' ? "Sign Up" : "Sign Up"} description={language === 'en' ? "Create account & get approved by school" : "Account banao & school se approval lo"} />
              <StepCard step={2} title={language === 'en' ? "Study Daily" : "Roz Padho"} description={language === 'en' ? "Chat with AI, ask doubts freely" : "AI se chat karo, doubts poocho"} />
              <StepCard step={3} title={language === 'en' ? "Weekly Test" : "Weekly Test"} description={language === 'en' ? "Take AI-generated adaptive test" : "AI ka smart test do har hafta"} />
              <StepCard step={4} title={language === 'en' ? "Track Growth" : "Growth Dekho"} description={language === 'en' ? "See WPS score & improve" : "WPS score dekho aur sudhaaro"} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
          {language === 'en' ? 'Simple ' : 'Simple '}<span className="gradient-text">{language === 'en' ? 'Pricing' : 'Plans'}</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          {language === 'en' ? 'Choose a plan that fits your needs' : 'Apni zaroorat ke hisaab se plan chuno'}
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <PlanCard 
            name="Starter" price="₹50" period="/month" 
            features={["20 chats/day", "3 images/day", "Web Voice", "Weekly Test"]}
            label={language === 'en' ? 'For Coaching Students' : 'Coaching Students ke liye'}
          />
          <PlanCard 
            name="Basic" price="₹99" period="/month" 
            features={["60 chats/day", "7 images/day", "Web Voice", "Weekly Test", "Progress Reports"]}
            label={language === 'en' ? 'For School Students' : 'School Students ke liye'}
            popular
          />
          <PlanCard 
            name="Pro" price="₹199" period="/month" 
            features={["100 chats/day", "15 images/day", "Premium AI Voice", "90K chars/month", "Priority Support"]}
            label={language === 'en' ? 'For Serious Learners' : 'Serious Learners ke liye'}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Study Buddy AI" className="w-8 h-8 rounded-lg object-contain" />
              <span className="font-bold">Study Buddy AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Study Buddy AI. Making education better for every student.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div>
    <p className="text-2xl md:text-3xl font-extrabold text-primary">{value}</p>
    <p className="text-sm text-muted-foreground font-medium">{label}</p>
  </div>
);

const FeatureCard = React.forwardRef<HTMLDivElement, { icon: React.ReactNode; title: string; description: string; color?: string }>(
  ({ icon, title, description, color = "primary" }, ref) => {
    const colorClasses: Record<string, string> = {
      primary: "bg-primary/10 text-primary border-primary/20",
      accent: "bg-accent/10 text-accent border-accent/20",
      purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    };
    
    return (
      <div ref={ref} className="edu-card p-6 hover:-translate-y-1 transition-all duration-300 group">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${colorClasses[color]} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

const StepCard = React.forwardRef<HTMLDivElement, { step: number; title: string; description: string }>(
  ({ step, title, description }, ref) => (
    <div ref={ref} className="text-center group">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center mx-auto mb-4 font-extrabold text-xl shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform">
        {step}
      </div>
      <h3 className="font-bold mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
);
StepCard.displayName = "StepCard";

const PlanCard = ({ name, price, period, features, label, popular }: { 
  name: string; price: string; period: string; features: string[]; label: string; popular?: boolean 
}) => (
  <div className={`edu-card p-6 relative ${popular ? 'border-primary/50 shadow-lg shadow-primary/10 ring-1 ring-primary/20' : ''}`}>
    {popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">POPULAR</span>
      </div>
    )}
    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">{label}</p>
    <h3 className="text-xl font-extrabold mb-1">{name}</h3>
    <div className="mb-4">
      <span className="text-3xl font-extrabold text-primary">{price}</span>
      <span className="text-muted-foreground text-sm">{period}</span>
    </div>
    <ul className="space-y-2.5 mb-6">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-2 text-sm">
          <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className="text-foreground">{f}</span>
        </li>
      ))}
    </ul>
    <Button variant={popular ? "hero" : "outline"} className="w-full font-semibold" onClick={() => {}}>
      Get Started
    </Button>
  </div>
);

export default Landing;
