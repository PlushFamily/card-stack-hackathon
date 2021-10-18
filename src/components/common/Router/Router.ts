import { LocationState, LocationDescriptor, History } from 'history'
import {
  Route as ReactRouterRoute,
  Link as ReactRouterLink,
  LinkProps,
  useHistory as useReactRouterHistory,
} from 'react-router-dom'
import { RoutesPaths } from './routes'

/**
 * Restricted allowed route paths overwrite default any string. Only
 * those paths that are in the routes available.
 */
class Route<T extends {} = {}> extends ReactRouterRoute<T, RoutesPaths> {}

interface RestrictedLinkComponentParams<S = LocationState>
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<LinkProps<S> & { to: RoutesPaths }> &
      React.RefAttributes<HTMLAnchorElement>
  > {}
type RestrictedLink = <S = LocationState>(
  ...params: Parameters<RestrictedLinkComponentParams & { to: RoutesPaths }>
) => ReturnType<ReactRouterLink<S>>

const Link = ReactRouterLink as RestrictedLink

type RestrictedHistory<HistoryLocationState = LocationState> =
  History<HistoryLocationState> & {
    push(path: RoutesPaths, state?: HistoryLocationState): void
    push(location: LocationDescriptor<HistoryLocationState>): void
  }
type useHistoryType = <
  HistoryLocationState = History.LocationState
>() => RestrictedHistory<HistoryLocationState>
const useHistory = useReactRouterHistory as useHistoryType

export * from 'react-router-dom'
export { Route, Link, useHistory }
