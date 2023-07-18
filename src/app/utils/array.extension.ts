export function reduceObjectArrayToObject<T>(cumulatedValue: T, currentValue:Partial<T>): T{
    return { ...cumulatedValue, ...currentValue}
}