import React from 'react';
import { Typography, Card, CardHeader, CardBody, CardFooter, Button } from "@material-tailwind/react";

// Mock data for paint products
const paintProducts = [
  { id: 1, name: 'Premium Matte', color: 'White', size: '1 Gallon', price: 29.99, inStock: true },
  { id: 2, name: 'Eco-Friendly Satin', color: 'Beige', size: '1 Gallon', price: 34.99, inStock: true },
  { id: 3, name: 'High-Gloss Enamel', color: 'Navy Blue', size: '1 Quart', price: 15.99, inStock: false },
  { id: 4, name: 'Exterior Latex', color: 'Gray', size: '5 Gallon', price: 89.99, inStock: true },
  // Add more paint products as needed
];

export default function Products() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h2" className="text-3xl font-bold mb-6">
        Our Paint Products
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paintProducts.map((product) => (
          <Card key={product.id} className="w-full">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={`https://via.placeholder.com/300x200?text=${product.name}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {product.name}
              </Typography>
              <Typography>
                Color: {product.color}<br />
                Size: {product.size}<br />
                Price: ${product.price.toFixed(2)}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                fullWidth={true}
                color={product.inStock ? "blue" : "gray"}
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}