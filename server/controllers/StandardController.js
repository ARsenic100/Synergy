import Category from '../models/Category.js';

export const getComplianceCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const addComplianceItem = async (req, res) => {
    try {
      const { category, title, description, isCritical, recommendation } = req.body;
  
      // Validate input
      if (!category || !title || !description || isCritical === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Define item structure
      const newItem = {
        title,
        description,
        isCritical,
        isCompleted: false, // default value
        recommendation,
      };
  
      // Search for the category in the database
      let categoryRecord = await Category.findOne({ name: category });
  
      // If category does not exist, create a new category
      if (!categoryRecord) {
        categoryRecord = new Category({
          name: category,
          items: [newItem],
        });
      } else {
        // If category exists, push the new item into the items array
        categoryRecord.items.push(newItem);
      }
  
      // Save the updated or new category to the database
      await categoryRecord.save();
  
      // Respond with the updated category
      res.status(201).json(categoryRecord);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  // Update item completion status
  export const updateItemStatus = async (req, res) => {
    try {
      const { categoryId, itemId, isCompleted } = req.body;
  
      // Find the category by its 'name' field, not '_id'
      const category = await Category.findOne({ name: categoryId });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Find the item inside the category's items array
      const item = category.items.id(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      // Update the 'isCompleted' field
      item.isCompleted = isCompleted;
      await category.save();
  
      // Send the updated category
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  
  // Get compliance statistics
  export const getComplianceStats = async (req, res) => {
    try {
      const categories = await Category.find();
      
      let totalItems = 0;
      let completedItems = 0;
      let criticalItems = 0;
      
      categories.forEach(category => {
        category.items.forEach(item => {
          totalItems++;
          if (item.isCompleted) completedItems++;
          if (item.isCritical && !item.isCompleted) criticalItems++;
        });
      });
      
      const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
      
      res.status(200).json({
        totalItems,
        completedItems,
        criticalItems,
        progress: Math.round(progress)
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };