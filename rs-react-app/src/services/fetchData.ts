export const fetchData = async () => {
  try {
    const response = await fetch('https://1arseniy.github.io/dataCountries/co2-data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

}