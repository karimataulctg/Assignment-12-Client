import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  }, []);

  const handleDelete = (productId) => {
    fetch(`http://localhost:5000/products/${productId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire('Deleted', 'Your product has been deleted', 'success');
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  };

  return (
    <div className="my-products-page">
      <h1>My Products</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Votes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.votes}</td>
              <td>{product.status}</td>
              <td>
                <Link to={`/update-product/${product.id}`} className="btn btn-sm btn-primary">
                  Update
                </Link>
                <button onClick={() => handleDelete(product.id)} className="btn btn-sm btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;
