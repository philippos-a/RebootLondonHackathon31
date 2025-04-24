
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Target Path', path: '/target-path' },
    { name: 'Upskilling', path: '/upskilling' },
    { name: 'CV Builder', path: '/cv-builder' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {routes.map((route) => (
                    <Link 
                      key={route.path} 
                      to={route.path}
                      className="px-4 py-2 rounded-md hover:bg-primary/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {route.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">HarMoney</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {routes.map((route) => (
              <Link 
                key={route.path} 
                to={route.path}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors"
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
