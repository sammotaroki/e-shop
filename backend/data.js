import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Sam',
            email: 'sammotaroki@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Marcus',
            email: 'marcus@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
        {
            name: 'Kyle',
            email: 'kyle@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'Organic Bathbomb',
            category: 'Soap',
            image: '/images/bathbomb.png',
            price: 9.99,
            countInStock: 50,
            brand: 'Mikalla',
            rating: 4,
            numReviews: 5,
            description: 'good quality'
        },
        {
            name: 'Bubble bath',
            category: 'Soap',
            image: '/images/bubblebath.png',
            price: 18.99,
            countInStock: 0,
            brand: 'Mikalla',
            rating: 4.5,
            numReviews: 13,
            description: 'good quality shampoo'
        },
        {
            name: 'Mikalla Conditioner',
            category: 'Hair',
            image: '/images/conditioner.png',
            price: 6.99,
            countInStock: 25,
            brand: 'Mikalla',
            rating: 4,
            numReviews: 23,
            description: 'good quality conditioner'
        },
        {
            name: 'Unrefined Shea Butter',
            category: 'Hair',
            image: '/images/feat1.png',
            price: 6.99,
            countInStock: 13,
            brand: 'Unrefined',
            rating: 5,
            numReviews: 10,
            description: 'good quality shea butter'
        },
        {
            name: 'African Black Soap',
            category: 'Soap',
            image: '/images/prod5.png',
            price: 6.99,
            countInStock: 2,
            brand: 'Unrefined',
            rating: 4,
            numReviews: 6,
            description: 'good quality soap'
        },
        {
            name: 'Cleanser Scrub Mask',
            category: 'Cosmetic',
            image: '/images/cleanser.png',
            price: 9.99,
            countInStock: 50,
            brand: 'Garnier',
            rating: 4.5,
            numReviews: 9,
            description: 'Garnier-Skin-SkinActive-Charcoal-3-in-1-Cleanser-Scrub-Mask'
        },
        {
            name: 'Facial Scrub',
            category: 'Cosmetics',
            image: '/images/scrub.png',
            price: 6.99,
            countInStock: 40,
            brand: 'Super Facialist',
            rating: 4.6,
            numReviews: 18,
            description: 'Salicylic Acid Anti-blemish scrub'
        },
        {
            name: 'Charcoal Face Mask',
            category: 'Skin',
            image: '/images/facemask.png',
            price: 8.99,
            countInStock: 53,
            brand: 'dr.organic',
            rating: 4,
            numReviews: 20,
            description: 'Pore Cleansing Face Mask'
        },
    ],
};

export default data;