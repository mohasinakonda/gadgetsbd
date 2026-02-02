'use client'
import { uploadFile } from "@/services/upload-file";
import MDEditor from "@uiw/react-md-editor";
import { ArrowLeft, Plus, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function CreateProductPage() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "Laptops & Computers",
    brand: "Apple",
    condition: "New",
    description: "",
    price: "",
    stock: "",
    sku: "",
    availability: "In Stock",
    warranty: "No Warranty",
    defaultImage: "",
    images: [] as string[],
    processor: "",
    ram: "",
    storage: "",
    displaySize: "",
    otherSpecifications: ""
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [description, setDescription] = useState<string>();
  const [otherSpecifications, setOtherSpecifications] = useState<string>();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFormError("");
    try {
      const url = await uploadFile(file);
      setFormData((prev) => ({
        ...prev,
        defaultImage: url
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
      setFormError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAdditionalImagesChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setIsUploading(true);
    setFormError("");
    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const url = await uploadFile(file);
        uploadedUrls.push(url);
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (error) {
      console.error("Additional images upload failed:", error);
      setFormError("Failed to upload additional images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    const requiredFields = [
      "productName",
      "category",
      "brand",
      "condition",
      // "description",
      "price",
      "stock",
      "warranty",
      "defaultImage"
    ] as const;

    const missingFields = requiredFields.filter((field) => {
      const value = formData[field];
      return value === undefined || value === null || value === "";
    });

    if (missingFields.length > 0) {
      setFormError(`Please fill out all required fields before submitting.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const slug = formData.productName.toLowerCase().replace(/ /g, '-');
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        description,
        otherSpecifications,
        slug
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload?.error || "Failed to create product.");
      }

      setFormSuccess("Product created successfully.");
      setFormData({
        productName: "",
        category: "Laptops & Computers",
        brand: "Apple",
        condition: "New",
        description: "",
        price: "",
        stock: "",
        sku: "",
        availability: "In Stock",
        warranty: "No Warranty",
        defaultImage: "",
        images: [],
        processor: "",
        ram: "",
        storage: "",
        displaySize: "",
        otherSpecifications: ""
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create product. Please try again.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <main className="max-w-[1000px] mx-auto w-full p-6">
    <div className="mb-8 flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-normal">Add a Product</h1>
        <p className="text-sm text-gray-600">
          Create a new listing for your gadget product.
        </p>
      </div>
      <Link
        href="/manage-listing"
        className="text-amazon-blue hover:underline text-sm flex items-center gap-1"
      >
        <ArrowLeft data-lucide="arrow-left" className="w-4 h-4" /> Back to Manage List
      </Link>
    </div>
    <form onSubmit={handleSubmit} className="space-y-6">
      {(formError || formSuccess) && (
        <div
          className={`rounded-md border px-4 py-3 text-sm ${formError
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-green-200 bg-green-50 text-green-700"
            }`}
        >
          {formError || formSuccess}
        </div>
      )}
      {/* Step 1: Product Identity */}
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
          <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
            Step 1: Product Identity
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1">Product Name</label>
              <input
                type="text"
                name="productName"
                placeholder="e.g., Apple MacBook Pro M2 - 16GB RAM"
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                value={formData.productName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Category</label>
              <select
                name="category"
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option>Laptops &amp; Computers</option>
                <option>Smartphones &amp; Tablets</option>
                <option>Audio &amp; Headphones</option>
                <option>Gaming Accessories</option>
                <option>Cameras &amp; Photography</option>
                <option>Wearables &amp; Smartwatches</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1">Brand</label>
              <select
                name="brand"
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                value={formData.brand}
                onChange={handleInputChange}
              >
                <option>Apple</option>
                <option>Samsung</option>
                <option>Dell</option>
                <option>HP</option>
                <option>Lenovo</option>
                <option>Sony</option>
                <option>Razer</option>
                <option>Logitech</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Condition</label>
              <select
                name="condition"
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                value={formData.condition}
                onChange={handleInputChange}
              >
                <option>New</option>
                <option>Renewed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Description</label>
            {/* <MDEditor.Markdown source={formData.description} style={{ whiteSpace: 'pre-wrap', background: 'white', color: 'black' }} /> */}
            <MDEditor style={{ background: 'white', color: '#000000' }} preview="edit" value={description} onChange={setDescription} />
            {/* <textarea
              rows={4}
              name="description"
              placeholder="Describe your product features, specifications, and benefits..."
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
              value={formData.description}
              onChange={handleInputChange}
            /> */}
          </div>
        </div>
      </div>
      {/* Step 2: Pricing & Inventory */}
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
          <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
            Step 2: Pricing &amp; Inventory
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1">Price (৳)</label>
              <input
                type="number"
                placeholder={'0.0'}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                placeholder={'0'}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                SKU (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., MBP-M2-16-1TB"
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1">Availability</label>
              <select
                name="availability"
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                value={formData.availability}
                onChange={handleInputChange}
              >
                <option>In Stock</option>
                <option>Pre-Order</option>
                <option>Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                Warranty Period
              </label>
              <select
                name="warranty"
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                value={formData.warranty}
                onChange={handleInputChange}
              >
                <option>No Warranty</option>
                <option>6 Months</option>
                <option>1 Year</option>
                <option>2 Years</option>
                <option>3 Years</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Step 3: Product Images */}
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
          <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
            Step 3: Product Images
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">
              Main Product Image
            </label>
            <label htmlFor="imageInput" className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center hover:border-amazon-blue transition-colors cursor-pointer block">
              <Upload
                data-lucide="upload"
                className="w-12 h-12 mx-auto text-gray-400 mb-2"
              />
              <p className="text-sm text-gray-600 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {formData.defaultImage && (
              <div className="mt-4 flex items-center gap-4">
                <Image
                  src={formData.defaultImage}
                  alt="Uploaded product"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded border border-gray-200 object-cover"
                />
                <span className="text-xs text-gray-600">Main image uploaded.</span>
              </div>
            )}
            {isUploading && (
              <p className="text-xs text-gray-500">Uploading image...</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">
              Additional Images (Optional)
            </label>
            <label
              htmlFor="additionalImagesInput"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 cursor-pointer"
            >
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-amazon-blue transition-colors cursor-pointer aspect-square flex items-center justify-center">
                <Plus data-lucide="plus" className="w-8 h-8 text-gray-400" />
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-amazon-blue transition-colors cursor-pointer aspect-square flex items-center justify-center">
                <Plus data-lucide="plus" className="w-8 h-8 text-gray-400" />
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-amazon-blue transition-colors cursor-pointer aspect-square flex items-center justify-center">
                <Plus data-lucide="plus" className="w-8 h-8 text-gray-400" />
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-amazon-blue transition-colors cursor-pointer aspect-square flex items-center justify-center">
                <Plus data-lucide="plus" className="w-8 h-8 text-gray-400" />
              </div>
            </label>
            <input
              id="additionalImagesInput"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleAdditionalImagesChange}
            />
            {formData.images.length > 0 && (
              <p className="text-xs text-gray-600 mt-2">
                {formData.images.length} additional image
                {formData.images.length === 1 ? "" : "s"} uploaded.
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Step 4: Specifications */}
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
          <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
            Step 4: Technical Specifications (Optional)
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1">
                Processor/Chipset
              </label>
              <input
                type="text"
                placeholder="e.g., Apple M2 Max"
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                name="processor"
                value={formData.processor}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">RAM/Memory</label>
              <input
                type="text"
                placeholder="e.g., 32GB"
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                name="ram"
                value={formData.ram}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1">Storage</label>
              <input
                type="text"
                placeholder="e.g., 1TB SSD"
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                name="storage"
                value={formData.storage}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Display Size</label>
              <input
                type="text"
                placeholder="e.g., 16 inch"
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                name="displaySize"
                value={formData.displaySize}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">
              Other Specifications
            </label>
            <MDEditor style={{ background: 'white', color: 'black' }} preview="edit" value={otherSpecifications} onChange={setOtherSpecifications} />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
        <button
          type="button"
          // onclick="window.location.href = 'manageList.html'"
          className="px-6 py-2 border border-gray-400 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="px-6 py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Publishing..." : "Publish Product"}
        </button>
      </div>
    </form>
  </main>

}