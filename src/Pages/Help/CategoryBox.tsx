import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom"

import {Card, CardContent, CardMedia, Typography} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(6),
        margin: theme.spacing(2),
        transition: "0.2s",
        '&:hover': {
            transform: "scale(1.15)",
        },
    },
    cardRoot: {
        opacity: 0,
        animation: `$fadeIn 0.5s ${theme.transitions.easing.easeInOut} 0.7s forwards`,
        padding: theme.spacing(2)
    },
    img: {
        height: 0,
        paddingTop: '100%',
    },
    "@keyframes fadeIn": { from: { opacity: 0}, to: { opacity: 1} }
}));

interface BoxProps {
    title: string,
    img: string,
    text: string
}

const CategoryBox: React.FC<BoxProps> = ({title, img, text}) => {
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Link to={`/help/${title}`} style={{ textDecoration: "none", color: "black" }}>
                <Card className={classes.cardRoot}>
                    <CardMedia className={classes.img} image={img} title={title} />
                    <CardContent>
                        <Typography variant="h5">{title}</Typography>
                        <Typography>{text}</Typography>
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}

export default CategoryBox