export default (kelvin: number) => {
  const celcius = kelvin - 273.15
  const farenheit = (celcius * 1.8000) + 32

  return Math.round(farenheit)
}
