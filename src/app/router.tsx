import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import App from "../App";
import Landing from "../pages/Landing";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import Rewards from "../pages/Rewards";
import Parent from "../pages/Parent";

const rootRoute = createRootRoute({ component: App });

const landingRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: Landing });
const quizRoute    = createRoute({ getParentRoute: () => rootRoute, path: "/quiz", component: Quiz });
const resultRoute  = createRoute({ getParentRoute: () => rootRoute, path: "/result", component: Result });
const rewardsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/rewards", component: Rewards });
const parentRoute = createRoute({ getParentRoute: () => rootRoute, path: "/parent", component: Parent });
const routeTree = rootRoute.addChildren([landingRoute, quizRoute, resultRoute, rewardsRoute, parentRoute]);

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" { interface Register { router: typeof router } }

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
