import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Bed,
  Users,
  Calendar,
  Award,
  Shield,
  Heart,
  ArrowLeft,
  ExternalLink,
  Navigation,
  Mail,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { getCenterById } from '../data/centers';

const CenterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const center = getCenterById(parseInt(id || '1'));

  if (!center) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-b from-background to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6">
            <AlertCircle className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Center Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            The rehabilitation center you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="btn-primary shadow-lg font-semibold">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Centers
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedCenters: any[] = [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-white to-background shadow-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" asChild className="border-2 hover:bg-primary/5 font-semibold">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Centers
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-2 hover:bg-primary/5 font-semibold">
                <Heart className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button className="btn-primary shadow-md font-semibold">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4 leading-tight">
                      {center?.name || center?.hospital || center?.specialty}
                    </h1>
                    <div className="flex items-center space-x-3 mb-6">
                      <Badge className="bg-secondary/10 text-secondary border-secondary/20 font-semibold px-3 py-1">📍 {center?.district}</Badge>
                      <Badge className="bg-success/10 text-success border-success/20 font-semibold px-3 py-1">
                        <Shield className="mr-1 h-3 w-3" />
                        ✓ Verified
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-foreground text-lg leading-relaxed">
                  {center?.address || center?.city || center?.affiliation}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-primary/5 rounded-lg">
                    <Bed className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">{center?.beds || 'N/A'} beds</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-primary/5 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Est. 2015</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-warning/10 rounded-lg">
                    <Star className="h-5 w-5 text-warning fill-current" />
                    <span className="font-semibold text-foreground">4.5/5</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-border hover:border-primary/30 transition-all shadow-md">
                <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
                  <CardTitle className="flex items-center text-xl font-heading">
                    <Phone className="mr-2 h-6 w-6 text-warning" />
                    Contact Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Phone</span>
                    <span className="font-bold text-primary">+91 XXXXX XXXXX</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Email</span>
                    <span className="font-bold text-primary text-xs">info@center.org</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                    <span className="text-sm font-medium text-success">Hours</span>
                    <span className="font-bold text-success">24/7</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-border hover:border-secondary/30 transition-all shadow-md">
                <CardHeader className="bg-gradient-to-br from-secondary/5 to-transparent">
                  <CardTitle className="flex items-center text-xl font-heading">
                    <Navigation className="mr-2 h-6 w-6 text-secondary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-6">
                  <Button className="w-full btn-primary shadow-md font-semibold" size="lg">
                    📅 Request Appointment
                  </Button>
                  <Button variant="outline" className="w-full border-2 hover:bg-primary/5 font-semibold" size="lg">
                    🗺️ Get Directions
                  </Button>
                  <Button className="w-full bg-warning hover:bg-warning/90 text-white font-semibold shadow-md" size="lg">
                    🚨 Emergency Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-6 bg-white p-2 rounded-xl shadow-md border border-border">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="testimonials">Reviews</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Info className="mr-2 h-5 w-5" />
                      About This Center
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {center?.name || center?.hospital || center?.specialty} is a government-verified rehabilitation center dedicated to
                      providing comprehensive care for individuals struggling with addiction.
                      Our evidence-based treatment programs are designed to support long-term recovery.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{center?.beds || 'N/A'}</div>
                        <div className="text-sm text-muted-foreground">Treatment Beds</div>
                      </div>
                      <div className="text-center p-4 bg-success/5 rounded-lg">
                        <div className="text-2xl font-bold text-success">24/7</div>
                        <div className="text-sm text-muted-foreground">Medical Support</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">Licensed by Government of Karnataka</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">NAPDDR Accredited Programs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">Experienced Medical Staff</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Success Rate</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Patient Satisfaction</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Years of Service</span>
                        <span className="font-medium">8+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Detoxification & Medical Management",
                    description: "Safe, medically supervised detoxification with 24/7 monitoring",
                    icon: Heart,
                    available: true
                  },
                  {
                    title: "Individual Counseling",
                    description: "One-on-one therapy sessions with licensed counselors",
                    icon: Users,
                    available: true
                  },
                  {
                    title: "Group Therapy",
                    description: "Peer support groups and group counseling sessions",
                    icon: Users,
                    available: true
                  },
                  {
                    title: "Family Support Programs",
                    description: "Counseling and support for family members",
                    icon: Heart,
                    available: true
                  },
                  {
                    title: "Aftercare Planning",
                    description: "Comprehensive discharge planning and follow-up care",
                    icon: Calendar,
                    available: true
                  },
                  {
                    title: "Vocational Training",
                    description: "Skill development and employment assistance",
                    icon: Award,
                    available: false
                  }
                ].map((service, index) => (
                  <Card key={index} className={`transition-all ${service.available ? 'hover:shadow-md' : 'opacity-60'}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <service.icon className={`mr-2 h-5 w-5 ${service.available ? 'text-success' : 'text-muted-foreground'}`} />
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {service.description}
                      </p>
                      <Badge variant={service.available ? "success" : "secondary"}>
                        {service.available ? "Available" : "Coming Soon"}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Facility Photo</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Staff Tab */}
            <TabsContent value="staff" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Dr. Priya Sharma", role: "Medical Director", qualification: "MD, Psychiatry" },
                  { name: "Rajesh Kumar", role: "Senior Counselor", qualification: "MSW, Certified Addiction Counselor" },
                  { name: "Dr. Anita Patel", role: "Clinical Psychologist", qualification: "PhD, Clinical Psychology" },
                  { name: "Suresh Reddy", role: "Therapy Coordinator", qualification: "MA, Psychology" },
                  { name: "Dr. Vikram Singh", role: "Medical Officer", qualification: "MBBS, DPM" },
                  { name: "Kavita Joshi", role: "Social Worker", qualification: "MSW, Family Therapy" }
                ].map((staff, index) => (
                  <Card key={index}>
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{staff.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-2">
                      <p className="font-medium text-primary">{staff.role}</p>
                      <p className="text-sm text-muted-foreground">{staff.qualification}</p>
                      <Badge variant="outline">Available</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone Number</p>
                        <p className="text-muted-foreground">+91 XXXXX XXXXX</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email Address</p>
                        <p className="text-muted-foreground">info@{center?.name?.toLowerCase().replace(/\s+/g, '') || center?.hospital?.toLowerCase().replace(/\s+/g, '') || 'center'}.org</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-muted-foreground">{center?.address || center?.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Operating Hours</p>
                        <p className="text-muted-foreground">24 hours, 7 days a week</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Phone className="h-5 w-5 text-warning" />
                        <span className="font-medium text-warning">Emergency Helpline</span>
                      </div>
                      <p className="text-lg font-bold text-warning">1800-XXX-XXXX</p>
                      <p className="text-sm text-muted-foreground">Available 24/7 for emergencies</p>
                    </div>

                    <Button className="w-full" size="lg">
                      Call Emergency Line
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Anonymous",
                    rating: 5,
                    comment: "The care and support I received here changed my life. The staff is compassionate and professional.",
                    date: "2 months ago"
                  },
                  {
                    name: "Anonymous",
                    rating: 5,
                    comment: "Excellent facilities and medical care. The therapy programs are very effective.",
                    date: "1 month ago"
                  },
                  {
                    name: "Anonymous",
                    rating: 4,
                    comment: "Grateful for the support during my recovery journey. Highly recommend this center.",
                    date: "3 weeks ago"
                  }
                ].map((testimonial, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-1 mb-3">
                        {Array.from({ length: testimonial.rating }, (_, i) => (
                          <Star key={i} className="h-4 w-4 text-warning fill-current" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{testimonial.name}</span>
                        <span className="text-sm text-muted-foreground">{testimonial.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Centers */}
      {relatedCenters.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">
              Other Centers in {center?.district}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCenters.map((relatedCenter: any) => (
                <Card key={relatedCenter.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">
                      {relatedCenter.hospital}
                    </CardTitle>
                    <Badge variant="district">{relatedCenter.city}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {relatedCenter.details}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Bed className="h-4 w-4" />
                        <span>N/A beds</span>
                      </div>
                      <Button size="sm" asChild>
                        <Link to={`/center/${relatedCenter.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CenterDetailPage;
