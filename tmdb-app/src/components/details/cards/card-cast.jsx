import '../stylesheets/cards/card-cast.css';
import { useTheme } from '../../../contexts/themeProvider/index.jsx';
import { Box } from "@mui/material";


const CardCast = (props) => {
  
  const { theme } = useTheme();

    return (
      <Box className="card-cast"
        style={{
          background: theme.details.cardCast.background,
          border: theme.details.cardCast.border,
        }}
      >
        {props.image && props.image !== 'principal_image' && (
        <img className='image-cast'
          src={props.image}
          alt='principal_image'/>
      )}
        <Box className="text">
          <h3 className="real-name"
            style={{
              color: theme.details.cardCast.name,
            }}
          >{props.real_name}</h3>
          <p className="cast-name"
          style={{
            color: theme.details.cardCast.realName,
          }}
          >{props.name}</p>
        </Box>
      </Box>
    );
  };
  
  export default CardCast;