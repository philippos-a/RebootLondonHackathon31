
import { cn } from '@/lib/utils';

interface PathCheckpointProps {
  title: string;
  isCompleted: boolean;
  isActive: boolean;
  onClick: () => void;
}

const PathCheckpoint = ({ title, isCompleted, isActive, onClick }: PathCheckpointProps) => {
  return (
    <div className="flex flex-col items-center" onClick={onClick}>
      <div 
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all border-2",
          isCompleted ? "bg-primary border-primary text-white" : 
            (isActive ? "bg-primary/20 border-primary" : "bg-background border-muted-foreground/30")
        )}
      >
        {isCompleted ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span className="text-foreground">{isActive ? "..." : ""}</span>
        )}
      </div>
      <span className={cn(
        "mt-2 text-sm font-medium text-center",
        isActive ? "text-primary" : "text-muted-foreground"
      )}>
        {title}
      </span>
    </div>
  );
};

export default PathCheckpoint;
