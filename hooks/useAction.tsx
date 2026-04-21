"use client"
import { useState } from "react";
import { useError } from "./useError";

export function useAction(action: Function) {
  const [loading, setLoading] = useState(false);
  const { handleError } = useError();

  const execute = async (...args: any[]) => {
    try {
      setLoading(true);

      return await action(...args);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    loading,
  };
}
