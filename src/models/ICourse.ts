export declare interface ICourse {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number | null;
    status: 'ACTIVE' | 'INACTIVE';
    imageUrl: string;
}
