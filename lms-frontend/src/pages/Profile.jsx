import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import {
  Container, Typography, Box, TextField, Button, Avatar, Chip, Stack, CircularProgress, IconButton
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';
const BACKEND_BASE_URL = 'http://localhost:5000';

const Profile = () => {
  const { user, token, login } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ bio: '', avatar: '', institution: '', skills: '' });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
        setForm({
          bio: res.data.bio || '',
          avatar: res.data.avatar || '',
          institution: res.data.institution || '',
          skills: (res.data.skills || []).join(', ')
        });
      } catch (err) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProfile();
  }, [token]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updates = {
        ...form,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean)
      };
      const res = await axios.put(`${API_URL}/users/me`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      login(res.data, token); // update context
      setEditMode(false);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const res = await axios.post(`${API_URL}/users/me/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfile(res.data.user);
      setForm(f => ({ ...f, avatar: res.data.avatar }));
      login(res.data.user, token);
      toast.success('Avatar updated!');
    } catch (err) {
      toast.error('Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  // Helper to get the correct avatar URL
  const getAvatarSrc = (avatar) => {
    if (!avatar) return undefined;
    return avatar.startsWith('http') ? avatar : BACKEND_BASE_URL + avatar;
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
  if (!profile) return null;

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <Avatar src={getAvatarSrc(profile.avatar)} sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
          {editMode && (
            <IconButton
              color="primary"
              component="span"
              sx={{ position: 'absolute', bottom: 0, right: 0 }}
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
            >
              <PhotoCamera />
            </IconButton>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
            disabled={uploading}
          />
        </Box>
        <Typography variant="h4" gutterBottom>{profile.name}</Typography>
        <Typography variant="subtitle1" color="text.secondary">{profile.email}</Typography>
        <Typography variant="subtitle2" color="text.secondary">Role: {profile.role}</Typography>
        {editMode ? (
          <>
            <TextField label="Bio" name="bio" value={form.bio} onChange={handleChange} fullWidth multiline rows={2} sx={{ my: 2 }} />
            <TextField label="Avatar URL" name="avatar" value={form.avatar} onChange={handleChange} fullWidth sx={{ my: 2 }} />
            <TextField label="Institution" name="institution" value={form.institution} onChange={handleChange} fullWidth sx={{ my: 2 }} />
            <TextField label="Skills (comma separated)" name="skills" value={form.skills} onChange={handleChange} fullWidth sx={{ my: 2 }} />
            <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>Save</Button>
            <Button onClick={() => setEditMode(false)} sx={{ mt: 2, ml: 2 }}>Cancel</Button>
          </>
        ) : (
          <>
            <Typography sx={{ my: 2 }}>{profile.bio}</Typography>
            <Typography color="text.secondary">Institution: {profile.institution}</Typography>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ my: 2 }}>
              {(profile.skills || []).map((skill, i) => (
                <Chip key={i} label={skill} />
              ))}
            </Stack>
            <Button variant="outlined" onClick={() => setEditMode(true)} sx={{ mt: 2 }}>Edit Profile</Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Profile; 