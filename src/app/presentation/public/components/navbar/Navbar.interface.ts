export abstract class Navbar {
  abstract routes: Route[];
}

export interface Route {
  label: string;
  path: string;
}
