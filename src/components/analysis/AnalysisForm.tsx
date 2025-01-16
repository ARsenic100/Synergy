import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  School,
  MapPin,
  Building2,
  Users,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { analysisFormSchema } from "../../schemas/analysisSchema";
import { AnalysisFormData } from "../../types/analysis";
import { FormStep } from "./FormStep";
import { BasicInfoFields } from "./form-sections/BasicInfoFields";
import { SchoolDetailsFields } from "./form-sections/SchoolDetailsFields";
import { InfrastructureFields } from "./form-sections/InfrastructureFields";
import { TeacherFields } from "./form-sections/TeacherFields";
import { EnrollmentFields } from "./form-sections/EnrollmentFields";
import { AIAnalysisResult } from "./AIAnalysisResult";
import { useAutoSave } from "../../hooks/useAutoSave";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const steps = [
  { id: "basic", title: "Basic Information", icon: School },
  { id: "details", title: "School Details", icon: Building2 },
  { id: "infrastructure", title: "Infrastructure", icon: MapPin },
  { id: "teachers", title: "Teachers", icon: GraduationCap },
  { id: "enrollment", title: "Enrollment", icon: Users },
];

export function AnalysisForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState<AnalysisFormData | null>(null);
  // const [formData,setFormData] = useState();
  const navigate = useNavigate();
  const methods = useForm<AnalysisFormData>({
    resolver: zodResolver(analysisFormSchema),
    defaultValues: JSON.parse(localStorage.getItem("analysisFormData") || "{}"),
  });

  const { handleSubmit, watch } = methods;

  useAutoSave(watch, "analysisFormData");

  const submitfeature = async () => {
    try {
      // Retrieve data from localStorage and parse it into an object
      const obj = JSON.parse(localStorage.getItem("analysisFormData") || "{}");

      console.log("Submitting parsed data to backend:", obj);

      // Make the POST request with the parsed object
      const response = await axios.post(
        "https://synergy-backend-six.vercel.app/api/school/details/insertschool",
        obj
      );

      console.log("Response from backend:", response.data);

      // Update state and navigate
      setFormData(obj);
      setShowResults(true);
      // navigate("/report");
      navigate("/report", { state: { backendResponse: response.data } });
    } catch (error) {
      console.error("Error submitting data:", error);

      // Handle Axios error
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data);
      }
    }
  };

  // const onSubmit = async (data: AnalysisFormData) => {
  //   console.log(data);
  //   setIsAnalyzing(true);
  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   setFormData(data);
  //   console.log("YES");
  //   console.log(formData);
  //   setIsAnalyzing(false);
  //   setShowResults(true);
  //   navigate("/report");
  // };

  const onSubmit = async (data: AnalysisFormData) => {
    try {
      setIsAnalyzing(true);

      console.log("Submitting data to backend:", data);

      // Simulate API delay (optional)

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Use the data directly for the POST request
      const response = await axios.post(
        "https://synergy-backend-six.vercel.app/api/v1/school/insertschool",
        data // Directly pass the data from the form
      );

      console.log("Response from backend:", response.data);

      // Update state and navigate
      setFormData(data);
      setShowResults(true);
      navigate("/report");
    } catch (error) {
      console.error("Error submitting data:", error);

      // Handle error scenarios (optional)
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (showResults && formData) {
    return;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <FormStep
              key={step.id}
              {...step}
              isActive={currentStep === index}
              isCompleted={currentStep > index}
              onClick={() => setCurrentStep(index)}
            />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {currentStep === 0 && <BasicInfoFields />}
          {currentStep === 1 && <SchoolDetailsFields />}
          {currentStep === 2 && <InfrastructureFields />}
          {currentStep === 3 && <TeacherFields />}
          {currentStep === 4 && <EnrollmentFields />}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 text-indigo-600 hover:text-indigo-800"
            disabled={currentStep === 0}
          >
            Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
            type="submit"
            // disabled={isAnalyzing}
            onClick={submitfeature}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </>
            ) : (
              <>
                Analyze School Structure
                <ChevronRight className="h-5 w-5" />
              </>
            )}
          </button>
          ) : (
            <><button
              type="button"
              onClick={() =>
                setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
              }
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
            </>
          )}
        </div> 
      </form>
    </FormProvider>
  );
}