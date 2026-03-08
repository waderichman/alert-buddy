import { PropsWithChildren, useEffect } from "react";
import { useAppStore } from "@/store/use-app-store";

export function RootProvider({ children }: PropsWithChildren) {
  const bootstrap = useAppStore((state) => state.bootstrap);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  return children;
}
