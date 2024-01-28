import {Container, Header, Sidebar, Sidenav, Content, Navbar, Nav, Divider, Stack, Avatar, Row, Col} from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import React, {useContext, useEffect, useState} from "react";
import SignOut from "@rsuite/icons/legacy/SignOut";
import {auth, db} from "@/pages/firebase";
import {useRouter} from "next/router";
import {Card, Grid, Text, Link, Progress, Button, Input} from "@nextui-org/react";
import { getDoc, doc } from "firebase/firestore";
import {IdMapping} from "@rsuite/icons";
import Layout from '../Layout';


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



export default function dashboard() {
    const [expand, setExpand] = React.useState(true);

    // @ts-ignore
    const router = useRouter();



    useEffect(() => {
        if (!auth.currentUser) {
            router.push("/auth/login");
            return;
        }
    }, []);

    if (!auth.currentUser) {
        // user is signed out or still being checked.
        // don't render anything
        return null;
    }



    return (
        <Layout>
            <Container style={{padding: "20px", overflowY: "auto"}}>
                <Header>
                    <h2 style={{ float: "left"}}>Welcome to your dashboard, <b style={{color:"#c01c1c"}}>{"Dinesh"}</b></h2>
                   <Stack  direction={"row"} spacing={20} style={{alignContent: "flex-end", justifyContent: "flex-end", float: "right"}}>
                    <Input
                        size="lg"
                        placeholder="Search Anything"
                    />
                    <Button flat  size="lg" auto> Help </Button>
                   </Stack>
                </Header>
                Your journey to find your new abode begins here.
                <Divider/>
                <div style={{padding: "20px"}}>
                    <Content>
                        <div className={"leftDiv"}>
                            <h1>Featured-leases:</h1>
                            <Stack style={{padding: "10px"}} direction={"row"} spacing={20} justifyContent={"flex-start"} wrap>
                                <CourseCard  name={"Budgeting"} description={"Understanding the basics of income and expenses, tracking your spending, and creating a budget that works for you."} image={"https://www.shutterstock.com/image-vector/financial-accounting-flat-lay-concept-600w-1851115834.jpg"}/>
                                <CourseCard name={"Saving"} description={"The importance of saving, developing a savings plan, and tips for growing your savings."} image={"https://www.shutterstock.com/image-vector/family-couple-saving-money-man-600w-1675928638.jpg"}/>
                                <CourseCard name={"Investing"} description={"Understanding different types of investments, diversifying your portfolio, and making informed investment decisions."} image={"https://www.shutterstock.com/image-vector/business-investment-profit-flat-vector-600w-1518184076.jpg"}/>
                            </Stack>
                        </div>

                    </Content>
                    <div className={"rightDiv"}>
                        <center>
                            
                            <h1>Overview</h1>
                            <p>This is where you can see the leaderboard and all of the other information regarding how many courses you have completed and the acheivements that you have earned.</p>
                        </center>
                    </div>
                </div>
            </Container>
        </Layout>

    );
};

//card component
function CourseCard ( props: { name: string;
    description: string;
    image: string; } ) {

    return(
            <Card css={{ p: "$6", mw: "400px" }} style={{background: "rgb(255,255,255)", boxShadow: "50px"}}  >
                <Card.Header>
                    <img
                        alt="nextui logo"
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width="34px"
                        height="34px"
                    />
                    <Grid.Container css={{ pl: "$6" }}>
                        <Grid xs={12}>
                            <Text h4 css={{ lineHeight: "$xs" }}>
                                {props.name}
                            </Text>
                        </Grid>
                        <Grid xs={12}>
                            <Text css={{ color: "$accents8" }}>Financial Education</Text>
                        </Grid>
                    </Grid.Container>
                </Card.Header>
                <Card.Image
                    src={props.image}
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt={"Investment Course Image"}
                    style={{borderRadius: "20px"}}
                />
                <Card.Body css={{ py: "$2" }}>
                    <Text>
                        {props.description}
                    </Text>
                </Card.Body>
                <Card.Footer>
                    <Link

                        color="primary"
                        target="_blank"
                        href="https://github.com/nextui-org/nextui"
                    >
                        Continue Course
                    </Link>
                    <Progress value={50} color="primary" />
                </Card.Footer>
            </Card>
    );
}
