import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Navbar,
  Nav,
  Divider,
  Stack,
  Avatar,
  Row,
  Col,
} from "rsuite";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import React, { useContext, useEffect, useState } from "react";
import SignOut from "@rsuite/icons/legacy/SignOut";
import { auth, UserContext } from "@/pages/firebase";
import { useRouter } from "next/router";
import {
  Card,
  Grid,
  Text,
  Link,
  Progress,
  Button,
  Input,
} from "@nextui-org/react";

import styles from "../../styles/Dashboard.module.css";
import { Location, Person, XSmall } from "akar-icons";
import CIcon from "@coreui/icons-react";
import { cilBed } from "@coreui/icons";

function handleSignOut() {
  // Implement sign out logic here
  // signout the uesr with firebase
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("signed out successfully");
      console.log(auth.currentUser);
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}



export default function dashboard() {
  const [sidepanelIsActive, setSidepanelIsActive] = useState(false);
  const [expand, setExpand] = React.useState(true);
  // @ts-ignore
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      console.log("signed in!");
    } else if (auth.currentUser == null) {
      router.push("/auth/login");
    }
  }, [auth.currentUser]);

  if (!auth.currentUser) {
    // user is signed out or still being checked.
    // don't render anything
    return null;
  }

  return (
    <Container style={{ height: "100vh" }} className={"mainContainer"}>
      <SidePanelCustom
        sidepanelIsActive={sidepanelIsActive}
        setSidepanelIsActive={setSidepanelIsActive}
      />
      <Sidebar
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#c01c1c",
        }}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav.Header>
          <div>
            <img
              src="/subsync-logo.png"
              alt="Fincent Logo"
              width={"220px"}
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                margin: "20px",
              }}
            />
          </div>
        </Sidenav.Header>
        <Sidenav expanded={expand} defaultOpenKeys={["3"]} appearance="subtle">
          <Sidenav.Body>
            <Nav>
              <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<GroupIcon />}>
                Quick Swipe
              </Nav.Item>
              <Nav.Menu
                eventKey="3"
                trigger="hover"
                title="Actions"
                icon={<MagicIcon />}
                placement="rightStart"
              >
                <Nav.Item eventKey="3-1">Some Page 1</Nav.Item>
                <Nav.Item eventKey="3-2">Some Page 2</Nav.Item>
              </Nav.Menu>
              <Nav.Item
                eventKey="4"
                style={{ color: "#ffffff", background: "rgba(0,0,0,0.15)" }}
                icon={<SignOut />}
                onClick={() => {
                  handleSignOut();
                  router.push("auth/login");
                }}
              >
                Signout
              </Nav.Item>
              {auth.currentUser ? (
                <div color={"#fff"}>
                  {" "}
                  <Divider />
                  <Stack
                    style={{ padding: "10px" }}
                    direction={"row"}
                    spacing={20}
                    justifyContent={"center"}
                  >
                    <Avatar
                      circle
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEjAmPDFrWgiA7up5qpo0my3SdUrkGB1paLDONlqXnemIPtxiaFTs9WuEMXU192JBvDgc&usqp=CAU"
                      alt="@superman66"
                    />
                    <h6 style={{ color: "#fff" }}>{auth.currentUser.email}</h6>
                  </Stack>
                  <Divider />{" "}
                </div>
              ) : null}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>

      <Container style={{ padding: "20px", overflowY: "auto" }}>
        <Header>
          <h2 style={{ float: "left" }}>
            Welcome to your dashboard,{" "}
            <b style={{ color: "#c01c1c" }}>{"Dinesh"}</b>
          </h2>
          <Stack
            direction={"row"}
            spacing={20}
            style={{
              alignContent: "flex-end",
              justifyContent: "flex-end",
              float: "right",
            }}
          >
            <Input size="lg" placeholder="Search Anything" />
            {/* <Button flat size="lg" auto>
              {" "}
              Help{" "}
            </Button> */}
          </Stack>
        </Header>
        Your journey to find your new abode begins here.
        <Divider />
        <div style={{ padding: "20px" }}>
          <Content>
            <div>
              <h1>Featured-leases:</h1>
              <div className={styles["card-list"]}>
                <CourseCard2 setSidepanelIsActive={setSidepanelIsActive} />
                <CourseCard2 setSidepanelIsActive={setSidepanelIsActive} />
                <CourseCard2 setSidepanelIsActive={setSidepanelIsActive} />
              </div>
            </div>
          </Content>
          {/* <div className={"rightDiv"}>
            <center>
              <h1>Overview</h1>
              <p>
                This is where you can see the leaderboard and all of the other
                information regarding how many courses you have completed and
                the acheivements that you have earned.
              </p>
            </center>
          </div> */}
        </div>
      </Container>
    </Container>
  );
}

//card component
function CourseCard(props: {
  name: string;
  description: string;
  image: string;
}) {
  return (
    <Card
      css={{ p: "$6", mw: "400px" }}
      style={{ background: "rgb(255,255,255)", boxShadow: "50px" }}
    >
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
        style={{ borderRadius: "20px" }}
      />
      <Card.Body css={{ py: "$2" }}>
        <Text>{props.description}</Text>
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

function CourseCard2({ setSidepanelIsActive }) {
  // Step 2: Add an event handler to update the state when clicked
  const handleClick = () => {
    setSidepanelIsActive(true);
  };

  return (
    <div className={styles["listing-card"]} onClick={handleClick}>
      <div
        className={styles["image"]}
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      ></div>

      <div className={styles["content"]}>
        <div className={styles["middle"]}>
          <div>
            <Location strokeWidth={2} size={32} color={"#c01c1d"} />
            1501 Northpoint Crossing 77840 College Station, TX
          </div>
          <div>
            <Person strokeWidth={2} size={32} color={"#c01c1d"} />4
          </div>
        </div>
        <div className={styles["footer"]}>
          <span> Fall 2024</span>
          <span> $800 / month</span>
        </div>
      </div>
    </div>
  );
}

function SidePanelCustom({ sidepanelIsActive, setSidepanelIsActive }) {
  const sidepanelClass = sidepanelIsActive ? styles["active"] : "";

  const handleClick = () => {
    setSidepanelIsActive(false);
  };

  return (
    <div>
      <div className={`${sidepanelClass} ${styles["sidepanel"]}`}>
  
        <XSmall strokeWidth={2} size={36} onClick={handleClick} styles={{ cursor: 'pointer' }} />

        
      </div>
      <div className={`${sidepanelClass} ${styles["sidepanelbg"]}`} onClick={handleClick}></div>
    </div>
  );
}
