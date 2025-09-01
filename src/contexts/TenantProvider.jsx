import { createContext, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { attachTenant } from "../api/api";

const TenantContext = createContext({ slug: null });
export const useTenant = () => useContext(TenantContext);

export function TenantProvider({ children }) {
  const { slug } = useParams();

  // هر بار اسلاگ عوض شد، به axios بگو
  useMemo(() => {
    attachTenant(() => slug, { mode: "path" }); // اگر خواستی header/query هم می‌شه
  }, [slug]);

  return <TenantContext.Provider value={{ slug }}>{children}</TenantContext.Provider>;
}
