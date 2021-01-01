import React, { useEffect } from "react"
import {useParams} from "react-router-dom"

import { Container } from "react-bootstrap"
import { Build } from "../../../components/Misc/types"
import { useQuery } from "react-query"

import axios from "axios"

import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"

const BuildPage: React.FC = () => {
    let {_id} = useParams()

    const getBuildByID = async (_: any, id: string) => {
      const { data }: { data: Build } = await axios.get(
        `https://utterlabspc.herokuapp.com/api/builds/${id}`
      );
      return data;
    }

    const { data, refetch } = useBuilds(_id)

    function useBuilds( id: string ) {
      return useQuery(["builds", id], getBuildByID);
    }

    useEffect(() => {
      refetch()
      console.log("succesfully refetched")

    }, [refetch, _id])
    
    return(
        <Container>
          {data && (
            <>
                <Header desc={data.desc1} title={data.name} type={data.type}/>
                <Main parts={data.parts} query={_id}/>
                <Footer price={data.price} desc={data.desc2} title={data.name}/>
            </>
        )}
        </Container>
    )
}

export default BuildPage