// PropertyList.js
import React from 'react';
import '../styles/PropertyList.css';

const PropertyList = ({ properties }) => {
  return (
    <div className="property-list">
      <div className='container'>
      <div className='searchresults'>Search Results:</div>
      <div className='property-container'>
        {properties.map((property) => (
          <div key={property.id} className="">
            <div className="m-3 property-card">
              <img src={property.imageUrl} alt={property.name} className="property-image" />
              <div className="property-details">
                <h3>{property.name}</h3>
                <div className="row">
                  <div className='col-6'>Type: {property.type}</div>
                  <div className='col-6'>Bedrooms: {property.bedrooms}</div>
                </div>
                <div className='row'>
                  <div className='col-12'>Date Added: {property.dateAdded}</div>
                </div>
                <div className='row'>
                <div className='col-12'>Postcode Area: {property.postcode}</div>
                </div>
                <div className='row'>
                  <div className='col-12'>Price: ${property.price}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default PropertyList;
