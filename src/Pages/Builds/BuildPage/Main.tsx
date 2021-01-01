import React from "react"

import { Container } from "react-bootstrap"
import { makeStyles, CircularProgress, Backdrop, Theme } from "@material-ui/core"
import Card from "../../../components/Card/Card"
import axios from "axios"
import WhiteTextTypography from "../../../components/Misc/WhiteTypography"
import {Parts, Part} from "../../../components/Misc/types"
import { useQuery } from "react-query"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-evenly",
        margin: theme.spacing(2),
        marginBottom: theme.spacing(16),
    },
    partsList: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    },
    card: {
        minWidth: "80%"
    },
    showImage: {
        flexGrow: 1
    },
    caseImage: {
        position: "sticky",
        top: 80,
    },
    backdrop: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    gallery: {
        animation: `$fadeInFromLeft 1000ms ${theme.transitions.easing.easeInOut}`,
    },
    "@keyframes fadeInFromLeft": {
        from: { opacity: 0, transform: "translateX(-200%)" },
        to: { opacity: 1, transform: "translateX(0)" }
    }, 
    parts: {
        justifySelf: "center",
        animation: `$fadeInFromRight 1000ms ${theme.transitions.easing.easeInOut}`,
    },
    "@keyframes fadeInFromRight": {
        from: { opacity: 0, transform: "translateX(200%)" },
        to: { opacity: 1, transform: "translateX(0)" }
    },
    image: {
        maxWidth: 400,
        borderRadius: 5,
    }
}))

const partsTypes = {
    cpu: "processors",
    gpu: "graphicscards",
    ram: "ram",
    mobo: "motherboards",
    storage: "storagesol",
    cooling: "coolingsol",
    psu: "powersupplies",
    extra: "extra",
    case: "cases"
}

interface MainProps { parts: Parts, query: string }


const Main: React.FC<MainProps> = ({ parts, query }) => {
    const classes = useStyles()
    
    const { isLoading, data, isFetching } = useParts()

    function useParts() {
        return useQuery(query, async () => {
            let data = Promise.all(Object.keys(partsTypes).map(async (type: string) => {
                let id = parts[type as keyof Parts]
                let url = `https://utterlabspc.herokuapp.com/api/${partsTypes[type as keyof typeof partsTypes]}/${id}`
                const { data }: { data: Part } = await axios.get(url)
                return(data)
            }))
            return data;
        });
    }

    return(
        <>
            <Backdrop className={classes.backdrop} open={isFetching}>
                <CircularProgress color="inherit" />
                {isLoading && <WhiteTextTypography>Loading...</WhiteTextTypography>}
            </Backdrop>
            {!isFetching && <Container className={classes.root}>
                <div className={classes.gallery}><Case data={data} /></div>
                <div className={classes.parts}>
                    {data && (
                        <Container className={classes.partsList}>
                            {data && data.map((part, index) => {
                                return (
                                    <div key={index} className={classes.card}>
                                        <WhiteTextTypography variant="h5" className="text-capitalize"></WhiteTextTypography>
                                        <Card part={part} showImage={false} />
                                    </div>
                                )
                            })}
                        </Container>
                    )}
                </div>
            </Container>}
        </>
    )
}

const Case: React.FC<{data: Part[] | undefined}> = ({data}) => {
    const classes = useStyles()
    return(
        <Container className={classes.caseImage}>
            <img src={data && data[8].image} alt="" className={classes.image}/>
        </Container>
    )
}

export default Main