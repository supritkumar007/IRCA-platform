import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground border-t border-primary-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">IRCA Karnataka</h3>
                <p className="text-xs text-primary-foreground/70 font-medium">
                  Rehabilitation Centres
                </p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Government of Karnataka's network of 33 rehabilitation centers providing comprehensive
              care and support for addiction recovery across the state.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" className="bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" className="bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" className="bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" className="bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-bold">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-sm text-primary-foreground/80 hover:text-white font-medium transition-colors duration-200 flex items-center group">
                <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Find a Center
              </Link>
              <Link to="/events" className="text-sm text-primary-foreground/80 hover:text-white font-medium transition-colors duration-200 flex items-center group">
                <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Upcoming Events
              </Link>
              <Link to="/faq" className="text-sm text-primary-foreground/80 hover:text-white font-medium transition-colors duration-200 flex items-center group">
                <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                FAQ & Resources
              </Link>
              <Link to="/feedback" className="text-sm text-primary-foreground/80 hover:text-white font-medium transition-colors duration-200 flex items-center group">
                <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-bold">Services</h4>
            <div className="flex flex-col space-y-3">
              <span className="text-sm text-primary-foreground/80 hover:text-white font-medium transition-colors duration-200 flex items-center group cursor-pointer">
                <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Detoxification
              </span>
              <span className="text-sm text-primary-foreground/80 hover:text-white font-medium transition-colors duration-200 flex items-center group cursor-pointer">
                <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Counseling
              </span>
              <span className="text-sm text-primary-foreground/80 hover:text-white font-medium transition-colors duration-200 flex items-center group cursor-pointer">
                <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Therapy Programs
              </span>
              <span className="text-sm text-primary-foreground/80 hover:text-white font-medium transition-colors duration-200 flex items-center group cursor-pointer">
                <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Rehabilitation
              </span>
              <span className="text-sm text-primary-foreground/80 hover:text-white font-medium transition-colors duration-200 flex items-center group cursor-pointer">
                <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Aftercare Support
              </span>
              <span className="text-sm text-primary-foreground/80 hover:text-white font-medium transition-colors duration-200 flex items-center group cursor-pointer">
                <span className="inline-block w-1.5 h-1.5 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Family Counseling
              </span>
            </div>
          </div>

          {/* Contact & Emergency */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-bold">Contact & Emergency</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <Phone className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Emergency Helpline</p>
                  <p className="text-sm text-primary-foreground/80 font-medium">1800-XXX-XXXX</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <Mail className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Email Support</p>
                  <p className="text-sm text-primary-foreground/80 font-medium">support@ircakarnataka.gov.in</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <MapPin className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">State Office</p>
                  <p className="text-sm text-primary-foreground/80 font-medium">Bengaluru, Karnataka</p>
                </div>
              </div>
            </div>
            <Badge className="w-fit bg-warning/20 text-warning border border-warning/30 font-semibold">
              🔴 24/7 Available
            </Badge>
          </div>
        </div>

        {/* Government Branding */}
        <div className="py-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm font-medium">
                <Globe className="h-5 w-5" />
                <span>Government of Karnataka</span>
              </div>
              <Badge className="bg-white/10 border border-white/20 text-white font-semibold">
                Ministry of Social Justice
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm font-medium">
              <button className="text-primary-foreground/80 hover:text-white transition-colors">ಕನ್ನಡ</button>
              <span className="text-primary-foreground/40">|</span>
              <button className="text-primary-foreground/80 hover:text-white transition-colors">English</button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-sm text-primary-foreground/80 font-medium">
              © {currentYear} Government of Karnataka. All rights reserved.
            </p>
            <div className="flex space-x-8 text-sm text-primary-foreground/80 font-medium">
              <Link to="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="hover:text-white transition-colors duration-200">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
