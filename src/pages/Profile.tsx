
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
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
            <p>You need to complete your profile first.</p>
            <Button onClick={() => navigate('/')} className="w-full">
              Create Your Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const handleResetProfile = () => {
    profile.resetProfile();
    toast.success("Profile reset successfully", {
      description: "Your profile has been reset. You can now create a new one.",
    });
    navigate('/');
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground">Review and manage your growth profile</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="card-highlight">
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-2 mb-3">Growth Goal</h2>
                <p className="capitalize">{profile.growthGoal}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-2 mb-3">Career Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-foreground/80">Status</h3>
                    <p className="capitalize">{profile.careerStatus?.replace('_', ' ')}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-foreground/80">Aspiration</h3>
                    <p>{profile.careerAspiration}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-2 mb-3">Skills & Experience</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-foreground/80">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-foreground/80">Experience</h3>
                    <p>{profile.experience}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-2 mb-3">Completed Courses</h2>
                {profile.completedCourses.length > 0 ? (
                  <ul className="space-y-2">
                    {profile.completedCourses.map((courseId) => (
                      <li key={courseId} className="flex items-center">
                        <span className="text-primary mr-2">✓</span>
                        <span>{courseId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No courses completed yet.</p>
                )}
              </div>
              
              <div>
                <h2 className="text-lg font-semibold border-b pb-2 mb-3">Current Blockers</h2>
                <p>{profile.blockers}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/target-path')}
              >
                View Your Growth Path
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/cv-builder')}
              >
                Manage Your CV
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/upskilling')}
              >
                Continue Upskilling
              </Button>
              
              <div className="pt-4 border-t mt-4">
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleResetProfile}
                >
                  Reset Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
