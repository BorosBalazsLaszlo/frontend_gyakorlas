import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../types/Product";
import apiClient from "../api/apiClient";

function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [namePut, setNamePut] = useState("");
  const [descriptionPut, setDescriptionPut] = useState("");
  const [typePut, setTypePut] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get<Product>(`/products/${id}`);
        setProduct(response.data);
        setNamePut(response.data.name);
        setDescriptionPut(response.data.description);
        setTypePut(response.data.type);
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          setError("Product not found");
        } else {
          setError(err.message || "An error occurred while fetching the product");
        }
      }
    };
    fetchProduct();
  }, [id]);

  const updateProduct = async () => {
    try {
      const updatedProduct = { name: namePut, description: descriptionPut, type: typePut } as Product;
      await apiClient.put(`/products/${id}`, updatedProduct);
      alert("Product updated successfully");
      window.location.reload();
    } catch (err: any) {
      alert("nem nem");
    }
  };

  const deleteProduct = async () => {
    const confirmDelete = window.confirm("Biztosan kitörlöd?");
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/products/${id}`);
      alert("Termék törölve!");
      navigate("/products");
    } catch (err: any) {
      alert(err.message || "Hiba");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Termék #{product?.id}</h1>

        {product ? (
          <div>
            <p>neve: {product.name}</p>
            <p>leiras: {product.description}</p>
            <p>tipus: {product.type}</p>
          </div>
        ) : (
          <p>Nincs ilyen kurva anyad</p>
        )}

        <button onClick={deleteProduct} style={{ color: "red" }}>
          Törlés
        </button>

        <div>
        <h1>Változtasd meg!</h1>

        <input
          type="text"
          placeholder="név"
          value={namePut}
          onChange={(e) => setNamePut(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="leírás"
          value={descriptionPut}
          onChange={(e) => setDescriptionPut(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="típus"
          value={typePut}
          onChange={(e) => setTypePut(e.target.value)}
        />
        <br />

        <button onClick={updateProduct}>Update</button>
      </div>
      </header>
    </div>
  );
}

export default SingleProduct;
