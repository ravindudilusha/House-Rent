import React, { useState } from 'react';
import '../styles/PropertyList.css';
import Footer from './Footer';

const PropertyList = ({ properties }) => {
  const [cardStates, setCardStates] = useState(Array(properties.length).fill(false));

  const handleCard = (index) => {
    setCardStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
   <>
    <div className="property-list">
      <div className='container'>
        <div className='searchresults'>Search Results:</div>
        <div className='property-container'>
          {properties.map((property, index) => (
            <div key={property.id} className="">
              <div className=" property-card" onClick={() => handleCard(index)}>
                <img src={property.imageUrl} alt={property.name} className="property-image" />
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
                    <p className='col-12'>Date Added: <span>{property.dateAdded}</span></p>
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
    <Footer/>
   </>
  );
};

export default PropertyList;
