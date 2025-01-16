import React, { useState, useEffect } from 'react';
import { Download, FileText, Trash2 } from 'lucide-react'; // Added Trash2 icon
import { motion } from 'framer-motion';
import { reportsService } from '../../../services/reportsService';

export function RecentReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await reportsService.getReports();
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id: string, title: string) => {
    try {
      const blob = await reportsService.downloadReport(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '_')}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading report:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        setDeleting(id);
        await reportsService.deleteReport(id);
        setReports(reports.filter((report: any) => report._id !== id));
      } catch (err) {
        console.error('Error deleting report:', err);
      } finally {
        setDeleting(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report: any) => (
        <motion.div
          key={report._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex-1">
            <h4 className="font-medium">{report.title}</h4>
            <p className="text-sm text-gray-600">{report.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              <span>{report.format}</span>
              <span>{report.size}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownload(report._id, report.title)}
              className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
            >
              <Download className="h-5 w-5" />
              Download
            </button>
            <button
              onClick={() => handleDelete(report._id)}
              disabled={deleting === report._id}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
            >
              {deleting === report._id ? (
                <div className="h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 className="h-5 w-5" />
              )}
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}