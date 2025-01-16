import { ResourceRequest } from '../models/resource-allocation/resourcerequest.model.js';
import { ResourceUtilization } from '../models/resource-allocation/resourceutilization.model.js';
import { Region } from '../models/resource-allocation/regionschema.model.js';
import { PolicyCompliance } from '../models/resource-allocation/policycompliance.model.js';
import budget from '../models/resource-allocation/budget.js';
import ResourceAllocation from '../models/resource-allocation/ResourceAllocation.js';
// import Budget from '../models/Budget.js';
import fundingSource from '../models/resource-allocation/fundingSource.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import SchoolDetail from '../models/SchoolDetail.js';
import School from "../models/School.js";

export const dashboardService = {
  // School Admin Dashboard
  async getSchoolDashboardData(req, res) {
    try {
      const { schoolUdiseCode } = req.body;

      const [requests, utilization] = await Promise.all([
        ResourceRequest.find({ schoolUdiseCode }),
        ResourceUtilization.find({ schoolUdiseCode }),
      ]);

      const data = {
        pendingRequests: requests.filter((r) => r.status === 'pending').length,
        approvedRequests: requests.filter((r) => r.status === 'approved')
          .length,
        completedRequests: requests.filter((r) => r.status === 'completed')
          .length,
        rejectedRequests: requests.filter((r) => r.status === 'rejected')
          .length,
        utilization: utilization.reduce((acc, curr) => {
          acc[curr.resourceType] = curr.utilizationPercentage;
          return acc;
        }, {}),
      };

      res.json(data);
    } catch (error) {
      console.error('Error in getSchoolDashboardData:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Regional Manager Dashboard
  async getRegionalDashboardData(req, res) {
    try {
      const { regionCode } = req.body;

      const region = await Region.findOne({ code: regionCode });
      const requests = await ResourceRequest.find({
        schoolUdiseCode: { $regex: `^${regionCode}` },
      });

      const data = {
        totalSchools: region ? region.totalSchools : 0,
        resourceRequests: requests.length,
        criticalCases: requests.filter((r) => r.priority === 'critical').length,
        distribution: await ResourceUtilization.aggregate([
          { $match: { schoolUdiseCode: { $regex: `^${regionCode}` } } },
          {
            $group: {
              _id: '$resourceType',
              averageUtilization: { $avg: '$utilizationPercentage' },
            },
          },
        ]),
      };

      res.json(data);
    } catch (error) {
      console.error('Error in getRegionalDashboardData:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // National Admin Dashboard
  async getNationalDashboardData(req, res) {
    try {
      const [regions, compliance] = await Promise.all([
        Region.find(),
        PolicyCompliance.find(),
      ]);

      const data = {
        totalRegions: regions.length,
        totalSchools: regions.reduce((acc, curr) => acc + curr.totalSchools, 0),
        budgetUtilized: regions.reduce(
          (acc, curr) => acc + curr.budgetUtilized,
          0
        ),
        compliance: compliance.reduce((acc, curr) => {
          acc[curr.metric] = curr.compliancePercentage;
          return acc;
        }, {}),
      };

      res.json(data);
    } catch (error) {
      console.error('Error in getNationalDashboardData:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Insert Data into Tables
  async insertResourceRequest(req, res) {
    try {
      const requestData = req.body;
      const newRequest = new ResourceRequest(requestData);
      await newRequest.save();
      res.status(201).json(newRequest);
    } catch (error) {
      console.error('Error in insertResourceRequest:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async insertResourceUtilization(req, res) {
    try {
      const utilizationData = req.body;
      const newUtilization = new ResourceUtilization(utilizationData);
      await newUtilization.save();
      res.status(201).json(newUtilization);
    } catch (error) {
      console.error('Error in insertResourceUtilization:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async insertRegion(req, res) {
    try {
      const regionData = req.body;
      const newRegion = new Region(regionData);
      await newRegion.save();
      res.status(201).json(newRegion);
    } catch (error) {
      console.error('Error in insertRegion:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async insertPolicyCompliance(req, res) {
    try {
      const complianceData = req.body;
      const newCompliance = new PolicyCompliance(complianceData);
      await newCompliance.save();
      res.status(201).json(newCompliance);
    } catch (error) {
      console.error('Error in insertPolicyCompliance:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export const getBudgetOverview = async (req, res) => {
  try {
    const currentFiscalYear = '2024-25';
    const Budget = await budget.findOne({ fiscal_year: currentFiscalYear });

    if (!Budget) {
      return res.status(404).json({ message: 'Budget data not found' });
    }

    return res.status(200).json({
      total_budget: Budget.total_budget,
      utilization_rate: Budget.utilization_rate,
      spent_budget: Budget.spent_budget,
      savings: Budget.savings,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllocationUtilization = async (req, res) => {
  try {
    // const currentFiscalYear = 'FY 2024-25';

    // const allocations = await ResourceAllocation.find({ fiscal_year: currentFiscalYear });
    const allocations = await ResourceAllocation.find();
    console.log(allocations);
    const categoryTotals = allocations.reduce((acc, allocation) => {
      const { category, allocated_amount, utilized_amount } = allocation;

      if (acc[category]) {
        acc[category].allocated += allocated_amount;
        acc[category].utilized += utilized_amount;
      } else {
        acc[category] = {
          category,
          allocated: allocated_amount,
          utilized: utilized_amount,
        };
      }

      return acc;
    }, {});

    const formattedData = Object.values(categoryTotals);

    return res.status(200).json(formattedData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFundingSources = async (req, res) => {
  try {
    // const currentFiscalYear = '2024-25';
    const sources = await fundingSource.find({
      // fiscal_year: currentFiscalYear,
    });

    const totalAmount = await fundingSource.aggregate([
      {
        $group: {
          _id: null,                // Grouping all documents together (no specific grouping key)
          totalAmount: { $sum: "$value" } // Summing the "amount" field
        }
      }
    ]);

    


    const formattedData = sources.map((source) => ({
      name: source.name,
      // value: source.percentage,
      value: source.value,
      total_amount: totalAmount[0]?.totalAmount
    }));

    return res.status(200).json(formattedData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addBudget = async (req, res) => {
  try {
    // Destructure input fields from the request body
    const {
      total_budget,
      allocated_budget,
      spent_budget,
      savings,
      fiscal_year,
    } = req.body;

    // Calculate utilization rate dynamically
    const utilization_rate = ((spent_budget / total_budget) * 100).toFixed(2);

    // Create a new Budget instance
    const newBudget = new budget({
      total_budget,
      allocated_budget,
      spent_budget,
      savings,
      fiscal_year,
      utilization_rate, // calculated value
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Save the new budget document to the database
    const savedBudget = await newBudget.save();

    // Send success response
    res.status(201).json({
      message: 'New budget entry created successfully!',
      budget: savedBudget,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: 'Error creating budget entry',
      error: error.message,
    });
  }
};

export const addFundingSource = async (req, res) => {
  try {
    // Destructure input fields from the request body
    const { name, percentage, value, fiscal_year } = req.body;

    // Validate input
    // if (!name || !percentage || !amount || !fiscal_year) {
    //   return res.status(400).json({
    //     message:
    //       'All fields (name, percentage, amount, fiscal_year) are required.',
    //   });
    // }

    // Create a new FundingSource instance
    const newFundingSource = new fundingSource({
      name,
      percentage,
      value,
      fiscal_year,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Save the new funding source document to the database
    const savedFundingSource = await newFundingSource.save();

    // Send success response
    res.status(201).json({
      message: 'New funding source created successfully!',
      fundingSource: savedFundingSource,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: 'Error creating funding source entry',
      error: error.message,
    });
  }
};

export const addResourceAllocation = async (req, res) => {
  try {
    // Destructure input fields from the request body
    const { category, allocated_amount, utilized_amount, fiscal_year } =
      req.body;

    // Validate required fields
    if (!category || !allocated_amount || !utilized_amount || !fiscal_year) {
      return res.status(400).json({
        message:
          'All fields (category, allocated_amount, utilized_amount, fiscal_year) are required.',
      });
    }

    // Check for valid category
    const validCategories = [
      'Infrastructure',
      'Technology',
      'Teaching Staff',
      'Learning Materials',
    ];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: `Invalid category. Allowed values are: ${validCategories.join(
          ', '
        )}`,
      });
    }

    // Create a new ResourceAllocation instance
    const newResourceAllocation = new ResourceAllocation({
      category,
      allocated_amount,
      utilized_amount,
      fiscal_year,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Save the new resource allocation document to the database
    const savedResourceAllocation = await newResourceAllocation.save();

    // Send success response
    res.status(201).json({
      message: 'New resource allocation created successfully!',
      resourceAllocation: savedResourceAllocation,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: 'Error creating resource allocation entry',
      error: error.message,
    });
  }
};

export const getAllResourceRequests = async (req, res) => {
  try {
    // Fetch all ResourceRequest documents
    const resourceRequests = await ResourceRequest.find();
    console.log(resourceRequests);
    // Map the fetched documents to the desired format
    const formattedRequests = resourceRequests.map(
      (resourceRequest, index) => ({
        id: resourceRequest._id,
        number: (index + 1).toString(), // Auto-generate sequential IDs for each request
        schoolId: resourceRequest.schoolUdiseCode,
        status: resourceRequest.status,
        createdAt: resourceRequest.createdAt.toISOString(),
        updatedAt: resourceRequest.updatedAt.toISOString(),
        resources: [
          {
            id: '1',
            type: 'classroom',
            category: resourceRequest.requestType,
            quantity: resourceRequest.quantity,
            estimatedCost: resourceRequest.estimatedcost,
            justification: resourceRequest.extra,
            priority: resourceRequest.priority,
            status: 'pending',
            dispatchStatus: 'pending',
          },
        ],
        totalEstimatedCost: resourceRequest.estimatedcost,
        priority: resourceRequest.priority,
      })
    );

    // Send the formatted data as response
    return res.status(200).json(formattedRequests);
  } catch (error) {
    console.error('Error fetching resource requests:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const approveResourceRequest = async (req, res) => {
  try {
    const { planId } = req.params;
    const resourceRequest = await ResourceRequest.findById(planId);

    if (!resourceRequest) {
      return res.status(404).json({ message: 'Resource request not found' });
    }

    resourceRequest.status = 'approved';
    await resourceRequest.save();

    res.status(200).json({ message: 'Resource request approved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error approving resource request' });
  }
};

// Reject a resource request
export const rejectResourceRequest = async (req, res) => {
  try {
    const { planId } = req.params;
    const resourceRequest = await ResourceRequest.findById(planId);

    if (!resourceRequest) {
      return res.status(404).json({ message: 'Resource request not found' });
    }

    resourceRequest.status = 'rejected';
    await resourceRequest.save();

    res.status(200).json({ message: 'Resource request rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error rejecting resource request' });
  }
};

// Modify a resource request (this can update the status or other details)
export const modifyResourceRequest = async (req, res) => {
  try {
    const { planId } = req.params;
    const updates = req.body;
    const resourceRequest = await ResourceRequest.findById(planId);

    if (!resourceRequest) {
      return res.status(404).json({ message: 'Resource request not found' });
    }

    // Modify the request (you can add more fields here for modification)
    resourceRequest.status = 'modified';
    if (updates.status) resourceRequest.status = updates.status; // example of modification

    await resourceRequest.save();

    res.status(200).json({ message: 'Resource request modified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error modifying resource request' });
  }
};

export const findResourceMatches = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const client = new GoogleGenerativeAI(
      'process.env.GEMINI_API_KEY'
    );

    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
    // Get requesting school details
    const requestingSchool = await SchoolDetail.findOne({ schoolID: schoolId });
    if (!requestingSchool) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Get all other schools
    const otherSchools = await SchoolDetail.find({
      schoolID: { $ne: schoolId },
    });

    // Prepare data for Gemini analysis
    const relevantData = {
      requestingSchool: {
        id: requestingSchool.schoolID,
        name: requestingSchool.schoolName,
        facilities: requestingSchool.availableFacilities,
        resources: {
          teachingStaff: requestingSchool.resourceDistribution.teachingStaff,
          classrooms: requestingSchool.resourceDistribution.classrooms,
          labs: requestingSchool.resourceDistribution.labs,
          digitalEquipment: requestingSchool.digitalEquipment,
        },
        location: {
          state: requestingSchool.state,
          district: requestingSchool.district,
        },
      },
      potentialMatches: otherSchools.map((school) => ({
        id: school.schoolID,
        name: school.schoolName,
        facilities: school.availableFacilities,
        resources: {
          teachingStaff: school.resourceDistribution.teachingStaff,
          classrooms: school.resourceDistribution.classrooms,
          labs: school.resourceDistribution.labs,
          digitalEquipment: school.digitalEquipment,
        },
        location: {
          state: school.state,
          district: school.district,
        },
      })),
    };

    const prompt = `
      Analyze the resource sharing potential between schools.
      Requesting School: ${JSON.stringify(relevantData.requestingSchool)}
      Potential Matches: ${JSON.stringify(relevantData.potentialMatches)}
      
      Return JSON in this format:
      {
        "matches": [
          {
            "schoolId": "string",
            "schoolName": "string",
            "matchScore": number (0-100),
            "potentialResources": ["resource1", "resource2"],
            "reasonForMatch": "string",
            "location": {
              "state": "string",
              "district": "string"
            }
          }
        ]
      }
      
      Consider:
      1. Complementary resources (one has what other needs)
      2. Geographic proximity (same district/state preferred)
      3. Similar school characteristics
      4. Resource availability and utilization
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log('Response from Gemini:', responseText);
    let cleanedResponse = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^[^[{]*/, '')
      .replace(/[^}\]]*$/, '')
      .trim();

    if (!cleanedResponse.startsWith('{') || !cleanedResponse.endsWith('}')) {
      throw new Error('Invalid JSON array structure');
    }
    const analysis = JSON.parse(cleanedResponse);

    // Sort matches by score and get top 5
    const topMatches = analysis.matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    res.json(topMatches);
  } catch (error) {
    console.error('Error finding resource matches:', error);
    res.status(500).json({ message: error.message });
  }
};

export const initiateResourceMatch = async (req, res) => {
  try {
    const { requestingSchoolId, matchedSchoolId, resourceType } = req.body;

    const resourceMatch = {
      requestingSchoolId,
      matchedSchoolId,
      resourceType,
      status: 'pending',
      matchScore: req.body.matchScore,
    };

    const resourcePlan = await ResourceRequest.findOneAndUpdate(
      { schoolUdiseCode: requestingSchoolId },
      { $push: { resourceMatches: resourceMatch } },
      { new: true, upsert: true }
    );

    res.json(resourcePlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const respondToResourceMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { status } = req.body;

    const resourcePlan = await ResourceRequest.findOneAndUpdate(
      { 'resourceMatches._id': matchId },
      { $set: { 'resourceMatches.$.status': status } },
      { new: true }
    );

    res.json(resourcePlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const shareResource = async (req, res) => {
//   try {
//     const {
//       schoolId,
//       resources,
//     } = req.body;

//     // Validate request body
//     if (!schoolId || !resources || !Array.isArray(resources)) {
//       return res.status(400).json({
//         message: 'Invalid request body. Required: schoolId and resources array',
//       });
//     }

//     // Validate each resource in the array
//     for (const resource of resources) {
//       if (
//         !resource.resourceType ||
//         !resource.totalQuantity ||
//         !resource.sharedQuantity
//       ) {
//         return res.status(400).json({
//           message:
//             'Each resource must have resourceType, totalQuantity, and sharedQuantity',
//         });
//       }

//       if (resource.sharedQuantity > resource.totalQuantity) {
//         return res.status(400).json({
//           message: 'Shared quantity cannot exceed total quantity',
//         });
//       }
//     }

//     // Validate school exists
//     const school = await SchoolDetail.findOne({ schoolID: schoolId });
//     if (!school) {
//       return res.status(404).json({ message: 'School not found' });
//     }

//     // Validate school has the resources they're trying to share
//     for (const resource of resources) {
//       const facilityExists = school.availableFacilities[resource.resourceType];
//       if (!facilityExists) {
//         return res.status(400).json({
//           message: `School does not have the facility: ${resource.resourceType}`,
//         });
//       }
//     }

//     // Create shared resources with validated data
//     const sharedResources = resources.map((resource) => ({
//       schoolId,
//       resourceType: resource.resourceType,
//       totalQuantity: resource.totalQuantity,
//       sharedQuantity: resource.sharedQuantity,
//       availableFrom: resource.availableFrom || new Date(),
//       availableTo: resource.availableTo,
//       description: resource.description || '',
//       status: 'available',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }));

//     // Find existing resource request or create new one
//     const resourceRequest = await ResourceRequest.findOneAndUpdate(
//       { schoolUdiseCode: schoolId },
//       {
//         $push: {
//           sharedResources: {
//             $each: sharedResources,
//           },
//         },
//         $setOnInsert: {
//           requestType: 'Infrastructure',
//           status: 'pending',
//           estimatedcost: 0,
//           quantity: 1,
//           priority: 'low',
//         },
//       },
//       {
//         new: true,
//         upsert: true,
//         runValidators: true,
//       }
//     );

//     // Return success response with created resources
//     res.status(201).json({
//       message: 'Resources shared successfully',
//       data: resourceRequest.sharedResources,
//     });
//   } catch (error) {
//     console.error('Error sharing resources:', error);
//     res.status(500).json({
//       message: 'Internal server error while sharing resources',
//       error: error.message,
//     });
//   }
// };




export const shareResource = async (req, res) => {
  try {
    const { 
      schoolId,
      resources
    } = req.body;

    // Validate request body
    if (!schoolId || !resources || !Array.isArray(resources)) {
      return res.status(400).json({ 
        message: 'Invalid request body. Required: schoolId and resources array' 
      });
    }

    // Validate each resource in the array
    for (const resource of resources) {
      if (!resource.resourceType || !resource.totalQuantity || !resource.sharedQuantity) {
        return res.status(400).json({
          message: 'Each resource must have resourceType, totalQuantity, and sharedQuantity'
        });
      }

      if (resource.sharedQuantity > resource.totalQuantity) {
        return res.status(400).json({
          message: 'Shared quantity cannot exceed total quantity'
        });
      }
    }
    
    // Validate school exists
    const school = await SchoolDetail.findOne({ schoolID: schoolId });
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Validate school has the resources they're trying to share
    for (const resource of resources) {
      const facilityExists = school.availableFacilities[0][resource.resourceType];
      if (!facilityExists) {
        return res.status(400).json({
          message: `School does not have the facility: ${resource.resourceType}`
        });
      }
    }

    // Create shared resources with validated data
    const sharedResources = resources.map(resource => ({
      schoolId,
      resourceType: resource.resourceType,
      totalQuantity: resource.totalQuantity,
      sharedQuantity: resource.sharedQuantity,
      availableFrom: resource.availableFrom || new Date(),
      availableTo: resource.availableTo,
      description: resource.description || '',
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Find existing resource request or create new one
    const resourceRequest = await ResourceRequest.findOneAndUpdate(
      { schoolUdiseCode: schoolId },
      { 
        $push: { 
          sharedResources: { 
            $each: sharedResources 
          } 
        },
        $setOnInsert: {
          requestType: 'Infrastructure',
          status: 'pending',
          estimatedcost: 0,
          quantity: 1,
          priority: 'low'
        }
      },
      { 
        new: true, 
        upsert: true,
        runValidators: true
      }
    );

    // Return success response with created resources
    res.status(201).json({
      message: 'Resources shared successfully',
      data: resourceRequest.sharedResources
    });

  } catch (error) {
    console.error('Error sharing resources:', error);
    res.status(500).json({ 
      message: 'Internal server error while sharing resources',
      error: error.message 
    });
  }
};

export const getAvailableResources = async (req, res) => {
  try {
    const { schoolId, resourceType } = req.query;
    const query = {
      'sharedResources.status': 'available'
    };

    if (schoolId) {
      query.schoolUdiseCode = { $ne: schoolId }; // Exclude requesting school's resources
    }

    if (resourceType) {
      query['sharedResources.resourceType'] = resourceType;
    }

    const requests = await ResourceRequest.find(query)
      .select('schoolUdiseCode sharedResources')
      .populate('schoolUdiseCode', 'schoolName district state');

    const availableResources = requests.flatMap(request => 
      request.sharedResources
        .filter(resource => resource.status === 'available')
        .map(resource => ({
          ...resource.toObject(),
          schoolName: request.schoolUdiseCode.schoolName,
          location: {
            district: request.schoolUdiseCode.district,
            state: request.schoolUdiseCode.state
          }
        }))
    );

    res.json(availableResources);
  } catch (error) {
    console.error('Error fetching available resources:', error);
    res.status(500).json({ 
      message: 'Internal server error while fetching available resources',
      error: error.message 
    });
  }
};

export const requestSharedResource = async (req, res) => {
  try {
    const { requestingSchoolId, resourceId } = req.body;

    // Validate request body
    if (!requestingSchoolId || !resourceId) {
      return res.status(400).json({
        message: 'Required: requestingSchoolId and resourceId'
      });
    }

    // Find the resource request containing the shared resource
    const resourceRequest = await ResourceRequest.findOne({
      'sharedResources._id': resourceId
    });

    if (!resourceRequest) {
      return res.status(404).json({ message: 'Shared resource not found' });
    }

    // Find and update the specific shared resource
    const sharedResource = resourceRequest.sharedResources.id(resourceId);
    
    if (sharedResource.status !== 'available') {
      return res.status(400).json({ 
        message: 'This resource is no longer available' 
      });
    }

    // Update the resource status
    sharedResource.status = 'shared';
    await resourceRequest.save();

    // Create a new resource request for the requesting school
    const newRequest = new ResourceRequest({
      schoolUdiseCode: requestingSchoolId,
      requestType: 'Infrastructure',
      status: 'pending',
      estimatedcost: 0,
      quantity: sharedResource.sharedQuantity,
      priority: 'medium',
      sharedResources: [{
        ...sharedResource.toObject(),
        status: 'pending'
      }]
    });

    await newRequest.save();

    res.json({
      message: 'Resource request submitted successfully',
      data: newRequest
    });

  } catch (error) {
    console.error('Error requesting shared resource:', error);
    res.status(500).json({ 
      message: 'Internal server error while requesting shared resource',
      error: error.message 
    });
  }
};

export const resourcemap = async(req,res) => {
  try {
    // Fetch all distinct UDISE codes with one resource request each
    // const resourceRequests = await ResourceRequest.aggregate([
    //   {
    //     $group: {
    //       _id: '$schoolUdiseCode',
    //       request: { $first: '$$ROOT' },
    //     },
    //   },
    // ]);

    const resourceRequestsMap = new Map();

    const allRequests = await ResourceRequest.find();
    allRequests.forEach((request) => {
      if (!resourceRequestsMap.has(request.schoolUdiseCode.toString())) {
        resourceRequestsMap.set(request.schoolUdiseCode.toString(), request);
      }
    });

    const resourceRequests = Array.from(resourceRequestsMap.values());
    
    


    console.log(resourceRequests);
    // Extract UDISE codes
    const udiseCodes = resourceRequests.map((req) => req.schoolUdiseCode);
    console.log('udiseCode',udiseCodes);
    // Find schools matching the UDISE codes
    // const schoolsds = await School.find();
    // console.log(schoolsds);
    const schools = await School.find({ 'schoolUDISECode': { $in: udiseCodes } });
    console.log('schools',schools);
    // Join the resource requests with schools and cards
    const locations = [];
    // console.log(udiseCodes);
    // console.log(schools);
    for (const resource of resourceRequests) {
      const school = schools.find(
        (s) => s.schoolUDISECode.toString() === resource.schoolUdiseCode.toString()
      );
      console.log(school);
      console.log(resource);
      if (!school) continue;
      

      // Fetch card details
      // const card = await Card.findOne({ schoolId: school.schoolId });
      // if (!card) continue;
      
      locations.push({
        id: resource._id,
        lat: school.coordinates.lat,
        lng: school.coordinates.lng,
        schoolName: school.name,
        resourceType: resource.requestType,
        status: resource.status,
        quantity: resource.quantity,
        lastUpdated: resource.updatedAt,
        estimatedDelivery: "12-04-2024",
      });
    }

    res.status(200).json(locations);
  } catch (error) {
    console.error('Error fetching resource allocations:', error);
    res.status(500).json({ error: 'An error occurred while fetching resource allocations' });
  }
}

export const getschooldistribution = async (req, res) => {
  try {
    // Validate the _id if any query involves it (not shown in this example)
    
    // Fetch the total count for all schools
    const totalSchools = await SchoolDetail.countDocuments();
    console.log(totalSchools);

    // Fetch counts for each category
    const urbanCount = await SchoolDetail.countDocuments({ ruralUrban: "2-Urban" });
    const ruralCount = await SchoolDetail.countDocuments({ ruralUrban: "1-Rural" });
    const remoteCount = await SchoolDetail.countDocuments({ ruralUrban: "3-Remote" });

    if (totalSchools === 0) {
      return res.status(200).json({
        success: true,
        message: "No schools found in the database",
        totalSchools: 0,
        distributionData: [],
      });
    }

    // Calculate percentages and format the response
    const distributionData = [
      { name: 'Urban Schools', value: Math.round((urbanCount / totalSchools) * 100) },
      { name: 'Rural Schools', value: Math.round((ruralCount / totalSchools) * 100) },
      { name: 'Remote Areas', value: Math.round((remoteCount / totalSchools) * 100) },
    ];

    // Send the JSON response
    return res.json({
      success: true,
      totalSchools: totalSchools,
      distributionData: distributionData,
    });
  } catch (error) {
    console.error("Error fetching school distribution data:", error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};


export const analyzeResourceRequests = async (req, res) => {
  try {
    const client = new GoogleGenerativeAI(
      'process.env.GEMINI_API_KEY'
    );

    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Get all resource requests
    const requests = await ResourceRequest.find();
    const analyzedRequests = [];

    for (const request of requests) {
      // Get school details for each request
      const schoolDetails = await SchoolDetail.findOne({ 
        schoolID: request.schoolUdiseCode 
      });

      if (!schoolDetails) continue;

      // Prepare data for Gemini analysis
      const analysisData = {
        request: {
          type: request.requestType,
          quantity: request.quantity,
          cost: request.estimatedcost,
          priority: request.priority
        },
        school: {
          totalStudents: schoolDetails.totalStudents,
          totalTeachers: schoolDetails.totalTeachers,
          facilities: schoolDetails.availableFacilities,
          infrastructure: schoolDetails.infrastructureQuality,
          location: {
            state: schoolDetails.state,
            district: schoolDetails.district,
            ruralUrban: schoolDetails.ruralUrban
          },
          performance: {
            qualityScore: schoolDetails.qualityScore,
            resourceUtilization: schoolDetails.resourceUtilizationEfficiency
          }
        }
      };

      const prompt = `
        Analyze this resource request and school data:
        ${JSON.stringify(analysisData, null, 2)}

        Provide a JSON response with:
        {
          "urgencyScore": (number between 0-1),
          "predictedNeed": (number between 0-1),
          "contextScore": (number between 0-1),
          "recommendations": ["string1", "string2"]
        }

        Consider:
        - Current resource utilization
        - School performance and needs
        - Local context and demographics
        - Cost-benefit analysis
      `;


      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      let cleanedResponse = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/^[^[{]*/, '')
        .replace(/[^}\]]*$/, '')
        .trim();
  
      if (!cleanedResponse.startsWith('{') || !cleanedResponse.endsWith('}')) {
        throw new Error('Invalid JSON array structure');
      }
      const analysisResult = JSON.parse(cleanedResponse);

      console.log(analysisResult)

      // Calculate average score
      const averageScore = (
        analysisResult.urgencyScore + 
        analysisResult.predictedNeed + 
        analysisResult.contextScore
      ) / 3;

      // Update request with AI analysis
      await ResourceRequest.findByIdAndUpdate(request._id, {
        aiAnalysis: {
          ...analysisResult,
          averageScore,
          lastAnalyzed: new Date()
        }
      });

      analyzedRequests.push({
        requestId: request._id,
        schoolId: request.schoolUdiseCode,
        schoolName: schoolDetails.schoolName,
        requestDetails: {
          type: request.requestType,
          quantity: request.quantity,
          cost: request.estimatedcost,
          priority: request.priority
        },
        analysis: {
          ...analysisResult,
          averageScore
        }
      });
    }

    // Sort by average score
    analyzedRequests.sort((a, b) => 
      b.analysis.averageScore - a.analysis.averageScore
    );

    res.json(analyzedRequests);
  } catch (error) {
    console.error('Error analyzing resource requests:', error);
    res.status(500).json({ 
      message: 'Error analyzing resource requests',
      error: error.message 
    });
  }
};