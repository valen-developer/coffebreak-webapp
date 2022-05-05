export abstract class Navbar {}

export interface Route {
  iconClass: string;
  label: string;
  path: string;
}

export interface WebNavbarRouteSection {
  label: string;
  routes: Route[];
}
