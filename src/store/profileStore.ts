
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GrowthGoal = 'career' | 'finance' | 'wellbeing';
export type CareerStatus = 'student' | 'employed' | 'unemployed' | 'career_transition';

export interface ProfileState {
  growthGoal: GrowthGoal | null;
  careerStatus: CareerStatus | null;
  careerAspiration: string;
  skills: string[];
  experience: string;
  blockers: string;
  hasCV: boolean;
  hasLinkedIn: boolean;
  cvFile: File | null;
  linkedInUrl: string;
  completedProfile: boolean;
  completedCourses: string[];
  completedAssessments: string[];
  
  // Actions
  setGrowthGoal: (goal: GrowthGoal) => void;
  setCareerStatus: (status: CareerStatus) => void;
  setCareerAspiration: (aspiration: string) => void;
  setSkills: (skills: string[]) => void;
  setExperience: (experience: string) => void;
  setBlockers: (blockers: string) => void;
  setHasCV: (hasCV: boolean) => void;
  setHasLinkedIn: (hasLinkedIn: boolean) => void;
  setCVFile: (file: File | null) => void;
  setLinkedInUrl: (url: string) => void;
  completeProfile: () => void;
  addCompletedCourse: (courseId: string) => void;
  addCompletedAssessment: (assessmentId: string) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      growthGoal: null,
      careerStatus: null,
      careerAspiration: '',
      skills: [],
      experience: '',
      blockers: '',
      hasCV: false,
      hasLinkedIn: false,
      cvFile: null,
      linkedInUrl: '',
      completedProfile: false,
      completedCourses: [],
      completedAssessments: [],
      
      // Actions
      setGrowthGoal: (goal) => set({ growthGoal: goal }),
      setCareerStatus: (status) => set({ careerStatus: status }),
      setCareerAspiration: (aspiration) => set({ careerAspiration: aspiration }),
      setSkills: (skills) => set({ skills }),
      setExperience: (experience) => set({ experience }),
      setBlockers: (blockers) => set({ blockers }),
      setHasCV: (hasCV) => set({ hasCV }),
      setHasLinkedIn: (hasLinkedIn) => set({ hasLinkedIn }),
      setCVFile: (file) => set({ cvFile: file }),
      setLinkedInUrl: (url) => set({ linkedInUrl: url }),
      completeProfile: () => set({ completedProfile: true }),
      addCompletedCourse: (courseId) => 
        set((state) => ({ 
          completedCourses: [...state.completedCourses, courseId]
        })),
      addCompletedAssessment: (assessmentId) => 
        set((state) => ({ 
          completedAssessments: [...state.completedAssessments, assessmentId]
        })),
      resetProfile: () => set({
        growthGoal: null,
        careerStatus: null,
        careerAspiration: '',
        skills: [],
        experience: '',
        blockers: '',
        hasCV: false,
        hasLinkedIn: false,
        cvFile: null,
        linkedInUrl: '',
        completedProfile: false,
        completedCourses: [],
        completedAssessments: [],
      }),
    }),
    {
      name: 'profile-storage',
    }
  )
);
