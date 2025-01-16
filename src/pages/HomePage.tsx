import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { ProgressMap } from '../components/home/ProgressMap';
import { SuccessStories } from '../components/home/SuccessStories';
import { Testimonials } from '../components/home/Testimonials';
import { AIInsightsPreview } from '../components/home/AIInsightsPreview';
import { ChatbotInterface } from '../components/home/ChatbotInterface';
import { GamificationSystem } from '../components/home/GamificationSystem';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <AIInsightsPreview />
      <GamificationSystem />
      <ProgressMap />
      <SuccessStories />
      <Testimonials />
      <ChatbotInterface />
    </div>
  );
}
// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Brain,
//   BookOpen,
//   BarChart2,
//   LineChart,
//   Users,
//   ArrowRight
// } from 'lucide-react';

// export function HomePage() {
//   return (
//     <div className="space-y-12">
//       <section className="text-center max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-900 mb-6">
//           Transforming School Structures for Better Education
//         </h1>
//         <p className="text-xl text-gray-600 mb-8">
//           Helping 145,012 schools across India transition from odd structures to standardized
//           categories under the UDISE+ portal and Samagra Shiksha framework.
//         </p>
//         <Link
//           to="/analysis"
//           className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//         >
//           Get Started
//           <ArrowRight className="h-5 w-5" />
//         </Link>
//       </section>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-3 bg-blue-100 rounded-lg">
//               <Brain className="h-6 w-6 text-blue-600" />
//             </div>
//             <h2 className="text-xl font-semibold">AI-Driven Analysis</h2>
//           </div>
//           <p className="text-gray-600 mb-4">
//             Advanced AI algorithms analyze school data to identify optimal standardization paths and
//             provide tailored recommendations.
//           </p>
//           <Link to="/analysis" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
//             Learn More <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-3 bg-green-100 rounded-lg">
//               <BookOpen className="h-6 w-6 text-green-600" />
//             </div>
//             <h2 className="text-xl font-semibold">Standardization Support</h2>
//           </div>
//           <p className="text-gray-600 mb-4">
//             Comprehensive guides, training modules, and resources to support schools through the
//             transition process.
//           </p>
//           <Link to="/standardization" className="text-green-600 hover:text-green-800 flex items-center gap-1">
//             Learn More <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-3 bg-purple-100 rounded-lg">
//               <BarChart2 className="h-6 w-6 text-purple-600" />
//             </div>
//             <h2 className="text-xl font-semibold">Resource Management</h2>
//           </div>
//           <p className="text-gray-600 mb-4">
//             Dynamic resource allocation system ensuring efficient distribution of teachers,
//             infrastructure, and funds.
//           </p>
//           <Link to="/resources/allocation" className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
//             Learn More <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-3 bg-yellow-100 rounded-lg">
//               <LineChart className="h-6 w-6 text-yellow-600" />
//             </div>
//             <h2 className="text-xl font-semibold">Progress Tracking</h2>
//           </div>
//           <p className="text-gray-600 mb-4">
//             Real-time monitoring and visualization of standardization progress across states and districts.
//           </p>
//           <Link to="/progress" className="text-yellow-600 hover:text-yellow-800 flex items-center gap-1">
//             Learn More <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-3 bg-red-100 rounded-lg">
//               <Users className="h-6 w-6 text-red-600" />
//             </div>
//             <h2 className="text-xl font-semibold">Stakeholder Engagement</h2>
//           </div>
//           <p className="text-gray-600 mb-4">
//             Interactive platform for community discussion, feedback collection, and policy updates.
//           </p>
//           <Link to="/engagement" className="text-red-600 hover:text-red-800 flex items-center gap-1">
//             Learn More <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>

//       <section className="bg-white rounded-lg p-8 shadow-md">
//         <h2 className="text-2xl font-bold mb-6">About Odd School Structures</h2>
//         <div className="prose max-w-none text-gray-600">
//           <p className="mb-4">
//             Odd School Structure refers to schools that do not conform to the standard categories
//             defined by the Ministry of Education under the UDISE+ portal. Currently, 145,012 schools
//             across the country fall into this category, posing challenges for the uniform implementation
//             of educational policies and schemes, such as Samagra Shiksha.
//           </p>
//           <p className="mb-4">
//             This misalignment is particularly significant in states like Goa, Mizoram, West Bengal,
//             and Kerala, where a substantial number of schools do not conform to the standard categories.
//           </p>
//         </div>

//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-indigo-50 p-4 rounded-lg">
//             <h3 className="font-semibold text-indigo-700 mb-2">Key Challenges</h3>
//             <ul className="list-disc list-inside text-gray-700 space-y-2">
//               <li>Resource distribution inequity</li>
//               <li>Policy implementation difficulties</li>
//               <li>Quality of education impact</li>
//               <li>Administrative complexities</li>
//             </ul>
//           </div>
//           <div className="bg-green-50 p-4 rounded-lg">
//             <h3 className="font-semibold text-green-700 mb-2">Our Solutions</h3>
//             <ul className="list-disc list-inside text-gray-700 space-y-2">
//               <li>AI-Driven Analysis Tools</li>
//               <li>Standardization Support</li>
//               <li>Dynamic Resource Allocation</li>
//               <li>Progress Monitoring</li>
//             </ul>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
