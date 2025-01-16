import React, { useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { resourceService } from '../../../services/resourceService';

interface UploadResourceFormProps {
  onClose: () => void;
  onSuccess: () => void;
}



interface FormErrors {
  [key: string]: string;
}

interface ResourceFormData {
    title: string;
    description: string;
    type: string;
    category: string;
    fileUrl: string;
    fileSize: string;
    tags: string[];
    createdAt?: string;  // Add these optional fields
    updatedAt?: string;
  }
  
  interface ResourceResponse {
    _id: string;
    title: string;
    description: string;
    type: string;
    category: string;
    fileUrl: string;
    fileSize: string;
    tags: string[];
    uploadedBy: {
      _id: string;
      name: string;
    };
    likes: any[];
    downloads: any[];
    views: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

export function UploadResourceForm({
  onClose,
  onSuccess,
}: UploadResourceFormProps) {
  const [formData, setFormData] = useState<ResourceFormData>({
    title: '',
    description: '',
    type: '',
    category: '',
    fileUrl: '',
    fileSize: '',
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.type) {
      newErrors.type = 'Type is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.fileUrl.trim()) {
      newErrors.fileUrl = 'File URL is required';
    }
    if (!formData.fileSize.trim()) {
      newErrors.fileSize = 'File size is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      setIsSubmitting(true);
  
      const resourceData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        type: formData.type,
        category: formData.category.toLowerCase(),
        fileUrl: formData.fileUrl.trim(),
        fileSize: formData.fileSize.trim(),
        tags: formData.tags,
        createdAt: new Date().toISOString(), // Add current timestamp
        updatedAt: new Date().toISOString()
      };
  
      const response = await resourceService.createResource(resourceData);
      
      // Type check the response
      const resourceResponse = response as ResourceResponse;
      
      if (resourceResponse._id) {
        onSuccess();
        onClose();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const serverErrors: FormErrors = {};
        err.response.data.errors.forEach((error: any) => {
          serverErrors[error.path] = error.msg;
        });
        setErrors(serverErrors);
      } else {
        setErrors({ submit: err.message || 'Failed to upload resource' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upload Resource</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* {errors && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
            {errors}
          </div>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Category</option>
                <option value="template">Template</option>
                <option value="guide">Guide</option>
                <option value="case-study">Case Study</option>
                <option value="report">Report</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Type</option>
                <option value="PDF">PDF</option>
                <option value="WORD">Word Document</option>
                <option value="EXCEL">Excel Spreadsheet</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              File URL
            </label>
            <input
              type="url"
              value={formData.fileUrl}
              onChange={(e) =>
                setFormData({ ...formData, fileUrl: e.target.value })
              }
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              File Size
            </label>
            <input
              type="text"
              value={formData.fileSize}
              onChange={(e) =>
                setFormData({ ...formData, fileSize: e.target.value })
              }
              required
              placeholder="e.g. 2MB"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), handleTagAdd())
                }
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Add tags"
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Uploading...' : 'Upload Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
