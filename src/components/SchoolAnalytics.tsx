import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, AlertTriangle, CalendarDays, BarChart3, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SchoolAnalyticsProps {
  schoolUuid: string;
  sessionToken: string;
}

interface PerformerData {
  name: string;
  class: string;
  accuracy: number;
  sessions: number;
}

interface ClassAccuracy {
  className: string;
  avgAccuracy: number;
  studentCount: number;
}

const SchoolAnalytics = ({ schoolUuid, sessionToken }: SchoolAnalyticsProps) => {
  const [topPerformers, setTopPerformers] = useState<PerformerData[]>([]);
  const [lowPerformers, setLowPerformers] = useState<PerformerData[]>([]);
  const [classAccuracy, setClassAccuracy] = useState<ClassAccuracy[]>([]);
  const [weeklyEngagement, setWeeklyEngagement] = useState({ activeStudents: 0, totalStudents: 0, avgSessions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (schoolUuid) loadAnalytics();
  }, [schoolUuid]);

  const loadAnalytics = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("get-students", {
        body: {
          action: "get_school_analytics",
          schoolId: schoolUuid,
          sessionToken,
        },
      });

      if (error || data?.error) {
        console.error("Analytics error:", error || data?.error);
        return;
      }

      if (data) {
        setTopPerformers(data.topPerformers || []);
        setLowPerformers(data.lowPerformers || []);
        setClassAccuracy(data.classAccuracy || []);
        setWeeklyEngagement(data.weeklyEngagement || { activeStudents: 0, totalStudents: 0, avgSessions: 0 });
      }
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <BarChart3 className="w-8 h-8 mx-auto mb-3 animate-pulse" />
        <p>Loading analytics...</p>
      </div>
    );
  }

  const engagementPct = weeklyEngagement.totalStudents > 0
    ? Math.round((weeklyEngagement.activeStudents / weeklyEngagement.totalStudents) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Weekly Engagement Overview */}
      <Card className="p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <CalendarDays className="w-4 h-4" /> Weekly Engagement Report
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{weeklyEngagement.activeStudents}</p>
            <p className="text-xs text-muted-foreground">Active Students</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{weeklyEngagement.totalStudents}</p>
            <p className="text-xs text-muted-foreground">Total Enrolled</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{weeklyEngagement.avgSessions}</p>
            <p className="text-xs text-muted-foreground">Avg Sessions/Student</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Progress value={engagementPct} className="flex-1 h-2" />
          <span className="text-sm font-medium">{engagementPct}% active</span>
        </div>
      </Card>

      {/* Top & Low Performers side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top 10 Performers */}
        <Card className="p-5">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" /> Top 10 Performers
          </h3>
          {topPerformers.length > 0 ? (
            <div className="space-y-2">
              {topPerformers.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.class}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-green-600">{s.accuracy}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">No data yet</p>
          )}
        </Card>

        {/* Low Performers */}
        <Card className="p-5">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" /> Needs Attention
          </h3>
          {lowPerformers.length > 0 ? (
            <div className="space-y-2">
              {lowPerformers.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.class} · {s.sessions} sessions</p>
                  </div>
                  <span className="text-sm font-bold text-red-600">{s.accuracy}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">All students performing well!</p>
          )}
        </Card>
      </div>

      {/* Average Accuracy per Class */}
      <Card className="p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" /> Average Accuracy per Class
        </h3>
        {classAccuracy.length > 0 ? (
          <div className="space-y-3">
            {classAccuracy.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{c.className}</p>
                  <p className="text-xs text-muted-foreground">{c.studentCount} students</p>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={c.avgAccuracy} className="w-24 h-2" />
                  <span className={`text-sm font-bold ${c.avgAccuracy >= 70 ? "text-green-600" : c.avgAccuracy >= 50 ? "text-yellow-600" : "text-red-600"}`}>
                    {c.avgAccuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center">No MCQ data available yet</p>
        )}
      </Card>
    </div>
  );
};

export default SchoolAnalytics;
