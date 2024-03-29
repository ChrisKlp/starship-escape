import { Coordinates } from '@/constants/Types'

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

export function convertXYToIndex(XY: number[], gridSize: number) {
  const [x, y] = XY
  return y * gridSize + x
}

export function convertIndexToBoardXY(
  index: number,
  boardSize: number
): Coordinates {
  return {
    x: index % boardSize,
    y: Math.floor(index / boardSize),
  }
}

function rotateSquareMatrix<T>(matrix: T[][]) {
  return matrix[0].map((val, index) =>
    matrix.map((row) => row[index]).reverse()
  )
}

export function rotateArrNTimes<T>(gridArr: T[], rotateN: number): T[] {
  let matrix = chunkArray(gridArr, 4)
  let i = 0
  while (i < rotateN) {
    matrix = rotateSquareMatrix(matrix)
    i++
  }
  return matrix.flat()
}

export function print(data: any) {
  console.log(JSON.stringify(data, null, 2))
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
