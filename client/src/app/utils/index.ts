export const classNames = (...classes: (string | undefined)[]) => {
  return classes.join(' ')
}

export const capitalize = (string: string) => {
  if (! string) return

  return string[0].toUpperCase() + string.slice(1)
}
