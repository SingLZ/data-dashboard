import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import BreweryInfo from "./Components/BreweryInfo.jsx";
import SideNav from "./Components/SideNav.jsx";
import StatisticCard from "./Components/StatisticCard.jsx";
import BreweryChart from './Components/BreweryChart.jsx';
import BreweryBar from './Components/BreweryBar.jsx';

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchCounts, setSearchCounts] = useState(0);
  const [uniqueBreweryTypes, setUniqueBreweryTypes] = useState([]);
  const [uniqueCities, setUniqueCities] = useState(null); 
  const [selectedType, setSelectedType] = useState("");
  const [websiteFilter, setWebsiteFilter] = useState("All");

  useEffect(() => {
    const fetchAllBreweryData = async () => {
      const response = await fetch('https://api.openbrewerydb.org/v1/breweries');
      const json = await response.json();
      setList(json);  
      setSearchCounts(json.length);
      const breweryTypes = Array.from(new Set(json.map((brewery) => brewery.brewery_type)));
      const cities = Array.from(new Set(json.map((brewery) => brewery.city)));
      setUniqueBreweryTypes(breweryTypes);
      setUniqueCities(cities.length);
    };

    fetchAllBreweryData().catch(console.error);

  }, []);
  
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    filterResults(searchValue, selectedType);
  };

  const filterByType = (type) => {
    setSelectedType(type);
    filterResults(searchInput, type);
  };

  const filterByWebsite = (filter) => {
    setWebsiteFilter(filter);
    filterResults(searchInput, selectedType, filter);
  };

  const filterResults = (searchValue, type, websiteFilter) => {
    if (!list) return;

    let filteredData = list;

    if (searchValue) {
      filteredData = filteredData.filter((brewery) =>
        brewery.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (type) {
      filteredData = filteredData.filter((brewery) => brewery.brewery_type === type);
    }

    if (websiteFilter === "With Website") {
      filteredData = filteredData.filter((brewery) => brewery.website_url);
    } else if (websiteFilter === "Without Website") {
      filteredData = filteredData.filter((brewery) => !brewery.website_url);
    }

    setFilteredResults(filteredData);
    setSearchCounts(filteredData.length);
  };


  return (
    <>
    <div className='app'>
    <div className='right'>
      <div className="statistics-row">
        <StatisticCard infoCategory="Counts" info={searchCounts} />
        <StatisticCard infoCategory="Unique Brewery Types" info={uniqueBreweryTypes} />
        <StatisticCard infoCategory="Unique Cities" info={uniqueCities} />
      </div>
      
      <div className='table-chart'>
      <div className="whole-page">
        <input
        type="text"
        placeholder="Search By Brewery Name"
        onChange={(inputString) => searchItems(inputString.target.value)}
      />

      <select
              onChange={(e) => filterByType(e.target.value)}
              value={selectedType}
              className="filter-dropdown"
            >
              <option value="">All Types</option>
              {uniqueBreweryTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

        <div className="website-filter">
              <label>
                <input
                  type="radio"
                  name="websiteFilter"
                  value="All"
                  checked={websiteFilter === "All"}
                  onChange={(e) => filterByWebsite(e.target.value)}
                />
                All
              </label>
              <label>
                <input
                  type="radio"
                  name="websiteFilter"
                  value="With Website"
                  checked={websiteFilter === "With Website"}
                  onChange={(e) => filterByWebsite(e.target.value)}
                />
                With Website
              </label>
              <label>
                <input
                  type="radio"
                  name="websiteFilter"
                  value="Without Website"
                  checked={websiteFilter === "Without Website"}
                  onChange={(e) => filterByWebsite(e.target.value)}
                />
                Without Website
              </label>
            </div>


      {list ? (
        <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Brewery Type</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {(searchInput.length > 0 || selectedType || websiteFilter !=="All"
            ? filteredResults : list ).map((brewery) => (
                <BreweryInfo
                  key={brewery.id}
                  id={brewery.id}
                  name={brewery.name}
                  city={brewery.city}
                  breweryType={brewery.brewery_type}
                />
              ))}
            </tbody>
          </table>
        )
          : (
        <p>Loading...</p>
      )}

      </div>
      <div className='visualization'>
        <div className="chart">
        <BreweryChart/>
        </div>
        <div className="bar">
        <BreweryBar/>
        </div>

       </div> 
      </div>

      </div>


      <SideNav/>

    
      </div>
      
    </>
  )
}

export default App
