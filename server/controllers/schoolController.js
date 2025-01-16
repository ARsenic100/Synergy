import School from '../models/School.js';
import { validationResult } from 'express-validator';

// Get a list of all schools
export const getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a school by ID
export const getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new school
export const addSchool = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const school = new School(req.body);
    await school.save();
    res.status(201).json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update school details
export const updateSchool = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const school = await School.findOne({schoolUDISECode: req.params.id});
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Update school fields
    Object.assign(school, req.body);
    school.lastUpdated = new Date();
    
    await school.save();
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a school
export const deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    res.json({ message: 'School deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get school comparison data
export const getSchoolComparison = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    const currentMonth = new Date();
    const lastMonth = new Date(currentMonth);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const lastMonthData = school.history.find(entry => {
      const entryDate = new Date(entry.updatedAt);
      return entryDate.getMonth() === lastMonth.getMonth() &&
             entryDate.getFullYear() === lastMonth.getFullYear();
    });
    
    if (!lastMonthData) {
      return res.status(404).json({ message: 'No data available for comparison' });
    }

    const comparison = {
      current: {
        currentStructure: school.currentStructure,
        recommendedStructure: school.recommendedStructure,
        studentCount: school.studentCount,
        teacherCount: school.teacherCount,
        performanceBand: school.performanceBand,
        facilities: school.facilities,
        updatedAt: school.lastUpdated
      },
      previous: lastMonthData,
      changes: {
        studentCount: school.studentCount - lastMonthData.studentCount,
        teacherCount: school.teacherCount - lastMonthData.teacherCount,
        structureChanged: school.currentStructure !== lastMonthData.currentStructure,
        facilitiesAdded: school.facilities.filter(f => !lastMonthData.facilities.includes(f)),
        facilitiesRemoved: lastMonthData.facilities.filter(f => !school.facilities.includes(f))
      }
    };

    res.json(comparison);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};