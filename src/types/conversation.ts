
export interface UserProfile {
  growthGoal: 'career' | 'finance' | 'wellbeing' | null;
  careerStatus: 'student' | 'employed' | 'unemployed' | 'career_transition' | null;
  careerAspiration: string;
  skills: string[];
  experience: string;
  blockers: string;
  hasCV: boolean;
  hasLinkedIn: boolean;
}

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
