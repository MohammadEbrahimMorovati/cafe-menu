import { createContext, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";


const TenantContext = createContext({ slug: null });
export const useTenant = () => useContext(TenantContext);

export function TenantProvider({ children }) {
  const { slug } = useParams();



  return <TenantContext.Provider value={{ slug }}>{children}</TenantContext.Provider>;
}
