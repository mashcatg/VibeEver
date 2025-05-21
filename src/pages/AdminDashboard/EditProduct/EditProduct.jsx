import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../../Hooks/useAxios';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [product, setProduct] = useState(null);
  
  const axios = useAxios();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
        setSelectedCategory(response.data.category._id);
      } catch (error) {
        toast.error('Failed to load product');
        navigate('/admin-dashboard/manage-products');
      }
    };

    fetchProduct();
  }, [id, axios, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data.categories);
      } catch (error) {
        toast.error('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [axios]);

  useEffect(() => {
    if (selectedCategory) {
      const selectedCat = categories.find(cat => cat._id === selectedCategory);
      setSubcategories(selectedCat?.subcategories || []);
    }
  }, [selectedCategory, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const productData = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      category: formData.get('category'),
      subcategory: formData.get('subcategory'),
      tags: formData.get('tags').split(',').map(tag => tag.trim()),
      thumbnailUrls: [formData.get('thumbnail')],
      isPublished: formData.get('isPublished') === 'true',
      discount: {
        type: formData.get('discountType'),
        value: Number(formData.get('discountValue')),
        startDate: formData.get('discountStart'),
        endDate: formData.get('discountEnd')
      }
    };

    try {
      await axios.put(`/products/${id}`, productData);
      toast.success('Product updated successfully!');
      navigate('/admin-dashboard/manage-products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={product.title}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              defaultValue={product.description}
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              defaultValue={product.price}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              required
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subcategory</label>
            <select
              name="subcategory"
              required
              defaultValue={product.subcategory}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              disabled={!selectedCategory}
            >
              <option value="">Select a subcategory</option>
              {subcategories.map(subcategory => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              name="tags"
              defaultValue={product.tags.join(', ')}
              placeholder="Enter tags separated by commas"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              defaultValue={product.thumbnailUrls[0]}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Published Status</label>
            <select
              name="isPublished"
              defaultValue={product.isPublished}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="false">Draft</option>
              <option value="true">Published</option>
            </select>
          </div>

          {/* Discount Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium">Discount Settings</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Discount Type</label>
              <select
                name="discountType"
                defaultValue={product.discount?.type}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="">No Discount</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Discount Value</label>
              <input
                type="number"
                name="discountValue"
                defaultValue={product.discount?.value}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="discountStart"
                  defaultValue={product.discount?.startDate?.split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  name="discountEnd"
                  defaultValue={product.discount?.endDate?.split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/admin-dashboard/manage-products')}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;