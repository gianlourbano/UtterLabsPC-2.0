import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from "@material-ui/core/Chip"

import { Part } from "../Misc/types"
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        marginRight: 20,
        marginBottom: 20
    },
    title: {
        marginTop: 10 
    },
    panel: {
      display: "flex",
      justifyContent: "center"  
    },
    media: {
        maxWidth: 250,
        height: "auto",
      },
    price: {
        float: "right"
    }
});

interface CardProps {
    part: Part,
    showImage: boolean,
    title?: string,
}

function typedKeys<T>(o: T): (keyof T)[] {
    return Object.keys(o) as (keyof T)[]
}

const SimpleCard: React.FC<CardProps> = ({ part, showImage }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Chip label={part.brand} />
                <Chip variant="outlined" color="primary" label={`${part.price} €`} className={classes.price} />
                {showImage === true ? <Paper className={classes.panel}>
                    <img
                        className={classes.media}
                        src={part.image}
                        alt={part.name}
                    />
                </Paper> : ""}
                <Typography variant="h5" component="h2" className={classes.title}>
                    {part.name}
                </Typography>
                <Container>
                    {typedKeys(part).map((key: string, index: number) => {
                        return (index > 4 ? <Typography key={key} className="text-capitalize">{`${key}: ${part[key as keyof Part]}`}</Typography> : "")
                    })}
                </Container>  
            </CardContent>
            <CardActions>
                <Button variant="outlined" onClick={() => window.open(part.link, "_blank")} >Learn More</Button> 
            </CardActions>
        </Card>
    );
}

export default SimpleCard