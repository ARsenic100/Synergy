import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { TimelineMilestone } from './TimelineMilestone';
import { MilestoneList } from '../milestone/MilestoneList';
// import { AddMilestoneModal } from './AddMilestoneModal';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Milestone {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  description: string;
  tasks: Task[];
}

export function PlanTimeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      title: 'Initial Assessment',
      date: '2024-03-15',
      status: 'completed',
      description: 'Complete infrastructure and resource assessment',
      tasks: [
        { id: '1', title: 'Facility audit', completed: true },
        { id: '2', title: 'Staff survey', completed: true },
        { id: '3', title: 'Resource inventory', completed: true },
      ],
    },
    {
      id: 2,
      title: 'Planning Phase',
      date: '2024-04-01',
      status: 'in-progress',
      description: 'Develop detailed transition strategy',
      tasks: [
        { id: '4', title: 'Budget allocation', completed: true },
        { id: '5', title: 'Timeline development', completed: false },
        { id: '6', title: 'Stakeholder consultation', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Implementation',
      date: '2024-05-15',
      status: 'pending',
      description: 'Execute transition plan',
      tasks: [
        { id: '7', title: 'Staff training', completed: false },
        { id: '8', title: 'Infrastructure updates', completed: false },
        { id: '9', title: 'System migration', completed: false },
      ],
    },
  ]);

  const handleTaskToggle = (taskId: string, completed: boolean) => {
    setMilestones(prevMilestones =>
      prevMilestones.map(milestone => ({
        ...milestone,
        tasks: milestone.tasks.map(task =>
          task.id === taskId ? { ...task, completed } : task
        ),
        status: milestone.tasks.some(task => task.id === taskId)
          ? milestone.tasks.every(task => 
              task.id === taskId ? completed : task.completed
            )
            ? 'completed'
            : 'in-progress'
          : milestone.status
      }))
    );
  };

  const handleAddMilestone = (data: any) => {
    const newMilestone: Milestone = {
      id: milestones.length + 1,
      title: data.title,
      date: data.endDate,
      status: 'pending',
      description: data.description,
      tasks: [], // Initial empty tasks array
    };

    setMilestones(prev => [...prev, newMilestone]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="max-w-7xl mx-auto px-4 py-8"><MilestoneList /></div>
      {/* <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Transition Timeline</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Milestone</span>
        </button>
      </div> */}

      {/* <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TimelineMilestone
              title={milestone.title}
              description={milestone.description}
              date={milestone.date}
              status={milestone.status}
              tasks={milestone.tasks}
              onTaskToggle={handleTaskToggle}
            />
          </motion.div>
        ))}
      </div> */}
      
      {/* <AddMilestoneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMilestone}
        existingMilestones={milestones.map(m => ({ id: m.id, title: m.title }))}
      /> */}
    </div>
  );
}