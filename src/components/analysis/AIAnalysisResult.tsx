import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Download,
  School,
  Users,
  Building2,
  BookOpen,
} from "lucide-react";
import { AnalysisFormData } from "../../types/analysis";
import { generatePDF } from "../../utils/pdfGenerator";
import { useLocation } from "react-router-dom";
import { Pagination } from "../common/Pagination"; // Import Pagination

interface AIAnalysisResultProps {
  data: AnalysisFormData;
}

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

export function AIAnalysisResult() {
  const dataString = localStorage.getItem("analysisFormData");
  console.log("dataString", dataString);
  const data: AnalysisFormData = dataString ? JSON.parse(dataString) : null;
  console.log("AnalysisFormData", data);
  const location = useLocation();
  const { backendResponse } = location.state || {};
  console.log("data recieved", backendResponse);
  const analysisResult = data ? analyzeSchoolData(data) : null;
  console.log("analysisresult", analysisResult);

  const studentteacherratio = calculateTeacherStudentRatio(backendResponse.data.totalStudents,backendResponse.data.totalTeachers);

  const compliancevariable = [
    { name: 'Infrastructure', value: analysisResult?.infrastructureScore },
    {
      name: 'Teacher Ratio',
      value: studentteacherratio <= 30 ? 100 : (30 / studentteacherratio) * 100,
    },
    { name: 'Safety Standards', value: analysisResult?.safety },
    { name: 'Eco-friendly Construction', value: analysisResult?.ecofriendly },
  ];
  
  
  function calculateTeacherStudentRatio(noOfStudents: number, noOfTeachers: number): number {
    if (noOfTeachers === 0) {
      throw new Error("Number of teachers cannot be zero.");
    }
    return  Math.round(noOfStudents / noOfTeachers);
  }


  const handleDownloadReport = () => {
    generatePDF({ ...data, analysis: analysisResult });
  };

  function getStructureStatus(predicted_rating) {
    return predicted_rating >= 75 ? "Standard" : "Odd";
  }

  function convertRatingToPercentage(rating) {
    if (typeof rating !== "number" || isNaN(rating)) return "Invalid rating";
  
    // Convert rating to percentage
    const percentage = (rating / 100) * 100;
  
    // Format it to 2 decimal places and append '%'
    return `${percentage.toFixed(2)}%`;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of recommendations per page
  const totalPages = Math.ceil((backendResponse?.suggestions.length || 0) / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedRecommendations = backendResponse?.suggestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8 bg-gray-50 p-8 rounded-xl">
      {/* Header Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              School Analysis Report
            </h1>
            <p className="text-gray-600 mt-2">
              UDISE Code: {backendResponse.data.schoolID}
            </p>
          </div>
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
          >
            <Download className="h-5 w-5" />
            Download Report
          </button>
        </div>

        {/* Classification Status */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            getStructureStatus(backendResponse.predicted_rating) === "Standard"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          <School className="h-5 w-5" />
          {getStructureStatus(backendResponse.predicted_rating) === "Standard"
            ? "Standard Structure"
            : "Odd Structure"}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Compliance Score"
          value={`${convertRatingToPercentage(backendResponse.predicted_rating)}`}
          icon={CheckCircle}
          trend={
            (backendResponse.predicted_rating ?? 0) > 75 ? "positive" : "warning"
          }
        />
        <MetricCard
          title="Student-Teacher Ratio"
          value={`${studentteacherratio}:1`}
          icon={Users}
          trend={
            (studentteacherratio ?? 0) <= 30
              ? "positive"
              : "negative"
          }
        />
        <MetricCard
          title="Infrastructure Score"
          value={`${analysisResult?.infrastructureScore}%`}
          icon={Building2}
          trend={
            (analysisResult?.infrastructureScore ?? 0) > 70
              ? "positive"
              : "warning"
          }
        />
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Enrollment Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-6">Student Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analysisResult?.studentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analysisResult?.studentDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance Progress */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-6">Compliance Progress</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="10%"
                outerRadius="80%"
                barSize={10}
                data={compliancevariable}
              >
                <RadialBar
                  min={0}
                  label={{ position: "insideStart", fill: "#fff" }}
                  background
                  dataKey="value"
                />
                <Legend />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

<div className="bg-white rounded-xl p-6 shadow-lg">
  <h3 className="text-xl font-semibold mb-6">Recommendations</h3>
  <div className="space-y-4">
    {paginatedRecommendations.map((rec, index) => {
      // Randomly assign a color from a list of predefined colors
      const colors = [
        "bg-red-50 border-l-4 border-red-500",
        "bg-yellow-50 border-l-4 border-yellow-500",
        "bg-blue-50 border-l-4 border-blue-500",
        "bg-green-50 border-l-4 border-green-500",
        "bg-purple-50 border-l-4 border-purple-500"
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      return (
        <div key={index} className={`p-4 rounded-lg ${randomColor}`}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-0.5 text-gray-500" />
            <div>
              <h4 className="font-semibold">{rec}</h4> {/* Displaying the suggestion here */}
              <p className="text-gray-600 mt-1">Description not available for the suggestion</p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
  <Pagination
    currentPage={currentPage}
    totalItems={backendResponse?.suggestions.length || 0}
    itemsPerPage={itemsPerPage}
    onPageChange={handlePageChange}
    totalPages={totalPages}
  />
</div>

    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: "positive" | "negative" | "warning";
}

function MetricCard({ title, value, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Icon
          className={`h-5 w-5 ${
            trend === "positive"
              ? "text-green-500"
              : trend === "negative"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        />
        <h3 className="font-semibold text-gray-700">{title}</h3>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function analyzeSchoolData(data: AnalysisFormData) {
  // Infrastructure Analysis
  const infrastructureScore = calculateInfrastructureScore(data);

  // Teacher-Student Ratio
  const teacherStudentRatio = calculateTeacherStudentRatio(
    data.totalStudents,
    data.totalTeachers
  );

  const safety = calculateSafety(data);
  const ecofriendly = calculateecofriendly(data);
  // Resource Utilization
  const resourceUtilizationScore = calculateResourceUtilization(data);

  // Digital Facilities Check
  const digitalEquipmentScore = calculateDigitalEquipmentScore(data);

  // Overall Compliance Score
  const complianceScore = calculateComplianceScore({
    infrastructureScore,
    teacherStudentRatio,
    resourceUtilizationScore,
    digitalEquipmentScore,
  });

  return {
    safety,
    ecofriendly,
    teacherStudentRatio,
    infrastructureScore,
    resourceUtilizationScore,
    digitalEquipmentScore,
    complianceScore,
    performanceTrends: data.performanceTrends || [],
    studentDistribution: formatStudentDistribution(data),
    recommendations: generateRecommendations(data),
  };
}

// Calculate Infrastructure Score
function calculateInfrastructureScore(data: AnalysisFormData) {
  const checks = [
    data.boundaryWall,
    data.libraryAvailable,
    data.playgroundAvailable,
    data.drinkingWaterAvailable,
    data.electricityAvailability,
    data.kitchensForMidDayMeal,
    data.safetyStandardsCompliance,
  ];

  const score = (checks.filter(Boolean).length / checks.length) * 100;
  return Math.round(score);
}

function calculateSafety(data: AnalysisFormData) {
  const checks = [
    data.safetyStandards,
    data.supportForCWSN,
    data.childProtectionPolicies,
    data.inclusiveEnvironment,
  ];

  const score = (checks.filter(Boolean).length / checks.length) * 100;
  return Math.round(score);
}
function calculateecofriendly(data: AnalysisFormData) {
  const checks = [
    data.ecoFriendlyConstruction,
    data.universalAccess,
    data.transportationForRemoteAreas,
    data.safetyStandardsCompliance,
  ];

  const score = (checks.filter(Boolean).length / checks.length) * 100;
  return Math.round(score);
}

// Calculate Teacher-Student Ratio
function calculateTeacherStudentRatio(totalStudents = 0, totalTeachers = 1) {
  if (!totalStudents || !totalTeachers) return 0;
  return Math.round(totalStudents / totalTeachers);
}

// Resource Utilization Score
function calculateResourceUtilization(data: AnalysisFormData) {
  const resources = data.resourceDistribution || {};
  let totalResources = 0;
  let fulfilledResources = 0;

  Object.values(resources[0]).forEach((resource) => {
    if (resource.required) {
      totalResources += resource.required;
      fulfilledResources += Math.min(resource.current, resource.required);
    }
  });

  const score = (fulfilledResources / totalResources) * 100 || 0;
  return Math.round(score);
}

// Digital Equipment Score
function calculateDigitalEquipmentScore(data: AnalysisFormData) {
  const equipment = data.digitalEquipment || {};
  const total =
    equipment[0].desktops +
    equipment[0].laptops +
    equipment[0].projectors +
    equipment[0].smartBoards +
    equipment.printers;

  return total > 0 ? Math.min((total / 10) * 100, 100) : 0; // Scale digital readiness
}

// Overall Compliance Score
function calculateComplianceScore({
  infrastructureScore,
  teacherStudentRatio,
  resourceUtilizationScore,
  digitalEquipmentScore,
}: {
  infrastructureScore: number;
  teacherStudentRatio: number;
  resourceUtilizationScore: number;
  digitalEquipmentScore: number;
}) {
  const weights = {
    infrastructure: 0.3,
    teacherRatio: 0.2,
    resourceUtilization: 0.3,
    digitalEquipment: 0.2,
  };

  const teacherRatioScore =
    teacherStudentRatio <= 30 ? 100 : (30 / teacherStudentRatio) * 100;

  const totalScore =
    infrastructureScore * weights.infrastructure +
    teacherRatioScore * weights.teacherRatio +
    resourceUtilizationScore * weights.resourceUtilization +
    digitalEquipmentScore * weights.digitalEquipment;

  return Math.round(totalScore);
}

// Format Student Distribution for PieChart
function formatStudentDistribution(data: AnalysisFormData) {
  const students = data.studentDemographics || {};
  return [
    { name: "General", value: students[0].general || 0 },
    { name: "SC", value: students[0].SC || 0 },
    { name: "ST", value: students[0].ST || 0 },
    { name: "OBC", value: students[0].OBC || 0 },
  ];
}

// Generate Recommendations
function generateRecommendations(data: AnalysisFormData) {
  const recommendations = [];

  if (!data.boundaryWall) {
    recommendations.push({
      priority: "critical",
      title: "Install Boundary Wall",
      description: "Ensure student safety by building a proper boundary wall.",
    });
  }

  if (!data.libraryAvailable) {
    recommendations.push({
      priority: "important",
      title: "Set Up Library",
      description:
        "A library is essential for improving student learning outcomes.",
    });
  }

  if (data.totalTeachers && data.totalStudents) {
    const ratio = calculateTeacherStudentRatio(
      data.totalStudents,
      data.totalTeachers
    );
    if (ratio > 30) {
      recommendations.push({
        priority: "critical",
        title: "Reduce Teacher-Student Ratio",
        description: `Current ratio is 1:${ratio}. Consider hiring more teachers.`,
      });
    }
  }

  if (!data.playgroundAvailable) {
    recommendations.push({
      priority: "important",
      title: "Add Playground",
      description:
        "Playgrounds are vital for physical education and recreation.",
    });
  }

  if (!data.electricityAvailability) {
    recommendations.push({
      priority: "critical",
      title: "Ensure Electricity Availability",
      description:
        "Electricity is necessary for effective teaching and learning.",
    });
  }

  return recommendations;
}

// function analyzeSchoolData(data: AnalysisFormData) {
//   // Calculate total students
//   const totalStudents =
//     data.generalCategoryTotal +
//     data.scCategoryTotal +
//     data.stCategoryTotal +
//     data.obcCategoryTotal;

//   // Calculate student-teacher ratio
//   const studentTeacherRatio = Math.round(totalStudents / data.totalTeachers);

//   // Calculate infrastructure score
//   const infrastructureChecks = [
//     data.hasBoundaryWall,
//     data.hasRamps,
//     data.hasPlayground,
//     data.hasDrinkingWater,
//   ];
//   const infrastructureScore = Math.round(
//     (infrastructureChecks.filter(Boolean).length /
//       infrastructureChecks.length) *
//       100
//   );

//   // Determine if structure is standard
//   const isStandardStructure = determineIfStandard(data);

//   // Calculate compliance score
//   const complianceScore = calculateComplianceScore(data);

//   return {
//     isStandardStructure,
//     studentTeacherRatio,
//     infrastructureScore,
//     complianceScore,
//     studentDistribution: [
//       { name: 'General', value: data.generalCategoryTotal },
//       { name: 'SC', value: data.scCategoryTotal },
//       { name: 'ST', value: data.stCategoryTotal },
//       { name: 'OBC', value: data.obcCategoryTotal },
//     ],
//     complianceMetrics: [
//       { name: 'Infrastructure', value: infrastructureScore },
//       {
//         name: 'Teacher Ratio',
//         value:
//           studentTeacherRatio <= 30 ? 100 : (30 / studentTeacherRatio) * 100,
//       },
//       { name: 'Documentation', value: 100 },
//       { name: 'Facilities', value: infrastructureScore },
//     ],
//     recommendations: generateRecommendations(data),
//   };
// }

// function determineIfStandard(data: AnalysisFormData): boolean {
//   // Implement logic to determine if school structure is standard
//   const standardConfigurations = {
//     Primary: [1, 2, 3, 4, 5],
//     'Upper Primary': [1, 2, 3, 4, 5, 6, 7, 8],
//     Secondary: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//     'Higher Secondary': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//   };

//   // For demo purposes, return based on school category
//   return data.schoolCategory.includes('standard');
// }

// function calculateComplianceScore(data: AnalysisFormData): number {
//   let score = 0;
//   const weights = {
//     infrastructure: 0.3,
//     teacherRatio: 0.3,
//     facilities: 0.2,
//     documentation: 0.2,
//   };

//   // Infrastructure score
//   const infrastructureScore =
//     [
//       data.hasBoundaryWall,
//       data.hasRamps,
//       data.hasPlayground,
//       data.hasDrinkingWater,
//     ].filter(Boolean).length / 4;

//   // Teacher ratio score
//   const studentTeacherRatio =
//     (data.generalCategoryTotal +
//       data.scCategoryTotal +
//       data.stCategoryTotal +
//       data.obcCategoryTotal) /
//     data.totalTeachers;
//   const teacherRatioScore =
//     studentTeacherRatio <= 30 ? 1 : 30 / studentTeacherRatio;

//   score += infrastructureScore * weights.infrastructure * 100;
//   score += teacherRatioScore * weights.teacherRatio * 100;
//   score += 0.8 * weights.facilities * 100; // Assumed facilities score
//   score += 1 * weights.documentation * 100; // Assumed documentation score

//   return Math.round(score);
// }

// function generateRecommendations(data: AnalysisFormData) {
//   const recommendations = [];

//   // Infrastructure recommendations
//   if (!data.hasBoundaryWall) {
//     recommendations.push({
//       priority: 'critical',
//       title: 'Install Boundary Wall',
//       description: 'Essential for ensuring student safety and security.',
//     });
//   }

//   if (!data.hasRamps) {
//     recommendations.push({
//       priority: 'important',
//       title: 'Install Access Ramps',
//       description: 'Required for ensuring accessibility for all students.',
//     });
//   }

//   // Teacher-student ratio recommendations
//   const totalStudents =
//     data.generalCategoryTotal +
//     data.scCategoryTotal +
//     data.stCategoryTotal +
//     data.obcCategoryTotal;
//   const ratio = totalStudents / data.totalTeachers;

//   if (ratio > 30) {
//     recommendations.push({
//       priority: 'critical',
//       title: 'Improve Teacher-Student Ratio',
//       description: `Current ratio of 1:${Math.round(
//         ratio
//       )} exceeds recommended limit of 1:30. Consider hiring additional teachers.`,
//     });
//   }

//   // Facilities recommendations
//   if (!data.hasPlayground) {
//     recommendations.push({
//       priority: 'important',
//       title: 'Add Playground Facilities',
//       description: 'Essential for physical education and student recreation.',
//     });
//   }

//   if (!data.hasDrinkingWater) {
//     recommendations.push({
//       priority: 'critical',
//       title: 'Ensure Drinking Water Availability',
//       description:
//         'Functional drinking water facilities are mandatory for student health and safety.',
//     });
//   }

//   return recommendations;
// }
