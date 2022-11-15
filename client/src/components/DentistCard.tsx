import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import image from "../images/tooth.png";

interface Props {
  dentist: {
    name: String,
    details?: String,
    id?: String,
    location?: String
  }
}

function DentistCard({dentist}: Props) {
  return (
    <Link style={{ textDecoration: 'none' }} to={`/clinic/${dentist.id}`}>
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="tooth"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {dentist.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <p>Opening hours: {dentist.details}</p>
            <p>Location: {dentist.location}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}

export default DentistCard;