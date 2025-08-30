

import { Suspense, useEffect, useState } from "react";
import { fetchData } from "../../services/fetchData";
import Loading from "../Loading/Loading";

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

type SortDirection = 'asc' | 'desc';
type SortField = 'country' | 'population';

const Table = () => {
  const [dataList, setDataList] = useState<ApiResponse | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [sortField, setSortField] = useState<SortField>('country');
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const filteredData = [...tableData].filter((item) => {
    return item.country.toLowerCase().includes(searchTerm.toLowerCase());
  })

  const filteredCountry = [...filteredData].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();

      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {

      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
    }
    return 0;
  })

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const handleSortDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const direction = e.target.value;
    if (direction === 'asc' || direction === 'desc') setSortDirection(direction);
  }

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = e.target.value;
    if (field === 'country' || field === 'population') setSortField(field);
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <div className="flex">
          <input type="text" placeholder="Search country.." value={searchTerm} onChange={handleSearchTermChange} />
          <h3>Sort by:</h3>
          <select value={sortField} onChange={handleSortFieldChange}>
            <option value="country">Country</option>
            <option value="population">Population</option>
          </select>
          <select value={sortDirection} onChange={handleSortDirectionChange}>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>
        <table>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISO</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Population</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO2</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO2 per capita</th>
            </tr>
          </thead>
          <tbody>
            {filteredCountry.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.country}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.iso_code || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.population || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.co2 || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.co2_per_capita || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Suspense>
    </div>
  )
}

export default Table;