import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Trash2, FolderPlus, Save, Check, X, Folder, Tag } from "lucide-react";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [editingSubcategoryName, setEditingSubcategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/categories");
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/categories", { name: newCategory });
      setNewCategory("");
      setIsAddingCategory(false);
      fetchCategories();
      toast.success("Category added successfully");

      if (response.status === 400) {
        toast.error(response.data.message || "Invalid request");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleStartEditCategory = (id, name) => {
    setEditingCategory(id);
    setEditingCategoryName(name);
  };

  const handleCancelEditCategory = () => {
    setEditingCategory(null);
    setEditingCategoryName("");
  };

  const handleSaveEditCategory = async (id) => {
    if (!editingCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      await axios.put(`/categories/${id}`, { name: editingCategoryName.trim() });
      setEditingCategory(null);
      setEditingCategoryName("");
      fetchCategories();
      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`/categories/${id}`);
      fetchCategories();
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/categories/${selectedCategory}/subcategories`, {
        name: newSubcategory,
      });
      setNewSubcategory("");
      setIsAddingSubcategory(false);
      fetchCategories();
      toast.success("Subcategory added successfully");
    } catch (error) {
      console.error("Error adding subcategory:", error);
      toast.error("Failed to add subcategory");
    }
  };

  const handleStartEditSubcategory = (categoryId, subcategoryId, name) => {
    setEditingSubcategory({ categoryId, subcategoryId });
    setEditingSubcategoryName(name);
  };

  const handleCancelEditSubcategory = () => {
    setEditingSubcategory(null);
    setEditingSubcategoryName("");
  };

  const handleSaveEditSubcategory = async () => {
    if (!editingSubcategoryName.trim()) {
      toast.error("Subcategory name cannot be empty");
      return;
    }

    try {
      await axios.put(`/categories/${editingSubcategory.categoryId}/subcategories/${editingSubcategory.subcategoryId}`, {
        name: editingSubcategoryName.trim(),
      });
      setEditingSubcategory(null);
      setEditingSubcategoryName("");
      fetchCategories();
      toast.success("Subcategory updated successfully");
    } catch (error) {
      console.error("Error updating subcategory:", error);
      toast.error("Failed to update subcategory");
    }
  };

  const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;
    try {
      await axios.delete(`/categories/${categoryId}/subcategories/${subcategoryId}`);
      fetchCategories();
      toast.success("Subcategory deleted successfully");
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      toast.error("Failed to delete subcategory");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto min-h-screen bg-neutral-subtle rounded-2xl">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-neutral-default/50 mb-6 sm:mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-body leading-normal mb-2">Category Management</h1>
            <p className="text-neutral-subtitle text-sm sm:text-base">Organize your products with categories and subcategories</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                <Folder className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">{categories.length} Categories</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-600">
                  {categories.reduce((total, cat) => total + (cat.subcategories?.length || 0), 0)} Subcategories
                </span>
              </div>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddingCategory(true)}
            className="w-max flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium shadow-sm transition-all duration-200"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Add Category</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Add Category Form */}
      <AnimatePresence>
        {isAddingCategory && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-4 sm:mb-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-neutral-default/50">
              <h3 className="text-base sm:text-lg font-semibold text-text-body mb-3 sm:mb-4 leading-normal">Add New Category</h3>
              <form onSubmit={handleAddCategory}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter category name"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-neutral-default rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm sm:text-base"
                    required
                    autoFocus
                  />
                  <div className="flex gap-2 sm:gap-3">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all duration-200 flex-1 sm:flex-initial text-sm sm:text-base"
                    >
                      <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                      Save
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setIsAddingCategory(false)}
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-neutral-default hover:bg-neutral-subtle text-neutral-subtitle rounded-xl font-medium transition-all duration-200 flex-1 sm:flex-initial text-sm sm:text-base"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories List */}
      <div className="space-y-3 sm:space-y-4">
        <AnimatePresence>
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-neutral-default/50 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              {/* Category Header */}
              <div className="p-4 sm:p-6 border-b border-neutral-default/30">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Folder className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      {editingCategory === category._id ? (
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editingCategoryName}
                              onChange={(e) => setEditingCategoryName(e.target.value)}
                              className="flex-1 px-3 py-2 border border-neutral-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-lg sm:text-xl font-semibold text-text-body"
                              autoFocus
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleSaveEditCategory(category._id);
                                } else if (e.key === "Escape") {
                                  handleCancelEditCategory();
                                }
                              }}
                            />
                          </div>
                          <div className="flex gap-2">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSaveEditCategory(category._id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-primary hover:bg-primary/80 text-white rounded-lg font-medium transition-all duration-200 text-sm"
                            >
                              <Save className="w-3 h-3" />
                              Save
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={handleCancelEditCategory}
                              className="flex items-center gap-1 px-3 py-1.5 border border-neutral-default hover:bg-neutral-subtle text-neutral-subtitle rounded-lg font-medium transition-all duration-200 text-sm"
                            >
                              <X className="w-3 h-3" />
                              Cancel
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-lg sm:text-xl font-semibold text-text-body truncate leading-normal">{category.name}</h3>
                          <p className="text-xs sm:text-sm text-neutral-subtitle">{category.subcategories?.length || 0} subcategories</p>
                        </>
                      )}
                    </div>
                  </div>

                  {editingCategory !== category._id && (
                    <div className="flex items-center gap-2 sm:gap-2 flex-wrap">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleStartEditCategory(category._id, category.name)}
                        className="p-1.5 sm:p-2 text-neutral-caption hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                        title="Edit category"
                      >
                        <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteCategory(category._id)}
                        className="p-1.5 sm:p-2 text-neutral-caption hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete category"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedCategory(category._id);
                          setIsAddingSubcategory(true);
                        }}
                        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Add Subcategory</span>
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Add Subcategory Form */}
                <AnimatePresence>
                  {isAddingSubcategory && selectedCategory === category._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-default/30"
                    >
                      <form onSubmit={handleAddSubcategory}>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <input
                            type="text"
                            value={newSubcategory}
                            onChange={(e) => setNewSubcategory(e.target.value)}
                            placeholder="Enter subcategory name"
                            className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400/20 focus:border-gray-500 transition-all duration-200 text-sm sm:text-base"
                            required
                            autoFocus
                          />
                          <div className="flex gap-2 sm:gap-3">
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              type="submit"
                              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 hover:bg-black text-white rounded-lg font-medium transition-all duration-200 flex-1 sm:flex-initial text-sm"
                            >
                              <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                              Save
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              type="button"
                              onClick={() => setIsAddingSubcategory(false)}
                              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-600 rounded-lg font-medium transition-all duration-200 flex-1 sm:flex-initial text-sm"
                            >
                              <X className="w-3 h-3 sm:w-4 sm:h-4" />
                              Cancel
                            </motion.button>
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Subcategories List */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div className="p-4 sm:p-6 bg-gray-50">
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {category.subcategories.map((subcategory) => (
                      <motion.div
                        key={subcategory._id}
                        className="flex items-center justify-between p-3 bg-white hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-200"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
                            <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-600" />
                          </div>
                          {editingSubcategory?.categoryId === category._id && editingSubcategory?.subcategoryId === subcategory._id ? (
                            <div className="flex items-center gap-2 flex-1">
                              <input
                                type="text"
                                value={editingSubcategoryName}
                                onChange={(e) => setEditingSubcategoryName(e.target.value)}
                                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400/20 focus:border-gray-500 transition-all duration-200 text-sm font-medium"
                                autoFocus
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    handleSaveEditSubcategory();
                                  } else if (e.key === "Escape") {
                                    handleCancelEditSubcategory();
                                  }
                                }}
                              />
                              <div className="flex gap-1">
                                <button
                                  onClick={handleSaveEditSubcategory}
                                  className="p-1 text-gray-800 hover:bg-gray-200 rounded transition-all duration-200"
                                  title="Save changes"
                                >
                                  <Save className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={handleCancelEditSubcategory}
                                  className="p-1 text-gray-500 hover:bg-gray-200 rounded transition-all duration-200"
                                  title="Cancel editing"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-700 font-medium text-sm sm:text-base truncate">{subcategory.name}</span>
                          )}
                        </div>
                        {(!editingSubcategory || editingSubcategory?.categoryId !== category._id || editingSubcategory?.subcategoryId !== subcategory._id) && (
                          <div className="flex items-center gap-1 ml-2">
                            <button
                              onClick={() => handleStartEditSubcategory(category._id, subcategory._id, subcategory.name)}
                              className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded transition-all duration-200"
                              title="Edit subcategory"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteSubcategory(category._id, subcategory._id)}
                              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-all duration-200"
                              title="Delete subcategory"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {categories.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 sm:py-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-neutral-subtle rounded-full flex items-center justify-center mx-auto mb-4">
              <Folder className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-caption" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-text-body mb-2">No categories yet</h3>
            <p className="text-neutral-subtitle mb-6 text-sm sm:text-base px-4">Create your first category to organize your products</p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAddingCategory(true)}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium mx-auto text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Your First Category
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryManage;
