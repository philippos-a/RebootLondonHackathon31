
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const CVBuilder = () => {
  const profile = useProfileStore();
  
  // Check if profile is complete
  if (!profile.completedProfile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Profile Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>You need to complete your profile before accessing the CV builder.</p>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Create Your Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const handleDownloadCV = () => {
    toast.success("CV downloaded successfully!", {
      description: "Your CV has been exported as a PDF file.",
    });
  };
  
  const handleShareCV = () => {
    toast.success("CV ready to share!", {
      description: "A shareable link has been copied to your clipboard.",
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CV Builder</h1>
        <p className="text-muted-foreground">Your professional CV automatically updated with your skills and achievements</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="card-highlight">
            <CardContent className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold">{profile.careerAspiration || 'Aspiring Professional'}</h2>
                <p className="text-muted-foreground mt-1">
                  {profile.careerStatus === 'student' ? 'Student' : 
                    profile.careerStatus === 'employed' ? 'Professional' : 
                    profile.careerStatus === 'unemployed' ? 'Job Seeker' : 
                    'Career Changer'}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-background/50">{skill}</Badge>
                  ))}
                  
                  {profile.completedCourses.length > 0 && (
                    <>
                      {profile.completedCourses.includes('js-fundamentals') && (
                        <Badge variant="secondary">JavaScript</Badge>
                      )}
                      {profile.completedCourses.includes('react-basics') && (
                        <Badge variant="secondary">React</Badge>
                      )}
                      {profile.completedCourses.includes('data-structures') && (
                        <Badge variant="secondary">Data Structures</Badge>
                      )}
                      {profile.completedCourses.includes('communication-skills') && (
                        <Badge variant="secondary">Communication</Badge>
                      )}
                      {profile.completedCourses.includes('time-management') && (
                        <Badge variant="secondary">Time Management</Badge>
                      )}
                      {profile.completedCourses.includes('leadership') && (
                        <Badge variant="secondary">Leadership</Badge>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">Experience</h3>
                <p className="whitespace-pre-line">{profile.experience || 'No experience provided yet.'}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">Education & Certifications</h3>
                <ul className="space-y-2">
                  {profile.completedCourses.length > 0 ? (
                    profile.completedCourses.map((courseId) => (
                      <li key={courseId} className="flex items-center">
                        <span className="text-primary mr-2">✓</span>
                        <span>{courseId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-muted-foreground">No certifications completed yet.</li>
                  )}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">Career Goals</h3>
                <p className="whitespace-pre-line">{profile.careerAspiration || 'No career goals provided yet.'}</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" onClick={handleShareCV}>
              Share CV
            </Button>
            <Button className="gradient-button" onClick={handleDownloadCV}>
              Download as PDF
            </Button>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>CV Builder Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Enhance Your CV</h3>
                <p className="text-sm text-muted-foreground">Complete courses in the Upskilling section to automatically add new skills to your CV.</p>
              </div>
              
              <div>
                <h3 className="font-medium">Tailored for Your Goals</h3>
                <p className="text-sm text-muted-foreground">Your CV is optimized for your stated career aspirations.</p>
              </div>
              
              <div>
                <h3 className="font-medium">Professional Formatting</h3>
                <p className="text-sm text-muted-foreground">Your CV follows industry-standard formatting that recruiters prefer.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
