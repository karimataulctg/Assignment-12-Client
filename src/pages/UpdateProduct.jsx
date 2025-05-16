import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TagsInput } from 'react-tag-input-component';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Fetch existing product details
    fetch(`http://localhost:5000/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setTags(data.tags || []);
      })
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const productName = event.target.productName.value;
    const productImageUrl = event.target.productImageUrl.value;
    const description = event.target.description.value;
    const externalLinks = event.target.externalLinks.value;

    const updatedProductData = {
      name: productName,
      image: productImageUrl,
      description,
      tags,
      externalLinks,
      updatedAt: new Date(),
    };

    fetch(`http://localhost:5000/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProductData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire('Product Updated', 'Your product has been updated successfully', 'success');
        navigate('/dashboard/myProducts');
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="update-product-page min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card w-full max-w-3xl p-6 bg-white shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Update Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">Product Name</label>
            <input type="text" name="productName" defaultValue={product.name} className="input input-bordered w-full" required />
          </div>
          <div className="form-control">
            <label className="label">Product Image URL</label>
            <input type="url" name="productImageUrl" defaultValue={product.image} className="input input-bordered w-full" required />
          </div>
          <div className="form-control">
            <label className="label">Description</label>
            <textarea name="description" defaultValue={product.description} className="textarea textarea-bordered w-full" required></textarea>
          </div>
          <div className="form-control">
            <label className="label">Tags</label>
            <TagsInput value={tags} onChange={setTags} name="tags" placeHolder="Enter tags" />
          </div>
          <div className="form-control">
            <label className="label">External Links</label>
            <input type="url" name="externalLinks" defaultValue={product.externalLinks} className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
