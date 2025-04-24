
import { useProfileStore } from '@/store/profileStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProfileSummary = () => {
  const profile = useProfileStore();
  
  if (!profile.completedProfile) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Profile Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Complete your profile to see your summary</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full card-highlight animate-fade-in">
      <CardHeader>
        <CardTitle>Your Growth Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-foreground/80">Growth Goal</h3>
          <p className="capitalize">{profile.growthGoal}</p>
        </div>
        
        {profile.growthGoal === 'career' && (
          <>
            <div>
              <h3 className="font-medium text-foreground/80">Career Status</h3>
              <p className="capitalize">{profile.careerStatus?.replace('_', ' ')}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-foreground/80">Career Aspiration</h3>
              <p>{profile.careerAspiration}</p>
            </div>
            
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
            
            <div>
              <h3 className="font-medium text-foreground/80">Current Blockers</h3>
              <p>{profile.blockers}</p>
            </div>
            
            <div className="pt-2">
              <h3 className="font-medium text-foreground/80">Resources</h3>
              <div className="flex gap-4 mt-1">
                <span className={profile.hasCV ? "text-primary" : "text-muted-foreground"}>
                  {profile.hasCV ? "✓ CV Uploaded" : "✗ No CV"}
                </span>
                <span className={profile.hasLinkedIn ? "text-primary" : "text-muted-foreground"}>
                  {profile.hasLinkedIn ? "✓ LinkedIn Connected" : "✗ No LinkedIn"}
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
