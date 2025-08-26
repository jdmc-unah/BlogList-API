import { useState , useEffect} from "react"


import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

//Iconos
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';

import ConfirmDialog from "./ConfirmDialog";
import { useStepContext } from "@mui/material";




const Blog = ({ blog, likeBlog, deleteBlog, userID }) => {
  

  //*Confirm Dialog
  const [open, setOpen] = useState(false);

  //*Usuarios que han dado like
  const [userLike, setUserLike] = useState([]);
  useEffect( ()=>{ setUserLike( blog.userLikes.find(id => id == userID)) }, [userLike] )

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const increaseLikes = async ()=>{
    
    if (!userLike) {  
      blog.likes = blog.likes + 1
      blog.userLikes = blog.userLikes.concat(userID)
      setUserLike(blog.userLikes)
      await likeBlog(blog.id, blog)
    }else{

      blog.likes = blog.likes - 1
      blog.userLikes = blog.userLikes.filter( id => id != userID   )
      setUserLike(blog.userLikes)
      await likeBlog(blog.id, blog)

    }
  }

  //* Expand animation
  const [expanded, setExpanded] = useState(false);
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
      })(({ theme }) => ({
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
        variants: [
          {
            props: ({ expand }) => !expand,
            style: {
              transform: 'rotate(0deg)',
            },
          },
          {
            props: ({ expand }) => !!expand,
            style: {
              transform: 'rotate(180deg)',
            },
          },
        ],
      }));



  
 
  return (
    <>
    
      <Card sx={{mb:1}} >
         <CardHeader
          
            title={blog.title}
            slotProps={{title:{ sx:{fontSize: '1.2rem' }}}}
            subheader={` ${blog.author} ` }
            action={ 
              <>
                <Box >
                  
                  <Box sx={{display:'flex'  }} >
                    <IconButton color="error" size="small" aria-label="add to favorites" onClick={increaseLikes}>
                     {!userLike ? <FavoriteBorderIcon /> : <FavoriteIcon/> }     {blog.likes}
                    </IconButton>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </Box>

                  { !expanded &&
                    <Box  sx={{  display:"flex" }}>
                        <img style={{maxWidth: 110, height: 'auto'}}  src={blog.picUrl} alt={blog.title} />
                    </Box>
                  }
                </Box>
              </>}
        />
        
         <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{display:"flex", flexDirection:"column", alignItems:'center', justifyContent:'center' }}>
            
            <img style={{maxWidth: 325, height: 'auto'}}  src={blog.picUrl} alt={blog.title} /> <br />
            <Typography variant="body2" color="text.secondary">{blog.description}</Typography>
            
          </CardContent>
          <CardActions>
            <CategoryIcon />  
            <Typography variant="body2" color="text.secondary" textAlign={'center'} > {blog.category} </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button href={blog.url}  target="_blank" variant='outlined' size="small">Ir al blog</Button>
            
            {/* Solo aparece si el blog pertenece al usuario */}
             { blog.user.id == userID && <Button onClick={handleClickOpen}  variant='outlined' size="small">Borrar</Button> }
        
        </CardActions>
        </Collapse>
        
       
      </Card>
    
      <ConfirmDialog open={open} setOpen={setOpen} handleAccept={()=> deleteBlog(blog)} />
      

    

    </>
  )

}

export default Blog