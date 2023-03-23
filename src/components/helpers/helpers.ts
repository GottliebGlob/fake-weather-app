export const toCelsius = (temp: string) => {
  return (Number(temp) - 273.15).toFixed(0)
}
