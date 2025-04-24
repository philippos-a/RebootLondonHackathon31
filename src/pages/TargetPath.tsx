
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProfileSummary from '@/components/ProfileSummary';
import PathCheckpoint from '@/components/PathCheckpoint';
import { ArrowRight } from 'lucide-react';

const pathSteps = [
  { id: 'profile', title: 'Profile Created' },
  { id: 'career-path', title: 'Career Path Planner' },
  { id: 'upskilling', title: 'Upskilling' },
  { id: 'cv-builder', title: 'CV Builder' },
  { id: 'mentoring', title: 'Mentoring' },
  { id: 'eminence', title: 'Eminence' },
  { id: 'job-sourcing', title: 'Job Sourcing' },
];

const TargetPath = () => {
  const navigate = useNavigate();
  const profile = useProfileStore();
  const [activeStep, setActiveStep] = useState('upskilling');
  
  // Check if profile is complete
  if (!profile.completedProfile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Profile Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>You need to complete your profile before accessing your target path.</p>
            <Button onClick={() => navigate('/')} className="w-full">
              Create Your Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const handleStepClick = (stepId: string) => {
    setActiveStep(stepId);
    if (stepId === 'upskilling') {
      navigate('/upskilling');
    } else if (stepId === 'cv-builder') {
      navigate('/cv-builder');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="w-full card-highlight">
            <CardHeader>
              <CardTitle>Your Growth Path</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-muted-foreground mb-2">
                  Based on your profile, we've created a personalized growth path to help you achieve your career goals.
                </p>
                <p className="text-foreground font-medium">
                  Current focus: <span className="text-primary">{activeStep.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}</span>
                </p>
              </div>
              
              <div className="relative my-12 px-4">
                {/* Path line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted-foreground/30 z-0"></div>
                
                {/* SVG path with animation */}
                <svg className="absolute top-6 left-0 right-0 h-0.5 z-10" width="100%" height="2">
                  <path 
                    d="M0,1 H1000" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                    className="text-primary animate-path-progress"
                  />
                </svg>
                
                {/* Path checkpoints */}
                <div className="flex justify-between relative z-20">
                  {pathSteps.map((step, index) => (
                    <PathCheckpoint 
                      key={step.id}
                      title={step.title}
                      isCompleted={step.id === 'profile' || (index <= pathSteps.findIndex(s => s.id === activeStep))}
                      isActive={step.id === activeStep}
                      onClick={() => handleStepClick(step.id)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-secondary/30 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-medium mb-2">Next Step: Upskilling</h3>
                <p className="mb-4">Enhance your skills through targeted courses and practical exercises tailored to your career goals.</p>
                <Button 
                  className="gradient-button"
                  onClick={() => navigate('/upskilling')}
                >
                  Start Upskilling <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <ProfileSummary />
        </div>
      </div>
    </div>
  );
};

export default TargetPath;
