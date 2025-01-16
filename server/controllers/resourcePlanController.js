import ResourcePlan from '../models/ResourcePlan.js';
import SchoolDetail from '../models/SchoolDetail.js';

export const resourcePlanController = {
  // Create new resource plan
  async createResourcePlan(req, res) {
    try {
      const { schoolId, resourceType, quantity, priority } = req.body;

      // // Validate school exists
      // const school = await SchoolDetail.getSchoolDetail(schoolId);
      // console.log('School:', school);
      // if (!school) {
      //   return res.status(404).json({ message: 'School not found' });
      // }
      // Calculate estimated cost based on resource type and quantity
      const estimatedCost = calculateEstimatedCost(resourceType, quantity);

      const resourcePlan = new ResourcePlan({
        schoolId,
        resourceType,
        quantity,
        priority,
        estimatedCost,
        status: 'pending'
      });

      await resourcePlan.save();
      res.status(201).json(resourcePlan);
    } catch (error) {
      res.status(500).json({ message: 'Error creating resource plan', error });
    }
  },

  // Get all resource plans
  async getResourcePlans(req, res) {
    try {
      const { schoolId, status } = req.query;
      const query = {};
      
      if (schoolId) query.schoolId = schoolId;
      if (status) query.status = status;

      const resourcePlans = await ResourcePlan.find(query);
      res.json(resourcePlans);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching resource plans', error });
    }
  },

  // Update resource plan status
  async updateResourcePlan(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const resourcePlan = await ResourcePlan.findByIdAndUpdate(
        id,
        { ...updates },
        { new: true }
      );

      if (!resourcePlan) {
        return res.status(404).json({ message: 'Resource plan not found' });
      }

      res.json(resourcePlan);
    } catch (error) {
      res.status(500).json({ message: 'Error updating resource plan', error });
    }
  },

  // Get resource metrics
  async getResourceMetrics(req, res) {
    try {
      const { schoolId } = req.query;
      const query = {};
      
      if (schoolId) query.schoolId = schoolId;

      const resourcePlans = await ResourcePlan.find(query);
      
      const metrics = calculateResourceMetrics(resourcePlans);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching resource metrics', error });
    }
  }
};

// Helper functions
function calculateEstimatedCost(resourceType, quantity) {
  const baseCosts = {
    'infrastructure': 100000,
    'teaching': 50000,
    'technology': 75000,
    'equipment': 25000
  };

  return (baseCosts[resourceType] || 10000) * quantity;
}

function calculateResourceMetrics(resourcePlans) {
  const totalPlans = resourcePlans.length;
  if (totalPlans === 0) {
    return {
      utilizationRate: 0,
      implementationProgress: 0,
      deliveryEfficiency: 0,
      satisfactionScore: 0,
      status: {
        pending: 0,
        approved: 0,
        completed: 0,
        rejected: 0
      }
    };
  }

  const status = {
    pending: resourcePlans.filter(p => p.status === 'pending').length,
    approved: resourcePlans.filter(p => p.status === 'approved').length,
    completed: resourcePlans.filter(p => p.implementationStatus === 'completed').length,
    rejected: resourcePlans.filter(p => p.status === 'rejected').length
  };

  const avgUtilization = resourcePlans.reduce((sum, plan) => sum + (plan.utilizationRate || 0), 0) / totalPlans;
  const avgDelivery = resourcePlans.reduce((sum, plan) => sum + (plan.deliveryEfficiency || 0), 0) / totalPlans;
  const avgSatisfaction = resourcePlans.reduce((sum, plan) => sum + (plan.satisfactionScore || 0), 0) / totalPlans;

  return {
    utilizationRate: avgUtilization,
    implementationProgress: (status.completed / totalPlans) * 100,
    deliveryEfficiency: avgDelivery,
    satisfactionScore: avgSatisfaction,
    status
  };
}