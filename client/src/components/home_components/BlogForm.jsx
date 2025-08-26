import { useState } from "react"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid'

import categories from '../../localdata/categories'


const BlogForm = ({createBlog})=>{
    const [newTitle, setNewTitle ] = useState('')
    const [newAuthor, setNewAuthor ] = useState('')
    const [newUrl, setNewUrl ] = useState('')

    const [picUrl, setPicUrl ] = useState('')
    const [description, setDesc ] = useState('')
    const [category, setCat ] = useState('Arte')

        

     //Actualiza los hooks 
    const onChangeTitle= (event) => setNewTitle(event.target.value)
    const onChangeAuthor= (event) => setNewAuthor(event.target.value)
    const onChangeUrl= (event) => setNewUrl(event.target.value)

    const onChangePicUrl= (event) => setPicUrl(event.target.value)
    const onChangeDesc= (event) => setDesc(event.target.value)
    const onChangeCat= (event) => setCat(event.target.value)

    
    const addBlog =  (event)  =>  { 
        event.preventDefault()

         createBlog ( {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            picUrl: picUrl,
            description: description,
            category: category
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setPicUrl('')
        setDesc('')
        setCat('')

    
    }


  return(
    <>
      <Box
        onSubmit={addBlog}
        component="form"
        sx={{ '& > :not(style)': { m: 1, maxWidth: '80rem', minWidth: 300 } }}
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="10rem"
        marginTop={3}        
      >     

        <Grid container spacing={2} >
          <Grid size={ { xs:12 , sm: 12,  md:12, lg:6, xl: 6  } } >
            <TextField fullWidth label="Titulo" value={newTitle} onChange={onChangeTitle}  variant="outlined" size='small' type="text" multiline maxRows={2}/>
          </Grid>

          <Grid size={ { xs:12 , sm: 12, md:6, lg:6, xl: 6  } }>
            <TextField fullWidth label="Autor" value={newAuthor} onChange={onChangeAuthor} variant="outlined" size='small' type="text"/>
          </Grid>

          <Grid size={ { xs:12 , sm: 12 , md:6, lg:4, xl: 4  } }>
              <TextField fullWidth
              id="category"
              select
              defaultValue="Arte"
              label="Categoría" 
              value={category} onChange={onChangeCat}
              variant="outlined" size='small' type="text" >
                  {categories.map((cat)=> (
                    <MenuItem key={cat.value} value={cat.value} > {cat.label}  </MenuItem>  
                  ) )}
              </TextField>
          </Grid >
          
          <Grid  size={ { xs:12 , sm: 12, md:6, lg:4, xl: 4  } }> 
            <TextField  fullWidth label="Url de Blog" value={newUrl} onChange={onChangeUrl} variant="outlined" size='small' type="text"  />
          </Grid>

          <Grid size={ { xs:12 , sm: 12 , md:6, lg:4, xl: 4  } }> 
            <TextField fullWidth label="Url de Imagen" value={picUrl} onChange={onChangePicUrl} variant="outlined" size='small' type="text"/>
          </Grid>
          
          <Grid size={ { xs:12 , sm: 12 , md:12, lg:12, xl: 12  } }>
            <TextField  fullWidth label="Descripción" value={description} onChange={onChangeDesc} variant="outlined" size='small' type="text" multiline maxRows={4}/> 
          </Grid>
          
        </Grid>  
          <Button variant="contained" type='submit' color="success">Guardar</Button>
  
      </Box>

    </>
  )
}


export default BlogForm
