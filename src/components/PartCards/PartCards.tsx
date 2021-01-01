import React from "react"
import { Row } from "react-bootstrap"
import {Button, makeStyles} from "@material-ui/core"
import {Link} from "react-router-dom"

import {Card, CardContent, CardMedia, Typography, CardActions} from "@material-ui/core"

const cpu = require("../../icons/processor.svg")
const gpu = require("../../icons/video-card.svg")
const mobo = require("../../icons/motherboard.svg")
const ram = require("../../icons/ram.svg")
const storage = require("../../icons/harddisk.svg")
const fan = require("../../icons/fan.svg")
const psu = require ("../../icons/power.svg")
const pccase = require("../../icons/case-data.svg")
const extra = require ("../../icons/mouse.svg")

const parts = [{
        name: "Processors",
        url: "processors",
        icon: cpu
    }, {
        name: "Graphics Cards",
        url: "graphicscards",
        icon: gpu
    }, {
        name: "Motherboards",
        url: "motherboards",
        icon: mobo
    }, {
        name: "Ram",
        url: "ram",
        icon: ram
    }, {
        name: "Storage solutions",
        url: "storagesol",
        icon: storage
    }, {
        name: "Cooling solutions",
        url: "coolingsol",
        icon: fan
    }, {
        name: "Power Supplies",
        url: "powersupplies",
        icon: psu
    }, {
        name: "Computer Cases",
        url: "cases",
        icon: pccase
    }, {
        name: "Extra",
        url: "extra",
        icon: extra
    }
]

const useStyle = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3),
        display: "flex",
        justifyContent: "center"

    },
    cardRoot: {
        margin: theme.spacing(1),
        flexBasis: "100%",
        animation: `$fadeIn 1000ms ${theme.transitions.easing.easeInOut}`,
    },
    "@keyframes fadeIn": {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        }
    },
    cardHeader: {
        margin: theme.spacing(3)
    },
    cardImage: {
        height: 0,
        paddingTop: "100%"
    }
}))

interface CardProps {
    icon: string,
    title: string,
    url: string
}

const SingleCard: React.FC<CardProps> = ({icon, title, url}) => {
    const classes = useStyle()
    const url_ = `/${url}`.toLowerCase()
    return(
        <Card className={classes.cardRoot}>
            <div className={classes.cardHeader}>
                <Link to={`/parts/${url_}`} style={{ textDecoration: 'none' }}>
                    <CardMedia className={classes.cardImage} image={icon}/>
                </Link>
            </div>
            <CardContent>
                <Typography variant="h5">{title}</Typography>
                <CardActions>
                    <Link to={`/parts/${url}`} style={{ textDecoration: 'none' }}><Button color="primary">Database</Button></Link>
                </CardActions>
            </CardContent>
        </Card>
    )
}

const PartCards = () => {
    const classes = useStyle()
    return(
        <Row className={classes.root} xl={5} lg={4} md={3} xs={2}>
            {parts.map(x => {
                return (
                    <SingleCard title={x.name} url={x.url} icon={x.icon} />
                )
            })}
        </Row>
    )
}

export default PartCards