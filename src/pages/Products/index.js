import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

import all_products from "../../constants/products";
import { calculateRange, sliceData } from "../../utils/table-pagination";

import "../styles.css";

const Products = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(all_products);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    setPagination(calculateRange(all_products, 5));
    setProducts(sliceData(all_products, page, 5));
  }, []);

  // Handler Click

  // Search
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = products.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.genre.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(search_results);
    } else {
      __handleChangePage(1);
    }
  };

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setProducts(sliceData(all_products, new_page, 5));
  };

  return (
    <div className="dashboard-content">
      <Header btnText="Add Product" event="product" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Product List</h2>
          <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              className="dashboard-content-input"
              onChange={(e) => __handleSearch(e)}
            />
          </div>
        </div>

        <table>
          <thead>
            <th>ID</th>
            <th>NAME</th>
            <th>IMAGE</th>
            <th>GENRE</th>
            <th>PRICE</th>
            <th>Action</th>
          </thead>

          {products.length !== 0 ? (
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <span>{product.id}</span>
                  </td>
                  <td>
                    <span>{product.name}</span>
                  </td>
                  <td>
                    <div>
                      <img
                        src={product.image}
                        className="dashboard-content-avatar"
                      />
                    </div>
                  </td>
                  <td>
                    <span>{product.genre}</span>
                  </td>
                  <td>
                    <span>Rp.{product.price}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>

        {products.length !== 0 ? (
          <div className="dashboard-content-footer">
            {pagination.map((item, index) => (
              <span
                key={index}
                className={item === page ? "active-pagination" : "pagination"}
                onClick={() => __handleChangePage(item)}
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="dashboard-content-footer">
            <span className="empty-table">No data</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
