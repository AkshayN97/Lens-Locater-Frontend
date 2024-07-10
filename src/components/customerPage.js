// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';

// // const categories = [
// //     'Wedding', 
// //     'Baby Photos', 
// //     'Events', 
// //     'Nature', 
// //     'Travel', 
// //     'Drone'
// // ];

// export default function CustomerPage() {

//     return(<h3>customerPage</h3>)
//     // const {user} = useAuth()
//     // const [search, setSearch] = useState('');
//     // const [category, setCategory] = useState('');
//     // const [location, setLocation] = useState('');
//     // const [serviceProviders, setServiceProvider] = useState([]);
//     // const [filteredProviders, setFilteredProviders] = useState([]);
//     // const [error, setError] = useState('');
//     // const navigate = useNavigate();

//     // useEffect(() => {
//     //     (async () => {
//     //         try {
//     //             const serviceProviderResponse = await axios.get('http://localhost:3060/api/serviceProvider', {
//     //                 headers: {
//     //                     Authorization: localStorage.getItem('token')
//     //                 }
//     //             })
//     //             console.log(serviceProviderResponse.data)
//     //             setServiceProvider(serviceProviderResponse.data)
//     //             setFilteredProviders(serviceProviderResponse.data);
//     //         } catch(err){
//     //             console.log(err)
//     //             setError('Error fetching data');
//     //         }
//     //     })();
//     // }, []);

//     // useEffect(() => {
//     //     // Filter service providers based on search criteria
//     //     const filterProviders = () => {
//     //         let filtered = serviceProviders;

//     //         if (search) {
//     //             filtered = filtered.filter(provider =>
//     //                 provider.userId.username.toLowerCase().includes(search.toLowerCase())
//     //             );
//     //         }

//     //         if (category) {
//     //             filtered = filtered.filter(provider =>
//     //                 provider.categories.some(cat => cat.name === category)
//     //             );
//     //         }

//     //         if (location) {
//     //             filtered = filtered.filter(provider =>
//     //                 provider.location.toLowerCase().includes(location.toLowerCase())
//     //             );
//     //         }

//     //         setFilteredProviders(filtered);
//     //     };

//     //     filterProviders();
//     // }, [search, category, location, serviceProviders]);

//     // const handleSearchChange = (e) => setSearch(e.target.value);
//     // const handleCategoryChange = (e) => setCategory(e.target.value);
//     // const handleLocationChange = (e) => setLocation(e.target.value);

//     // const handleProviderClick = (providerId) => {
//     //     navigate(`/serviceProviderProfile/${providerId}`);
//     // };

//     // return (
//     //     <div>
//     //         <h2>Search Service Providers</h2>
//     //         <div className="form-group">
//     //             <input
//     //                 type="text"
//     //                 placeholder="Search by name"
//     //                 value={search}
//     //                 onChange={handleSearchChange}
//     //                 className="form-control"
//     //             />
//     //             <br />
//     //             <select value={category} onChange={handleCategoryChange} className="form-control">
//     //                 <option value="">All Categories</option>
//     //                 {categories.map((cat) => (
//     //                     <option key={cat} value={cat}>
//     //                         {cat}
//     //                     </option>
//     //                 ))}
//     //             </select>
//     //             <br />
//     //             <input
//     //                 type="text"
//     //                 placeholder="Search by location"
//     //                 value={location}
//     //                 onChange={handleLocationChange}
//     //                 className="form-control"
//     //             />
//     //         </div>
//     //         <br />
//     //         <div>
//     //             {filteredProviders.map(provider => (
//     //                 <div key={provider._id} onClick={() => handleProviderClick(provider._id)}>
//     //                     <h3>{provider.userId.username}</h3>
//     //                     <p>{provider.location}</p>
//     //                     <p>{provider.serviceType.join(', ')}</p>
//     //                     <p>{provider.categories.map(cat => cat.name).join(', ')}</p>
//     //                 </div>
//     //             ))}
//     //         </div>
//     //     </div>
//     // );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";

export default function CustomerPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [location, setLocation] = useState("");
  const [serviceProviders, setServiceProviders] = useState([]);
  const [filteredServiceProviders, setFilteredServiceProviders] = useState([]);

  // Fetch all service providers on component mount
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:3060/api/serviceProvider', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
        setServiceProviders(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const categoryOptions = [
    { value: "wedding", label: "Wedding" },
    { value: "babyphots", label: "Baby Photos" },
    { value: "events", label: "Events" },
    { value: "nature", label: "Nature" },
    { value: "travel", label: "Travel" },
    { value: "drone", label: "Drone" }
  ];

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions.map(option => option.value));
  };

  const handleSearch = () => {
    const filtered = serviceProviders.filter(sp => {
      const matchesCategory = selectedCategories.every(cat =>
        sp.categories.some(sc => sc.name.toLowerCase() === cat)
      );
      const matchesLocation = location ? sp.location.toLowerCase().includes(location.toLowerCase()) : true;
      return matchesCategory && matchesLocation;
    });
    setFilteredServiceProviders(filtered);
  };

  return (
    <div className="container mt-4">
      <h3>Customer Page</h3>
      <div className="form-group">
        <label htmlFor="categories">Select Categories</label>
        <Select
          options={categoryOptions}
          isMulti
          onChange={handleCategoryChange}
          className="form-control"
        />
        <label htmlFor="location" className="mt-3">Enter Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-primary mt-3">Search</button>
      </div>
      <div className="mt-4">
        {filteredServiceProviders.map(sp => (
          <div key={sp._id}>
            <Link to={`/serviceProviderProfile/${sp._id}`}>{sp.userId.username}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
