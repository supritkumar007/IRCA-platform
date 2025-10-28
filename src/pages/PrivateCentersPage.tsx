import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Building, MapPin, Phone, Bed, Star } from 'lucide-react';
import { filterCenters } from '../data/centers';

const PrivateCentersPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredCenters, setFilteredCenters] = useState<any[]>([]);

  useEffect(() => {
    const district = searchParams.get('district');
    const taluk    = searchParams.get('taluk');
    const village  = searchParams.get('village');

    const results = filterCenters({
      district: district || undefined,
      taluk:    taluk    || undefined,
      village:  village  || undefined,
      serviceType: 'irca',
      category:    'private'
    });

    setFilteredCenters(results);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-secondary to-secondary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </div>
          <div className="text-center">
            <Badge className="bg-white/20 text-white border border-white/40 mb-4">Private Facilities</Badge>
            <h1 className="text-4xl font-heading font-bold mb-4">Private IRCAs</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Premium private rehabilitation centers offering specialized care,
              luxury amenities, and comprehensive recovery programs.
            </p>
            {searchParams.get('district') && (
              <div className="mt-4">
                <Badge className="bg-white/10 text-white border border-white/30">
                  Filtered by: {searchParams.get('district')}
                  {searchParams.get('taluk') && ` > ${searchParams.get('taluk')}`}
                  {searchParams.get('village') && ` > ${searchParams.get('village')}`}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Centers Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCenters.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">No Private IRCAs Found</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  No private IRCAs match your current filter criteria.
                </p>
                <Button asChild>
                  <Link to="/centers/private">View All Private IRCAs</Link>
                </Button>
              </div>
            ) : (
              filteredCenters.map((center) => (
                <Card key={center.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-heading text-secondary mb-2">
                        {center.name}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                        📍 {center.district}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs font-bold border-secondary text-secondary">
                      Private
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{center.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <Building className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Services</p>
                        <p className="text-sm font-bold text-secondary">{center.services}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 px-3 bg-background/50 rounded-lg border border-border/50">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <Bed className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Beds</p>
                        <p className="text-sm font-bold text-secondary">{center.beds}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-warning/10 rounded-lg">
                        <Star className="h-4 w-4 text-warning" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Status</p>
                        <p className="text-sm font-bold text-warning">Premium</p>
                      </div>
                    </div>
                  </div>

                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                    <Link to={`/center/${center.id}`}>
                      View Details
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Link>
                  </Button>
                </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivateCentersPage;