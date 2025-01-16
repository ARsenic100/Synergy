import React, { useState } from 'react';
import { ArrowLeft, Building2, Users, TrendingUp, Clock } from 'lucide-react';
import { BestPracticeDetails } from './BestPracticeDetails';

interface BestPracticesListProps {
  onBack: () => void;
}

const bestPractices = [
  {
    id: '1',
    title: 'Successful Grade Reconfiguration',
    school: 'Government High School, Kerala',
    challenge: 'Complex transition from odd to standard structure',
    impact: '25% improvement in resource utilization',
    duration: '6 months',
    category: 'academic',
    description:
      'A comprehensive case study of how a government school successfully transitioned from an odd structure to a standardized format while maintaining educational quality.',
    keySteps: [
      'Initial assessment and gap analysis',
      'Stakeholder consultation and buy-in',
      'Phased implementation approach',
      'Regular monitoring and adjustment',
    ],
    outcomes: [
      'Improved resource allocation efficiency',
      'Better academic performance tracking',
      'Enhanced teacher deployment',
      'Streamlined administrative processes',
    ],
  },
  {
    id: '2',
    title: 'Infrastructure Optimization',
    school: "St. Mary's School, West Bengal",
    challenge: 'Limited infrastructure for growing student population',
    impact: '40% increase in facility utilization',
    duration: '8 months',
    category: 'infrastructure',
    description:
      'How a school with limited resources optimized their infrastructure to accommodate a growing student population while transitioning to a standard structure.',
    keySteps: [
      'Infrastructure audit and needs assessment',
      'Space utilization analysis',
      'Renovation and modification planning',
      'Implementation with minimal disruption',
    ],
    outcomes: [
      'Increased classroom capacity',
      'Improved facility utilization',
      'Enhanced learning environment',
      'Better resource management',
    ],
  },
  {
    id: '3',
    title: 'Stakeholder Engagement Success',
    school: 'Model School, Mizoram',
    challenge: 'Community resistance to structural changes',
    impact: '90% stakeholder satisfaction achieved',
    duration: '4 months',
    category: 'community',
    description:
      'A detailed look at how effective stakeholder engagement strategies helped overcome initial resistance to structural changes.',
    keySteps: [
      'Community outreach program',
      'Regular stakeholder meetings',
      'Transparent communication strategy',
      'Feedback incorporation',
    ],
    outcomes: [
      'High community satisfaction',
      'Smooth transition process',
      'Strong parent-school partnership',
      'Increased community support',
    ],
  },
];

export function BestPracticesList() {
  const [selectedPracticeId, setSelectedPracticeId] = useState<string | null>(
    null
  );

  const selectedPractice = bestPractices.find(
    (p) => p.id === selectedPracticeId
  );

  if (selectedPractice) {
    return (
      <BestPracticeDetails
        practice={selectedPractice}
        onBack={() => setSelectedPracticeId(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
        <ArrowLeft className="h-4 w-4" />
        Back to Overview
      </button>

      <div className="grid grid-cols-1 gap-6">
        {bestPractices.map((practice) => (
          <div key={practice.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{practice.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{practice.school}</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Challenge</p>
                      <p className="text-sm text-gray-600">
                        {practice.challenge}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Impact</p>
                      <p className="text-sm text-gray-600">{practice.impact}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Implementation Time: {practice.duration}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedPracticeId(practice.id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
