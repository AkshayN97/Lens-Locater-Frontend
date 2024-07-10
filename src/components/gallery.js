import React, { useState } from "react";
import axios from "axios";

export default function GalleryForm () {
    const [form, setForm] = useState({
        title: '',
        galleryImg: [],
        galleryVideo: []
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "galleryImg" || name === "galleryVideo") {
            // Ensure files is always an array
            const fileList = Array.from(files);
            setForm({ ...form, [name]: fileList });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('galleryImg:', form.galleryImg); // Add this line for debugging
        console.log('galleryVideo:', form.galleryVideo)

        const formData = new FormData();
        formData.append('title', form.title);

        // Convert FileList to array and append each file to formData
        for (let i = 0; i < form.galleryImg.length; i++) {
            formData.append('galleryImg', form.galleryImg[i]);
        }

        for (let i = 0; i < form.galleryVideo.length; i++) {
            formData.append('galleryVideo', form.galleryVideo[i]);
        }

        try {
            const response = await axios.post('http://localhost:3060/api/galleries', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: localStorage.getItem('token')
                }
            });
            console.log(response.data);
            // Reset the form after successful submission
            setForm({
                title: '',
                galleryImg: [],
                galleryVideo: []
            });
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="form-group">
            <h3>Upload Gallery</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="form-control"
                />
                <br />

                <label htmlFor="galleryImg">Images:</label>
                <input
                    type="file"
                    name="galleryImg"
                    onChange={handleChange}
                    multiple
                    className="form-control"
                />
                <br />

                <label htmlFor="galleryVideo">Videos:</label>
                <input
                    type="file"
                    name="galleryVideo"
                    onChange={handleChange}
                    multiple
                    className="form-control"
                />
                <br />

                <button type="submit">Upload</button>
            </form>
        </div>
    );
};
