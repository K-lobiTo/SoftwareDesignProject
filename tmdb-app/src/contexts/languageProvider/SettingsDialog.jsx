import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch, FormControlLabel, Box, Grid, Typography, Divider } from '@mui/material';
import { useLanguage } from './index'; 
import { useTheme } from '../themeProvider/index'; 
import TranslateIcon from '@mui/icons-material/Translate';
import ContrastIcon from '@mui/icons-material/Contrast';


const LanguageDialog = ({ open, handleClose }) => {
    const { toggleLanguage, languageName } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    const handleLanguageChange = (newLanguage) => {
        if (languageName !== newLanguage) {
            toggleLanguage(newLanguage); 
        }
    };

        const handleThemeChange = (event) => {
          toggleTheme();  
        };


    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="sm" 
            fullWidth             
             sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '16px',
                    backgroundColor: "white"
                },
                
            }}
        >

            <DialogContent>
                <Box mb={3}>
                    <Typography variant="subtitle1" gutterBottom>
                        <TranslateIcon sx={{ verticalAlign: 'middle', marginRight: '8px' }} />
                    </Typography>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item>
                            <Button
                                onClick={() => handleLanguageChange('es-MX')}
                                variant={languageName === 'es-MX' ? 'contained' : 'outlined'}
                                color="purple"
                            >
                                Español
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={() => handleLanguageChange('en-US')}
                                variant={languageName === 'en-US' ? 'contained' : 'outlined'}
                                color="purple"
                            >
                                English
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                <Box mt={4} mb={1}>
                    <Typography variant="subtitle1" gutterBottom>
                        <ContrastIcon sx={{ verticalAlign: 'middle', marginRight: '8px' }} />
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">

                    <FormControlLabel
                    control={
                        <Switch 
                            size="small" 
                            checked={toggleTheme} 
                            onChange={handleThemeChange } 
                        sx={{
                             '& .MuiSwitch-switchBase.Mui-checked': {
                                color: 'purple', 
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: 'purple', 
                        },
                    }}
                    />
                }
               />
               </Box>
            </Box>
            </DialogContent>
        </Dialog>
    );
};

export default LanguageDialog;
