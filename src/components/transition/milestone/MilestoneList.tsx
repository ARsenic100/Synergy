import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AddMilestoneModal } from './AddMilestoneModal';
import { MilestoneCard } from './MilestoneCard';
import { Milestone } from '../../../types/milestone'; // Import the Milestone type from the correct path

const STORAGE_KEY = 'transition_milestones';

export function MilestoneList() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedMilestones = localStorage.getItem(STORAGE_KEY);
    if (savedMilestones) {
      setMilestones(JSON.parse(savedMilestones));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones));
  }, [milestones]);

  const handleSubmit = (data: any) => {
    if (editingMilestone) {
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === editingMilestone.id
            ? {
                ...data,
                id: m.id,
                subtasks: data.subtasks.map((st: any, index: number) => ({
                  ...st,
                  id: m.subtasks[index]?.id || `st-${Date.now()}-${index}`,
                  completed: m.subtasks[index]?.completed || false,
                })),
              }
            : m
        )
      );
    } else {
      const newMilestone: Milestone = {
        ...data,
        id: `m-${Date.now()}`,
        subtasks: data.subtasks.map((st: any, index: number) => ({
          ...st,
          id: `st-${Date.now()}-${index}`,
          completed: false,
        })),
      };
      setMilestones((prev) => [...prev, newMilestone]);
    }
    setShowModal(false);
    setEditingMilestone(null);
  };

  const handleEdit = (milestone: Milestone) => {
    setEditingMilestone(milestone);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSubtaskToggle = (milestoneId: string, subtaskId: string) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === milestoneId
          ? {
              ...m,
              subtasks: m.subtasks.map((st) =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
              ),
            }
          : m
      )
    );
  };

  const filteredMilestones = milestones.filter(
    (milestone) =>
      milestone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      milestone.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      milestone.subtasks.some((st) =>
        st.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search milestones..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Milestone</span>
        </button>
      </div>

      <AnimatePresence>
        {filteredMilestones.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">No milestones found. Create one to get started!</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredMilestones.map((milestone) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSubtaskToggle={handleSubtaskToggle}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <AddMilestoneModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingMilestone(null);
        }}
        onSubmit={handleSubmit}
        editData={editingMilestone || undefined}
      />
    </div>
  );
}