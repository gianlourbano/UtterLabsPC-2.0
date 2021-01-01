import React, {useState, useEffect} from "react"

import { makeStyles } from '@material-ui/core/styles';

import { Row} from "react-bootstrap"

import axios from "axios"
import ComputerCard from "./ComputerCard"


const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: 40,
        right: 40,
        margin: theme.spacing(1),
    },
    buttons: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
    }, 
    button: {
        marginTop: theme.spacing(1),
    },
    cardRoot: {
        animation: `$fadeIn 400ms ${theme.transitions.easing.easeInOut}`,
        animationIterationCount: 1
    },
    "@keyframes fadeIn": {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        }
    },
    card: {
        marginBottom: 20
    },
    row: {
        margin: 20
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    text: {
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
    },
    line: {
        display: "flex",
        alignItems: "baseline",
    },
    image: {
        height: 210
    },
}));

interface Response {
    name: string,
    _id: string,
    img: string,
    parts: {
        cpu: string,
        gpu: string,
        case: string,
    }
}

export default function Builds() {
    const classes = useStyles()

    const [builds, setBuilds] = useState([])

    useEffect(() => {
        axios.get("https://utterlabspc.herokuapp.com/api/builds")
            .then(res => setBuilds(res.data))
            .catch((error) => {
            console.log(error)
        })
    }, [])

    return(
        <Row className={classes.row} xl={5} lg={4} md={3} sm={2} xs={1}>
            {builds.map((res: Response) => {
                return (
                    <ComputerCard res={res} />
                )
            })}
        </Row>
    )  
}

