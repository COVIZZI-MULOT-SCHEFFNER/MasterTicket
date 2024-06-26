import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiConfig from '../../config/apiConfig';
import { format, parseISO, isValid } from 'date-fns'; // Importez isValid

const EditEventForm = ({ event, onClose }) => {
    const [formData, setFormData] = useState({
        name: event.name,
        date: event.date ? formatValidDate(event.date) : '',
        location: event.location,
        numberOfPlace: event.numberOfPlace,
        description: event.description,
        ticketPrice: event.ticketPrice,
    });

    useEffect(() => {
        if (event) {
            setFormData({
                name: event.name,
                date: formatValidDate(event.date),
                location: event.location,
                numberOfPlace: event.numberOfPlace,
                description: event.description,
                ticketPrice: event.ticketPrice,
            });
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${apiConfig.adminURL}/events/${event._id}`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            console.log('Event updated successfully');
            onClose();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    // Fonction pour formater la date seulement si elle est valide
    function formatValidDate(dateStr) {
        const date = parseISO(dateStr);
        return isValid(date) ? format(date, 'yyyy-MM-dd') : '';
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box relative">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label htmlFor="name" className="label">Event name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full mb-4" />
                    <label htmlFor="date" className="label">Event date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="input input-bordered w-full mb-4" />
                    <label htmlFor="location" className="label">Event location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="input input-bordered w-full mb-4" />
                    <label htmlFor="numberOfPlace" className="label">Max seats</label>
                    <input type="number" name="numberOfPlace" value={formData.numberOfPlace} onChange={handleChange} className="input input-bordered w-full mb-4" />
                    <label htmlFor="description" className="label">Event description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="textarea textarea-bordered w-full mb-4" />
                    <label htmlFor="ticketPrice" className="label">Ticket price</label>
                    <input type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} className="input input-bordered w-full mb-4" />
                    <div className="flex justify-end space-x-4">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEventForm;
