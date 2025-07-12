import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import user1 from '@/assets/user1.jpg';
import user2 from '@/assets/user2.jpg';
import user3 from '@/assets/user3.jpg';
import user4 from '@/assets/user4.jpg';

const Testimonials = () => {
  const users = [
    { id: 1, image: user1, name: "Alex Chen" },
    { id: 2, image: user2, name: "Sarah Johnson" },
    { id: 3, image: user3, name: "Michael Rodriguez" },
    { id: 4, image: user4, name: "Emily Taylor" }
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Join the Thriving Community of Developers Using GitDocify
          </h2>
          <p className="text-xl text-text-secondary mb-12">
            Trusted by developers globally.
          </p>
          
          <div className="flex justify-center items-center space-x-4 mb-12">
            {users.map((user, index) => (
              <div 
                key={user.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={user.image} 
                  alt={`Developer ${user.name}`}
                  className="w-16 h-16 rounded-full border-2 border-border-subtle hover:border-primary transition-colors duration-300 hover:scale-110 transform"
                />
              </div>
            ))}
            <div className="text-text-secondary text-2xl font-light ml-4">
              +1000s more
            </div>
          </div>
          
          <Button variant="hero" size="xl" className="group">
            Join the Wave
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-lg text-primary mt-4 font-medium">
            Elevate your projects
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;