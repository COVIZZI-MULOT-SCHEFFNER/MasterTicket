import React, { useState } from 'react';
import axios from 'axios';
import apiConfig from '../../config/apiConfig';

const EditEventForm = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    name: event.name,
    date: event.date,
    location: event.location,
    maxSeats: event.maxSeats,
    description: event.description,
    ticketPrice: event.ticketPrice,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${apiConfig.baseURL}/events/${event.id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Event updated successfully');
      onClose(); // Fermer le formulaire après la mise à jour
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full mb-4" />
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="input input-bordered w-full mb-4" />
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="input input-bordered w-full mb-4" />
          <input type="number" name="maxSeats" value={formData.maxSeats} onChange={handleChange} className="input input-bordered w-full mb-4" />
          <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full mb-4" />
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
