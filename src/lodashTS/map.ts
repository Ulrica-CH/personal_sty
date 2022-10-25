/**
 * Creates an array of values by running each element of `array` thru `iteratee`.
 * The iteratee is invoked with three arguments: (value, index, array).
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * map([4, 8], square)
 * // => [16, 64]
 */

const map = <T>(arr: T[], cb: (item: T, i?: number, array?: T[]) => T) => {
    let i = -1
    const l = arr === null ? 0 : arr.length
    const result = new Array(l)
     while (++i < l) {
        result[i] = cb(arr[i], i, arr)
    }
    return result
}
// [ 4, 16 ]
console.log(map<any>([2,4],(d) => ({d})))
// export default map