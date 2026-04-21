"use client"
import { useState } from "react";

export function useError() {
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    const data = err?.response?.data;

    let message = "Ocurrió un error inesperado";

    if (typeof data === "string") {
      message = data;
    } else if (data) {
      if (data.detail) {
        message = data.detail;
      } else if (data.message) {
        message = data.message;
      } else if (data.non_field_errors) {
        message = Array.isArray(data.non_field_errors)
          ? data.non_field_errors.join(", ")
          : data.non_field_errors;
      } else {
        const firstKey = Object.keys(data)[0];
        if (firstKey) {
          const val = data[firstKey];
          message = `${firstKey}: ${Array.isArray(val) ? val.join(", ") : val}`;
        }
      }
    } else if (err?.message) {
      message = err.message;
    }

    setError(message);
    console.error(err);
  };

  const clearError = () => setError(null);

  return {
    error,
    handleError,
    clearError,
  };
}
