import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch, FormControlLabel, Box, Grid, Typography, Divider } from '@mui/material';
import { useLanguage } from './index'; 
import { useTheme } from '../themeProvider/index'; 
import TranslateIcon from '@mui/icons-material/Translate';
import ContrastIcon from '@mui/icons-material/Contrast';
import ToggleTheme from '../../components/header/toggleTheme';


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
                    backgroundColor: theme.settings.background,
                },
                
            }}
        >

            <DialogContent>
                <Box mb={3}>
                    <Typography variant="subtitle1" gutterBottom>
                        <TranslateIcon sx={{ verticalAlign: 'middle', marginRight: '8px', color: theme.settings.iconColor }} />
                    </Typography>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item>
                            <Button
                                onClick={() => handleLanguageChange('es-MX')}
                                variant={languageName === 'es-MX' ? 'outlined' : 'contained'}
                                color="transparent"
                                style={{ color: theme.settings.buttonLine , borderColor: theme.settings.buttonLine }}
                            >
                                Español
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={() => handleLanguageChange('en-US')}
                                color='transparent'
                                variant={languageName === 'en-US' ? 'outlined' : 'contained'}
                                style={{ color: theme.settings.buttonLine , borderColor: theme.settings.buttonLine }}
                            >
                                English
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Divider 
                    sx={{
                        backgroundColor: theme.settings.dividerColor,
                    }}
                />
                <Box mt={2} mb={2}>
                    <Typography variant="subtitle1" gutterBottom>
                        <ContrastIcon sx={{ verticalAlign: 'middle', marginRight: '8px', color: theme.settings.iconColor }} />
                    </Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <ToggleTheme/>
               </Box>
            </Box>
            </DialogContent>
        </Dialog>
    );
};

export default LanguageDialog;
