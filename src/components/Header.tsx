/**
 * Karnataka IRCA Centers - Fixed Cascading Dropdown with Smart Navigation
 * - Scrollable Level 1 & 2
 * - Level 4 always fully visible with conditional redirects
 * - 0% gutter
 *
 * LEVEL 4 NAVIGATION LOGIC:
 * - If facility count === 1: Direct redirect to /center/{id}
 * - If facility count > 1: Redirect to listing page with filters
 *
 * CARD ALTERNATION LOGIC:
 * - Cards alternate left/right image placement for visual variety
 * - One card per row layout for better readability
 * - Parallax background effects for modern interactivity
 *
 * To update navigation logic:
 * 1. Modify the Link href in level 4 dropdown based on count checks
 * 2. Ensure facility counts in karnatakaData.ts are accurate
 * 3. Update center IDs in data files when adding new facilities
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Menu,
  X,
  MapPin,
  Phone,
  Calendar,
  HelpCircle,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { karnatakaDistricts, hasFacilities } from '../data/karnatakaData';
import { filterCenters } from '../data/centers';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [hoveredTaluka, setHoveredTaluka] = useState<string | null>(null);
  const [hoveredVillage, setHoveredVillage] = useState<string | null>(null);
  const location = useLocation();

  const districtRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const talukaRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const villageRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const [positions, setPositions] = useState({
    district: { top: 0, left: 0 },
    taluka: { top: 0, left: 0 },
    village: { top: 0, left: 0 }
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculatePosition = (ref: HTMLButtonElement | null) => {
    if (!ref) return { top: 0, left: 0 };
    const rect = ref.getBoundingClientRect();
    return { top: rect.top, left: rect.right };
  };

  useEffect(() => {
    if (hoveredDistrict && districtRefs.current[hoveredDistrict]) {
      setPositions(prev => ({ ...prev, district: calculatePosition(districtRefs.current[hoveredDistrict]) }));
    }
  }, [hoveredDistrict]);

  useEffect(() => {
    if (hoveredTaluka && talukaRefs.current[hoveredTaluka]) {
      setPositions(prev => ({ ...prev, taluka: calculatePosition(talukaRefs.current[hoveredTaluka]) }));
    }
  }, [hoveredTaluka]);

  useEffect(() => {
    if (hoveredVillage && villageRefs.current[hoveredVillage]) {
      setPositions(prev => ({ ...prev, village: calculatePosition(villageRefs.current[hoveredVillage]) }));
    }
  }, [hoveredVillage]);

  const clearAllTimeouts = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const closeAll = () => {
    setHoveredDistrict(null);
    setHoveredTaluka(null);
    setHoveredVillage(null);
    setDropdownOpen(false);
  };

  const delayedClose = () => {
    clearAllTimeouts();
    timeoutRef.current = setTimeout(closeAll, 300);
  };

  const keepOpen = () => {
    clearAllTimeouts();
  };

  const navigation = [
    { name: 'Home', href: '/', icon: MapPin },
    { name: 'Districts', href: '#', icon: MapPin, dropdown: true, districts: karnatakaDistricts },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
    { name: 'Contact', href: '/feedback', icon: MessageSquare },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-border">
      <div className="max-w-full mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md p-1">
              <img src="/src/images/kargovlogo2.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">IRCA Karnataka</h1>
              <p className="text-xs text-muted-foreground">Rehabilitation Centres</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              if (item.dropdown) {
                return (
                  <div key={item.name} className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      onMouseEnter={() => setDropdownOpen(true)}
                      className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        dropdownOpen ? 'text-primary bg-primary/10' : 'hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                      <ChevronDown className="h-3 w-3" />
                    </button>

                    {dropdownOpen && (
                      <div
                        className="fixed inset-0 z-40"
                        onMouseEnter={keepOpen}
                        onMouseLeave={delayedClose}
                      >
                        {/* Invisible hover corridor */}
                        <div className="absolute top-20 left-0 w-full h-full" />

                        {/* Level 1: Districts - Scrollable */}
                        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white rounded-lg shadow-xl border z-50 p-2 max-h-96 overflow-y-auto">
                          {item.districts?.map((district) => (
                            <button
                              key={district.name}
                              ref={(el) => (districtRefs.current[district.name] = el)}
                              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                hoveredDistrict === district.name
                                  ? 'bg-primary/10 text-primary font-semibold'
                                  : 'hover:bg-primary/5'
                              }`}
                              onMouseEnter={() => {
                                keepOpen();
                                setHoveredDistrict(district.name);
                                setHoveredTaluka(null);
                                setHoveredVillage(null);
                              }}
                            >
                              {district.name}
                            </button>
                          ))}
                        </div>

                        {/* Level 2: Talukas - Scrollable */}
                        {hoveredDistrict && positions.district.left > 0 && (
                          <div
                            className="absolute bg-white rounded-lg shadow-xl border z-50 p-2 w-64 max-h-96 overflow-y-auto"
                            style={{
                              top: Math.min(positions.district.top, window.innerHeight - 400),
                              left: positions.district.left
                            }}
                            onMouseEnter={keepOpen}
                          >
                            {item.districts?.find(d => d.name === hoveredDistrict)?.talukas.map((taluka) => (
                              <button
                                key={taluka.name}
                                ref={(el) => (talukaRefs.current[taluka.name] = el)}
                                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                  hoveredTaluka === taluka.name
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'hover:bg-primary/5'
                                }`}
                                onMouseEnter={() => {
                                  keepOpen();
                                  setHoveredTaluka(taluka.name);
                                  setHoveredVillage(null);
                                }}
                              >
                                {taluka.name}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Level 3: Villages - Scrollable */}
                        {hoveredTaluka && positions.taluka.left > 0 && (
                          <div
                            className="absolute bg-white rounded-lg shadow-xl border z-50 p-2 w-64 max-h-96 overflow-y-auto"
                            style={{
                              top: Math.min(positions.taluka.top, window.innerHeight - 400),
                              left: positions.taluka.left
                            }}
                            onMouseEnter={keepOpen}
                          >
                            {item.districts
                              ?.find(d => d.name === hoveredDistrict)
                              ?.talukas.find(t => t.name === hoveredTaluka)
                              ?.villages.filter(hasFacilities)
                              .map((village) => (
                                <button
                                  key={village.name}
                                  ref={(el) => (villageRefs.current[village.name] = el)}
                                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                    hoveredVillage === village.name
                                      ? 'bg-primary/10 text-primary font-semibold'
                                      : 'hover:bg-primary/5'
                                  }`}
                                  onMouseEnter={() => {
                                    keepOpen();
                                    setHoveredVillage(village.name);
                                  }}
                                >
                                  {village.name}
                                </button>
                              ))}
                          </div>
                        )}

                        {/* Level 4: Services - Always Fully Visible */}
                        {hoveredVillage && positions.village.left > 0 && (
                          <div
                            className="absolute bg-white rounded-lg shadow-xl border z-50 p-3 w-64 max-h-96 overflow-y-auto"
                            style={{
                              top: Math.min(positions.village.top, window.innerHeight - 500),
                              left: Math.min(positions.village.left, window.innerWidth - 280),
                              maxHeight: window.innerHeight - 100
                            }}
                            onMouseEnter={keepOpen}
                          >
                            {(() => {
                              const villageData = item.districts
                                ?.find(d => d.name === hoveredDistrict)
                                ?.talukas.find(t => t.name === hoveredTaluka)
                                ?.villages.find(v => v.name === hoveredVillage);
                              if (!villageData) return null;

                              const district = hoveredDistrict!;
                              const taluk = hoveredTaluka!;
                              const village = hoveredVillage!;

                              const getSingleId = (type: 'irca' | 'hospital' | 'psychiatrist', cat?: 'government' | 'private') => {
                                const res = filterCenters({ district, taluk, village, serviceType: type, category: cat });
                                return res.length === 1 ? res[0].id : null;
                              };

                              return (
                                <div className="space-y-3">
                                  <div className="font-semibold text-primary text-center border-b pb-2">{village}</div>

                                  {/* IRCA */}
                                  {(villageData.facilities.governmentIRCA > 0 || villageData.facilities.privateIRCA > 0) && (
                                    <div className="space-y-2">
                                      <div className="text-xs font-semibold text-muted-foreground uppercase">IRCA Centers</div>
                                      {villageData.facilities.governmentIRCA > 0 && (
                                        <Link
                                          to={villageData.facilities.governmentIRCA === 1
                                            ? `/center/${getSingleId('irca', 'government')}`
                                            : `/centers/government?district=${district}&taluk=${taluk}&village=${village}`}
                                          className="flex justify-between text-green-600 hover:bg-green-50 px-3 py-2 rounded"
                                          onClick={closeAll}
                                        >
                                          <span>Government</span>
                                          <Badge className="bg-green-100 text-green-800">{villageData.facilities.governmentIRCA}</Badge>
                                        </Link>
                                      )}
                                      {villageData.facilities.privateIRCA > 0 && (
                                        <Link
                                          to={villageData.facilities.privateIRCA === 1
                                            ? `/center/${getSingleId('irca', 'private')}`
                                            : `/centers/private?district=${district}&taluk=${taluk}&village=${village}`}
                                          className="flex justify-between text-blue-600 hover:bg-blue-50 px-3 py-2 rounded"
                                          onClick={closeAll}
                                        >
                                          <span>Private</span>
                                          <Badge className="bg-blue-100 text-blue-800">{villageData.facilities.privateIRCA}</Badge>
                                        </Link>
                                      )}
                                    </div>
                                  )}

                                  {/* Hospitals */}
                                  {(villageData.facilities.governmentHospital > 0 || villageData.facilities.privateHospital > 0) && (
                                    <div className="space-y-2">
                                      <div className="text-xs font-semibold text-muted-foreground uppercase">Hospitals</div>
                                      {villageData.facilities.governmentHospital > 0 && (
                                        <Link
                                          to={villageData.facilities.governmentHospital === 1
                                            ? `/center/${getSingleId('hospital', 'government')}`
                                            : `/hospitals/government?district=${district}&taluk=${taluk}&village=${village}`}
                                          className="flex justify-between text-green-600 hover:bg-green-50 px-3 py-2 rounded"
                                          onClick={closeAll}
                                        >
                                          <span>Government</span>
                                          <Badge className="bg-green-100 text-green-800">{villageData.facilities.governmentHospital}</Badge>
                                        </Link>
                                      )}
                                      {villageData.facilities.privateHospital > 0 && (
                                        <Link
                                          to={villageData.facilities.privateHospital === 1
                                            ? `/center/${getSingleId('hospital', 'private')}`
                                            : `/hospitals/private?district=${district}&taluk=${taluk}&village=${village}`}
                                          className="flex justify-between text-orange-600 hover:bg-orange-50 px-3 py-2 rounded"
                                          onClick={closeAll}
                                        >
                                          <span>Private</span>
                                          <Badge className="bg-orange-100 text-orange-800">{villageData.facilities.privateHospital}</Badge>
                                        </Link>
                                      )}
                                    </div>
                                  )}

                                  {/* Psychiatrists */}
                                  {villageData.facilities.psychiatrist > 0 && (
                                    <div className="space-y-2">
                                      <div className="text-xs font-semibold text-muted-foreground uppercase">Psychiatrists</div>
                                      <Link
                                        to={villageData.facilities.psychiatrist === 1
                                          ? `/center/${getSingleId('psychiatrist')}`
                                          : `/psychiatrists?district=${district}&taluk=${taluk}&village=${village}`}
                                        className="flex justify-between text-purple-600 hover:bg-purple-50 px-3 py-2 rounded"
                                        onClick={closeAll}
                                      >
                                        <span>Available</span>
                                        <Badge className="bg-purple-100 text-purple-800">{villageData.facilities.psychiatrist}</Badge>
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    location.pathname === item.href
                      ? 'text-primary bg-primary/10'
                      : 'hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Emergency & Mobile */}
          <div className="hidden xl:flex items-center space-x-4 ml-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-warning/10 rounded-lg">
              <Phone className="h-5 w-5 text-warning" />
              <div>
                <span className="text-xs text-muted-foreground">Emergency</span>
                <span className="text-sm font-bold text-warning block">1800-XXX-XXXX</span>
              </div>
            </div>
            <Badge variant="warning">24/7</Badge>
          </div>

          <div className="lg:hidden mr-2">
            <Button size="sm" className="bg-warning hover:bg-warning/90 text-white">
              <Phone className="h-4 w-4 mr-1" /> Help
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w--6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 border-t">
            {navigation.map((item) => {
              const Icon = item.icon;
              if (item.dropdown) {
                return (
                  <div key={item.name} className="px-3 py-2 text-base font-medium text-muted-foreground">
                    <Icon className="h-5 w-5 inline mr-2" />
                    {item.name}
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-muted-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;