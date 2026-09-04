"use client";

import { useState, useEffect } from "react";

export function useAdminToken() {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("admin_token") || "");
  }, []);
  return token;
}
