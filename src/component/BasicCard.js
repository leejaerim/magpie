import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
export default function BasicCard({menu}) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="194"
        image={menu.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Menu
        </Typography>
        <Typography variant="h5" component="div">
        {menu.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {menu.cost}
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions style={{display:'block'}}>
        <Button size="small" variant="outlined">+</Button>
        <Button size="small" variant="outlined">-</Button>
      </CardActions>
    </Card>
  );
}