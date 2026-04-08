import React, { useState, useEffect } from "react";

function VendorDashboard() {
  const [form, setForm] = useState({
    name: "",
    service: "",
    price: "",
    contact: "",
    image: ""
  });

  const [vendors, setVendors] = useState([]);

  // LOAD EXISTING DATA
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("vendors")) || [];
    setVendors(data);
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // IMAGE UPLOAD (BASE64)
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

  // ADD SERVICE
  const handleAdd = () => {
    if (!form.name || !form.service || !form.price) {
      alert("Fill all fields ❌");
      return;
    }

    const updated = [...vendors, form];

    localStorage.setItem("vendors", JSON.stringify(updated));
    setVendors(updated);

    setForm({
      name: "",
      service: "",
      price: "",
      contact: "",
      image: ""
    });

    alert("Service Added ✅");
  };

  // DELETE SERVICE
  const handleDelete = (index) => {
    const updated = vendors.filter((_, i) => i !== index);
    localStorage.setItem("vendors", JSON.stringify(updated));
    setVendors(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
        Vendor Dashboard 🧑‍💼
      </h1>

      {/* ADD FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-8 max-w-md mx-auto">

        <h2 className="text-xl font-bold mb-4 text-center">
          Add Service
        </h2>

        <input
          name="name"
          placeholder="Shop / Service Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
        />

        <input
          name="service"
          placeholder="Type (DJ / Catering / Venue)"
          value={form.service}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
        />

        <input
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
        />

        <input
          type="file"
          onChange={handleImage}
          className="w-full mb-3"
        />

        <button
          onClick={handleAdd}
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Add Service
        </button>

      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {vendors.map((v, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">

            {v.image && (
              <img src={v.image} alt={`${v.name} service`} className="h-40 w-full object-cover rounded" />
            )}

            <h3 className="font-bold mt-2">{v.name}</h3>
            <p>{v.service}</p>
            <p>₹{v.price}</p>
            <p>📞 {v.contact}</p>

            <button
              onClick={() => handleDelete(i)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default VendorDashboard;