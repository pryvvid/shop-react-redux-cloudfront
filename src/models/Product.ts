import * as Yup from "yup";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  img: string;
  count: number;
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().required(),
  count: Yup.number().required(),
  img: Yup.string().required()
});
