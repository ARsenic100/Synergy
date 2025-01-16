import React, { useState } from 'react';
import { SearchBar } from '../components/school/SearchBar';
import { FilterPanel } from '../components/school/FilterPanel';
import { SchoolList } from '../components/school/SchoolList';
import { SchoolMap } from '../components/school/SchoolMap';
import { ComparisonTool } from '../components/school/comparison/ComparisonTool';
import { DataVisualization } from '../components/school/visualization/DataVisualization';
import { School } from '../types/school';
import { useSchoolSearch } from '../hooks/useSchoolSearch';
import { ViewMode } from '../types/common';
import {
  MapIcon,
  List,
  ArrowLeftRight,
  X,
  School as SchoolIcon,
  Filter,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function KnowYourSchoolPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedSchoolForViz, setSelectedSchoolForViz] =
    useState<School | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    schools,
    loading,
    error,
    searchTerm,
    filters,
    setSearchTerm,
    setFilters,
    totalResults,
    currentPage,
    setCurrentPage,
  } = useSchoolSearch();
console.log(schools);
  const handleSchoolSelect = (school: School) => {
    if (
      selectedSchools.length < 3 &&
      !selectedSchools.find((s) => s.id === school.id)
    ) {
      setSelectedSchools([...selectedSchools, school]);
    }
  };

  const handleSchoolRemove = (schoolId: string) => {
    setSelectedSchools(selectedSchools.filter((s) => s.id !== schoolId));
  };

  const toggleComparison = () => {
    setShowComparison(!showComparison);
    if (!showComparison) {
      setSelectedSchoolForViz(null);
    }
  };

  const toggleVisualization = (school: School | null) => {
    setSelectedSchoolForViz(school);
    if (school) {
      setShowComparison(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="mx-32 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <SchoolIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Know Your School</h1>
              <p className="text-indigo-100 mt-1">
                Discover and compare schools across India
              </p>
            </div>
          </div>

          {/* Search Bar with Stats */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="max-w-3xl">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by school name, PIN code, or institution ID..."
              />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">
                  {totalResults.toLocaleString()}
                </div>
                <div className="text-sm text-indigo-100">Total Schools</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">32</div>
                <div className="text-sm text-indigo-100">States & UTs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">750+</div>
                <div className="text-sm text-indigo-100">Districts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          {/* <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              <FilterPanel filters={filters} onFilterChange={setFilters} />
            </div>
          </div> */}

          {/* Filters - Mobile */}
          {/* <div className="lg:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-700">Filters</span>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform ${
                  showMobileFilters ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-4"
                >
                  <FilterPanel filters={filters} onFilterChange={setFilters} />
                </motion.div>
              )}
            </AnimatePresence>
          </div> */}

          {/* Main Content Area */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list'
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'map'
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <MapIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    onClick={toggleComparison}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      showComparison
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <ArrowLeftRight className="h-5 w-5" />
                    <span className="font-medium">Compare Schools</span>
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  Showing {schools.length} of {totalResults} schools
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {showComparison ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <ComparisonTool
                    schools={schools}
                    selectedSchools={selectedSchools}
                    onSelectSchool={handleSchoolSelect}
                    onRemoveSchool={handleSchoolRemove}
                  />
                </motion.div>
              ) : selectedSchoolForViz ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative"
                >
                  <button
                    onClick={() => toggleVisualization(null)}
                    className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <DataVisualization school={selectedSchoolForViz} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {viewMode === 'list' ? (
                    <SchoolList
                      schools={schools}
                      loading={loading}
                      currentPage={currentPage}
                      totalResults={totalResults}
                      onPageChange={setCurrentPage}
                      onViewDetails={toggleVisualization}
                    />
                  ) : (
                    <SchoolMap schools={schools} loading={loading} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
