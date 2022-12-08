import { Clinic } from "@/pages/ClinicPage/types";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import image from "../images/tooth2.jpg";

interface Props {
  clinic: Clinic
}

function DentistCard({clinic}: Props) {
  return (
    <Link style={{ textDecoration: 'none' }} to={`/clinic/${clinic._id}`}>
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
            {clinic.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <p>Address: {clinic.address}</p>
            <p>City: {clinic.city}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}

export default DentistCard;