import { addComplianceItem, getComplianceCategories, getComplianceStats, updateItemStatus } from "../controllers/StandardController.js";
import express from "express";
const router = express.Router();

router.get('/categories', getComplianceCategories);
router.post('/item', addComplianceItem);
router.patch('/item', updateItemStatus);
// router.delete('/item/:id', dele);
router.get('/stats', getComplianceStats);

export default router;