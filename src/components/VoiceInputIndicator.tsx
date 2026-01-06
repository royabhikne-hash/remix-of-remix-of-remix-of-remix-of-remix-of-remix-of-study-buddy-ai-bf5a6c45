import { cn } from "@/lib/utils";

interface VoiceInputIndicatorProps {
  isActive: boolean;
  className?: string;
}

const VoiceInputIndicator = ({ isActive, className }: VoiceInputIndicatorProps) => {
  if (!isActive) return null;

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <div className="voice-input-container">
        <div className="voice-ring voice-ring-1" />
        <div className="voice-ring voice-ring-2" />
        <div className="voice-ring voice-ring-3" />
        <div className="voice-dot" />
      </div>
    </div>
  );
};

export default VoiceInputIndicator;
