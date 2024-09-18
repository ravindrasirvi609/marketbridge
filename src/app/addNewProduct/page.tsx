"use client";
import React, { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

const ProductForm = () => {
  const [form, setForm] = useState({
    // Initialize form state here
    sku: "",
    name: "",
    description: "",
    category: [],
    subCategory: [],
    brand: "",
    manufacturer: "",
    supplier: {
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    },
    pricing: {
      basePrice: 0,
      currency: "USD",
      discountTiers: [{ quantity: 0, discountPercentage: 0 }],
      bulkPricing: [{ minQuantity: 0, pricePerUnit: 0 }],
    },
    inventory: {
      totalStock: 0,
      availableStock: 0,
      reservedStock: 0,
      reorderPoint: 0,
      leadTime: 0,
    },
    attributes: {},
    images: [""],
    videos: [""],
    documents: [{ type: "", url: "" }],
    shipping: {
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      shippingClass: "",
      freeShipping: false,
      shippingRestrictions: [""],
    },
    customsInfo: {
      hsCode: "",
      countryOfOrigin: "",
      customsValue: 0,
    },
    certifications: [
      {
        name: "",
        issuingBody: "",
        validUntil: "",
        documentUrl: "",
      },
    ],
    minimumOrderQuantity: 1,
    maximumOrderQuantity: null,
    relatedProducts: [""],
    tags: [""],
    status: "active",
    seoMetadata: {
      metaTitle: "",
      metaDescription: "",
      keywords: [""],
    },
  });

  const handleChange = (
    e: any,
    section: string | null = null,
    index: number | null = null
  ) => {
    const { name, value } = e.target;
    if (section) {
      if (index !== null) {
        setForm((prev: any) => ({
          ...prev,
          [section]: (prev[section] || []).map((item: any, i: any) =>
            i === index ? { ...item, [name]: value } : item
          ),
        }));
      } else {
        setForm((prev: any) => ({
          ...prev,
          [section]: { ...prev[section], [name]: value },
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addListItem = (section: any) => {
    setForm((prev: any) => ({
      ...prev,
      [section]: [...prev[section], getEmptyItem(section)],
    }));
  };

  const removeListItem = (section: string, index: number) => {
    setForm((prev: any) => ({
      ...prev,
      [section]: prev[section].filter((_: any, i: number) => i !== index),
    }));
  };

  const getEmptyItem = (section: any) => {
    switch (section) {
      case "discountTiers":
        return { quantity: 0, discountPercentage: 0 };
      case "bulkPricing":
        return { minQuantity: 0, pricePerUnit: 0 };
      case "images":
      case "videos":
      case "shippingRestrictions":
      case "relatedProducts":
      case "tags":
        return "";
      case "documents":
        return { type: "", url: "" };
      case "certifications":
        return { name: "", issuingBody: "", validUntil: "", documentUrl: "" };
      default:
        return {};
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Here you would typically send the form data to your API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-[#EEEEEE] rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-6 text-[#1C658C]">
        Add New Product
      </h1>

      {/* Basic Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#398AB9]">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              SKU
            </label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-[#1C658C]">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Manufacturer
            </label>
            <input
              type="text"
              name="manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Supplier Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#398AB9]">
          Supplier Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Supplier Name
            </label>
            <input
              type="text"
              name="name"
              value={form.supplier.name}
              onChange={(e) => handleChange(e, "supplier")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Contact Person
            </label>
            <input
              type="text"
              name="contactPerson"
              value={form.supplier.contactPerson}
              onChange={(e) => handleChange(e, "supplier")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.supplier.email}
              onChange={(e) => handleChange(e, "supplier")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={form.supplier.phone}
              onChange={(e) => handleChange(e, "supplier")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#398AB9]">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Base Price
            </label>
            <input
              type="number"
              name="basePrice"
              value={form.pricing.basePrice}
              onChange={(e) => handleChange(e, "pricing")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Currency
            </label>
            <select
              name="currency"
              value={form.pricing.currency}
              onChange={(e) => handleChange(e, "pricing")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              {/* Add more currency options as needed */}
            </select>
          </div>
        </div>

        {/* Discount Tiers */}
        <div className="mt-4">
          <h3 className="text-lg font-medium text-[#1C658C] mb-2">
            Discount Tiers
          </h3>
          {form.pricing.discountTiers.map((tier, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="number"
                name="quantity"
                value={tier.quantity}
                onChange={(e) => handleChange(e, "discountTiers", index)}
                placeholder="Quantity"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
              />
              <input
                type="number"
                name="discountPercentage"
                value={tier.discountPercentage}
                onChange={(e) => handleChange(e, "discountTiers", index)}
                placeholder="Discount %"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={() => removeListItem("discountTiers", index)}
                className="text-red-500 hover:text-red-700"
              >
                <MinusCircle size={24} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addListItem("discountTiers")}
            className="mt-2 flex items-center text-[#398AB9] hover:text-[#1C658C]"
          >
            <PlusCircle size={24} className="mr-2" /> Add Discount Tier
          </button>
        </div>
      </section>

      {/* Inventory */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#398AB9]">
          Inventory
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Total Stock
            </label>
            <input
              type="number"
              name="totalStock"
              value={form.inventory.totalStock}
              onChange={(e) => handleChange(e, "inventory")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Available Stock
            </label>
            <input
              type="number"
              name="availableStock"
              value={form.inventory.availableStock}
              onChange={(e) => handleChange(e, "inventory")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Reserved Stock
            </label>
            <input
              type="number"
              name="reservedStock"
              value={form.inventory.reservedStock}
              onChange={(e) => handleChange(e, "inventory")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Reorder Point
            </label>
            <input
              type="number"
              name="reorderPoint"
              value={form.inventory.reorderPoint}
              onChange={(e) => handleChange(e, "inventory")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Lead Time (days)
            </label>
            <input
              type="number"
              name="leadTime"
              value={form.inventory.leadTime}
              onChange={(e) => handleChange(e, "inventory")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Shipping */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#398AB9]">Shipping</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={form.shipping.weight}
              onChange={(e) => handleChange(e, "shipping")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Length (cm)
            </label>
            <input
              type="number"
              name="length"
              value={form.shipping.dimensions.length}
              onChange={(e) => handleChange(e, "shipping.dimensions")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Width (cm)
            </label>
            <input
              type="number"
              name="width"
              value={form.shipping.dimensions.width}
              onChange={(e) => handleChange(e, "shipping.dimensions")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={form.shipping.dimensions.height}
              onChange={(e) => handleChange(e, "shipping.dimensions")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Shipping Class
            </label>
            <input
              type="text"
              name="shippingClass"
              value={form.shipping.shippingClass}
              onChange={(e) => handleChange(e, "shipping")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="freeShipping"
              checked={form.shipping.freeShipping}
              onChange={(e) =>
                handleChange(
                  { target: { name: "freeShipping", value: e.target.checked } },
                  "shipping"
                )
              }
              className="h-4 w-4 text-[#398AB9] focus:ring-[#398AB9] border-gray-300 rounded"
            />
            <label
              htmlFor="freeShipping"
              className="ml-2 block text-sm text-[#1C658C]"
            >
              Free Shipping
            </label>
          </div>
        </div>
      </section>

      {/* Customs Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#398AB9]">
          Customs Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              HS Code
            </label>
            <input
              type="text"
              name="hsCode"
              value={form.customsInfo.hsCode}
              onChange={(e) => handleChange(e, "customsInfo")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Country of Origin
            </label>
            <input
              type="text"
              name="countryOfOrigin"
              value={form.customsInfo.countryOfOrigin}
              onChange={(e) => handleChange(e, "customsInfo")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Customs Value
            </label>
            <input
              type="number"
              name="customsValue"
              value={form.customsInfo.customsValue}
              onChange={(e) => handleChange(e, "customsInfo")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#398AB9]">
          Certifications
        </h2>
        {form.certifications.map((cert, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-[#D8D2CB] rounded-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1C658C]">
                  Certification Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={cert.name}
                  onChange={(e) => handleChange(e, "certifications", index)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1C658C]">
                  Issuing Body
                </label>
                <input
                  type="text"
                  name="issuingBody"
                  value={cert.issuingBody}
                  onChange={(e) => handleChange(e, "certifications", index)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1C658C]">
                  Valid Until
                </label>
                <input
                  type="date"
                  name="validUntil"
                  value={cert.validUntil}
                  onChange={(e) => handleChange(e, "certifications", index)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1C658C]">
                  Document URL
                </label>
                <input
                  type="url"
                  name="documentUrl"
                  value={cert.documentUrl}
                  onChange={(e) => handleChange(e, "certifications", index)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeListItem("certifications", index)}
              className="mt-2 text-red-500 hover:text-red-700"
            >
              Remove Certification
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem("certifications")}
          className="mt-2 flex items-center text-[#398AB9] hover:text-[#1C658C]"
        >
          <PlusCircle size={24} className="mr-2" /> Add Certification
        </button>
      </section>

      {/* Additional Details */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#398AB9]">
          Additional Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Minimum Order Quantity
            </label>
            <input
              type="number"
              name="minimumOrderQuantity"
              value={form.minimumOrderQuantity}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C658C]">
              Maximum Order Quantity
            </label>
            <input
              type="number"
              name="maximumOrderQuantity"
              value={form.maximumOrderQuantity || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-[#1C658C]">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-[#D8D2CB] rounded-full px-3 py-1"
              >
                <span className="text-sm text-[#1C658C]">{tag}</span>
                <button
                  type="button"
                  onClick={() => removeListItem("tags", index)}
                  className="ml-2 text-[#1C658C] hover:text-[#398AB9]"
                >
                  <MinusCircle size={16} />
                </button>
              </div>
            ))}
            <input
              type="text"
              placeholder="Add a tag"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addListItem("tags");
                  (e.target as HTMLInputElement).value = "";
                }
              }}
              className="flex-grow min-w-[150px] rounded-md border-gray-300 shadow-sm focus:border-[#398AB9] focus:ring focus:ring-[#398AB9] focus:ring-opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-[#398AB9] text-white py-2 px-4 rounded-md hover:bg-[#1C658C] focus:outline-none focus:ring-2 focus:ring-[#398AB9] focus:ring-opacity-50"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
