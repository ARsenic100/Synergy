import React, { useState } from 'react';
import { Calculator, Save, FileDown, RefreshCw } from 'lucide-react';
import { BasicInfoForm } from './calculator/BasicInfoForm';
import { GradeStructure } from './calculator/GradeStructure';
import { FacilityRequirements } from './calculator/FacilityRequirements';
import { CalculationResults } from './calculator/CalculationResults';
import { ResourceVisualization } from './calculator/ResourceVisualization';
import { calculateResources } from '../../utils/resourceCalculations';
import { ResourceCalculation } from '../../types/calculator';
import { motion } from 'framer-motion';

export function ResourcePlanningCalculator() {
  const [activeStep, setActiveStep] = useState(1);
  const [calculationData, setCalculationData] = useState<ResourceCalculation>({
    basicInfo: {
      totalStudents: 0,
      schoolType: 'urban',
      budget: 0,
      landArea: 0,
    },
    gradeStructure: {
      primary: { enabled: false, students: 0 },
      upperPrimary: { enabled: false, students: 0 },
      secondary: { enabled: false, students: 0 },
      higherSecondary: { enabled: false, students: 0 },
    },
    ratios: {
      teacherStudent: 30,
      classroomStudent: 40,
      washroomStudent: 50,
      computerStudent: 20,
    },
    facilities: {
      library: true,
      computerLab: true,
      scienceLab: true,
      playground: true,
      artRoom: false,
      musicRoom: false,
      infirmary: true,
      cafeteria: true,
    },
  });

  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const calculatedResults = calculateResources(calculationData);
    setResults(calculatedResults);
    setActiveStep(4);
  };

  const handleSave = () => {
    const data = JSON.stringify({ calculationData, results });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resource-calculation.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setCalculationData({
      basicInfo: {
        totalStudents: 0,
        schoolType: 'urban',
        budget: 0,
        landArea: 0,
      },
      gradeStructure: {
        primary: { enabled: false, students: 0 },
        upperPrimary: { enabled: false, students: 0 },
        secondary: { enabled: false, students: 0 },
        higherSecondary: { enabled: false, students: 0 },
      },
      ratios: {
        teacherStudent: 30,
        classroomStudent: 40,
        washroomStudent: 50,
        computerStudent: 20,
      },
      facilities: {
        library: true,
        computerLab: true,
        scienceLab: true,
        playground: true,
        artRoom: false,
        musicRoom: false,
        infirmary: true,
        cafeteria: true,
      },
    });
    setResults(null);
    setActiveStep(1);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Calculator className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Resource Planning Calculator
            </h2>
            <p className="text-gray-600">
              Calculate required resources based on your school's needs
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {results && (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Save className="h-5 w-5" />
                <span>Save</span>
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('results-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <FileDown className="h-5 w-5" />
                <span>View Results</span>
              </button>
            </>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setActiveStep(1)}
          className={`p-4 rounded-lg text-center transition-colors ${
            activeStep === 1
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Basic Information
        </button>
        <button
          onClick={() => setActiveStep(2)}
          className={`p-4 rounded-lg text-center transition-colors ${
            activeStep === 2
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Grade Structure
        </button>
        <button
          onClick={() => setActiveStep(3)}
          className={`p-4 rounded-lg text-center transition-colors ${
            activeStep === 3
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Facility Requirements
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeStep === 1 && (
          <BasicInfoForm
            data={calculationData}
            onChange={setCalculationData}
            onNext={() => setActiveStep(2)}
          />
        )}
        {activeStep === 2 && (
          <GradeStructure
            data={calculationData}
            onChange={setCalculationData}
            onNext={() => setActiveStep(3)}
            onBack={() => setActiveStep(1)}
          />
        )}
        {activeStep === 3 && (
          <FacilityRequirements
            data={calculationData}
            onChange={setCalculationData}
            onCalculate={handleCalculate}
            onBack={() => setActiveStep(2)}
          />
        )}
      </motion.div>

      {results && (
        <div id="results-section" className="mt-8">
          <CalculationResults results={results} />
          <ResourceVisualization results={results} />
        </div>
      )}
    </div>
  );
}