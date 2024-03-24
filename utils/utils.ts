export function compareArrays<T>(a: T[], b: T[]) {
  return (
    a.length === b.length && a.every((element, index) => element === b[index])
  )
}

export function chunkArray<T>(arr: T[], size: number) {
  return [...Array(Math.ceil(arr.length / size))].map((_, i) =>
    arr.slice(size * i, size + size * i)
  )
}

export function sortMatrixCoordinates(obstacles: number[][]) {
  return [
    ...obstacles.sort((a, b) => {
      if (a[1] === b[1]) return a[0] - b[0]
      return a[1] - b[1]
    }),
  ]
}

export function print(data: any) {
  console.log(JSON.stringify(data, null, 2))
}
