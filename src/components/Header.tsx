import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Menu,
  X,
  MapPin,
  Phone,
  Heart,
  Users,
  Calendar,
  HelpCircle,
  MessageSquare,
  Search
} from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: MapPin },
    { name: 'Centers', href: '/centers', icon: Heart },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
    { name: 'Contact', href: '/feedback', icon: MessageSquare },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              {/* <Heart className="h-6 w-6 text-white" /> */}
              {}
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-primary leading-tight">
                IRCA Karnataka
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                Rehabilitation Centres
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    location.pathname === item.href
                      ? 'text-primary bg-primary/10 shadow-sm'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Emergency Helpline */}
          <div className="hidden lg:flex items-center space-x-4 ml-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-warning/10 rounded-lg">
              <Phone className="h-5 w-5 text-warning animate-bounce-gentle" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-medium">Emergency</span>
                <span className="text-sm font-bold text-warning">
                  1800-XXX-XXXX
                </span>
              </div>
            </div>
            <Badge variant="warning" className="animate-pulse-slow font-semibold">
              24/7 Active
            </Badge>
          </div>

          {/* Mobile Emergency Button */}
          <div className="lg:hidden mr-2">
            <Button size="sm" className="bg-warning hover:bg-warning/90 text-white animate-pulse-slow font-semibold">
              <Phone className="h-4 w-4 mr-1" />
              Help
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-primary/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium text-warning">
                      1800-XXX-XXXX
                    </span>
                  </div>
                  <Badge variant="warning" className="text-xs">
                    24/7 Helpline
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
