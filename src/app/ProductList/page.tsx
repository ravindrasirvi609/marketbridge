import Image from "next/image";
import React from "react";

const products = [
  {
    id: 1,
    name: "Industrial Lubricant",
    description: "High-performance lubricant for heavy machinery.",
    price: "$250",
    image:
      "https://images.unsplash.com/photo-1699528136776-51ddd829363e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Bulk Steel Rods",
    description: "Premium quality steel rods available in bulk.",
    price: "$1,500",
    image:
      "https://images.unsplash.com/photo-1658681906631-f0a96e2d199b?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Construction Cement",
    description: "High-grade cement for construction projects.",
    price: "$300",
    image:
      "https://images.unsplash.com/photo-1521220546621-cf34a1165c67?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Industrial Paint",
    description: "Durable paint for industrial applications.",
    price: "$180",
    image:
      "https://plus.unsplash.com/premium_photo-1692110816603-0af172aee658?q=80&w=3159&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  // Add more products as needed
];

export default function ProductList() {
  return (
    <div className="bg-[#EEEEEE] min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-center text-[#1C658C] mb-12">
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                width={400}
                height={300}
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#1C658C] mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="text-lg font-semibold text-[#398AB9] mb-4">
                  {product.price}
                </div>
                <button className="w-full bg-[#1C658C] text-white py-2 rounded-lg font-semibold hover:bg-[#398AB9] transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
