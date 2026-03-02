export type Ad = {
  id: string;
  title: string;
  location: string;
  price: number;
  condition: "New" | "Used" | "Like New";
  image: string;
};