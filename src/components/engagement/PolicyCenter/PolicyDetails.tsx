import React from 'react';
import { X, Calendar, AlertCircle, Download, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Policy } from '../../../types/policy';

interface PolicyDetailsProps {
  policy: Policy;
  onClose: () => void;
}

export function PolicyDetails({ policy, onClose }: PolicyDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                policy.importance === 'high' ? 'bg-red-100' :
                policy.importance === 'medium' ? 'bg-yellow-100' :
                'bg-blue-100'
              }`}>
                <AlertCircle className={`h-6 w-6 ${
                  policy.importance === 'high' ? 'text-red-600' :
                  policy.importance === 'medium' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{policy.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    policy.category === 'infrastructure' ? 'bg-purple-100 text-purple-800' :
                    policy.category === 'academic' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {policy.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    policy.status === 'published' ? 'bg-green-100 text-green-800' :
                    policy.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {policy.status}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Published: {format(new Date(policy.createdAt), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Effective: {format(new Date(policy.effectiveDate), 'MMM d, yyyy')}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                Author: {policy.author.name}
              </div>
              {policy.approvedBy && (
                <div className="text-sm text-gray-600">
                  Approved by: {policy.approvedBy.name}
                </div>
              )}
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2">Summary</h3>
              <p className="text-gray-700">{policy.summary}</p>
            </div>

            <h3 className="text-lg font-semibold mb-4">Content</h3>
            <div className="bg-white border rounded-lg p-4">
              <p className="whitespace-pre-wrap text-gray-700">{policy.content}</p>
            </div>
          </div>

          {policy.attachments && policy.attachments.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Attachments</h3>
              <div className="space-y-3">
                {policy.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-700">{attachment.name}</span>
                    </div>
                    <a
                      href={attachment.url}
                      download
                      className="flex items-center gap-1 px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}