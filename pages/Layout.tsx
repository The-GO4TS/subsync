import React, {useEffect, useState} from 'react';
import {Avatar, Container, Divider, Nav, Sidebar, Sidenav, Stack} from 'rsuite';
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import {IdMapping} from "@rsuite/icons";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import SignOut from "@rsuite/icons/legacy/SignOut";
import {auth, db} from "@/pages/firebase";
import {doc, getDoc} from "firebase/firestore";
import {router} from "next/client";
// ... import all necessary components and icons

function handleSignOut(){
    // Implement sign out logic here
    // signout the uesr with firebase
    auth.signOut().then(() => {
            // Sign-out successful.
            console.log("signed out successfully")
            console.log(auth.currentUser)
        }
    ).catch((error) => {
            // An error happened.
            console.log(error)
        }
    );

}
const Layout = ({ children }) => {
    // Include your sidebar logic and state here
    const [expand, setExpand] = React.useState(true);
    // ... other sidebar logic
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const handleNavItemClick = (page) => {
        router.push(page);
    };
    useEffect(() => {
        // Fetch profile image URL from Firestore
        const userDocRef = doc(db, "Users", auth.currentUser.uid);
        getDoc(userDocRef).then(docSnap => {
            if (docSnap.exists()) {
                setProfileImageUrl(docSnap.data().profilePicture); // Assuming the field is named 'profilePicture'
            } else {
                console.log("No such document!");
            }
        }).catch(error => {
            console.log("Error getting document:", error);
        });
    }, []);

    return (
        <Container style={{ height: "100vh" }} className={"mainContainer"}>
            <Sidebar
                style={{ display: 'flex', flexDirection: 'column' , background: "#c01c1c"}}
                width={expand ? 260 : 56}

                collapsible
            >
                <Sidenav.Header>
                    <div>
                        <img src="/subsync-logo.png" alt="Fincent Logo" width={"220px"} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', margin: "20px" }} />
                    </div>
                </Sidenav.Header>
                <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle" >
                    <Sidenav.Body>
                        <Nav style={{background: "#a90000"}}>
                            <Nav.Item eventKey="1" active icon={<DashboardIcon />} className="sidebar-text">
                                Dashboard
                            </Nav.Item>
                            <Nav.Item eventKey="2" icon={<GroupIcon />} className="sidebar-text">
                                Quick Swipe
                            </Nav.Item>
                            <Nav.Item eventKey="5" icon={<IdMapping />} className="sidebar-text" onSelect={() => handleNavItemClick('/public-profile')}>
                                Public Profile
                            </Nav.Item>
                            <Nav.Menu
                                className="sidebar-text"
                                eventKey="3"
                                trigger="hover"
                                title="Actions"
                                icon={<MagicIcon />}
                                placement="rightStart"
                            >
                                <Nav.Item eventKey="3-1">Some Page 1</Nav.Item>
                                <Nav.Item eventKey="3-2">Some Page 2</Nav.Item>
                            </Nav.Menu>
                            <Nav.Item className="sidebar-text" eventKey="4" style={{color:"#ffffff", background: "rgba(0,0,0,0.15)"}} icon={<SignOut />}
                                      onClick = { () => {
                                          handleSignOut();
                                          router.push('auth/login');
                                      }}
                            >
                                Signout
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                    {(auth.currentUser) ? <div color={"#fff"}> <Divider/>
                        <Stack style={{padding: "10px"}} direction={"row"} spacing={20} justifyContent={"center"}>
                            <Avatar circle size={"lg"} src={profileImageUrl || 'default_avatar_url'} alt={auth.currentUser.email} />
                            <h6 style={{color: "#fff"}}>{auth.currentUser.email}</h6>
                        </Stack>
                        <Divider/> </div> : null}

                </Sidenav>
            </Sidebar>
            <Container>
                {children} {/* This is where your page content will go */}
            </Container>
        </Container>
    );
};

export default Layout;