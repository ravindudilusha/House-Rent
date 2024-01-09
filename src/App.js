import React, { useState, useEffect } from 'react';
import PropertySearchForm from '../src/component/PropertySearchForm';
import PropertyList from '../src/component/PropertyList';

const App = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('/properties.json')
      .then((response) => response.json())
      .then((data) => {
        setAllProperties(data.properties);
        setFilteredProperties(data.properties);
        setSearchResults(data.properties);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading properties:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (criteria) => {
    setLoading(true);

    try {
      let filteredProperties = allProperties; 

      if (criteria.type !== 'any') {
        filteredProperties = filteredProperties.filter((property) =>
          property.type.toLowerCase() === criteria.type.toLowerCase()
        );
      }

      if (!isNaN(criteria.minPrice)) {
        filteredProperties = filteredProperties.filter((property) => property.price >= criteria.minPrice);
      }

      if (!isNaN(criteria.maxPrice)) {
        filteredProperties = filteredProperties.filter((property) => property.price <= criteria.maxPrice);
      }

      if (!isNaN(criteria.minBedrooms)) {
        filteredProperties = filteredProperties.filter((property) => property.bedrooms >= criteria.minBedrooms);
      }

      if (!isNaN(criteria.maxBedrooms)) {
        filteredProperties = filteredProperties.filter((property) => property.bedrooms <= criteria.maxBedrooms);
      }

      if (criteria.startDate) {
        filteredProperties = filteredProperties.filter(
          (property) => property.added && new Date(property.added) >= criteria.startDate
        );
      }

      if (criteria.endDate) {
        filteredProperties = filteredProperties.filter(
          (property) => property.added && new Date(property.added) <= criteria.endDate
        );
      }

      if (criteria.postcode) {
        filteredProperties = filteredProperties.filter((property) => property.postcode.startsWith(criteria.postcode));
      }

      setSearchResults(filteredProperties);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PropertySearchForm onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : <PropertyList properties={searchResults} />}
    </div>
  );
};

export default App;



// import React, { useState } from 'react';
// import PropertySearchForm from '../src/component/PropertySearchForm';
// import PropertyList from '../src/component/PropertyList';

// const App = () => {
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (criteria) => {
//     // Implement your property search logic here
//     // For now, let's filter the dummy properties based on the search criteria

//     setLoading(true);

//     try {
//       let filteredProperties = dummyProperties;

//       if (criteria.type !== 'any') {
//         filteredProperties = filteredProperties.filter((property) =>
//           property.type.toLowerCase() === criteria.type.toLowerCase()
//         );
//       }

//       if (!isNaN(criteria.minPrice)) {
//         filteredProperties = filteredProperties.filter((property) => property.price >= criteria.minPrice);
//       }

//       if (!isNaN(criteria.maxPrice)) {
//         filteredProperties = filteredProperties.filter((property) => property.price <= criteria.maxPrice);
//       }

//       if (!isNaN(criteria.minBedrooms)) {
//         filteredProperties = filteredProperties.filter((property) => property.bedrooms >= criteria.minBedrooms);
//       }

//       if (!isNaN(criteria.maxBedrooms)) {
//         filteredProperties = filteredProperties.filter((property) => property.bedrooms <= criteria.maxBedrooms);
//       }

//       if (criteria.startDate) {
//         filteredProperties = filteredProperties.filter(
//           (property) => property.dateAdded && new Date(property.dateAdded) >= criteria.startDate
//         );
//       }

//       if (criteria.endDate) {
//         filteredProperties = filteredProperties.filter(
//           (property) => property.dateAdded && new Date(property.dateAdded) <= criteria.endDate
//         );
//       }

//       if (criteria.postcode) {
//         filteredProperties = filteredProperties.filter((property) => property.postcode.startsWith(criteria.postcode));
//       }

//       setSearchResults(filteredProperties);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const dummyProperties = [
//     { id: 1, name: 'Property 1', type: 'House', price: 250000, bedrooms: 3, dateAdded: '2024-01-08', postcode: 'SW1A', imageUrl:'https://jooinn.com/images/beautiful-house-29.jpg' },
//     { id: 2, name: 'Property 2', type: 'Flat', price: 180000, bedrooms: 2, dateAdded: '2024-01-07', postcode: 'E1' , imageUrl:'https://th.bing.com/th/id/R.f7270bd2609eea8da21e9008781c9a2f?rik=GyQhe3AYybccMg&riu=http%3a%2f%2fcdnassets.hw.net%2f6d%2faf%2fe1b3bba44d2bb3bbbbd9405b1884%2fm.flats-Exterior+Elevation-Low-res-JohnColePhoto.jpg&ehk=N2Qk9m%2bEsCUaqjAJKEAv2xWEIpy%2fVSLRhGgYTvNQ5Ws%3d&risl=&pid=ImgRaw&r=0' },
//     { id: 3, name: 'Property 3', type: 'House', price: 350000, bedrooms: 4, dateAdded: '2024-01-06', postcode: 'NW1', imageUrl:'https://th.bing.com/th/id/R.d6b5d19ddb402c8f6685d32205f70fcc?rik=JVSmMJNnEniSKw&pid=ImgRaw&r=0' },
//     { id: 4, name: 'Property 4', type: 'House', price: 250000, bedrooms: 4, dateAdded: '2024-01-03', postcode: 'NW1', imageUrl:'https://th.bing.com/th/id/R.d6b5d19ddb402c8f6685d32205f70fcc?rik=JVSmMJNnEniSKw&pid=ImgRaw&r=0' },
//     { id: 5, name: 'Property 5', type: 'House', price: 250000, bedrooms: 3, dateAdded: '2024-01-08', postcode: 'SW1A', imageUrl:'https://jooinn.com/images/beautiful-house-29.jpg' },
//     { id: 6, name: 'Property 6', type: 'Flat', price: 180000, bedrooms: 2, dateAdded: '2024-01-07', postcode: 'E1' , imageUrl:'https://th.bing.com/th/id/R.f7270bd2609eea8da21e9008781c9a2f?rik=GyQhe3AYybccMg&riu=http%3a%2f%2fcdnassets.hw.net%2f6d%2faf%2fe1b3bba44d2bb3bbbbd9405b1884%2fm.flats-Exterior+Elevation-Low-res-JohnColePhoto.jpg&ehk=N2Qk9m%2bEsCUaqjAJKEAv2xWEIpy%2fVSLRhGgYTvNQ5Ws%3d&risl=&pid=ImgRaw&r=0' },
//     { id: 7, name: 'Property 7', type: 'House', price: 850000, bedrooms: 4, dateAdded: '2024-01-06', postcode: 'NW1', imageUrl:'https://th.bing.com/th/id/R.d6b5d19ddb402c8f6685d32205f70fcc?rik=JVSmMJNnEniSKw&pid=ImgRaw&r=0' },
//     { id: 8, name: 'Property 8', type: 'House', price: 950000, bedrooms: 3, dateAdded: '2024-01-01', postcode: 'NW1', imageUrl:'https://th.bing.com/th/id/R.d6b5d19ddb402c8f6685d32205f70fcc?rik=JVSmMJNnEniSKw&pid=ImgRaw&r=0' },
//   ];

//   return (
//     <div>
//       {/* Property search form */}
//       <PropertySearchForm onSearch={handleSearch} />

//       {/* Display search results or loading message */}
//       {loading ? <p>Loading...</p> : <PropertyList properties={searchResults} />}
//     </div>
//   );
// };

// export default App;
