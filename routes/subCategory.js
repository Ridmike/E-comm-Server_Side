const express = require('express');
const router = express.Router();
const SubCategory = require('../model/subCategory');
const Brand = require('../model/brand');
const Product = require('../model/product');
const asyncHandler = require('express-async-handler');

// Get all subcategories
router.get('/', asyncHandler(async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('categoryId').sort({'createdAt': -1});
        res.json({ success: true, message: "Subcategories retrieved successfully.", data: subCategories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Get a subcategory by ID
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const subCategoryID = req.params.id;
        const subCategory = await SubCategory.findById(subCategoryID).populate('categoryId');
        if (!subCategory) {
            return res.status(404).json({ success: false, message: "Subcategory not found." });
        }
        res.json({ success: true, message: "Subcategory retrieved successfully.", data: subCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Create a new subcategory
router.post('/', asyncHandler(async (req, res) => {
    const {  name, categoryId } = req.body;
    if (!name || !categoryId) {
        return res.status(400).json({ success: false, message: "Name and Category ID are required." });
    }

    try {
        const newSubCategory = new SubCategory({ name, categoryId });
        const savedSubCategory = await newSubCategory.save();
        res.json({ success: true, message: "Subcategory created successfully.", data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Update a subcategory
router.put('/:id', asyncHandler(async (req, res) => {
    const subCategoryID = req.params.id;
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
        return res.status(400).json({ success: false, message: "Name and Category ID are required." });
    }

    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(subCategoryID, { name, categoryId }, { new: true });
        if (!updatedSubCategory) {
            return res.status(404).json({ success: false, message: "Subcategory not found." });
        }
        res.json({ success: true, message: "Subcategory updated successfully.", data: updatedSubCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Delete a subcategory
router.delete('/:id', asyncHandler(async (req, res) => {
    const subCategoryID = req.params.id;

    try {
        // Check if any brand is associated with the subcategory
        const brandCount = await Brand.countDocuments({ subCategoryId: subCategoryID });
        if (brandCount > 0) {
            return res.status(400).json({ success: false, message: "Cannot delete subcategory with associated brands." });
        }

        // Check if the subcategory is associated with any products
        const products = await Product.find({ subCategoryId: subCategoryID });
        if (products.length > 0) {
            return res.status(400).json({ success: false, message: "Cannot delete subcategory with associated products." });
        }

        // If no brands or products are associated, proceed with deletion of the subcategory
        const subCategory = await SubCategory.findByIdAndDelete(subCategoryID);
        if (!subCategory) {
            return res.status(404).json({ success: false, message: "Subcategory not found." });
        }

        res.json({ success: true, message: "Subcategory deleted successfully.", data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

module.exports = router;