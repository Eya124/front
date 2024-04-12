export interface Product {
    image: string,
    uname: string,
    gmail: string,
    productName: string,
    status: string,
    daterec: Date,
    budget: string
}

export const TopSelling: Product[] = [

    {
        image: 'assets/images/users/user1.jpg',
        uname: 'Ibrahim BARKALLAH',
        gmail: 'Ibrahim.Barkallah@gmail.com',
        productName: 'Reclamation pour Eya Trabelsi',
        status: 'danger',
        daterec: new Date(2022, 7, 16),
        budget: '95K'
    },
    {
        image: 'assets/images/users/user2.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Landing pro React',
        status: 'info',
        daterec: new Date(2023, 7, 16),
        budget: '95K'
    },
    {
        image: 'assets/images/users/user3.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Elite React	',
        status: 'warning',
        daterec: new Date(2022, 7, 19),
        budget: '95K'
    },
    {
        image: 'assets/images/users/user4.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        productName: 'Ample React',
        status: 'success',
        daterec: new Date(2022, 7, 23),
        budget: '95K'
    },

]