import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
  Search,
  MapPin,
  Phone,
  Heart,
  Users,
  Clock,
  Star,
  Bed,
  Navigation,
  Filter,
  ArrowRight,
  Map,
  Calendar,
  ChevronDown,
  Building,
  Hospital,
  User
} from 'lucide-react';
import {
  ircas_government,
  ircas_private,
  hospitals_gov,
  hospitals_private,
  psychiatrists
} from '../data/centers';
import { getDistrictNames } from '../data/karnatakaData';
import MapComponent from '../components/MapComponent';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const allFacilities = useMemo(() => [
    ...ircas_government.map(center => ({ ...center, type: 'irca', category: 'government' })),
    ...ircas_private.map(center => ({ ...center, type: 'irca', category: 'private' })),
    ...hospitals_gov.map(hospital => ({ ...hospital, type: 'hospital', category: 'government' })),
    ...hospitals_private.map(hospital => ({ ...hospital, type: 'hospital', category: 'private' })),
    ...psychiatrists.map(psychiatrist => ({ ...psychiatrist, type: 'psychiatrist', category: null }))
  ], []);

  const filteredAndSortedCenters = useMemo(() => {
    let filtered = allFacilities;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(center => {
        const nameToSearch = (center as any).name || (center as any).hospital || (center as any).city || '';
        const districtToSearch = (center as any).district || (center as any).city?.split(',')[0].trim() || '';
        const addressToSearch = (center as any).address || (center as any).details || (center as any).affiliation || '';
        return nameToSearch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                districtToSearch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                addressToSearch.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Filter by district
    if (selectedDistrict !== 'all') {
      filtered = filtered.filter(center =>
        (center as any).district === selectedDistrict ||
        ((center as any).city && (center as any).city.includes(selectedDistrict))
      );
    }

    // Sort centers
    filtered.sort((a, b) => {
      const aName = (a as any).name || (a as any).hospital || (a as any).city || '';
      const bName = (b as any).name || (b as any).hospital || (b as any).city || '';
      switch (sortBy) {
        case 'name':
          return aName.localeCompare(bName);
        case 'district':
          const aDistrict = (a as any).district || ((a as any).city?.split(',')[0].trim()) || '';
          const bDistrict = (b as any).district || ((b as any).city?.split(',')[0].trim()) || '';
          return aDistrict.localeCompare(bDistrict);
        case 'beds':
          return ((b as any).beds || 0) - ((a as any).beds || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedDistrict, sortBy, allFacilities]);

  const districts = useMemo(() => getDistrictNames(), []);
  const stats = useMemo(() => ({
    centers: allFacilities.length,
    beds: allFacilities.reduce((total, center) => total + ((center as any).beds || 0), 0),
    districts: districts.length,
  }), [allFacilities]);

  // Close dropdown when clicking outside
  const handleClickOutside = (e: React.MouseEvent) => {
    if (!(e.target as Element).closest('.dropdown-container')) {
      setDropdownOpen(null);
    }
  };

  return (
    <div className="min-h-screen bg-background" onClick={handleClickOutside}>
      {/* Hero Section */}
      <section className="relative hero-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-transparent"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <Badge className="bg-white/25 text-white border border-white/40 backdrop-blur-sm font-semibold px-4 py-1.5 w-fit">
                  🏛️ Government of Karnataka Initiative
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-tight tracking-tight">
                  Rebuilding Lives,
                  <br />
                  <span className="bg-gradient-to-r from-accent via-accent to-secondary bg-clip-text text-transparent">One Step at a Time</span>
                </h1>
                <p className="text-lg lg:text-xl text-white/95 max-w-2xl leading-relaxed font-light">
                  Karnataka's comprehensive network of rehabilitation centers, hospitals, and psychiatrists, providing compassionate care and evidence-based treatment across the state.
                </p>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-xl">
                <div className="text-4xl font-bold mb-3 text-white">{stats.centers}</div>
                <div className="text-white/80 font-medium">Active Centers</div>
              </div>
              <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-xl">
                <div className="text-4xl font-bold mb-3 text-white">{stats.beds}+</div>
                <div className="text-white/80 font-medium">Treatment Beds</div>
              </div>
              <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-xl">
                <div className="text-4xl font-bold mb-3 text-white">{stats.districts}</div>
                <div className="text-white/80 font-medium">Districts Covered</div>
              </div>
              <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-xl">
                <div className="text-4xl font-bold mb-3 text-white">24/7</div>
                <div className="text-white/80 font-medium">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Explore Karnataka Districts
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our interactive map to locate rehabilitation centers, hospitals, and psychiatrists across Karnataka.
              Click on markers to view facility details and get directions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative">
              <MapComponent className="h-[500px] lg:h-[600px] rounded-xl shadow-lg border border-border relative z-10" />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Map Legend
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span className="text-sm">Active Centers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm">Government Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span className="text-sm">24/7 Available</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Centers</span>
                    <span className="font-bold text-primary">{stats.centers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Available Beds</span>
                    <span className="font-bold text-success">{stats.beds}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Districts</span>
                    <span className="font-bold text-warning">{stats.districts}</span>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full btn-primary" size="lg">
                <Map className="mr-2 h-4 w-4" />
                View Full Map
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-bold text-primary mb-2">Find Your Center</h3>
              <p className="text-muted-foreground">Search and filter rehabilitation centers across Karnataka</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Search by center name, district, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 border-2 border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="h-12 border-2 border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="All Districts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {districts.map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 border-2 border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="district">District</SelectItem>
                  <SelectItem value="beds">Bed Capacity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <p className="text-sm font-medium text-foreground">
                  Showing <span className="font-bold text-primary">{filteredAndSortedCenters.length}</span> of <span className="font-bold text-primary">{allFacilities.length}</span> facilities
                </p>
              </div>
              <Button className="btn-primary font-semibold shadow-md hover:shadow-lg transition-all">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Centers Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-block mb-4">
              <Badge className="bg-primary/10 text-primary border border-primary/20 font-semibold">Our Network</Badge>
            </div>
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Healthcare Facilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Discover our comprehensive network of rehabilitation centers, hospitals, and psychiatrists across Karnataka,
              each providing specialized care and support for addiction recovery and mental health services.
            </p>
          </div>

          {filteredAndSortedCenters.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">No centers found</h3>
              <p className="text-muted-foreground text-lg">
                Try adjusting your search criteria or browse all centers.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedCenters.map((center, index) => (
                <Card
                  key={center.id}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border border-border hover:border-primary/30 overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <CardHeader className="pb-4 relative">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-heading text-primary line-clamp-2 group-hover:text-primary/80 transition-colors">
                          {(center as any).name || (center as any).hospital || (center as any).city}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-3 bg-secondary/10 text-secondary border-secondary/20 font-medium">
                          📍 {(center as any).district || ((center as any).city?.split(',')[0].trim())}
                        </Badge>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {center.type === 'irca' ? 'IRCA Center' : center.type === 'hospital' ? 'Hospital' : 'Psychiatrist'}
                        </Badge>
                      </div>
                      {(center as any).verified && (
                        <Badge variant="success" className="text-xs font-bold bg-success/10 text-success border-success/20">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-5 relative">
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {(center as any).address || (center as any).details || (center as any).affiliation}
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-3 px-3 bg-background/50 rounded-lg border border-border/50">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Bed className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium">Capacity</p>
                          <p className="text-sm font-bold text-primary">{(center as any).beds || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-warning/10 rounded-lg">
                          <Star className="h-4 w-4 text-warning" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium">Type</p>
                          <p className="text-sm font-bold text-warning">{center.category || 'Specialist'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button asChild className="flex-1 btn-primary font-semibold shadow-md hover:shadow-lg transition-all group-hover:scale-105">
                        <Link to={`/center/${center.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="icon" className="btn-secondary font-semibold shadow-md hover:shadow-lg transition-all">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-20 bg-gradient-to-b from-white to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <Badge className="bg-secondary/10 text-secondary border border-secondary/20 font-semibold">Success Stories</Badge>
            </div>
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Stories of Hope & Recovery
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Real stories from individuals who have successfully overcome addiction
              and rebuilt their lives through our IRCA centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ravi Kumar",
                recovery: "3 years sober",
                quote: "The compassionate care and evidence-based treatment at the IRCA center gave me a second chance at life. The staff became like family to me.",
                location: "Bengaluru Urban"
              },
              {
                name: "Priya Sharma",
                recovery: "18 months clean",
                quote: "I was skeptical at first, but the comprehensive approach combining medical treatment with counseling helped me address both physical and emotional aspects of addiction.",
                location: "Mysuru"
              },
              {
                name: "Anonymous",
                recovery: "5 years in recovery",
                quote: "The aftercare support and community connections I built through the IRCA program have been crucial to maintaining my sobriety. I'm grateful every day.",
                location: "Dakshina Kannada"
              }
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border border-border hover:border-secondary/30 overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardContent className="p-8 relative">
                  <div className="flex items-center space-x-1 mb-6">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="h-5 w-5 text-warning fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-foreground mb-8 italic leading-relaxed text-lg">
                    "
                    {testimonial.quote}
                    "
                  </blockquote>

                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-primary text-lg">{testimonial.name}</p>
                        <p className="text-sm text-success font-semibold mt-1">🌟 {testimonial.recovery}</p>
                      </div>
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 font-medium text-xs">
                        📍 {testimonial.location}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="btn-primary font-semibold shadow-lg hover:shadow-xl px-8 py-6 text-base">
              <Link to="/feedback">
                💬 Share Your Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Events Calendar Preview Section */}
      <section className="py-20 bg-gradient-to-b from-background to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-4">
                <Badge className="bg-primary/10 text-primary border border-primary/20 font-semibold">Events</Badge>
              </div>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                Upcoming Events & Workshops
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Join our educational workshops, awareness camps, and support group meetings
                designed to promote recovery and community support across Karnataka.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "Substance Abuse Prevention Workshop",
                    date: "Jan 15, 2024",
                    location: "Bengaluru Urban",
                    type: "Workshop"
                  },
                  {
                    title: "Recovery Support Group Meeting",
                    date: "Jan 18, 2024",
                    location: "Mysuru",
                    type: "Support Group"
                  },
                  {
                    title: "Mental Health Awareness Camp",
                    date: "Jan 20, 2024",
                    location: "Dakshina Kannada",
                    type: "Awareness Camp"
                  }
                ].map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">{event.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {event.date}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <Badge variant={event.type === 'Workshop' ? 'default' : event.type === 'Support Group' ? 'success' : 'warning'}>
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>

              <Button asChild className="btn-primary">
                <Link to="/events">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold text-primary mb-6 text-center">
                This Month's Highlights
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">15</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Prevention Workshop</p>
                      <p className="text-xs text-muted-foreground">Bengaluru</p>
                    </div>
                  </div>
                  <Badge variant="success" className="text-xs">Free</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">18</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Support Group</p>
                      <p className="text-xs text-muted-foreground">Mysuru</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">Weekly</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">20</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Awareness Camp</p>
                      <p className="text-xs text-muted-foreground">Mangalore</p>
                    </div>
                  </div>
                  <Badge variant="warning" className="text-xs">All Day</Badge>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Want to stay updated?
                  </p>
                  <Button variant="outline" size="sm" className="w-full btn-primary">
                    Subscribe to Newsletter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Government Info Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="bg-white/20 text-white border border-white/30 font-semibold mb-4">Government Initiative</Badge>
                <h2 className="text-4xl font-heading font-bold mb-6 leading-tight">
                  Government Partnership
                </h2>
              </div>
              
              <p className="text-lg text-white/90 leading-relaxed">
                Our centers are established under the Ministry of Social Justice and Empowerment,
                Government of India, in partnership with the Government of Karnataka.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-white">NAPDDR Funded</p>
                    <p className="text-white/80 text-sm">Funded by National Action Plan for Drug Demand Reduction</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-white">State Regulated</p>
                    <p className="text-white/80 text-sm">Licensed and monitored by state health authorities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-white">International Standards</p>
                    <p className="text-white/80 text-sm">Follow international standards for addiction treatment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-10 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h3 className="text-2xl font-heading font-bold mb-8 text-white">Quick Access</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start text-left bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg px-4 py-3 transition-all duration-200">
                  <Heart className="mr-3 h-5 w-5" />
                  Treatment Guidelines
                </Button>
                <Button className="w-full justify-start text-left bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg px-4 py-3 transition-all duration-200">
                  <Users className="mr-3 h-5 w-5" />
                  Success Stories
                </Button>
                <Button className="w-full justify-start text-left bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg px-4 py-3 transition-all duration-200">
                  <Phone className="mr-3 h-5 w-5" />
                  Emergency Protocols
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
