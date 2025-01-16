import { Router } from "express";
import { addBudget, addFundingSource, addResourceAllocation, approveResourceRequest, dashboardService, findResourceMatches, getAllResourceRequests, initiateResourceMatch, modifyResourceRequest, rejectResourceRequest, respondToResourceMatch } from "../controllers/resourceallocation.controllers.js";
import { getBudgetOverview,getAllocationUtilization,getFundingSources } from "../controllers/resourceallocation.controllers.js";
import { getAllFeedback, submitFeedback, updateFeedbackStatus } from "../controllers/feedbackController.js";
const router = Router();


router.get('/matches/:schoolId', findResourceMatches);
router.post('/matches', initiateResourceMatch);
router.put('/matches/:matchId/respond', respondToResourceMatch);

// Dashboard Endpoints
router.post('/school-dashboard', dashboardService.getSchoolDashboardData);
router.post('/regional-dashboard', dashboardService.getRegionalDashboardData);
router.post('/national-dashboard', dashboardService.getNationalDashboardData);

// Insert Data Endpoints
router.post('/insert-resource-request', dashboardService.insertResourceRequest);
router.post('/insert-resource-utilization', dashboardService.insertResourceUtilization);
router.post('/insert-region', dashboardService.insertRegion);
router.post('/insert-policy-compliance', dashboardService.insertPolicyCompliance);

router.get('/budget-overview', getBudgetOverview);
router.get('/allocation-utilization', getAllocationUtilization);
router.get('/funding-sources', getFundingSources);

router.post('/add-budget',addBudget);
router.post('/addFundingSource',addFundingSource);
router.post('/addResourceAllocation',addResourceAllocation);

router.get('/feedback', getAllFeedback);
router.post('/feedback', submitFeedback);
router.put('/feedback/:id', updateFeedbackStatus);

router.get("/getallresourcerequests", getAllResourceRequests);

router.put('/approve/:planId', approveResourceRequest);
router.put('/reject/:planId', rejectResourceRequest);
router.put('/modify/:planId', modifyResourceRequest);








export default router;
