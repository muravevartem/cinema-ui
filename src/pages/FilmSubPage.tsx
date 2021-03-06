import {Container} from "@mui/material";
import React, {useEffect, useState} from "react";
import FilmPoster from "../components/FilmPoster";
import {Navigate, useParams} from "react-router-dom";
import {NOT_FOUND_URL} from "../App";
import {FilmType} from "../models/response/FilmTypes";
import $api from "../http/config";
import LoadingComponent from "../components/LoadingComponent";
import ScreeningList from "../components/ScreeningList";
import {FilmMakerComponent} from "../components/FilmMakerComponent";


export default function FilmSubPage() {
    const {id} = useParams();

    const [film, setFilm] = useState<FilmType>({} as FilmType);

    const [loaded, setLoaded] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(()=>{
        setLoaded(false);
        setError(false);
        async function asyncFoo() {
            try {
                const response = await $api.get<FilmType>(`/films/${id}`);
                setFilm(response.data);
            } catch (e) {
                setError(true);
            } finally {
                setLoaded(true);
            }
        }
        if (id && !Number.isNaN(Number(id))) {
            asyncFoo();
        }
    },[])

    if (!loaded) return <LoadingComponent/>

    if (!id || Number.isNaN(Number(id)) || (loaded && error))
        return (<Navigate to={NOT_FOUND_URL}/>);

    return (
        <Container>
            <FilmPoster film={film}/>
            <FilmMakerComponent film={film}/>
            <ScreeningList film={film}/>
        </Container>
    )
}