import React, {useEffect, useState} from 'react';
import '../styles/PropertyList.css';
import {useNavigate} from "react-router-dom";
import PropertySearchForm from "./PropertySearchForm";

const PropertyList = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [cardStates, setCardStates] = useState(Array(allProperties.length).fill(false));
  const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetch('/properties.json')
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
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


  const handleCard = (index) => {
    setCardStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const  handleNavigate=(id)=>{
    navigate(`/property/${id}`);
  }
  return (
   <>

     <PropertySearchForm onSearch={handleSearch} />

     {!loading && (
         <div className="property-list">
           <div className='container'>
             <div className='searchresults'>Search Results:</div>
             <div className='property-container'>
               {searchResults.map((property, index) => (
                   <div key={property.id} className="" onClick={()=>handleNavigate(property.id)}>
                     <div className=" property-card" onClick={() => handleCard(index)}>
                       <img src={property.picture} alt={property.name} className="property-image"/>
                       <div className="property-details">
                         <div className='property-header'>
                           <h3>{property.name}</h3>
                           <p>Price: <span>${property.price}</span></p>
                         </div>
                         <div className={`row  ${cardStates[index] ? 'open' : 'closed'}`}>
                           <p className='col-6'>Type: <span>{property.type}</span></p>
                           <p className='col-6'>Bedrooms: <span>{property.bedrooms}</span></p>
                         </div>
                         <div className={`row  ${cardStates[index] ? 'open' : 'closed'}`}>
                           <p className='col-12'>Date Added: <span>{property.added}</span></p>
                         </div>
                         <div className={`row  ${cardStates[index] ? 'open' : 'closed'}`}>
                           <p className='col-12'>Postcode Area: <span>{property.postcode}</span></p>
                         </div>
                       </div>
                     </div>
                   </div>
               ))}
             </div>
           </div>
         </div>
     )}
   </>
  );
};

export default PropertyList;
