import React, { useEffect, useState } from "react";
import "../App.css";
import { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const [namePut, SetNamePut] = useState("");
  const [descriptionPut, SetDescriptionPut] = useState("");
  const [typePut, SetTypePut] = useState("");

  const product = {
    name: namePut,
    description: descriptionPut,
    type: typePut,
  } as Product;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/products");
        setProducts(response.data);
      } catch (err: any) {
        alert(err.message || "he cigany baj van xd");
      }
    };
    fetchProducts();
  }, []);

  const handleViewClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  const addProduct = () => {
    apiClient
      .post("/products", product)
      .then((response) => {
        switch (response.status) {
          case 201:
            console.log("termék létrehozva");
            break;
          case 400:
            console.log("Bad request");
            break;
          default:
            console.log("figyi nem tom");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Termékeink</h1>
        <table>
          <th>ID</th>
          <th>Név</th>
          <th>Leírás</th>
          <th>Típus</th>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.type}</td>
              <td>
                <button onClick={() => handleViewClick(product.id)}>
                  Vjú detsit
                </button>
              </td>
            </tr>
          ))}
        </table>

        <div>
          <h1>Új hozzáadása</h1>
          <input
            type="text"
            placeholder="név"
            onChange={(e) => SetNamePut(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="leírás"
            onChange={(e) => SetDescriptionPut(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="típus"
            onChange={(e) => SetTypePut(e.target.value)}
          />
          <br />
          <button onClick={addProduct}>Hozzáadás!</button>
        </div>
      </header>
    </div>
  );
}

export default Products;
