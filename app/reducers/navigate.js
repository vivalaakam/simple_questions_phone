import { NavigationActions } from 'react-navigation'

export default function navigate(routeName, params) {
  return NavigationActions.navigate({
    routeName,
    params
  })
}
