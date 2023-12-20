import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Home() {
    const [datas, setDatas] = useState([]);
    const [page, setPage] = useState('');
    const [perPage, setPerPage] = useState('50');
    const [sortBy, setSortBy] = useState('id');
    const [sortDirection, setSortDirection] = useState('DESC');

    const SERVER_URL = 'http://localhost:3000/api/jobs/get-all-jobs';

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    useEffect(() => {
        axios.post(SERVER_URL, {
            page,
            perPage,
            sortBy,
            sortDirection
        })
            .then(function (response) {
                // handle success
                setDatas(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [])

    return (
        <>
                {
                    datas && datas.length &&
                    datas.map(data => {
                        return (
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {data.job_title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {data.job_link}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    })
                }
        </>
    )
}
