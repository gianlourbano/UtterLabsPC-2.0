import React, {useState, useEffect} from "react"
import { useParams } from "react-router"

import Appbar from "./Appbar"
import Card from "../../components/Card/Card"

import axios from "axios"
import { Row } from "react-bootstrap"
import { makeStyles } from "@material-ui/core"

const useStyle = makeStyles(theme => ({
    content: {
        display: 'flex',
        opacity: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing(3),
        animation: `$fadeIn 0.6s ${theme.transitions.easing.easeInOut} 0.6s forwards`
    },
    appbar: {
        animation: `$fadeInFromRight 1000ms ${theme.transitions.easing.easeInOut}`,
    },
    "@keyframes fadeInFromRight": {
        from: { opacity: 0, transform: "translateX(200%)"},
        to: { opacity: 1, transform: "translateX(0)"}
    }, 
    "@keyframes fadeIn": { from: { opacity: 0 }, to: { opacity: 1 }},
    fab: {
        position: "fixed",
        bottom: 30,
        right: 30,
        margin: theme.spacing(1),
    },
})) 

interface Part {
    name: string,
    price: string,
    brand: string,
    image: string,
    socket?: string,
}

const PartList = () => {
    
    let { title } = useParams()

    const [parts, setParts] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        axios.get(`https://utterlabspc.herokuapp.com/api/${title}`)
        .then(res => setParts(res.data))
        .catch(error => console.log(error))})

    const onTextChange = (e: any) => setSearchText(e.target.value.toLowerCase())

    const sorted = parts.sort((a: Part, b: Part) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

    const filtered = sorted.filter((part: Part) => {
        return(
            part.name.toLowerCase().includes(searchText) ||
            part.brand.toLowerCase().includes(searchText) ||
            (part.socket && part.socket.toLowerCase().includes(searchText))
        )
    })

    const classes = useStyle()

    return(
        <div>
            <div className={classes.appbar}><Appbar title={title} onTextChange={onTextChange} /></div>
            <Row className={classes.content}>
                {filtered.map(part => {
                    return (
                        <Card part={part} title={title} showImage={true}/>
                    )
                })}
            </Row>
        </div>
    )
}
export default PartList