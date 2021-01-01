import React, {useState} from "react"

/* eslint-disable import/first */
const computer = require("../../icons/computer.svg")
const policy = require("../../icons/policy.svg")
const database = require("../../icons/maintenance.svg")
const data = require("../../icons/unstructured-data.svg")

import {Row, Col, Container} from "react-bootstrap"

import WhiteTextTypography from "../../components/Misc/WhiteTypography"
import { makeStyles } from '@material-ui/core/styles';
import {Fab, Theme} from "@material-ui/core"
import InstagramIcon from '@material-ui/icons/Instagram';
import RedditIcon from '@material-ui/icons/Reddit';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import SearchBar from "./Searchbar"
import CategoryBox from "./CategoryBox"

const useStyles = makeStyles((theme: Theme) => ({
    fab: {
        margin: 20
    },
    row: {    
        bottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "auto",
        marginRight: "auto",
    },
    main: {
        textAlign: "center",
        justifyContent: "center",
    },
    help1: {
        margin: theme.spacing(2),
        animation: `$slideTop 0.6s ${theme.transitions.easing.easeInOut}`,
    },
    help2: {
        opacity: 0,
        marginTop: theme.spacing(2),
        fontSize: 20,
        animation: `$fadeIn 0.6s ${theme.transitions.easing.easeInOut} 0.6s forwards`
    },
    "@keyframes slideTop": {
        from: {
            opacity: 0,
            transform: "translateY(-200%)"
        },
        to: {
            opacity: 1,
            transform: "translateY(0)"
        }
      },
    "@keyframes fadeIn": { from: { opacity: 0}, to: { opacity: 1} },
    searchbar: {
       animation: `$slideTop 0.6s ${theme.transitions.easing.easeInOut}` 
    }
}))

const categories = [
    {
        title: "Builds",
        text: "Check here the docs for the builds",
        img: computer
    }, {
        title: "Getting started",
        text: "Now I have a computer. What next?",
        img: data
    }, {
        title: "User Data",
        text: "We don't even have user data, what is this for?",
        img: policy
    }, {
        title: "Database",
        text: "This is how we store our data!",
        img: database
    }
]

const HelpPage: React.FC = () => {
    const classes = useStyles();
    const [search, setSearch] = useState<string>("")

    const updateSearch = (event: any) => {
        setSearch(event.target.value)
    }

    const filtered = categories.filter(category => {
        return (
            category.title.toLowerCase().includes(search.toLowerCase()) ||
            category.text.toLowerCase().includes(search.toLowerCase())
        )
    })

    return(
        <Container className={classes.main}>
            <WhiteTextTypography variant="h4" className={classes.help1}>Need Help? Try searching something!</WhiteTextTypography>
            <div className={classes.searchbar}><SearchBar onChange={updateSearch}/></div>
            <WhiteTextTypography variant="h5" className={classes.help2}>Select a category:</WhiteTextTypography>
            <Row className={classes.row} xl={3} lg={3} md={2} xs={1}>
                {filtered.map(box => {
                    return(
                        <Col>
                            <CategoryBox 
                                title={box.title}
                                img={box.img}
                                text={box.text}
                            />
                        </Col>
                    )
                })}
            </Row>

            <WhiteTextTypography variant="h5" className={classes.help2}>Need support? Contact us!</WhiteTextTypography>
            <Row className={classes.row}>
                <Fab color="secondary" aria-label="Add" className={classes.fab}
                ><InstagramIcon /></Fab>
                <Fab color="secondary" aria-label="Add" className={classes.fab}
                ><RedditIcon /></Fab>
                <Fab color="secondary" aria-label="Add" className={classes.fab}
                ><FacebookIcon /></Fab>
                <Fab color="secondary" aria-label="Add" className={classes.fab}
                ><TwitterIcon /></Fab>
            </Row>
        </Container>
    )
}

export default HelpPage