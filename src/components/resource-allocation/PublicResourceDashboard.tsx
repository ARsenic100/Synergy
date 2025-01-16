import React, { useState, useEffect } from "react";
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
} from "recharts";
import { Globe, MessageSquare } from "lucide-react";
import axios from "axios";
import { FeedbackForm } from "./FeedbackForm";
import { FeedbackFormData } from "../../types/feedback";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

interface CommunityFeedback {
  id: string;
  schoolName: string;
  type: "improvement" | "concern";
  message: string;
  date: string;
  status: "pending" | "addressed" | "investigating";
}

export function PublicResourceDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [distributionData, setDistributionData] = useState([
    { name: "Urban Schools", value: 0 },
    { name: "Rural Schools", value: 0 },
    { name: "Remote Areas", value: 0 },
  ]);
  const [allocationData, setAllocationData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [feedbackData, setFeedbackData] = useState<CommunityFeedback[]>([]);

  // Handle feedback form submission
  const handleSubmitFeedback = async (data: FeedbackFormData) => {
    setLoading(true);
    try {
      console.log("Feedback Submitted:", data);
      const response = await axios.post(
        "https://synergy-backend-six.vercel.app/api/resource-plans/feedback/",
        data
      );
      console.log("Backend Response:", response.data);
      alert("Feedback successfully submitted!");
      setShowForm(false);

      // Re-fetch feedback after submission
      fetchFeedback();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form cancellation
  const handleCancel = () => {
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  // Fetch feedback data
  const fetchFeedback = async () => {
    try {
      const response = await axios.get(
        "https://synergy-backend-six.vercel.app/api/resource-plans/feedback/"
      );
      const mappedFeedback: CommunityFeedback[] = response.data.map(
        (item: any) => ({
          id: item._id,
          schoolName: item.schoolName,
          type: item.type,
          message: item.message,
          date: new Date(item.date).toISOString().split("T")[0],
          status: item.status,
        })
      );
      setFeedbackData(mappedFeedback);
    } catch (err) {
      console.error("Error fetching feedback data:", err);
      setError("An error occurred while fetching feedback data.");
    }
  };

  // Fetch allocation data
  useEffect(() => {
    const fetchAllocationData = async () => {
      try {
        const response = await axios.get(
          "https://synergy-backend-six.vercel.app/api/resource-plans/allocation-utilization/"
        );
        setAllocationData(response.data);
      } catch (err) {
        console.error("Error fetching allocation data:", err);
        setError("An error occurred while fetching allocation data.");
      }
    };
    fetchAllocationData();
  }, []);

  // Fetch distribution data
  useEffect(() => {
    const fetchDistributionData = async () => {
      try {
        const response = await axios.get(
          "https://synergy-backend-six.vercel.app/api/resource-plans/getdistribution"
        );
        if (response.data.success) {
          setDistributionData(response.data.distributionData);
        } else {
          setError("Failed to fetch distribution data.");
        }
      } catch (err) {
        console.error("Error fetching distribution data:", err);
        setError("An error occurred while fetching distribution data.");
      }
    };
    fetchDistributionData();
  }, []);

  // Fetch feedback data on initial load
  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Public Resource Dashboard</h2>
          <p className="text-gray-600 mt-1">
            Transparency in resource allocation and utilization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-indigo-600" />
          <span className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-medium mb-4">
            Resource Allocation vs Utilization
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={allocationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="allocated" name="Allocated" fill="#4f46e5" />
                <Bar dataKey="utilized" name="Utilized" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Distribution by Region</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
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
                  {distributionData.map((entry, index) => (
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
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Community Feedback</h3>
          <button
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
            onClick={toggleForm}
          >
            <MessageSquare className="h-5 w-5" />
            Submit Feedback
          </button>
        </div>
        {showForm && (
          <div className="p-4 border rounded-lg bg-gray-50">
            <FeedbackForm
              onSubmit={handleSubmitFeedback}
              onCancel={handleCancel}
              loading={loading}
            />
          </div>
        )}

        <div className="space-y-4">
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{feedback.schoolName}</h4>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        feedback.type === "improvement"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {feedback.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{feedback.message}</p>
                  <div className="text-sm text-gray-500">
                    Submitted: {new Date(feedback.date).toLocaleDateString()}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    feedback.status === "addressed"
                      ? "bg-green-100 text-green-800"
                      : feedback.status === "investigating"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {feedback.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}