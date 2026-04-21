"use client"
import { useState } from "react";

export function UseForm<T>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setField = (field: keyof T, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return {
    formData,
    setFormData,
    handleChange,
    setField,
    resetForm,
  };
}
