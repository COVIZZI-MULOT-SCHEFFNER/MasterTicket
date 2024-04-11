import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import apiConfig from '../config/apiConfig';
import EditUserForm from '../components/Admin/EditUserForm';

const AdminUsers = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${apiConfig.adminURL}/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiConfig.adminURL}/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`${apiConfig.adminURL}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const updatedUsers = users.filter(user => user._id !== userId);
            setUsers(updatedUsers);
            console.log(`User with ID: ${userId} has been deleted.`);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const handleEditUser = (userId) => {
        const userToEdit = users.find(user => user._id === userId);
        setEditingUser(userToEdit);
    };

    return (
        <div className="flex justify-center">
            {editingUser && <EditUserForm user={editingUser} onClose={() => setEditingUser(null)} />}
            <button className="btn btn-primary mb-4" onClick={fetchUsers}>{t('refresh')}</button>
            <div className="overflow-x-auto w-full max-w-screen-lg">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>{t('ID')}</th>
                            <th>{t('lastname')}</th>
                            <th>{t('firstname')}</th>
                            <th>{t('email')}</th>
                            <th>{t('role')}</th>
                            <th>{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.lastname}</td>
                                <td>{user.firstname}</td>
                                <td>{user.email}</td>
                                <td>{t(user.role)}</td>
                                <td>
                                    <button className="btn btn-secondary mr-2" onClick={() => handleEditUser(user._id)}>
                                        <span className="mr-2">{t('edit')}</span>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-error" onClick={() => handleDeleteUser(user._id)}>
                                        <span className="mr-2">{t('delete')}</span>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
