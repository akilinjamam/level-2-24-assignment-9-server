export type TImageFiles = { [fieldname: string]: Express.Multer.File[] };

export type TProduct = {
  productName: string;
  category: string;
  price: number;
  ratings: number;
  details: string;
  clicked: number;
  images: string[];
  vendorId: string;
};
