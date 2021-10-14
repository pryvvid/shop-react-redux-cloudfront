import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Product } from "models/Product";
import { formatAsPrice } from "utils/utils";
import AddProductToCart from "components/AddProductToCart/AddProductToCart";
import axios from "axios";
import API_PATHS from "constants/apiPaths";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const queryString = window.location.hash.substr(1);
    const urlParams = new URLSearchParams(queryString);
    const idToken = urlParams.get("id_token");
    console.log("id_token", idToken);

    const requestUrl = idToken
      ? `${API_PATHS.productAuth}/products/auth`
      : `${API_PATHS.bff}/products`;

    const requestConfig = idToken
      ? {
          headers: {
            Authorization: idToken,
          },
        }
      : {};

    axios.get(requestUrl, requestConfig).then((res) => setProducts(res.data));
  }, []);

  return (
    <Grid container spacing={4}>
      {products.map((product: Product, index: number) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={product.img || "assets/img/game-placeholder.png"}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography>{formatAsPrice(product.price)}</Typography>
            </CardContent>
            <CardActions>
              {product.count > 0 ? (
                <AddProductToCart product={product} />
              ) : (
                "Out of stock"
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
