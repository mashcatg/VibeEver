import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../Hooks/useAxios';
import toast from 'react-hot-toast';
import { uploadZip } from '../../../utility/uploadzip';
 

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const axios = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data.categories);
      } catch (error) {
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, [axios]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    
    const selectedCat = categories.find(cat => cat._id === categoryId);
    setSubcategories(selectedCat?.subcategories || []);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
      toast.error('Please upload a ZIP file');
      return;
    }

    try {
      setUploadLoading(true);
      const uploadedUrl = await uploadZip(file);
      setDownloadUrl(uploadedUrl);
      toast.success('File uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload file');
      console.error('Upload error:', error);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!downloadUrl) {
      toast.error('Please upload a ZIP file first');
      return;
    }
    
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
      },
      download_url: downloadUrl, // Use the uploaded file URL
    };
    console.log(productData);

    try {
      const response = await axios.post('/products', productData);
      toast.success('Product added successfully!');
      navigate('/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
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
              onChange={handleCategoryChange}
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
              placeholder="Enter tags separated by commas"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload ZIP File
            </label>
            <input
              type="file"
              accept=".zip"
              onChange={handleFileUpload}
              className="mt-1 block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white
                hover:file:bg-primary-dark
                cursor-pointer"
              disabled={uploadLoading}
            />
            {uploadLoading && (
              <p className="mt-2 text-sm text-gray-500">Uploading file...</p>
            )}
            {downloadUrl && (
              <p className="mt-2 text-sm text-green-600">
                ✓ File uploaded successfully
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Published Status</label>
            <select
              name="isPublished"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  name="discountEnd"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || uploadLoading || !downloadUrl}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;