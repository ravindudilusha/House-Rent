// PropertySearchForm.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/PropertySearchForm.css';
import { FaCartShopping } from "react-icons/fa6";

const PropertySearchForm = ({ onSearch }) => {
  const [type, setType] = useState("any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [postcode, setPostcode] = useState('');


  const handleSearch = () => {
    onSearch({
      type,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      minBedrooms: parseInt(minBedrooms),
      maxBedrooms: parseInt(maxBedrooms),
      startDate,
      endDate,
      postcode,
    });
  };



  return (
   <>
    <div className="property-search-form">
      <div className="row">
        <div className="col">
          <label className="label">Type:</label>
          <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="any">Any</option>
            <option value="house">House</option>
            <option value="flat">Flat</option>
          </select>
        </div>

          <div className="col">
            <label className="label">Min Price:</label>
            <input
              className="input"
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label className="label">Max Price:</label>
            <input
              className="input"
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="col">
            <label className="label">Min Bedrooms:</label>
            <input
              className="input"
              type="number"
              min="0"
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label className="label">Max Bedrooms:</label>
            <input
              className="input"
              type="number"
              min="0"
              value={maxBedrooms}
              onChange={(e) => setMaxBedrooms(e.target.value)}
            />
          </div>

          <div className="col">
            <label className="label">Date Added:</label>
            <div className="centered-row">
              <DatePicker
                className="date-picker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <span> to </span>
              <DatePicker
                className="date-picker"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label className="label">Postcode Area:</label>
            <input
              className="input"
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </div>
        </div>

      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </div>
   </>
  );
};

export default PropertySearchForm;
