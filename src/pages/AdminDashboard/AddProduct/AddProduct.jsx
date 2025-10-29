import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../Hooks/useAxios';
import toast from 'react-hot-toast';
import { uploadZip } from '../../../utility/uploadzip';
import uploadImage from '../../../Hooks/useImageUpload';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [thumbnailUrls, setThumbnailUrls] = useState([]);
  const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
  const [benefits, setBenefits] = useState([""]);
  const [files, setFiles] = useState([""]);
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

  const handleThumbnailUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newThumbnailUrls = [...thumbnailUrls];
    const newThumbnailPreviews = [...thumbnailPreviews];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload image files only');
        return;
      }

      try {
        setThumbnailLoading(true);
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        newThumbnailPreviews.push(previewUrl);

        const uploadedUrl = await uploadImage(file);
        newThumbnailUrls.push(uploadedUrl);
      } catch (error) {
        toast.error('Failed to upload thumbnail');
        console.error('Upload error:', error);
        newThumbnailPreviews.pop();
      }
    }

    setThumbnailUrls(newThumbnailUrls);
    setThumbnailPreviews(newThumbnailPreviews);
    setThumbnailLoading(false);
    toast.success('Thumbnails uploaded successfully!');
  };

  const handleRemoveThumbnail = (index) => {
    setThumbnailUrls(prev => prev.filter((_, i) => i !== index));
    setThumbnailPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleBenefitChange = (idx, value) => {
    const updated = [...benefits];
    updated[idx] = value;
    setBenefits(updated);
  };

  const addBenefit = () => setBenefits([...benefits, ""]);
  const removeBenefit = (idx) => setBenefits(benefits.filter((_, i) => i !== idx));

  const handleFileChange = (idx, value) => {
    const updated = [...files];
    updated[idx] = value;
    setFiles(updated);
  };

  const addFile = () => setFiles([...files, ""]);
  const removeFile = (idx) => setFiles(files.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!downloadUrl) {
      toast.error('Please upload a ZIP file first');
      return;
    }
    if (thumbnailUrls.length === 0) {
      toast.error('Please upload at least one thumbnail image');
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
      thumbnailUrls: thumbnailUrls,  // Now sending array of URLs
      isPublished: formData.get('isPublished') === 'true',
      dodoProductId: formData.get('dodoProductId'),
      discount: {
        type: formData.get('discountType'),
        value: Number(formData.get('discountValue')),
        startDate: formData.get('discountStart'),
        endDate: formData.get('discountEnd')
      },
      download_url: downloadUrl,
      version: formData.get('version'),
      benefits: benefits.filter(b => b.trim() !== ""),
      files: files.filter(f => f.trim() !== ""),
    };

    console.log(productData);

    try {
      await axios.post('/products', productData);
      toast.success('Product added successfully!');
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Add New Product</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Basic Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="Enter product title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="Enter product description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
                <input
                  type="text"
                  name="version"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="e.g., 1.0.0"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Categories & Tags</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  required
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                <select
                  name="subcategory"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 disabled:bg-gray-100"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  name="tags"
                  placeholder="e.g., design, template, ui/ux"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                />
                <p className="mt-1 text-xs text-gray-500">Separate tags with commas</p>
              </div>
              <div>
              {/* //dodoProductId */}
                <label className="block text-sm font-medium text-gray-700 mb-1">dodoProductId</label>
                <input
                  type="dodoProductId"
                  name="dodoProductId"
                  placeholder="dodoProductId"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                />
                
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="border-t pt-8 space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Thumbnails</label>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="w-full px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                      disabled={thumbnailLoading}
                      multiple
                    />
                    {thumbnailLoading && (
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading thumbnails...
                      </div>
                    )}
                  </div>
                  {thumbnailPreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {thumbnailPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Thumbnail preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                            <button
                              type="button"
                              onClick={() => handleRemoveThumbnail(index)}
                              className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product ZIP File
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".zip"
                    onChange={handleFileUpload}
                    className="w-full px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                    disabled={uploadLoading}
                  />
                  {uploadLoading && (
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading file...
                    </div>
                  )}
                  {downloadUrl && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      File uploaded successfully
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Publishing Section */}
          <div className="border-t pt-8 space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Publishing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="isPublished"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                >
                  <option value="false">Draft</option>
                  <option value="true">Published</option>
                </select>
              </div>
            </div>
          </div>

          {/* Discount Section */}
          <div className="border-t pt-8 space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Discount Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                <select
                  name="discountType"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                >
                  <option value="">No Discount</option>
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                <input
                  type="number"
                  name="discountValue"
                  min="0"
                  placeholder="Enter discount amount"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="discountStart"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="discountEnd"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                />
              </div>
            </div>
          </div>

          {/* Benefits Field (Dynamic Array) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={e => handleBenefitChange(idx, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 mr-2"
                  placeholder={`Benefit ${idx + 1}`}
                />
                {benefits.length > 1 && (
                  <button type="button" onClick={() => removeBenefit(idx)} className="text-red-500">Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addBenefit} className="text-primary mt-1">+ Add Benefit</button>
          </div>

          {/* Files Field (Dynamic Array) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Files</label>
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <input
                  type="text"
                  value={file}
                  onChange={e => handleFileChange(idx, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 mr-2"
                  placeholder={`File ${idx + 1} ( name)`}
                />
                {files.length > 1 && (
                  <button type="button" onClick={() => removeFile(idx)} className="text-red-500">Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addFile} className="text-primary mt-1">+ Add File</button>
          </div>

          <div className="border-t pt-8">
            <button
              type="submit"
              disabled={loading || uploadLoading || !downloadUrl}
              className="w-full md:w-auto px-8 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Product...
                </span>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;