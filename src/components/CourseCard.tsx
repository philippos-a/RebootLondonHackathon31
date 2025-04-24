
import { useState } from 'react';
import { Course } from '@/data/courseData';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const { completedCourses, addCompletedCourse } = useProfileStore();
  const isCompleted = completedCourses.includes(course.id);
  const [progress, setProgress] = useState(isCompleted ? 100 : 0);
  
  const handleStartCourse = () => {
    if (isCompleted) return;
    
    // Simulate progress for demo
    setProgress(25);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          addCompletedCourse(course.id);
          toast.success(`Completed ${course.title}!`, {
            description: "This has been added to your profile.",
            action: {
              label: "Share to LinkedIn",
              onClick: () => handleShareToLinkedIn(),
            },
          });
          return 100;
        }
        return prev + 15;
      });
    }, 800);
  };
  
  const handleShareToLinkedIn = () => {
    // In a real app, this would integrate with LinkedIn API
    // For now, we'll just show a success message
    const linkedInText = course.linkedInPostTemplate || 
      `I've just completed ${course.title}! #ContinuousLearning #ProfessionalDevelopment`;
      
    toast.success("LinkedIn post prepared!", {
      description: linkedInText,
    });
  };
  
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="text-2xl mr-2">{course.logo}</div>
          <Badge variant={course.level === 'beginner' ? 'outline' : (course.level === 'intermediate' ? 'secondary' : 'default')}>
            {course.level}
          </Badge>
        </div>
        <CardTitle className="text-lg">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{course.duration}</span>
          <span>{progress}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
      <CardFooter className="pt-0">
        {isCompleted ? (
          <div className="w-full flex justify-between">
            <Button variant="outline" size="sm" className="w-full mr-2" onClick={handleShareToLinkedIn}>
              Share to LinkedIn
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={() => toast.success("CV updated with this skill!")}>
              Add to CV
            </Button>
          </div>
        ) : (
          <Button 
            variant={progress > 0 ? "default" : "outline"} 
            size="sm" 
            className="w-full" 
            onClick={handleStartCourse}
          >
            {progress > 0 ? "Continue" : "Start"} {course.category === 'learn' ? 'Learning' : 'Practice'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
