
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'ai';
  timestamp?: Date;
}

const ChatMessage = ({ message, sender, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "mb-4 animate-fade-in",
      sender === 'user' ? "flex justify-end" : "flex justify-start"
    )}>
      <div className={cn(
        "p-4 rounded-2xl max-w-[80%]",
        sender === 'user' 
          ? "bg-primary/20 rounded-br-sm text-foreground" 
          : "bg-secondary/60 rounded-bl-sm text-foreground"
      )}>
        <p className="text-sm sm:text-base">{message}</p>
        {timestamp && (
          <div className="text-xs text-foreground/50 mt-1 text-right">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
