import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

const SearchBar = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState({
        vendors: [],
        users: [],
        products: [],
        receipts: [],
        receiptItems: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [vendors, users, products, receipts, receiptItems] = await Promise.all([
                    axios.get("http://localhost:8080/api/search/vendors"),
                    axios.get("http://localhost:8080/api/search/users"),
                    axios.get("http://localhost:8080/api/search/products"),
                    axios.get("http://localhost:8080/api/search/receipts"),
                    axios.get("http://localhost:8080/api/search/receipt-items")
                ]);

                setData({
                    vendors: vendors.data,
                    users: users.data,
                    products: products.data,
                    receipts: receipts.data,
                    receiptItems: receiptItems.data
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    const filteredData = {
        vendors: data.vendors.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase())),
        users: data.users.filter(u => u.username?.toLowerCase().includes(searchTerm.toLowerCase())),
        products: data.products.filter(p => p.productName.toLowerCase().includes(searchTerm.toLowerCase())),
        receipts: data.receipts.filter(r => r.id.toString().includes(searchTerm)),
        receiptItems: data.receiptItems.filter(ri => ri.itemName.toLowerCase().includes(searchTerm.toLowerCase()))
    };

    const categories = [
        { key: "vendors", label: "Vendors", icon: "🏬" },
        { key: "users", label: "Users", icon: "👤" },
        { key: "products", label: "Products", icon: "🍏" },
        { key: "receipts", label: "Receipts", icon: "🧾" },
        { key: "receiptItems", label: "Receipt Items", icon: "📦" }
    ];

    return (
        <div className="position-relative">
            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={t('searchBar.placeholder') || "Search..."}
                className="form-control mb-2"
                style={{ borderColor: "#ff6f61",width: '100%' }}
            />

            {searchTerm.length > 0 && (
                <div
                    className="position-absolute top-100 start-0 w-100 bg-white shadow p-3 rounded"
                    style={{ zIndex: 1000, maxHeight: "400px", overflowY: "auto" }}
                >
                    {categories.map(cat => (
                        filteredData[cat.key].length > 0 && (
                            <div key={cat.key} className="mb-3">
                                <h6 className="mb-2">
                                    <span role="img" >{cat.icon} {cat.label}</span>
                                </h6>
                                <ul className="list-group">
                                    {filteredData[cat.key].map(item => (
                                        <li key={item.id || item.username} className="list-group-item list-group-item-action">
                                            <Link to={`/results?query=${encodeURIComponent(item.name)}`} className="text-decoration-none text-dark d-block">
                                            {item.name || item.username || item.productName || item.itemName || `Receipt #${item.id}`}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    ))}
                    {Object.values(filteredData).every(arr => arr.length === 0) && (
                        <p className="text-muted m-0">No results found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
