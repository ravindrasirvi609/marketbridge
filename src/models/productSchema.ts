import { ObjectId } from "mongodb";

interface Supplier {
  _id: ObjectId;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: Address;
}

interface Pricing {
  basePrice: number;
  currency: string;
  discountTiers: {
    quantity: number;
    discountPercentage: number;
  }[];
  bulkPricing?: {
    minQuantity: number;
    pricePerUnit: number;
  }[];
}

interface Inventory {
  totalStock: number;
  availableStock: number;
  reservedStock: number;
  reorderPoint: number;
  leadTime: number; // in days
}

interface Shipping {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  shippingClass: string;
  freeShipping: boolean;
  shippingRestrictions?: string[];
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Certification {
  name: string;
  issuingBody: string;
  validUntil: Date;
  documentUrl: string;
}

export interface Product {
  _id: ObjectId;
  sku: string;
  name: string;
  description: string;
  category: string[];
  subCategory?: string[];
  brand: string;
  manufacturer: string;
  supplier: Supplier;
  pricing: Pricing;
  inventory: Inventory;
  attributes: Record<string, string | number | boolean>;
  images: string[];
  videos?: string[];
  documents?: {
    type: string;
    url: string;
  }[];
  shipping: Shipping;
  customsInfo: {
    hsCode: string;
    countryOfOrigin: string;
    customsValue: number;
  };
  certifications: Certification[];
  minimumOrderQuantity: number;
  maximumOrderQuantity?: number;
  relatedProducts: ObjectId[];
  tags: string[];
  status: "active" | "inactive" | "discontinued";
  createdAt: Date;
  updatedAt: Date;
  seoMetadata?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// MongoDB schema
import { Schema } from "mongoose";

const productSchema = new Schema<Product>(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: [String], required: true },
    subCategory: { type: [String] },
    brand: { type: String, required: true },
    manufacturer: { type: String, required: true },
    supplier: {
      name: { type: String, required: true },
      contactPerson: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
    },
    pricing: {
      basePrice: { type: Number, required: true },
      currency: { type: String, required: true },
      discountTiers: [
        {
          quantity: { type: Number, required: true },
          discountPercentage: { type: Number, required: true },
        },
      ],
      bulkPricing: [
        {
          minQuantity: { type: Number, required: true },
          pricePerUnit: { type: Number, required: true },
        },
      ],
    },
    inventory: {
      totalStock: { type: Number, required: true },
      availableStock: { type: Number, required: true },
      reservedStock: { type: Number, required: true },
      reorderPoint: { type: Number, required: true },
      leadTime: { type: Number, required: true },
    },
    attributes: { type: Map, of: Schema.Types.Mixed },
    images: { type: [String], required: true },
    videos: { type: [String] },
    documents: [
      {
        type: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    shipping: {
      weight: { type: Number, required: true },
      dimensions: {
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
      shippingClass: { type: String, required: true },
      freeShipping: { type: Boolean, required: true },
      shippingRestrictions: { type: [String] },
    },
    customsInfo: {
      hsCode: { type: String, required: true },
      countryOfOrigin: { type: String, required: true },
      customsValue: { type: Number, required: true },
    },
    certifications: [
      {
        name: { type: String, required: true },
        issuingBody: { type: String, required: true },
        validUntil: { type: Date, required: true },
        documentUrl: { type: String, required: true },
      },
    ],
    minimumOrderQuantity: { type: Number, required: true },
    maximumOrderQuantity: { type: Number },
    relatedProducts: { type: [Schema.Types.ObjectId], ref: "Product" },
    tags: { type: [String] },
    status: {
      type: String,
      enum: ["active", "inactive", "discontinued"],
      required: true,
    },
    seoMetadata: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: { type: [String] },
    },
  },
  { timestamps: true }
);

export default productSchema;
