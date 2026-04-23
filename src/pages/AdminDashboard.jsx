import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { Package, DollarSign, Box, LogOut, Trash2, Pencil } from "lucide-react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("products");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    size: "",
    image: "",
    description: "",
    concentration: "",
    gender: "",
    topNotes: "",
    heartNotes: "",
    baseNotes: "",
    longevity: 5,
    sillage: 5,
    inStock: true,
    trending: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: o } = await supabase.from("orders").select("*");
    const { data: p } = await supabase.from("products").select("*");

    setOrders(o || []);
    setProducts(p || []);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const openEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      ...p,
      topNotes: p.top_notes?.join(", "),
      heartNotes: p.heart_notes?.join(", "),
      baseNotes: p.base_notes?.join(", "),
      inStock: p.in_stock,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      brand: formData.brand,
      price: Number(formData.price),
      size: formData.size,
      image: formData.image,
      description: formData.description,
      concentration: formData.concentration,
      gender: formData.gender,
      top_notes: formData.topNotes.split(",").map(s => s.trim()),
      heart_notes: formData.heartNotes.split(",").map(s => s.trim()),
      base_notes: formData.baseNotes.split(",").map(s => s.trim()),
      longevity: Number(formData.longevity),
      sillage: Number(formData.sillage),
      in_stock: formData.inStock,
      trending: formData.trending,
    };

    let error;

    if (editingProduct) {
      ({ error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingProduct.id));
    } else {
      ({ error } = await supabase.from("products").insert([payload]));
    }

    if (error) alert(error.message);
    else {
      setShowModal(false);
      setEditingProduct(null);
      loadData();
    }
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) alert(error.message);
    else loadData();
  };

  const updateOrderStatus = async (id, status) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    loadData();
  };

  const revenue = orders.reduce((sum, o) => sum + Number(o.total), 0);

  const logout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/admin-login";
  };

  return (
    <div className="min-h-screen bg-[#f6ecd6] p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditingProduct(null);
              setFormData({});
              setShowModal(true);
            }}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>

          <button onClick={logout} className="border px-4 py-2 rounded flex gap-2">
            <LogOut size={16}/> Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Stat title="Total Revenue" value={`$${revenue.toFixed(2)}`} icon={<DollarSign />} />
        <Stat title="Total Orders" value={orders.length} icon={<Package />} />
        <Stat title="Total Products" value={products.length} icon={<Box />} />
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-6">
        <TabBtn active={tab==="products"} onClick={()=>setTab("products")} label="Products"/>
        <TabBtn active={tab==="orders"} onClick={()=>setTab("orders")} label="Orders"/>
      </div>

      {/* PRODUCTS */}
      {tab === "products" && (
        <div className="bg-white p-6 rounded-xl shadow">
          {products.map(p => (
            <div key={p.id} className="flex justify-between items-center border-b py-3">

              <div className="flex gap-4 items-center">
                <img src={p.image} className="w-14 h-14 rounded object-cover"/>
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-500">{p.brand}</p>
                  <p>${p.price}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => openEdit(p)}>
                  <Pencil size={18}/>
                </button>

                <button onClick={() => deleteProduct(p.id)}>
                  <Trash2 size={18} className="text-red-500"/>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ORDERS */}
      {tab === "orders" && (
        <div className="bg-white p-6 rounded-xl shadow">
          {orders.map(o => (
            <div key={o.id} className="border-b py-3 flex justify-between">
              <div>
                <p className="font-semibold">{o.id}</p>
                <p>${o.total}</p>
              </div>

              <select
                value={o.status}
                onChange={(e)=>updateOrderStatus(o.id, e.target.value)}
                className="border px-2 py-1"
              >
                <option>pending</option>
                <option>shipped</option>
                <option>delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[420px] max-h-[90vh] overflow-y-auto">

            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

              <Input label="Name" name="name" onChange={handleChange} value={formData.name}/>
              <Input label="Brand" name="brand" onChange={handleChange} value={formData.brand}/>
              <Input label="Price" name="price" type="number" onChange={handleChange} value={formData.price}/>
              <Input label="Size" name="size" onChange={handleChange} value={formData.size}/>
              <Input label="Image URL" name="image" onChange={handleChange} value={formData.image}/>
              <Input label="Description" name="description" onChange={handleChange} value={formData.description}/>

              <Input label="Top Notes" name="topNotes" onChange={handleChange} value={formData.topNotes}/>
              <Input label="Heart Notes" name="heartNotes" onChange={handleChange} value={formData.heartNotes}/>
              <Input label="Base Notes" name="baseNotes" onChange={handleChange} value={formData.baseNotes}/>

              <div className="flex gap-3">
                <Input label="Longevity" name="longevity" type="number" onChange={handleChange} value={formData.longevity}/>
                <Input label="Sillage" name="sillage" type="number" onChange={handleChange} value={formData.sillage}/>
              </div>

              <label className="flex gap-2">
                <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange}/>
                In Stock
              </label>

              <label className="flex gap-2">
                <input type="checkbox" name="trending" checked={formData.trending} onChange={handleChange}/>
                Trending
              </label>

              <button className="bg-black text-white py-2 rounded mt-3">
                {editingProduct ? "Update" : "Add"}
              </button>
            </form>

            <button onClick={()=>setShowModal(false)} className="mt-3 text-sm text-gray-500">
              Cancel
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

/* SMALL COMPONENTS */

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-500 mb-1">{label}</label>
      <input {...props} className="border px-3 py-2 rounded"/>
    </div>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
      <div className="text-gray-300">{icon}</div>
    </div>
  );
}

function TabBtn({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${active ? "bg-white shadow" : ""}`}
    >
      {label}
    </button>
  );
}