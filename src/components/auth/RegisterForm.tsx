import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RegisterData, Role } from '../../types/auth';
import { User, Mail, Lock, Upload, Building2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum([
    'NORMAL',
    'SCHOOL_ADMIN',
    'SUPER_ADMIN',
    'POLICY_MAKER',
    'SUPPORT_STAFF',
    'AUDITOR',
  ] as const),
  schoolId: z.string().optional(),
  documents: z.any().optional(),
});

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void;
  loading?: boolean;
  error?: string | null;
}

export function RegisterForm({ onSubmit, loading, error }: RegisterFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const selectedRole = watch('role');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 3,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const handleFormSubmit = (data: RegisterData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', data.role);

    if (data.schoolId) {
      formData.append('schoolId', data.schoolId);
    }

    files.forEach((file) => {
      formData.append('document', file);
    });

    onSubmit(formData as any);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" encType="multipart/form-data">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <div className="mt-1 relative">
          <input
            {...register('name')}
            type="text"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="John Doe"
          />
          <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1 relative">
          <input
            {...register('email')}
            type="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="you@example.com"
          />
          <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <input
            {...register('password')}
            type="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <div className="mt-1 relative">
          <select
            {...register('role')}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="NORMAL">Normal User</option>
            <option value="SCHOOL_ADMIN">School Administrator</option>
            <option value="SUPER_ADMIN">Super Administrator</option>
            
          </select>
          <Building2 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      {selectedRole === 'SCHOOL_ADMIN' && (
        <div>
          <label htmlFor="schoolId" className="block text-sm font-medium text-gray-700">
            UDISE Code
          </label>
          <div className="mt-1 relative">
            <input
              {...register('schoolId')}
              type="text"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter School ID"
            />
            <Building2 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.schoolId && (
            <p className="mt-1 text-sm text-red-600">{errors.schoolId.message}</p>
          )}
        </div>
      )}

      {/* {selectedRole !== 'NORMAL' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Documents (Optional)
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
            }`}
          >
            <input {...getInputProps()} name="document" />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive
                ? 'Drop the files here...'
                : 'Drag and drop files here, or click to select files'}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PDF, PNG, JPG up to 10MB each
            </p>
          </div>
          {files.length > 0 && (
            <ul className="mt-3 divide-y divide-gray-200">
              {files.map((file) => (
                <li key={file.name} className="py-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFiles(files.filter((f) => f !== file))}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )} */}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
}
