import React, { useState } from 'react';
import axios from 'axios';
import apiConfig from '../../config/apiConfig';

const EditUserForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    email: user.email,
    password: '',
    firstname: user.firstname,
    lastname: user.lastname,
    phone: user.phone,
    role: user.role,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = formData.password ? formData : { ...formData, password: undefined };
    try {
      await axios.patch(`${apiConfig.adminURL}/users/${user._id}`, updateData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('User updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="label">
              Password (leave blank to keep unchanged)
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="firstname" className="label">
              First Name
            </label>
            <input
              id="firstname"
              type="text"
              name="firstname"
              className="input input-bordered w-full"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastname" className="label">
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              className="input input-bordered w-full"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="label">
            Phone
            </label>
            <input
              id="phone"
              type="number"
              name="phone"
              className="input input-bordered w-full"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="role" className="label">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="select select-bordered w-full"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
