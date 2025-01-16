import React, { useState, useEffect } from 'react';
import {
  Package,
  Brain,
  Map,
  TrendingUp,
  BarChart2,
  MessageSquare,
  BookOpen,
  Trophy,
  Globe,
  Share2,
  Wifi,
  AlertTriangle,
  DollarSign,
  Users,
  Layout,
} from 'lucide-react';
import { ResourceMetricsCard } from '../components/resource-allocation/ResourceMetricsCard';
import { ResourcePlanCard } from '../components/resource-allocation/ResourcePlanCard';
import { AIResourcePrioritization } from '../components/resource-allocation/AIResourcePrioritization';
import { ResourceAllocationMap } from '../components/resource-allocation/ResourceAllocationMap';
import { ResourceImpactSimulator } from '../components/resource-allocation/ResourceImpactSimulator';
import { ResourceTrainingCenter } from '../components/resource-allocation/ResourceTrainingCenter';
import { PerformanceIncentives } from '../components/resource-allocation/PerformanceIncentives';
import { PublicResourceDashboard } from '../components/resource-allocation/PublicResourceDashboard';
import { IoTMonitoringDashboard } from '../components/resource-allocation/IoTMonitoringDashboard';
import { ResourceMatchingSystem } from '../components/resource-allocation/ResourceMatchingSystem';
import { RoleSpecificDashboard } from '../components/resource-allocation/RoleSpecificDashboard';
import { ContinuousFeedback } from '../components/resource-allocation/ContinuousFeedback';
import { FinancialTransparency } from '../components/resource-allocation/FinancialTransparency';
import { ResourceUtilizationTracker } from '../components/resource-allocation/ResourceUtilizationTracker';
import { ResourceSharingHub } from '../components/resource-allocation/ResourceSharingHub';
import { EmergencyResourceCenter } from '../components/resource-allocation/EmergencyResourceCenter';
import { resourceAllocationService } from '../services/resourceAllocationService';
import { ResourcePlan, ResourceMetrics } from '../types/resourceAllocation';
import { useAuth } from '../contexts/AuthContext';

const mockLocations = [
  {
    id: '1',
    lat: 28.6139,
    lng: 77.209,
    schoolName: 'Delhi Public School',
    resourceType: 'Infrastructure',
    status: 'delivered' as const,
    quantity: 100,
  },
  {
    id: '2',
    lat: 19.076,
    lng: 72.8777,
    schoolName: 'Mumbai High School',
    resourceType: 'Technology',
    status: 'in-transit' as const,
    quantity: 50,
  },
  {
    id: '3',
    lat: 12.9716,
    lng: 77.5946,
    schoolName: 'Bangalore Academy',
    resourceType: 'Teaching Staff',
    status: 'pending' as const,
    quantity: 25,
  },
];

type TabCategory =
  | 'overview'
  | 'planning'
  | 'monitoring'
  | 'management'
  | 'analytics';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  category: TabCategory;
}

const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Layout, category: 'overview' },
  { id: 'plans', label: 'Resource Plans', icon: Package, category: 'planning' },
  { id: 'ai', label: 'AI Analysis', icon: Brain, category: 'analytics' },
  { id: 'map', label: 'Allocation Map', icon: Map, category: 'monitoring' },
  {
    id: 'simulator',
    label: 'Impact Simulator',
    icon: TrendingUp,
    category: 'analytics',
  },
  {
    id: 'matching',
    label: 'Resource Matching',
    icon: Share2,
    category: 'management',
  },
  {
    id: 'sharing',
    label: 'Resource Sharing',
    icon: Users,
    category: 'management',
  },
  {
    id: 'emergency',
    label: 'Emergency Center',
    icon: AlertTriangle,
    category: 'monitoring',
  },
  {
    id: 'transparency',
    label: 'Financial Overview',
    icon: DollarSign,
    category: 'overview',
  },
  {
    id: 'public',
    label: 'Public Dashboard',
    icon: Globe,
    category: 'overview',
  },
];



export function ResourceAllocationPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('transparency');
  const [plans, setPlans] = useState<ResourcePlan[]>([]);
  const [metrics, setMetrics] = useState<ResourceMetrics>({
    utilizationRate: 0.75,
    implementationProgress: 0.68,
    deliveryEfficiency: 0.82,
    satisfactionScore: 0.88,
  });

  const categoryLabels: Record<TabCategory, string> = {
    overview: 'Overview',
    ...(user?.role === 'SUPER_ADMIN' && {
      planning: 'Planning & Allocation',
    }),
    monitoring: 'Monitoring & Tracking',
    management: 'Resource Management',
    analytics: 'Analytics & Insights',
  };

  console.log(user)

  const navigationItems: NavItem[] = [
    ...(user?.role === 'SCHOOL_ADMIN'
    ?[{ id: 'dashboard', label: 'Dashboard', icon: Layout, category: 'overview' }]:[]),
    ...(user?.role === 'SUPER_ADMIN'
      ? [{ id: 'plans', label: 'Resource Plans', icon: Package, category: 'planning' }]
      : []),
    { id: 'ai', label: 'AI Analysis', icon: Brain, category: 'analytics' },
    ...(user?.role === 'SUPER_ADMIN'
      ? [{ id: 'map', label: 'Allocation Map', icon: Map, category: 'monitoring' }]:[]),
    {
      id: 'simulator',
      label: 'Impact Simulator',
      icon: TrendingUp,
      category: 'analytics',
    },
    {
      id: 'matching',
      label: 'Resource Matching',
      icon: Share2,
      category: 'management',
    },
    {
      id: 'sharing',
      label: 'Resource Sharing',
      icon: Users,
      category: 'management',
    },
    {
      id: 'emergency',
      label: 'Emergency Center',
      icon: AlertTriangle,
      category: 'monitoring',
    },
    {
      id: 'transparency',
      label: 'Financial Overview',
      icon: DollarSign,
      category: 'overview',
    },
    {
      id: 'public',
      label: 'Public Dashboard',
      icon: Globe,
      category: 'overview',
    },
  ];

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await resourceAllocationService.getResourcePlans('school-1');
      setPlans(data);
    };
    fetchPlans();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      
      case 'plans':
        return (
          <div className="space-y-6">
            {plans.map((plan) => (
              <ResourcePlanCard
                key={plan.id}
                plan={plan}
                onApprove={() => {}}
                onReject={() => {}}
                onModify={() => {}}
              />
            ))}
          </div>
        );
      case 'ai':
        return <AIResourcePrioritization />;
      case 'dashboard':
        return <RoleSpecificDashboard />;
      case 'map':
        return (
          <ResourceAllocationMap
            locations={mockLocations}
            onMarkerClick={() => {}}
          />
        );
      case 'simulator':
        return <ResourceImpactSimulator />;
      case 'metrics':
        return <ResourceUtilizationTracker />;
      case 'matching':
        return <ResourceMatchingSystem />;
      case 'sharing':
        return <ResourceSharingHub />;
      case 'training':
        return <ResourceTrainingCenter />;
      case 'incentives':
        return <PerformanceIncentives />;
      case 'emergency':
        return <EmergencyResourceCenter />;
      
      case 'feedback':
        return <ContinuousFeedback />;
      case 'transparency':
        return <FinancialTransparency />;
      case 'public':
        return <PublicResourceDashboard />;
      default:
        return <FinancialTransparency />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white min-h-screen shadow-lg">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-800">Resource Center</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage school resources
            </p>
          </div>

          <nav className="px-4 pb-6">
            {Object.entries(categoryLabels).map(([category, label]) => {
              const categoryItems = navigationItems.filter(
                (item) => item.category === category
              );

              return (
                <div key={category} className="mb-6">
                  <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {label}
                  </h2>
                  <div className="space-y-1">
                    {categoryItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                            activeTab === item.id
                              ? 'bg-indigo-50 text-indigo-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            {/* <ResourceMetricsCard metrics={metrics} /> */}
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
