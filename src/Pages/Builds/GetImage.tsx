import React from "react"

import { useQuery } from "react-query";
import axios from "axios"
import { Image } from "react-bootstrap"
import { Part } from "../../components/Misc/types"

const GetImage: React.FC<{ id: string }> = ({ id }) => {

    const useImage = (id: string) => {
        return useQuery(["case", id], async () => {
            const { data }: { data: Part } = await axios.get(`https://utterlabspc.herokuapp.com/api/cases/${id}`)
            return data
        })
    }

    const { data } = useImage(id)

    if (data) {
        return (<Image src={data.image} fluid />)
    } else {
        return null
    }
}   

export default GetImage