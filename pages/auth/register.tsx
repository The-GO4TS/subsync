import {Input, Button, Container, Card, Text, Spacer, Textarea} from '@nextui-org/react';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/pages/firebase";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [step, setStep] = useState(1); // New state to track the registration step

    const router = useRouter();
    const firestore = getFirestore(); // Initialize Firestore

    const handleProfilePictureChange = (e) => {
        if (e.target.files[0]) {
            setProfilePicture(e.target.files[0]);
        }
    };
    const handleRegister = async () => {
        if (!email || !password || !fullName || !username) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(firestore, "Users", user.uid), {
                fullName,
                username,
                email,
            });
            setStep(2);
        } catch (error) {
            alert(error);
        }
    };

    const handleFinalizeRegistration = async () => {
        if (!profilePicture || !bio) {
            alert("Please provide a profile picture and bio.");
            return;
        }

        // First, upload the profile picture to Firebase Storage
        const storage = getStorage();
        const storageReference = storageRef(storage, `profilePictures/${auth.currentUser.uid}`);

        try {
            const snapshot = await uploadBytes(storageReference, profilePicture);
            const downloadURL = await getDownloadURL(snapshot.ref);

            await setDoc(doc(firestore, "Users", auth.currentUser.uid), {
                bio,
                profilePicture: downloadURL
            }, { merge: true });

            router.push("/dashboard");
        } catch (error) {
            alert("Error uploading profile picture or updating user information: " + error.message);
        }
    };


    if (step === 1) {
        return (

            <Container display="flex" alignItems="center" justify="center" css={{ minHeight: '100vh' }}>
                <Card css={{ mw: '400px', p: '$10', background: "white" }} variant="bordered">
                    <Text h2 css={{ textAlign: "center", mb: '$5' }}>Register</Text>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Full Name"
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <Spacer y={0.5} />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Spacer y={0.5} />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Spacer y={0.5} />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Spacer y={1} />
                    <Button fullWidth size="lg" onClick={handleRegister}>Register</Button>
                    <Spacer y={1} />
                    <Text css={{ textAlign: "center", color: '$accents7' }}>Already have an account?</Text>
                    <Button
                        fullWidth
                        flat
                        color="secondary"
                        onClick={() => router.push("/auth/login")}
                    >
                        Login
                    </Button>
                </Card>
            </Container>
        );
    } else if (step === 2) {
        return (
            <Container display="flex" alignItems="center" justify="center" css={{ minHeight: '100vh' }}>
                <Card css={{ mw: '400px', p: '$10', background: "white" }} variant="bordered">
                    <Text h2 css={{ textAlign: "center", mb: '$5' }}>Complete Your Profile</Text>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                    />
                    <Spacer y={0.5} />
                    <Textarea
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="A short bio about yourself"
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <Spacer y={1} />
                    <Button fullWidth size="lg" onClick={handleFinalizeRegistration}>Complete Registration</Button>
                </Card>
            </Container>
        );
    }

}
