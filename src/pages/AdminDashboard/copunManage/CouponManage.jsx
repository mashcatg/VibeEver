import { useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";

const initialForm = {
  code: "",
  discountType: "percentage",
  discountValue: "",
  expiresAt: "",
  isActive: true,
};

const CouponManage = () => {
  const axios = useAxios();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        search,
        status,
      }).toString();
      const res = await axios.get(`/coupons?${params}`);
      setCoupons(res.data.coupons);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [page, search, status]);

  // Create or update coupon
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await axios.put(`/coupons/${editingId}`, form);
        toast.success("Coupon updated");
      } else {
        // Create
        await axios.post("/coupons", form);
        toast.success("Coupon created");
      }
      setForm(initialForm);
      setEditingId(null);
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving coupon");
    }
  };

  // Delete coupon
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await axios.delete(`/coupons/${id}`);
      toast.success("Coupon deleted");
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting coupon");
    }
  };

  // Start editing
  const startEdit = (coupon) => {
    setForm({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      expiresAt: coupon.expiresAt.slice(0, 10),
      isActive: coupon.isActive,
    });
    setEditingId(coupon._id);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Coupons</h2>
      {/* Add/Edit Coupon Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6 flex-wrap items-end">
        <input
          required
          type="text"
          placeholder="Code"
          value={form.code}
          onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
          className="border px-2 py-1 rounded"
        />
        <select
          value={form.discountType}
          onChange={e => setForm(f => ({ ...f, discountType: e.target.value }))}
          className="border px-2 py-1 rounded"
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
        <input
          required
          type="number"
          placeholder="Value"
          value={form.discountValue}
          onChange={e => setForm(f => ({ ...f, discountValue: e.target.value }))}
          className="border px-2 py-1 rounded"
        />
        <input
          required
          type="date"
          value={form.expiresAt}
          onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))}
          className="border px-2 py-1 rounded"
        />
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))}
          />
          Active
        </label>
        <button type="submit" className="bg-primary text-white px-4 py-1 rounded">
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={() => {
              setForm(initialForm);
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Code</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Value</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Expires</th>
              <th className="border px-4 py-2">Created By</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => (
              <tr key={coupon._id}>
                <td className="border px-4 py-2">{coupon.code}</td>
                <td className="border px-4 py-2">{coupon.discountType}</td>
                <td className="border px-4 py-2">{coupon.discountValue}</td>
                <td className="border px-4 py-2">{coupon.isActive ? "Active" : "Inactive"}</td>
                <td className="border px-4 py-2">{new Date(coupon.expiresAt).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{coupon.createdBy?.fullName || "N/A"}</td>
                <td className="border px-4 py-2">
                  <button
                    className="text-blue-600 mr-2"
                    onClick={() => startEdit(coupon)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(coupon._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4 flex gap-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 border rounded ${page === idx + 1 ? "bg-primary text-white" : ""}`}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CouponManage;