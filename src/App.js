import React, { useEffect, useState } from 'react';
import PropertyList from '../src/component/PropertyList';
import { FaCartShopping } from "react-icons/fa6";
import Footer from "./component/Footer";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Property from "./component/Property";
import Logo from "./Assests/whiteLogo.png";
import { MdDelete } from "react-icons/md";
import "./App.css";

const App = () => {
    const [favoritesId, setFavoritesId] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isCartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavoritesId(storedFavorites);
    }, []);

    useEffect(() => {
        fetch('/properties.json')
            .then((response) => response.json())
            .then((data) => {
                // Map the property data to include the entire property object
                const favoritesWithProperties = favoritesId.map(propertyId => {
                    return data.properties.find(property => property.id === propertyId);
                });
                setFavorites(favoritesWithProperties);
            })
            .catch((error) => {
                console.error('Error loading properties:', error);
            });
    }, [favorites]);

    const handleCart = () => {
        setCartOpen(!isCartOpen);
    };

    const removeFromFavorites = (propertyId) => {
        const updatedFavorites = favoritesId.filter(id => id !== propertyId);
        setFavoritesId(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
    useEffect(() => {
        console.log("fav",favoritesId)
    }, [favoritesId]);

    const backToHome = () => {
        navigate('/');
    };

    return (
        <div>
            <nav>
                <img className="main-logo" src={Logo} onClick={backToHome} alt="main-logo" />
                <div className='cart' onClick={handleCart}>
                    {favorites.length > 0 && <div className='numbr-of-item'>{favorites.length}</div>}
                    <FaCartShopping size={25} />
                </div>
            </nav>
            <div className={`cart-list ${isCartOpen ? 'cart-open' : 'cart-close'}`}>
                <div className="favorite-card-container">
                    {favorites.length>0 && favorites.map((property) => (
                        <div className="favorite-card" key={property.id}>
                            <img alt="favourite-property-click" src={property.picture}/>
                            <div>
                                <h5>{property.name}</h5>
                                <p>${property.price}</p>
                            </div>
                            <button onClick={() => removeFromFavorites(property.id)}><MdDelete color={"red"} size={25} /></button>
                        </div>
                    ))}
                </div>
            </div>

            <Routes>
                <Route path='/' exact element={<PropertyList/>}/>
                <Route path="/property/:id" element={<Property favorites={favoritesId} setFavorites={setFavoritesId}/>}/>
                <Route path='*' element={<p>404 Not Found</p>}/>
            </Routes>
            <Footer/>
        </div>
    );
};

export default App;
