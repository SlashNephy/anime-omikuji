export const randomChoose = <T>(array: T[]): T => {
  const result = array[Math.floor(Math.random() * array.length)]
  if (result === undefined) {
    throw new Error('array is empty')
  }

  return result
}
