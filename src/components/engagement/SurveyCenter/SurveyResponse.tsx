import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SurveyResponseProps {
  survey: {
    _id: string;
    title: string;
    questions: Array<{
      _id: string;
      question: string;
      type: 'multiple-choice' | 'text' | 'rating';
      options?: string[];
      required: boolean;
    }>;
  };
  onSubmit: (answers: Array<{ question: string; answer: any }>) => void;
  onClose: () => void;
}

export function SurveyResponse({ survey, onSubmit, onClose }: SurveyResponseProps) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleInputChange = (question_Id: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [question_Id]: value,
    }));
    if (errors[question_Id]) {
      setErrors((prev) => ({
        ...prev,
        [question_Id]: false,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Val_idate required fields
    const newErrors: Record<string, boolean> = {};
    let hasErrors = false;

    survey.questions.forEach((question) => {
      if (question.required && !answers[question._id]) {
        newErrors[question._id] = true;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const formattedAnswers = Object.entries(answers).map(([question_Id, answer]) => ({
      question: question_Id,
      answer,
    }));

    onSubmit(formattedAnswers);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{survey.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {survey.questions.map((question) => (
              <div key={question._id} className="space-y-2">
                <label className="block font-medium">
                  {question.question}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {question.type === 'multiple-choice' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={question._id} // Grouping radio buttons by question _ID
                          value={option}
                          checked={answers[question._id] === option}
                          onChange={(e) => handleInputChange(question._id, e.target.value)}
                          className="text-indigo-600"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'text' && (
                  <textarea
                    name={question._id}
                    value={answers[question._id] || ''}
                    onChange={(e) => handleInputChange(question._id, e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                )}

                {question.type === 'rating' && (
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <label key={value} className="flex flex-col items-center">
                        <input
                          type="radio"
                          name={question._id} // Grouping ratings by question _ID
                          value={value}
                          checked={answers[question._id] === value.toString()}
                          onChange={(e) => handleInputChange(question._id, e.target.value)}
                          className="text-indigo-600"
                        />
                        <span>{value}</span>
                      </label>
                    ))}
                  </div>
                )}

                {errors[question._id] && (
                  <p className="text-sm text-red-600">This field is required</p>
                )}
              </div>
            ))}

            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Submit Response
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
