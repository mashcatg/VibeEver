import { useState, useEffect } from 'react';
import useAxios from '../../../Hooks/useAxios';
import { SubmitButton } from '../../../components/ui/Button';
import toast from 'react-hot-toast';

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const axios = useAxios();

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

 const handleAddCategory = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post('/categories', { name: newCategory });
 
    setNewCategory('');
    setIsAddingCategory(false);
    fetchCategories();

    if (response.status === 400) {
      toast.error(response.data.message || 'Invalid request');
    }
  } catch (error) {
    console.error("Error adding category:", error);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};


  const handleUpdateCategory = async (id, name) => {
    try {
      await axios.put(`/categories/${id}`, { name });
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/categories/${selectedCategory}/subcategories`, {
        name: newSubcategory
      });
      setNewSubcategory('');
      setIsAddingSubcategory(false);
      fetchCategories();
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  const handleUpdateSubcategory = async (categoryId, subcategoryId, name) => {
    try {
      await axios.put(`/categories/${categoryId}/subcategories/${subcategoryId}`, { name });
      fetchCategories();
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }
  };

  const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
    if (!window.confirm('Are you sure you want to delete this subcategory?')) return;
    try {
      await axios.delete(`/categories/${categoryId}/subcategories/${subcategoryId}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2"> Category Management</h2>
          <p className="text-gray-600">Manage your product categories and subcategories</p>
        </div>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
        >
          <span className="text-xl"> </span> Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {isAddingCategory && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 transition-all duration-300 ease-in-out">
          <form onSubmit={handleAddCategory}>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200 hover:shadow-lg flex items-center gap-2"
              >
                   Save
              </button>
              <button
                type="button"
                onClick={() => setIsAddingCategory(false)}
                className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
            <div className="flex justify-between items-center">
              {editingCategory === category._id ? (
                <input
                  type="text"
                  defaultValue={category.name}
                  onBlur={(e) => handleUpdateCategory(category._id, e.target.value)}
                  className="text-xl font-semibold p-2 border-b-2 border-blue-400 w-full focus:outline-none focus:border-blue-600 rounded-md"
                  autoFocus
                />
              ) : (
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        {category.name}
                </h3>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingCategory(category._id)}
                  className="border px-4 py-2 rounded-lg hover:bg-gray-50 transition duration-200 text-gray-700 flex items-center gap-1"
                >
                      Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="border px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition duration-200 flex items-center gap-1"
                >
                  <span>🗑️</span> Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory(category._id);
                    setIsAddingSubcategory(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200 flex items-center gap-1"
                >
                  <span> </span> Subcategory
                </button>
              </div>
            </div>

            {/* Add Subcategory Form */}
            {isAddingSubcategory && selectedCategory === category._id && (
              <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100 transition-all duration-300 ease-in-out">
                <form onSubmit={handleAddSubcategory} className="flex gap-4">
                  <input
                    type="text"
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                    placeholder="Enter subcategory name"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200 flex items-center gap-2"
                  >
                       Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingSubcategory(false)}
                    className="border px-4 py-2 rounded-lg hover:bg-white transition duration-200"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}

            {/* Subcategories List */}
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="mt-6 pl-6 border-l-2 border-gray-200">
                <h4 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
                       Subcategories
                </h4>
                <div className="space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <div
                      key={subcategory._id}
                      className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200"
                    >
                      <span className="text-gray-700">{subcategory.name}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const newName = prompt(
                              'Enter new name for subcategory:',
                              subcategory.name
                            );
                            if (newName) {
                              handleUpdateSubcategory(
                                category._id,
                                subcategory._id,
                                newName
                              );
                            }
                          }}
                          className="text-sm border px-3 py-1.5 rounded-lg hover:bg-white transition duration-200 flex items-center gap-1"
                        >
                              Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteSubcategory(category._id, subcategory._id)
                          }
                          className="text-sm border px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 transition duration-200 flex items-center gap-1"
                        >
                          <span>🗑️</span> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManage;
