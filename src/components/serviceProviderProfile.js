import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ServiceProviderProfile() {
    const { user } = useAuth()
    const [serviceProvider, setServiceProvider] = useState({})
    const [gallery, setGallery] = useState({})
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const serviceProviderResponse = await axios.get('http://localhost:3060/api/serviceProvider', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log(serviceProviderResponse.data)
                setServiceProvider(serviceProviderResponse.data)

                const galleryResponse = await axios.get('http://localhost:3060/api/galleries', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log(galleryResponse.data)
                setGallery(galleryResponse.data)
            } catch (err) {
                console.log(err)
                setError('Error fetching data');
            }
        })();
    }, [])


    // Function to check if ServiceProviderForm details and GalleryForm are uploaded
    // const isServiceProviderDetailsUploaded = () => {
    //     // Check if user's ServiceProviderForm details and GalleryForm data exist
    //     return (
    //         user &&
    //         user.serviceProvider &&
    //         user.serviceProvider.categories &&
    //         user.gallery &&
    //         user.gallery.galleryImg &&
    //         user.gallery.galleryVideo
    //     );
    // };

    return (
        // <h2>serviceProvider Profile</h2>
        <div>
            <h2><i>Service Provider Profile</i></h2>
            {/* Display service provider data if available */}
            {Object.keys(serviceProvider).length > 0 && ( // Check if serviceProvider exists
                <div>
                    <p><b>Name:</b> {user.username}</p>
                    <p><b>Email:</b> {user.email}</p>
                    {/* Display ServiceProvider details */}
                    <p><b>Mobile:</b> {serviceProvider.mobile}</p>
                    <p><b>Location:</b> {serviceProvider.location}</p>
                    <p><b>Service Type:</b> {serviceProvider.serviceType.join(', ')}</p>
                    <p><b>Categories:</b> {serviceProvider.categories.map(category => category.name).join(', ')}</p>
                    <p><b>Social Links:</b> {serviceProvider.socialLinks}</p>
                </div>
            )}
            {/* Display GalleryForm data if available */}
            {Object.keys(gallery).length > 0 && (
                <div>
                    {/* Display GalleryForm data here */}
                    {error && <p>Error: {error}</p>}
                    <p><b>Title : {gallery.title}</b></p>
                    <div>
                        <h4>Images:</h4>
                        {gallery.galleryImg && gallery.galleryImg.map((img, index) => (
                            <img key={index} src={`http://localhost:3060${img}`} alt={`Gallery Image ${index + 1}`} />
                        ))}
                    </div>
                    <div>
                        <h4>Videos:</h4>
                        {gallery.galleryVideo && gallery.galleryVideo.map((video, index) => (
                            <video key={index} controls>
                                <source src={`http://localhost:3060${video}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

