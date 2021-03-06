import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import { useNavigate, useLocation } from 'react-router-dom';


import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

// function useQuery(){
//     return new URLSearchParams(useLocation().search);
// }


const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch(); // it's a Hook
//    const query = useQuery();
    const navigate = useNavigate();
//    const page = query.get('page') || 1;
 //   const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    const searchPost = () => {
        if (search.trim()) {
            dispatch(getPostsBySearch({ search }));
            navigate(`/posts/search?searchQuery=${search || 'none'}`);
          } else {
            navigate('/');
          }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13){
            searchPost();
        }
    };

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const homePage = async () => {
        await delay(100);
        navigate('/');
    };

    const clear = () => {
        navigate('/home');
        homePage();

    };

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit"> 
                        <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Szukaj" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                         <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Szukaj</Button>
                         <Button onClick={clear} className={classes.searchButton} variant="contained" color="secondary">Wyczy????</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
