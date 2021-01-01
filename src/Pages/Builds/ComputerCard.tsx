import React, { useState } from "react"
import { Typography, CardContent, CardActions, Card, Theme } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import { Part } from "../../components/Misc/types"
import GetImage from "./GetImage"
import { Col } from "react-bootstrap"
import { NavLink } from "react-router-dom"

import Button from "@material-ui/core/Button"
import axios from "axios"

const processor = require("../../icons/processor.svg")
const videocard = require("../../icons/video-card.svg")

const useStyles = makeStyles((theme: Theme) => ({
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
        alignItems: "center",
        textAlign: "center",
    },
    svg: {
        maxHeight: 32
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

const ComputerCard: React.FC<{ res: Response }> = ({ res }) => {
    const classes = useStyles()

    const GetPart: React.FC<{ id: string, db: string }> = ({ id, db }) => {
        var [part, setPart] = useState<Part>()

        axios.get(`https://utterlabspc.herokuapp.com/api/${db}/${id}`).then(res => { setPart(res.data) }).catch(error => console.log(error))
        return (
            <Typography>{part && part.name}</Typography>
        )
    }

    return (
        <Col key={res.name} className={classes.cardRoot}><Card className={classes.card}>
            <CardContent>
                <NavLink to={`/builds/${res._id}`}><GetImage id={res.parts.case} /></NavLink>
                <Typography variant="h4">{res.name}</Typography>
                <div className={classes.text}>
                    <div className={classes.line} >
                        <img src={processor} alt="Processor" className={classes.svg}/><GetPart id={res.parts.cpu} db="processors" />
                    </div>
                    <div className={classes.line}>
                        <img src={videocard} alt="Video Card" className={classes.svg}/><GetPart id={res.parts.gpu} db="graphicscards" />
                    </div>
                </div>
            </CardContent>
            <CardActions className={classes.buttons}>
                <NavLink to={`/builds/${res._id}`} style={{ textDecoration: "none" }}>
                    <Button color="primary">Learn More</Button>
                </NavLink>
            </CardActions>
        </Card></Col>
    )
}

export default ComputerCard