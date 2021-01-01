import React from "react"
import { makeStyles, IconButton } from "@material-ui/core"

import WhiteTextTypography from "../../../components/Misc/WhiteTypography"
import Shop from "@material-ui/icons/ShoppingCart"
import Share from "@material-ui/icons/Share"
import { Container } from "react-bootstrap"

const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
    },
    footer: {
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        bottom: 0,
        height: theme.spacing(16),
        backgroundColor: "#323232",
        borderTopStyle: "solid",
        borderColor: "#FFE7D0",
        borderTopLeftRadius: theme.spacing(3),
        borderTopRightRadius: theme.spacing(3),
        padding: theme.spacing(2),
    },
    content: {
        flexGrow: 1,
    },
    price: {
        alignSelf: "center",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    actions: {
        display: "flex",
        flexDirection: "column-reverse",
    },
}))

interface FooterProps {
    price: string,
    desc: string,
    title: string
}

const Footer: React.FC<FooterProps> = ({ price, desc, title }) => {
    const classes = useStyle()

    return(
        <div className={classes.root}>
            <Container className={classes.footer} >
                <div className={classes.content}>
                    <WhiteTextTypography variant="h5">{title}</WhiteTextTypography>
                    <WhiteTextTypography >{desc}</WhiteTextTypography>
                </div>
                <div className={classes.price}>
                    <WhiteTextTypography variant="h3" noWrap>{price} €</WhiteTextTypography>
                </div>
                <div className={classes.actions}>
                    <IconButton><Share color="secondary" /></IconButton>
                    <IconButton><Shop color="secondary" /></IconButton>
                </div>
            </Container>
        </div>
    )
}

export default Footer