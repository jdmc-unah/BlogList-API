import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import categories from '../../localdata/categories'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'


const DrawerFilter= ({ filter, setFilter}) => {
    
    const [filterBy, setFilterBy] = useState(filter.filter); 
    const [orderBy, setOrderBy] = useState(filter.order); 
    const [category, setCat] = useState(filter.cat);


    const updateFilter= ()=>{
        const newFilter = {
            filter: filterBy, 
            order: orderBy , 
            cat: category 
        }
        
        setFilter(newFilter)
    }

    useEffect(()=> updateFilter(),[filterBy, orderBy, category])

    const handleChangeFilter = (event) => {
        setFilterBy(event.target.value)
    };

    const handleChangeOrderBy = (event) => {
        setOrderBy(event.target.value)
    };

    const handleChangeCat = (event) => {
        setCat(event.target.value)
    };


    const handleRestart =()=>{
        setFilterBy('all')
        setOrderBy('popular')
        setCat('')    
    }

    

  return (
   <>
    <Box sx={{ width: 225, height: '100%' , display:'flex' , flexDirection:'column' , alignItems:'center', justifyContent:'space-evenly'  }} role="presentation"   >
         
         
        <FormControl>
            <FormLabel id="filter">Filtrar por</FormLabel>
            <RadioGroup
                aria-labelledby="filter"
                name="filter"
                value={filterBy}
                onChange={handleChangeFilter}
            >
                <FormControlLabel value={'all'} control={<Radio />} label="Todos" />
                
                <FormControlLabel value={'my blogs'} control={<Radio />} label="Mis Blogs" />
            </RadioGroup>
        </FormControl>
        <FormControl>
            <FormLabel id="orderby">Ordenar por</FormLabel>
            <RadioGroup
                aria-labelledby="orderby"
                name="orderby"
                value={orderBy}
                onChange={handleChangeOrderBy}
            >
                <FormControlLabel value={'popular'} control={<Radio />} label="Populares" />
                <FormControlLabel value={'title'} control={<Radio />} label="Titulo" />
                <FormControlLabel value={'author'} control={<Radio />} label="Autor" />
            </RadioGroup>
        </FormControl>
        
        <Box width={150}>
            <Typography variant="body1" color="text.secondary">Categoria</Typography>
            <TextField 
                fullWidth
                id="category"
                select
                defaultValue="Arte"
                value={category} onChange={handleChangeCat}
                variant="outlined" size='small' type="text" >
                     <MenuItem key={'all'} value= {'all'} > Todas </MenuItem>  
                    {categories.map((cat)=> (
                    <MenuItem key={cat.value} value={cat.value} > {cat.label}  </MenuItem>  
                    ) )}
            </TextField>

        </Box>
        

        <Button variant="outlined" size='medium' color="primary" onClick={handleRestart} >
            Reiniciar 
        </Button>


      
    </Box>
   </>
  );
}

export default DrawerFilter