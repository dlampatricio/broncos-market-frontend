"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

function parseJwt(token: string): { exp?: number } | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
}

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getToken = useCallback(() => localStorage.getItem("admin_token"), []);

  useEffect(() => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("admin_token");
      router.push("/admin/login");
      return;
    }
    setAuthenticated(true);
    setLoading(false);
  }, [router, getToken]);

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  }, [router]);

  return { authenticated, loading, token: getToken(), logout };
}
