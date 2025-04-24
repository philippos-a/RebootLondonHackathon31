
import { useState } from 'react';
import { useProfileStore } from '@/store/profileStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCoursesByType } from '@/data/courseData';
import CourseCard from '@/components/CourseCard';

const Upskilling = () => {
  const profile = useProfileStore();
  const [skillType, setSkillType] = useState<'technical' | 'soft'>('technical');
  
  const technicalLearnCourses = getCoursesByType('technical', 'learn');
  const technicalPracticeCourses = getCoursesByType('technical', 'practice');
  const softLearnCourses = getCoursesByType('soft', 'learn');
  const softPracticeCourses = getCoursesByType('soft', 'practice');
  
  // Check if profile is complete
  if (!profile.completedProfile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Profile Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>You need to complete your profile before accessing the upskilling page.</p>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Create Your Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upskilling</h1>
        <p className="text-muted-foreground">Enhance your skills with targeted courses and practical exercises</p>
      </div>
      
      {/* Goal card */}
      <Card className="card-highlight mb-8">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-primary/20 p-3">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Your Goal: {profile.careerAspiration}</h3>
              <p className="text-muted-foreground">These suggested courses and exercises will help you develop the skills needed for your career path.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs for Technical vs Soft Skills */}
      <Tabs defaultValue="technical" className="w-full" onValueChange={(value) => setSkillType(value as 'technical' | 'soft')}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="technical">Technical Skills</TabsTrigger>
          <TabsTrigger value="soft">Soft Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="technical" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Learn section */}
            <div>
              <h2 className="section-title">Learn</h2>
              <div className="grid grid-cols-1 gap-4">
                {technicalLearnCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
            
            {/* Practice section */}
            <div>
              <h2 className="section-title">Practice</h2>
              <div className="grid grid-cols-1 gap-4">
                {technicalPracticeCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="soft" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Learn section */}
            <div>
              <h2 className="section-title">Learn</h2>
              <div className="grid grid-cols-1 gap-4">
                {softLearnCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
            
            {/* Practice section */}
            <div>
              <h2 className="section-title">Practice</h2>
              <div className="grid grid-cols-1 gap-4">
                {softPracticeCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Upskilling;
