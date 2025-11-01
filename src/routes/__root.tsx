import { ErrorFallback } from "@rm-hull/chakra-error-fallback";
import { CatchBoundary, createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/react-router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

export const Route = createRootRoute({
  component: () => (
    <>
      <CatchBoundary getResetKey={() => "reset"} errorComponent={ErrorFallback}>
        <Outlet />
      </CatchBoundary>
      <Suspense>
        <TanStackRouterDevtools initialIsOpen={false} />
      </Suspense>
    </>
  ),
});
