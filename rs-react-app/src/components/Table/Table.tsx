

import { useEffect, useState } from "react";
import { fetchData } from "../../services/fetchData";

interface CountryData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
}

interface CountryInfo {
  iso_code: string;
  data: CountryData[];
}

interface ApiResponse {
  [country: string]: CountryInfo;
}

interface TableRowData {
  country: string;
  iso_code: string;
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
}


const Table = () => {
  const [dataList, setDataList] = useState<ApiResponse | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('Afghanistan');
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchData();
        setDataList(res);
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, [])
  const tableData: TableRowData[] = dataList ? Object.entries(dataList).map(
    ([country, countryInfo]) => {
      const lastYear = countryInfo.data[countryInfo.data.length - 1]
      return {
        country,
        iso_code: countryInfo.iso_code,
        year: lastYear.year,
        population: lastYear.population,
        co2: lastYear.co2,
        co2_per_capita: lastYear.co2_per_capita
      }
    }) : []
  console.log(tableData)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>ISO</th>
            <th>Year</th>
            <th>Population</th>
            <th>CO2</th>
            <th>CO2 per capita</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.country}</td>
              <td>{item.iso_code || 'N/A'}</td>
              <td>{item.year}</td>
              <td>{item.population || 'N/A'}</td>
              <td>{item.co2 || 'N/A'}</td>
              <td>{item.co2_per_capita || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table;