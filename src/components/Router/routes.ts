const Routes = Object.freeze({
  index: '/',
  settings: '/settings',
} as const)

export type RoutesPaths = typeof Routes[keyof typeof Routes]

export default Routes
