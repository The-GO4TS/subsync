import Head from 'next/head'
import { Progress, Grid, red, Card, Col, Text, Row } from "@nextui-org/react";



export default function Home() {
    return (
        <div className="header">
            <h1 className="head">Welcome to your wealthy future with FinCent!</h1>
            <h2 className="yuh">Your Mental Networth!</h2>
            <Grid.Container xs={12} sm={6} gap={2}>
                <Grid>
                    <Progress value={30} color="success" striped status="success" />
                </Grid>
            </Grid.Container>
            <h2 className="yuh">$3000 / $10000</h2>
            <Grid.Container gap={2} justify="center">
                <Grid xs={12} sm={4}>
                    <Card isPressable>
                        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                            <Col>
                                <Text h2 color="white">
                                    Investment
                                </Text>
                            </Col>
                        </Card.Header>
                        <Card.Image
                            src="https://s28126.pcdn.co/blogs/ask-experian/wp-content/uploads/Which-Type-of-Investment-Has-the-Highest-Risk.jpg"
                            objectFit="cover"
                            width="100%"
                            height={340}
                            alt="Card image background"
                        />
                    </Card>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Card isPressable>
                        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                            <Col>
                                <Text h2 color="white">
                                    Credit
                                </Text>
                            </Col>
                        </Card.Header>
                        <Card.Image
                            src="https://time.com/nextadvisor/wp-content/uploads/2020/06/na-credit-report-vs-credit-score.jpg"
                            objectFit="cover"
                            width="100%"
                            height={340}
                            alt="Card image background"
                        />
                    </Card>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Card isPressable>
                        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                            <Col>
                                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                    What to watch
                                </Text>
                                <Text h4 color="white">
                                    Stream the Acme event
                                </Text>
                            </Col>
                        </Card.Header>
                        <Card.Image
                            src="https://nextui.org/images/card-example-4.jpeg"
                            objectFit="cover"
                            width="100%"
                            height={340}
                            alt="Card image background"
                        />
                    </Card>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Card isPressable>
                        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                            <Col>
                                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                    What to watch
                                </Text>
                                <Text h4 color="white">
                                    Stream the Acme event
                                </Text>
                            </Col>
                        </Card.Header>
                        <Card.Image
                            src="https://nextui.org/images/card-example-4.jpeg"
                            objectFit="cover"
                            width="100%"
                            height={340}
                            alt="Card image background"
                        />
                    </Card>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Card isPressable>
                        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                            <Col>
                                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                    What to watch
                                </Text>
                                <Text h4 color="white">
                                    Stream the Acme event
                                </Text>
                            </Col>
                        </Card.Header>
                        <Card.Image
                            src="https://nextui.org/images/card-example-4.jpeg"
                            objectFit="cover"
                            width="100%"
                            height={340}
                            alt="Card image background"
                        />
                    </Card>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Card isPressable>
                        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                            <Col>
                                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                    What to watch
                                </Text>
                                <Text h4 color="white">
                                    Stream the Acme event
                                </Text>
                            </Col>
                        </Card.Header>
                        <Card.Image
                            src="https://nextui.org/images/card-example-4.jpeg"
                            objectFit="cover"
                            width="100%"
                            height={340}
                            alt="Card image background"
                        />
                    </Card>
                </Grid>
            </Grid.Container>
        </div>
    )
}