import { useState } from 'react'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';

import DropDownMenu from './DropDownMenu'
import DrawerFilter from './FilterDrawer'

import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'



const HomeAppBar = ({logout, userName, setFilter, filter})=>{
    //* Drawer
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    };


    return(
        <>
             <AppBar position="fixed">
                <Toolbar>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        <DrawerFilter toggleDrawer={toggleDrawer} setFilter={setFilter} filter={filter}/>
                    </Drawer>
                    
                    <IconButton onClick={toggleDrawer(true)}> <FilterListIcon  /> </IconButton>  {/*//todo cambiarle el color */}
                    
                    <Typography textAlign={'center'} variant='h5' sx={{ flexGrow: 1 }} >Blog App</Typography>
                    
                    <DropDownMenu  handleLogOut={logout} uName={userName} />
                
                </Toolbar>
            </AppBar>
        </>
    )


}


export default HomeAppBar