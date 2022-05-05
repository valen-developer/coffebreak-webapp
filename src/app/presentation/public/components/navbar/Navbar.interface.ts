export abstract class Navbar {
  abstract routes: Route[];
}

export interface Route {
  iconClass: string;
  label: string;
  path: string;
}
