"use client"
import React, { useState } from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Label from "@/components/Label/Label";

const Page = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    comment: "",
    informedByEmail: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form
        className="grid md:grid-cols-2 gap-6"
        action="#"
        method="post"
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <label className="block">
          <Label>Title *</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1"
          />
        </label>

        {/* Description */}
        <label className="block">
          <Label>Description</Label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1"
          />
        </label>

        {/* Comment */}
        <label className="block">
          <Label>Comment</Label>
          <Input
            type="text"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="mt-1"
          />
        </label>

        {/* Informed By Email */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="informedByEmail"
            checked={formData.informedByEmail}
            onChange={handleChange}
            className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <Label className="text-sm text-gray-700 dark:text-gray-300">Je souhaite être informé·e par email.</Label>
        </label>


        <ButtonPrimary className="md:col-span-2" type="submit">
          Submit Request
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default Page;
