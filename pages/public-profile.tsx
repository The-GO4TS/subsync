import React, { useState, useEffect } from 'react';
import { ref, set, onValue, getDatabase } from 'firebase/database';
import { auth } from "@/pages/firebase";
import { useRouter } from 'next/router';
import { Container, TextField, MenuItem, Button, CircularProgress, Typography, Box } from '@mui/material';
import Layout from "../pages/Layout"; // Adjust the import path as per your project structure

const occupationOptions = [
    { label: 'Student', value: 'student' },
    { label: 'Professional', value: 'professional' },
    // Add more options here
];

const ageRangeOptions = [
    { label: '18-25', value: '18-25' },
    { label: '26-35', value: '26-35' },
    // Add more options here
];

const genderOptions = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
    // Add more options here
];

// Add similar arrays for smoking preferences, cleanliness, etc.

const PublicProfile = () => {
    const [publicName, setPublicName] = useState('');
    const [bio, setBio] = useState('');
    const [occupation, setOccupation] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [genderIdentity, setGenderIdentity] = useState('');
    const [cleanliness, setCleanliness] = useState('');
    const [smoking, setSmoking] = useState('');
    const [pets, setPets] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [roommatePreferences, setRoommatePreferences] = useState('');
    const [contactInfo, setContactInfo] = useState('');

    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const db = getDatabase();

    useEffect(() => {
        if (!auth.currentUser) {
            router.push('/auth/login');
            return;
        }

        const userProfileRef = ref(db, `userProfiles/${auth.currentUser.uid}`);
        onValue(userProfileRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setPublicName(data.publicName || '');
                setBio(data.bio || '');
                setOccupation(data.occupation || '');
                setAgeRange(data.ageRange || '');
                setGenderIdentity(data.genderIdentity || '');
                // ... set other fields
            } else {
                console.log("No such document!");
            }
            setLoading(false);
        }, { onlyOnce: true });
    }, [router]);

    const handleSave = async () => {
        setLoading(true);
        const userProfileRef = ref(db, `userProfiles/${auth.currentUser.uid}`);
        try {
            await set(userProfileRef, {
                publicName, bio, occupation, ageRange, genderIdentity
                // ... add other fields
            });
            alert('Profile updated successfully!');
            router.push('/dashboard');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert('Error updating profile.');
        }
        setLoading(false);
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Layout>
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom>Update Public Profile</Typography>
                <Box component="form" noValidate autoComplete="off">
                    <TextField label="Public Name" value={publicName} onChange={(e) => setPublicName(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Bio" multiline rows={4} value={bio} onChange={(e) => setBio(e.target.value)} fullWidth margin="normal" />
                    <TextField select label="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} fullWidth margin="normal">
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="professional">Professional</MenuItem>
                    </TextField>
                    <TextField select label="Age Range" value={ageRange} onChange={(e) => setAgeRange(e.target.value)} fullWidth margin="normal">
                        <MenuItem value="18-25">18-25</MenuItem>
                        <MenuItem value="26-35">26-35</MenuItem>
                        <MenuItem value="36-45">36-45</MenuItem>
                        <MenuItem value="46-55">46-55</MenuItem>
                        <MenuItem value="56-65">56-65</MenuItem>
                        <MenuItem value="66+">66+</MenuItem>
                    </TextField>
                    <TextField select label="Gender Identity" value={genderIdentity} onChange={(e) => setGenderIdentity(e.target.value)} fullWidth margin="normal">
                    </TextField>
                    <TextField label="Cleanliness" value={cleanliness} onChange={(e) => setCleanliness(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Smoking Preference" value={smoking} onChange={(e) => setSmoking(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Pets" value={pets} onChange={(e) => setPets(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Hobbies and Interests" value={hobbies} onChange={(e) => setHobbies(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Roommate Preferences" value={roommatePreferences} onChange={(e) => setRoommatePreferences(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Contact Information" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} fullWidth margin="normal" />
                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 3 }}>
                        Save Profile
                    </Button>
                </Box>
            </Container>
        </Layout>
    );
};

export default PublicProfile;
