import React, {useEffect, useState} from 'react';
import "../styles/Property.css";
import { useParams } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";


const Property = ({ favorites, setFavorites }) => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [property, setProperty] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/properties.json')
            .then((response) => response.json())
            .then((data) => {
                const foundProperty = data.properties.find(property => property.id === id);
                console.log("faaaa",foundProperty)
                setProperty(foundProperty);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error loading properties:', error);
                setLoading(false);
            });
    }, [id]);


    const handleAddToFavorites = () => {
        if (!favorites.includes(id)) {
            setFavorites([...favorites, id]);
            localStorage.setItem('favorites', JSON.stringify([...favorites, id]));
            console.log('Updated Favorites:', [...favorites, id]);
        } else {
            console.log('Property is already in favorites.');
        }
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    return (

        !loading&& (
            <div className="prperty-page-container">
                <div className="property-header">
                    <h1>{property.name}</h1>
                    <button onClick={handleAddToFavorites}>Add to favourite &nbsp; <FaHeart/></button>
                </div>
                <div className="big-image-container">
                    {property.photos.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className={index === selectedImage ? 'active' : ''}
                        />
                    ))}
                </div>

                <div className="small-images-container">
                    {property.photos.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            onClick={() => handleImageClick(index)}
                        />
                    ))}
                </div>

                <div className='property-details-card'>
                    <div className="details-header">
                        <h2>${property.price}</h2>
                        <div className="property-items">
                            <h5>Bedrooms: {property.bedrooms}</h5>
                            <h5>Location: {property.location}</h5>
                            <h5>Type: {property.type}</h5>
                            <h5>Postcode: {property.postcode}</h5>

                        </div>

                    </div>
                    <p>{property.description}</p>
                </div>

            </div>
        )
    )
}

export default Property
