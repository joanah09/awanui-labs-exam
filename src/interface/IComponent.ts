export interface CollectionCentre {
    id: number;
    title: string;
    slug: string;
    data: RegionData[];
}

export interface RegionData {
    id: string;
    name: string;
    slug: string;
    permalink: string;
    address: string;
    region: string;
    street: string;
    post_code: string;
    city: string;
    opening_hours: string[];
    phone_number: number;
    payment_facilities: string;
    test_type: string[];
    accessibility: string[];
    services: string;
    latitude: string
    longitude: string
}
  
  