

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { fetchData } from "../../services/fetchData";
import Loading from "../Loading/Loading";
import SearchInput from "../Search/Search";
import Select from "../Select/Select";

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

  const tableData: TableRowData[] = useMemo(() => {
    if (!dataList) return [];
    return Object.entries(dataList).map(
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
      });
  }, [dataList])

  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      return item.country.toLowerCase().includes(searchTerm.toLowerCase());
    })
  }, [tableData, searchTerm])

  const filteredCountry = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();

        if (aValue > bValue) {
          return sortDirection === 'asc' ? 1 : -1;
        }

        if (aValue < bValue) {
          return sortDirection === 'desc' ? -1 : 1;
        }
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {

        if (aValue > bValue) {
          return sortDirection === 'asc' ? 1 : -1;
        }

        if (aValue < bValue) {
          return sortDirection === 'desc' ? -1 : 1;
        }
      }
      return 0;
    })
  }, [filteredData, sortField, sortDirection]);

  const handleSearchTermChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, [])

  const handleSortDirectionChange = useCallback((value: string) => {
    const direction = value;
    if (direction === 'asc' || direction === 'desc') setSortDirection(direction);
  }, [])

  const handleSortFieldChange = useCallback((value: string) => {
    const field = value;
    if (field === 'country' || field === 'population') setSortField(field);
  }, [])

  const sortFieldOptions = [
    { value: 'country', label: 'Country' },
    { value: 'population', label: 'Population' }
  ];

  const sortDirectionOptions = [
    { value: 'asc', label: 'ASC' },
    { value: 'desc', label: 'DESC' }
  ];


  return (
    <div>
      <Suspense fallback={<Loading />}>
        <div className="flex">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchTermChange}
          />

          <Select
            value={sortField}
            onChange={handleSortFieldChange}
            options={sortFieldOptions}
            label="Sort by:"
          />

          <Select
            value={sortDirection}
            onChange={handleSortDirectionChange}
            options={sortDirectionOptions}
          />
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