import { Children, isValidElement, ReactNode } from 'react'

export function findPropInChildren(
  children: ReactNode,
  prop: string,
  depth = 0
) {
  let name: string | undefined = undefined

  Children.forEach(children, child => {
    if (!child || !isValidElement(child)) return

    if (child.props[prop]) {
      name = child.props[prop]
    } else if (child.props.children != null && depth > 0) {
      name = findPropInChildren(
        child.props.children as ReactNode,
        prop,
        depth - 1
      )
    }
  })

  return name
}
