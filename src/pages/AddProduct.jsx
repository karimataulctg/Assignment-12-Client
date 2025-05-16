import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../AuthProvider';
import Swal from 'sweetalert2';
import { TagsInput } from 'react-tag-input-component';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const formRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const productName = event.target.productName.value;
    const productImageUrl = event.target.productImageUrl.value;
    const description = event.target.description.value;
    const externalLinks = event.target.externalLinks.value;

    const productData = {
      name: productName,
      image: productImageUrl,
      description,
      owner: {
        name: user.displayName,
        photo: user.photoURL,
        email: user.email,
      },
      tags,
      externalLinks,
      createdAt: new Date(),
    };

    fetch('http://localhost:5000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire('Product Added', 'Your product has been added successfully', 'success');
        // Reset form fields except for user information
        formRef.current.reset();
        setTags([]);
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  };

  return (
    <div className="add-product-page min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-3xl p-6  shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        {user ? (
          <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
            <div className="form-control">
              <label className="label">Product Name</label>
              <input type="text" name="productName" className="input input-bordered w-full" required />
            </div>
            <div className="form-control">
              <label className="label">Product Image URL</label>
              <input type="url" name="productImageUrl" className="input input-bordered w-full" required />
            </div>
            <div className="form-control">
              <label className="label">Description</label>
              <textarea name="description" className="textarea textarea-bordered w-full" required></textarea>
            </div>
            <div className="form-control">
              <label className="label">Owner Name</label>
              <input type="text" value={user.displayName} className="input input-bordered w-full" disabled />
            </div>
            <div className="form-control">
              <label className="label">Owner Image</label>
              <input type="text" value={user.photoURL} className="input input-bordered w-full" disabled />
            </div>
            <div className="form-control">
              <label className="label">Owner Email</label>
              <input type="email" value={user.email} className="input input-bordered w-full" disabled />
            </div>
            <div className="form-control">
              <label className="label">Tags</label>
              <TagsInput value={tags} onChange={setTags} name="tags" placeHolder="Enter tags" />
            </div>
            <div className="form-control">
              <label className="label">External Links</label>
              <input type="url" name="externalLinks" className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <button type="submit" className="btn btn-primary w-full">Submit</button>
            </div>
          </form>
        ) : (
          <p className="text-center text-lg font-semibold">Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
