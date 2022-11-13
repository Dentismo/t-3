import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import image from "../images/tooth.png";

interface Props {
  dentist: {
    name: String,
    details?: String,
  }
}

function DentistCard({dentist}: Props) {
  return (
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
            {dentist.details}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default DentistCard;