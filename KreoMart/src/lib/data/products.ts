// interface Product {
//     id: number;
//     preview_image: string;
//     description: string;
//     price: number;
//     category: string;
//   }

import { PRODUCT } from "../../../typings";

  

// export const allProducts: Product[] = [
//     { id: 1, preview_image: '/assets/jwel2.PNG', description: 'Classic Leather Men\'s Belt', price: 799.00, category: 'Accessories' },
//     { id: 2, preview_image: '/assets/jeans1.PNG', description: 'Women\'s Casual Sneakers', price: 1499.00, category: 'Shoes' },
//     { id: 3, preview_image: '/assets/jeans2.PNG', description: 'Cotton Polo T-Shirt', price: 599.00, category: 'T-Shirts' },
//     { id: 4, preview_image: '/assets/jwel1.PNG', description: 'Stainless Steel Water Bottle', price: 299.00, category: 'Accessories' },
//     { id: 5, preview_image: '/assets/ts1.PNG', description: 'Smartwatch with Fitness Tracker', price: 2499.00, category: 'Electronics' },
//     { id: 6, preview_image: '/assets/ts2.PNG', description: 'Women\'s Leather Handbag', price: 1299.00, category: 'Bags' },
//     { id: 7, preview_image: '/assets/Prod_img.svg', description: 'Wireless Bluetooth Earphones', price: 999.00, category: 'Electronics' },
//     { id: 8, preview_image: '/assets/ts3.PNG', description: 'Men\'s Formal Dress Shirt', price: 899.00, category: 'Shirts' },
//     { id: 9, preview_image: '/assets/Prod_img.svg', description: 'Casual Linen Shorts', price: 699.00, category: 'Shorts' },
//     { id: 10, preview_image: '/assets/ts4.PNG', description: 'Digital Camera with 4K Video', price: 2999.00, category: 'Electronics' },
//     { id: 11, preview_image: '/assets/Prod_img.svg', description: 'Unisex Aviator Sunglasses', price: 399.00, category: 'Accessories' },
//     { id: 12, preview_image: '/assets/Tshirts.png', description: 'Wireless Gaming Mouse', price: 799.00, category: 'Electronics' },
//     { id: 13, preview_image: '/assets/sh1.PNG', description: 'Women\'s Floral Dress', price: 1199.00, category: 'Dresses' },
//     { id: 14, preview_image: '/assets/sh2.PNG', description: 'Men\'s Leather Wallet', price: 499.00, category: 'Accessories' },
//     { id: 15, preview_image: '/assets/womenSuit.PNG', description: 'Trendy Unisex Backpack', price: 1099.00, category: 'Bags' },
//     { id: 16, preview_image: '/assets/womenTshirt.PNG', description: 'Stylish Men\'s Watch', price: 1799.00, category: 'Accessories' },
//   ];


 export const allProducts ={
    count: 20,
    next: "https://kreomart.onrender.com/api/products/?page=2",
    previous: 0,
    results: [
        {
            id: 19,
            slug: "shoe-nike-2",
            name: "Shoe",
            description: "",
            preview_image: "https://kreomart.s3.ap-south-1.amazonaws.com/static/media/shoe2.PNG",
            category: "Footwear",
            product_variant: [
                {
                    id: 16,
                    price: 5000.0,
                    quantity: 2,
                    discount_price: 4500.0
                }
            ]
        },
        {
            id: 18,
            slug: "shoe-1",
            name: "Nike",
            description: "",
            preview_image: "https://kreomart.s3.ap-south-1.amazonaws.com/static/media/shoe1.PNG",
            category: "Footwear",
           product_variant: [
                {
                    id: 15,
                    price: 4000.0,
                    quantity: 2,
                    discount_price: 2000.0
                }
            ]
        },
        {
            id: 13,
            slug: "women-sandal",
            name: "Sandal",
            description: "sandal",
            preview_image: "https://kreomart.s3.ap-south-1.amazonaws.com/static/media/sh5.PNG",
            category: "Footwear",
            product_variant: [
                {
                    id: 29,
                    price: 1000.0,
                    quantity: 1,
                    discount_price: 800.0
                },
                {
                    id: 30,
                    price: 999.0,
                    quantity: 1,
                    discount_price: 639.0
                },
                {
                    id: 31,
                    price: 555.0,
                    quantity: 2,
                    discount_price: 459.0
                },
                {
                    id: 10,
                    price: 999.0,
                    quantity: 3,
                    discount_price: 700.0
                },
                {
                    id: 32,
                    price: 499.0,
                    quantity: 3,
                    discount_price: 350.0
                }
            ]
        },
        {
            id: 17,
            slug: "women-suit-2",
            name: "Suit",
            description: "",
            preview_image: "https://kreomart.s3.ap-south-1.amazonaws.com/static/media/suit2.PNG",
            category: "Clothing",
            product_variant: [
                {
                    id: 14,
                    price: 8999.0,
                    quantity: 2,
                    discount_price: 7999.0
                }
            ]
        },
        {
            id: 14,
            slug: "women-suit",
            name: "WomenSuit",
            description: "suit",
            preview_image: "https://kreomart.s3.ap-south-1.amazonaws.com/static/media/suit3.PNG",
            category: "Clothing",
            product_variant: [
                {
                    id: 11,
                    price: 9999.0,
                    quantity: 1,
                    discount_price: 8999.0
                }
            ]
        },
        {
            id: 11,
            slug: "tshirt-1",
            name: "Tshirt",
            description: "Pure Cotton White Tshirt with half Sleaves",
            preview_image: "https://kreomart.s3.ap-south-1.amazonaws.com/static/media/tshirt.PNG",
            category: "Clothing",
            product_variant: [
                {
                    id: 8,
                    price: 699.0,
                    quantity: 1,
                    discount_price: 499.0
                }
            ]
        },
        {
            id: 20,
            slug: "blue-jeans",
            name: "Jeans",
            description: "",
            preview_image: "https://kreomart.s3.ap-south-1.amazonaws.com/static/media/jeans1.jpg",
            category: "Clothing",
            product_variant: [
                {
                    id: 17,
                    price: 900.0,
                    quantity: 8,
                    discount_price: 799.0
                }
            ]
        },
        {
            id: 22,
            slug: "black-mens-jeans",
            name: "Black Mens Jeans",
            description: "",
            preview_image: "https://kreomart.s3.ap-south-1.amazonaws.com/static/media/creaslim-0QDEj5dnUMk-unsplash.jpg",
            category: "Clothing",
            product_variant: [
                {
                    id: 19,
                    price: 1100.0,
                    quantity: 6,
                    discount_price: 700.0
                }
            ]
        },
        {
            id: 23,
            slug: "mens-black-suit",
            name: "Black Suit",
            description: "",
            preview_image: "https://kreomart.s3.ap-south-1.amazonaws.com/static/media/jeremy-beadle-qnU-UR0o5X8-unsplash.jpg",
            category: "Clothing",
            product_variant: [
                {
                    id: 20,
                    price: 9999.0,
                    quantity: 4,
                    discount_price: 8999.0
                }
            ]
        },
        {
            id: 24,
            slug: "blue-tuxedo-suit",
            name: "Tuxedo",
            description: "",
            preview_image: "https://kreomart.s3.ap-south-1.amazonaws.com/static/media/royal-anwar-u5T5b3lNYw8-unsplash.jpg",
            category: "Clothing",
            product_variant: [
                {
                    id: 21,
                    price: 10000.0,
                    quantity: 2,
                    discount_price: 8999.0
                }
            ]
        }
    ]
}