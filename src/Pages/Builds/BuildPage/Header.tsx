import React from "react"

import WhiteTextTypography from "../../../components/Misc/WhiteTypography"
import {Chip, makeStyles, Theme } from "@material-ui/core"
import { Container, Row } from "react-bootstrap"

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        animation: `$fadeInFromTop 1000ms ${theme.transitions.easing.easeInOut}`,
    },
    "@keyframes fadeInFromTop": {
        from: { opacity: 0, transform: "translateY(-200%)" },
        to: { opacity: 1, transform: "translateY(0)" }
    },
    headerRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(3)
    },
    headerType: {
        fontSize: 25,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        marginRight: 10,
        textTransform: "capitalize"
    }
}))

interface HeaderProps {
    desc: string,
    type: string,
    title: string
}

const Header: React.FC<HeaderProps> = ({ desc, type, title }) => {
    const classes = useStyle()

    return (
        <div className={classes.root}>
            <Row className={classes.headerRow}>
                <Chip className={classes.headerType} label={type} color="primary" />
                <WhiteTextTypography variant="h2">{title}</WhiteTextTypography>
            </Row>
            <Container>
                <WhiteTextTypography>{desc}</WhiteTextTypography>
            </Container>
        </div>
    )
}

export default Header