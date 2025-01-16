import React, { useState } from 'react';
import { Target, Calendar, Plus } from 'lucide-react';
import { RegionalGoal } from '../../../../types/progress';
import { GoalMilestones } from './GoalMilestones';
import { motion, AnimatePresence } from 'framer-motion';

interface RegionalGoalsProps {
  goals: RegionalGoal[];
  onAddGoal?: (goal: Omit<RegionalGoal, 'id'>) => Promise<void>;
  onUpdateGoal?: (
    goalId: string,
    progress: number,
    milestones: { title: string; completed: boolean }[]
  ) => Promise<void>;
}

export function RegionalGoals({ goals, onAddGoal, onUpdateGoal }: RegionalGoalsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    deadline: '',
    milestones: [{ title: '', completed: false }]
  });

  const handleAddMilestone = () => {
    setNewGoal(prev => ({
      ...prev,
      milestones: [...prev.milestones, { title: '', completed: false }]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddGoal) {
      await onAddGoal({
        ...newGoal,
        progress: 0,
        state: 'current-state', // Replace with actual state
      });
      setShowAddForm(false);
      setNewGoal({
        title: '',
        deadline: '',
        milestones: [{ title: '', completed: false }]
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="h-6 w-6 text-indigo-600" />
          <h3 className="text-lg font-semibold">Regional Goals</h3>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Goal</span>
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4 border rounded-lg p-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Goal Title
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={e => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deadline
                </label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={e => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Milestones
                </label>
                {newGoal.milestones.map((milestone, index) => (
                  <input
                    key={index}
                    type="text"
                    value={milestone.title}
                    onChange={e => {
                      const newMilestones = [...newGoal.milestones];
                      newMilestones[index].title = e.target.value;
                      setNewGoal(prev => ({ ...prev, milestones: newMilestones }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ))}
                <button
                  type="button"
                  onClick={handleAddMilestone}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Add Milestone
                </button>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Goal
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-medium">{goal.title}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <span className="text-2xl font-bold text-indigo-600">
                {goal.progress}%
              </span>
            </div>

            <GoalMilestones
              milestones={goal.milestones}
              onToggle={
                onUpdateGoal
                  ? (index) => {
                      const newMilestones = [...goal.milestones];
                      newMilestones[index].completed = !newMilestones[index].completed;
                      const progress = Math.round(
                        (newMilestones.filter((m) => m.completed).length /
                          newMilestones.length) *
                          100
                      );
                      onUpdateGoal(goal.id, progress, newMilestones);
                    }
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}