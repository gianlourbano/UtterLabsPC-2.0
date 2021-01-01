import React, { useState, useEffect } from "react"

import {Container, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

import computer from "../../icons/computer-new.svg"
import computer2 from "../../icons/computer.svg"
import { makeStyles } from "@material-ui/core"
import WhiteTypography from "../../components/Misc/WhiteTypography"
import Axios from "axios"
import ComputerCard from "../Builds/ComputerCard"

const useStyle = makeStyles(theme => ({
    a: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        
    },
    "@keyframes fadeIn": {
        from: {
            transform: "translateY(-200%)",
            opacity: 0,
            },
        to: {
            transform: "translateY(0)",
            opacity: 1,
        }
    },
    card: {
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: "center",
        maxWidth: 310,
        transition: "0.3s",
        '&:hover': {
            transform: "scale(1.15)",
            },
        [theme.breakpoints.down("sm")]: {
            maxWidth: 275
        }
    },
    root: {
        marginTop: 40,
        display: "flex",
        justifyContent: "center",
    },
    main: {
        animation: `$fadeInFromRight 1000ms ${theme.transitions.easing.easeInOut}`,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        flexGrow: 1,
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up("sm")]: {
            animation: `$fadeIn 1000ms ${theme.transitions.easing.easeInOut}`,
        }
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(2)
    },
    mainContent: {
        display: "flex",
        justifyContent: "space-evenly",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column"
        }
    },
    sidebar: {
        justifySelf: "start",
        alignSelf: "start",
        maxWidth: 200,
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: 300,
        padding: theme.spacing(1),
        animation: `$fadeInFromRight 1000ms ${theme.transitions.easing.easeInOut}`,
        [theme.breakpoints.down("sm")] : {
            display: "none"
        }
    },
    "@keyframes fadeInFromRight": {
        from: { opacity: 0, transform: "translateX(200%)"},
        to: { opacity: 1, transform: "translateX(0)"}
    }, 
    pcCard: {
        marginTop: theme.spacing(2),
        flexGrow: 1,
        transition: "0.2s",
        "&:hover": { transform: "scale(1.05)" }
    },
    media: {
        height: 0,
        paddingTop: "100%",
    }
    
}))

interface ChooseCardProps {
    name: string,
    img: string,
}

const ChooseCard: React.FC<ChooseCardProps> = ({name, img}) => {

    const classes = useStyle()
    return(
        <div className={classes.a}>
            <Link to={`/${name}`} style={{ textDecoration: 'none', color: "black" }}><Card className={classes.card}>
                <Card.Body>
                    <Card.Img src={img} />
                    <Card.Title className="text-capitalize">{name}</Card.Title>
                    <Card.Text>{`Check all the ${name} we have here at UtterLabs!`}</Card.Text>
                </Card.Body>
            </Card></Link>
        </div>
    )
}

const Main = () => {
    const classes = useStyle()

    const [builds, setBuilds] = useState([])

    useEffect(() => {
        Axios.get("https://utterlabspc.herokuapp.com/api/builds")
            .then(res => setBuilds(res.data))
            .catch(error => console.log(error))
    }, [])

    const getRandomBuild = (arr: Array<any>, num: number) => {
        var result = new Array(num),
        len = arr.length,
        taken = new Array(len);
        if (num>len)
            return([])
        while(num--) {
            var x = Math.floor(Math.random() * len);
            result[num] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }

        var builds = result.map((build) => {
            return(
                <ComputerCard res={build} />
            )
        })
        return(builds)
    }

    return(
        <Container fluid className={classes.root}>
            <main className={classes.main}>
                <WhiteTypography variant="h2" className={classes.title}>Welcome at UtterLabs!</WhiteTypography>
                <div className={classes.mainContent}>
                    <ChooseCard name="builds" img={computer} />
                    <ChooseCard name="parts" img={computer2} />
                </div>
            </main>
            <div className={classes.sidebar} >
                <WhiteTypography variant="h4">Random Build</WhiteTypography>
                    <div className={classes.pcCard}>
                        {getRandomBuild(builds, 1)}
                    </div>
                </div>
        </Container>
    )
}

export default Main