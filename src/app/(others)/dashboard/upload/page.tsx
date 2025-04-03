"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Textarea from "@/components/Textarea/Textarea";
import Label from "@/components/Label/Label";
import Select from "@/components/Select/Select";

const DashboardSubmitFile = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [fileData, setFileData] = useState({
    title: "",
    author: "",
    description: "",
    url: "",
    category: "",
    tags: "",
    isDownloadable: false,
    isAccessible: false,
  });

  const [file, setFile] = useState<File | null>(null);

  // Fetch categories dynamically from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3003/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handles input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handles file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handles checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file && !fileData.url) {
      alert("Please either upload a file or provide a URL.");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("userId", "86f6d1e6-78d3-409a-bc99-7c03df8d5aaf");
    Object.entries(fileData).forEach(([key, value]) => formData.append(key, String(value)));

    try {
      const response = await fetch("http://localhost:3003/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        setFile(null);
        setFileData({
          title: "",
          author: "",
          description: "",
          url: "",
          category: "",
          tags: "",
          isDownloadable: false,
          isAccessible: false,
        });
      } else {
        alert("Error uploading file.");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <label className="block md:col-span-2">
          <Label>Titre *</Label>
          <Input type="text" name="title" value={fileData.title} onChange={handleInputChange} required />
        </label>

        <label className="block">
          <Label>Auteur *</Label>
          <Input type="text" name="author" value={fileData.author} onChange={handleInputChange} required />
        </label>

        <label className="block">
          <Label>Catégorie</Label>
          <Select name="category" value={fileData.category} onChange={handleInputChange}>
            <option value="">– Sélectionnez une catégorie –</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </label>

        {/* Tags */}
        <label className="block md:col-span-2">
            <Label>Tags (comma-separated)</Label>
            <Input type="text" name="tags" value={fileData.tags} onChange={handleInputChange} className="mt-1" />
        </label>

        <label className="block md:col-span-2">
          <Label>Description</Label>
          <Textarea name="description" value={fileData.description} onChange={handleInputChange} rows={4} />
        </label>

        {/* Upload File */}
        <div className="block md:col-span-2">
          <Label>Insérez le fichier *</Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
            <input id="file-upload" type="file" accept=".pdf,.doc,.docx,.txt,.jpg,.png,.gif" onChange={handleFileChange} className="hidden" />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-neutral-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className="text-sm text-neutral-600">Click to upload or drag and drop</p>
                <p className="text-xs text-neutral-500">PDF, DOC, TXT, JPG, PNG (Max 5MB)</p>
              </div>
            </label>
          </div>
          {file && <p className="mt-2 text-sm text-green-500">{file.name} selected</p>}
        </div>

        <label className="block md:col-span-2">
          <Label>URL</Label>
          <Input type="url" name="url" value={fileData.url} onChange={handleInputChange} placeholder="https://example.com/file.pdf" />
        </label>

        <label className="block">
          <input type="checkbox" name="isDownloadable" checked={fileData.isDownloadable} onChange={handleCheckboxChange} />
          <span className="ml-2">Autoriser le téléchargement</span>
        </label>

        <label className="block">
          <input type="checkbox" name="isAccessible" checked={fileData.isAccessible} onChange={handleCheckboxChange} />
          <span className="ml-2">Accessible publiquement</span>
        </label>

        <ButtonPrimary type="submit" className="md:col-span-2">Envoyer</ButtonPrimary>
      </form>
    </div>
  );
};

export default DashboardSubmitFile;
