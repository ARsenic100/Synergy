import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface AddContactFormProps {
  onSubmit: (data: any) => Promise<void>;
  onClose: () => void;
}

interface FormDataType {
  name: string;
  role: string;
  organization: string;
  location: {
    state: string;
    district: string;
    address: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  expertise: string[];
  imageUrl?: string;
  availability: string;
}

export function AddContactForm({ onSubmit, onClose }: AddContactFormProps) {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    role: '',
    organization: '',
    location: {
      state: '',
      district: '',
      address: '',
    },
    contact: {
      email: '',
      phone: '',
    },
    expertise: [],
    availability: 'available',
  });
  const [expertiseInput, setExpertiseInput] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxSize: 5242880,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setProfileImage(acceptedFiles[0]);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, any>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleAddExpertise = () => {
    if (
      expertiseInput.trim() &&
      !formData.expertise.includes(expertiseInput.trim())
    ) {
      const newExpertise = [...formData.expertise, expertiseInput.trim()];
      setFormData((prev) => ({
        ...prev,
        expertise: newExpertise,
      }));
      setExpertiseInput('');

      // Clear expertise error if it exists
      if (errors.expertise) {
        setErrors((prev) => ({
          ...prev,
          expertise: '',
        }));
      }
    }
  };

  const handleRemoveExpertise = (item: string) => {
    const newExpertise = formData.expertise.filter((exp) => exp !== item);
    setFormData((prev) => ({
      ...prev,
      expertise: newExpertise,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.organization.trim())
      newErrors.organization = 'Organization is required';
    if (!formData.location.state.trim())
      newErrors['location.state'] = 'State is required';
    if (!formData.location.district.trim())
      newErrors['location.district'] = 'District is required';
    if (!formData.contact.email.trim()) {
      newErrors['contact.email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contact.email)) {
      newErrors['contact.email'] = 'Invalid email address';
    }
    if (!formData.contact.phone.trim()) {
      newErrors['contact.phone'] = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.contact.phone.replace(/\D/g, ''))) {
      newErrors['contact.phone'] = 'Phone number must be 10 digits';
    }
    if (formData.expertise.length === 0) {
        newErrors.expertise = 'At least one expertise is required';
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const imageUrl = profileImage
        ? URL.createObjectURL(profileImage)
        : undefined;

      await onSubmit({
        ...formData,
        imageUrl,
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add New Contact</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Role</option>
                  <option value="School Administrator">
                    School Administrator
                  </option>
                  <option value="Education Policy Expert">
                    Education Policy Expert
                  </option>
                  <option value="Teacher">Teacher</option>
                  <option value="Support Staff">Support Staff</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Organization
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.organization && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.organization}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  District
                </label>
                <input
                  type="text"
                  name="location.district"
                  value={formData.location.district}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.district && (
                  <p className="mt-1 text-sm text-red-600">{errors.district}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="location.address"
                value={formData.location.address}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="contact.email"
                  value={formData.contact.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="contact.phone"
                  value={formData.contact.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expertise
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  value={expertiseInput}
                  onChange={(e) => setExpertiseInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' &&
                    (e.preventDefault(), handleAddExpertise())
                  }
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Add expertise"
                />
                <button
                  type="button"
                  onClick={handleAddExpertise}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.expertise.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveExpertise(item)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              {errors.expertise && (
                <p className="mt-1 text-sm text-red-600">{errors.expertise}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Image (Optional)
              </label>
              <div
                {...getRootProps()}
                className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer"
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag & drop an image here, or click to select
                </p>
                <p className="text-xs text-gray-500">
                  Max file size: 5MB. Supported formats: PNG, JPG
                </p>
              </div>
              {profileImage && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {profileImage.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setProfileImage(null)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Adding Contact...' : 'Add Contact'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
