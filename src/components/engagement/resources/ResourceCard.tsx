import React, { useEffect } from 'react';
import { FileText, Download, Eye, ThumbsUp, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { resourceService } from '../../../services/resourceService';

interface ResourceCardProps {
  resource: {
    _id: string;
    title: string;
    description: string;
    type: string;
    category: string;
    fileUrl: string;
    uploadedBy: {
      _id: string;
      name: string;
    };
    fileSize: string;
    likes: any[];
    downloads: any[];
    views: any[];
    createdAt: string;
    updatedAt: string;
  };
  onUpdate: () => void;
}

export function ResourceCard({ resource, onUpdate }: ResourceCardProps) {
  useEffect(() => {
    // Record view when card is mounted
    const recordResourceView = async () => {
      try {
        await resourceService.recordView(resource._id);
        onUpdate();
      } catch (error) {
        console.error('Error recording view:', error);
      }
    };
    recordResourceView();
  }, [resource._id]);

  const handleDownload = async () => {
    try {
      const response = await resourceService.downloadResource(resource._id);
      // Open the download URL in a new tab
      window.open(response.downloadUrl, '_blank');
      onUpdate();
    } catch (error) {
      console.error('Error downloading resource:', error);
    }
  };

  const handleLike = async () => {
    try {
      await resourceService.toggleLike(resource._id);
      onUpdate();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-indigo-50 rounded-lg">
          <FileText className="h-6 w-6 text-indigo-600" />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{resource.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{resource.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs ${
              resource.category === 'template' ? 'bg-blue-100 text-blue-800' :
              resource.category === 'guide' ? 'bg-green-100 text-green-800' :
              resource.category === 'case-study' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {resource.category}
            </span>
          </div>

          <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
            <button onClick={handleDownload} className="flex items-center gap-1 hover:text-indigo-600">
              <Download className="h-4 w-4" />
              <span>{resource.downloads} downloads</span>
            </button>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{resource.views} views</span>
            </div>
            <button onClick={handleLike} className="flex items-center gap-1 hover:text-indigo-600">
              <ThumbsUp className="h-4 w-4" />
              <span>{resource.likes} likes</span>
            </button>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(resource.createdAt), 'MMM d, yyyy')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
            Uploaded by {resource.uploadedBy.name} • {resource.fileSize}
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}