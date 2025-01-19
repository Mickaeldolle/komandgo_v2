import { Shop } from "@/@types/shop";

const shops: Shop[] = [
    {
        id: 1,
        name: "Bistro Parisien",
        open: true,
        cuisine: ["Française"],
        address: {
            street: "10 Avenue des Champs",
            city: "Paris",
            postcode: "75008",
            label: "10 Avenue des Champs, 75008 Paris"
        },
        phone: "+33 1 44 11 22 33",
        website: "https://bistroparisien.fr",
        rating: 4.7,
        price_range: "$$$",
        features: ["Terrasse", "Réservations", "Wi-Fi gratuit"],
        hours: [
            { id: 17, day: 2, open: "2024-12-23 10:00:37.029+00", close: "2024-12-23 13:00:37.029+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 18, day: 2, open: "2024-12-23 16:30:05.996+00", close: "2024-12-23 21:00:05.996+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 19, day: 3, open: "2024-12-23 10:30:19.988+00", close: "2024-12-23 13:00:19.988+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 20, day: 3, open: "2024-12-23 16:30:28.138+00", close: "2024-12-23 21:00:28.138+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 21, day: 4, open: "2024-12-23 10:30:43.257+00", close: "2024-12-23 13:00:43.257+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 22, day: 4, open: "2024-12-23 16:30:49.35+00", close: "2024-12-23 21:00:49.35+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 23, day: 5, open: "2024-12-23 10:30:59.757+00", close: "2024-12-23 13:00:59.757+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 24, day: 5, open: "2024-12-23 16:30:39.513+00", close: "2024-12-23 21:30:39.513+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 25, day: 6, open: "2024-12-23 10:30:55.252+00", close: "2024-12-23 13:00:55.252+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 26, day: 6, open: "2024-12-23 16:30:09.001+00", close: "2024-12-23 21:30:09.001+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 27, day: 0, open: "2024-12-23 16:30:57.215+00", close: "2024-12-23 21:00:57.215+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" }
        ]
    },
    {
        id: 2,
        name: "La Dolce Vita",
        cuisine: ["Italienne"],
        open: false,
        address: {
            street: "21 Via Roma",
            city: "Nice",
            postcode: "06000",
            label: "21 Via Roma, 06000 Nice",
        },
        phone: "+33 4 93 12 34 56",
        website: "https://ladolcevita.com",
        rating: 4.5,
        price_range: "$$",
        features: ["Livraison", "Menu enfant", "Terrasse"],
        hours: [
            { id: 17, day: 2, open: "2024-12-23 10:00:37.029+00", close: "2024-12-23 13:00:37.029+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 18, day: 2, open: "2024-12-23 16:30:05.996+00", close: "2024-12-23 21:00:05.996+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 19, day: 3, open: "2024-12-23 10:30:19.988+00", close: "2024-12-23 13:00:19.988+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 20, day: 3, open: "2024-12-23 16:30:28.138+00", close: "2024-12-23 21:00:28.138+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 21, day: 4, open: "2024-12-23 10:30:43.257+00", close: "2024-12-23 13:00:43.257+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 22, day: 4, open: "2024-12-23 16:30:49.35+00", close: "2024-12-23 21:00:49.35+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 23, day: 5, open: "2024-12-23 10:30:59.757+00", close: "2024-12-23 13:00:59.757+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 24, day: 5, open: "2024-12-23 16:30:39.513+00", close: "2024-12-23 21:30:39.513+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 25, day: 6, open: "2024-12-23 10:30:55.252+00", close: "2024-12-23 13:00:55.252+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 26, day: 6, open: "2024-12-23 16:30:09.001+00", close: "2024-12-23 21:30:09.001+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 27, day: 0, open: "2024-12-23 16:30:57.215+00", close: "2024-12-23 21:00:57.215+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" }
        ]
    },
    {
        id: 3,
        name: "Curry House",
        cuisine: ["Indienne"],
        open: true,
        address: {
            street: "5 Rue Maharaja",
            city: "Lille",
            postcode: "59000",
            label: "5 Rue Maharaja, 59000 Lille",
        },
        phone: "+33 3 20 45 67 89",
        website: "https://curryhouse.fr",
        rating: 4.6,
        price_range: "$",
        features: ["Végétarien", "Sans gluten", "Buffet à volonté"],
        hours: [
            { id: 17, day: 2, open: "2024-12-23 10:00:37.029+00", close: "2024-12-23 13:00:37.029+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 18, day: 2, open: "2024-12-23 16:30:05.996+00", close: "2024-12-23 21:00:05.996+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 19, day: 3, open: "2024-12-23 10:30:19.988+00", close: "2024-12-23 13:00:19.988+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 20, day: 3, open: "2024-12-23 16:30:28.138+00", close: "2024-12-23 21:00:28.138+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 21, day: 4, open: "2024-12-23 10:30:43.257+00", close: "2024-12-23 13:00:43.257+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 22, day: 4, open: "2024-12-23 16:30:49.35+00", close: "2024-12-23 21:00:49.35+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 23, day: 5, open: "2024-12-23 10:30:59.757+00", close: "2024-12-23 13:00:59.757+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 24, day: 5, open: "2024-12-23 16:30:39.513+00", close: "2024-12-23 21:30:39.513+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 25, day: 6, open: "2024-12-23 10:30:55.252+00", close: "2024-12-23 13:00:55.252+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 26, day: 6, open: "2024-12-23 16:30:09.001+00", close: "2024-12-23 21:30:09.001+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 27, day: 0, open: "2024-12-23 16:30:57.215+00", close: "2024-12-23 21:00:57.215+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" }
        ]
    },
    {
        id: 4,
        name: "Le Wagon à Fromages",
        cuisine: ["Savoyarde"],
        open: true,
        address: {
            street: "14 Rue des Alpes",
            city: "Grenoble",
            postcode: "38000",
            label: "14 Rue des Alpes, 38000 Grenoble",
        },
        phone: "+33 4 76 78 90 12",
        website: "https://wagonfromages.fr",
        rating: 4.8,
        price_range: "$$$",
        features: ["Fondues", "Produits locaux", "Cadre chaleureux"],
        hours: [
            { id: 17, day: 2, open: "2024-12-23 10:00:37.029+00", close: "2024-12-23 13:00:37.029+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 18, day: 2, open: "2024-12-23 16:30:05.996+00", close: "2024-12-23 21:00:05.996+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 19, day: 3, open: "2024-12-23 10:30:19.988+00", close: "2024-12-23 13:00:19.988+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 20, day: 3, open: "2024-12-23 16:30:28.138+00", close: "2024-12-23 21:00:28.138+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 21, day: 4, open: "2024-12-23 10:30:43.257+00", close: "2024-12-23 13:00:43.257+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 22, day: 4, open: "2024-12-23 16:30:49.35+00", close: "2024-12-23 21:00:49.35+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 23, day: 5, open: "2024-12-23 10:30:59.757+00", close: "2024-12-23 13:00:59.757+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 24, day: 5, open: "2024-12-23 16:30:39.513+00", close: "2024-12-23 21:30:39.513+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 25, day: 6, open: "2024-12-23 10:30:55.252+00", close: "2024-12-23 13:00:55.252+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 26, day: 6, open: "2024-12-23 16:30:09.001+00", close: "2024-12-23 21:30:09.001+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 27, day: 0, open: "2024-12-23 16:30:57.215+00", close: "2024-12-23 21:00:57.215+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" }
        ]
    },
    {
        id: 5,
        name: "Taco Fiesta",
        cuisine: ["Mexicaine"],
        open: true,
        address: {
            street: "7 Calle Sol",
            city: "Toulouse",
            postcode: "31000",
            label: "7 Calle Sol, 31000 Toulouse"
        },
        phone: "+33 5 61 23 45 67",
        website: "https://tacofiesta.com",
        rating: 4.3,
        price_range: "$",
        features: ["Vente à emporter", "Spécialités épicées", "Menu végétalien"],
        hours: [
            { id: 17, day: 2, open: "2024-12-23 10:00:37.029+00", close: "2024-12-23 13:00:37.029+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 18, day: 2, open: "2024-12-23 16:30:05.996+00", close: "2024-12-23 21:00:05.996+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 19, day: 3, open: "2024-12-23 10:30:19.988+00", close: "2024-12-23 13:00:19.988+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 20, day: 3, open: "2024-12-23 16:30:28.138+00", close: "2024-12-23 21:00:28.138+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 21, day: 4, open: "2024-12-23 10:30:43.257+00", close: "2024-12-23 13:00:43.257+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 22, day: 4, open: "2024-12-23 16:30:49.35+00", close: "2024-12-23 21:00:49.35+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 23, day: 5, open: "2024-12-23 10:30:59.757+00", close: "2024-12-23 13:00:59.757+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 24, day: 5, open: "2024-12-23 16:30:39.513+00", close: "2024-12-23 21:30:39.513+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 25, day: 6, open: "2024-12-23 10:30:55.252+00", close: "2024-12-23 13:00:55.252+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 26, day: 6, open: "2024-12-23 16:30:09.001+00", close: "2024-12-23 21:30:09.001+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 27, day: 0, open: "2024-12-23 16:30:57.215+00", close: "2024-12-23 21:00:57.215+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" }
        ]
    },
    {
        id: 6,
        name: "The Burger Joint",
        open: true,
        cuisine: ["Américaine"],
        address: {
            street: "22 High Street",
            city: "Bordeaux",
            postcode: "33000",
            label: "22 High Street, 33000 Bordeaux"
        },
        phone: "+33 5 56 34 78 90",
        website: "https://burgerjoint.fr",
        rating: 4.4,
        price_range: "$$",
        features: ["Burgers artisanaux", "Terrasse", "Menu enfant"],
        hours: [
            { id: 17, day: 2, open: "2024-12-23 10:00:37.029+00", close: "2024-12-23 13:00:37.029+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 18, day: 2, open: "2024-12-23 16:30:05.996+00", close: "2024-12-23 21:00:05.996+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 19, day: 3, open: "2024-12-23 10:30:19.988+00", close: "2024-12-23 13:00:19.988+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 20, day: 3, open: "2024-12-23 16:30:28.138+00", close: "2024-12-23 21:00:28.138+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 21, day: 4, open: "2024-12-23 10:30:43.257+00", close: "2024-12-23 13:00:43.257+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 22, day: 4, open: "2024-12-23 16:30:49.35+00", close: "2024-12-23 21:00:49.35+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 23, day: 5, open: "2024-12-23 10:30:59.757+00", close: "2024-12-23 13:00:59.757+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 24, day: 5, open: "2024-12-23 16:30:39.513+00", close: "2024-12-23 21:30:39.513+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 25, day: 6, open: "2024-12-23 10:30:55.252+00", close: "2024-12-23 13:00:55.252+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 26, day: 6, open: "2024-12-23 16:30:09.001+00", close: "2024-12-23 21:30:09.001+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 27, day: 0, open: "2024-12-23 16:30:57.215+00", close: "2024-12-23 21:00:57.215+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" }
        ]
    },
    {
        id: 7,
        name: "Dragon Wok",
        cuisine: ["Chinoise"],
        open: true,
        address: {
            street: "18 Rue du Lotus",
            city: "Lyon",
            postcode: "69001",
            label: "18 Rue du Lotus, 69001 Lyon"
        },
        phone: "+33 4 78 56 23 78",
        website: "https://dragonwok.fr",
        rating: 4.2,
        price_range: "$",
        features: ["À volonté", "Plats épicés", "Livraison"],
        hours: [
            { id: 17, day: 2, open: "2024-12-23 10:00:37.029+00", close: "2024-12-23 13:00:37.029+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 18, day: 2, open: "2024-12-23 16:30:05.996+00", close: "2024-12-23 21:00:05.996+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 19, day: 3, open: "2024-12-23 10:30:19.988+00", close: "2024-12-23 13:00:19.988+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 20, day: 3, open: "2024-12-23 16:30:28.138+00", close: "2024-12-23 21:00:28.138+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 21, day: 4, open: "2024-12-23 10:30:43.257+00", close: "2024-12-23 13:00:43.257+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 22, day: 4, open: "2024-12-23 16:30:49.35+00", close: "2024-12-23 21:00:49.35+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 23, day: 5, open: "2024-12-23 10:30:59.757+00", close: "2024-12-23 13:00:59.757+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 24, day: 5, open: "2024-12-23 16:30:39.513+00", close: "2024-12-23 21:30:39.513+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 25, day: 6, open: "2024-12-23 10:30:55.252+00", close: "2024-12-23 13:00:55.252+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 26, day: 6, open: "2024-12-23 16:30:09.001+00", close: "2024-12-23 21:30:09.001+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 27, day: 0, open: "2024-12-23 16:30:57.215+00", close: "2024-12-23 21:00:57.215+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" }
        ]
    },
    {
        id: 8,
        name: "Zen Garden",
        cuisine: ["Japonaise", "Chinoise", "Vietnamienne"],
        open: true,
        address: {
            street: "33 Boulevard Sakura",
            city: "Marseille",
            postcode: "13007",
            label: "33 Boulevard Sakura, 13007 Marseille"
        },
        phone: "+33 4 91 56 78 34",
        website: "https://zengarden.fr",
        rating: 4.6,
        price_range: "$$$",
        features: ["Sushis frais", "Menu dégustation", "Ambiance zen"],
        hours: [
            { id: 17, day: 2, open: "2024-12-23 10:00:37.029+00", close: "2024-12-23 13:00:37.029+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 18, day: 2, open: "2024-12-23 16:30:05.996+00", close: "2024-12-23 21:00:05.996+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 19, day: 3, open: "2024-12-23 10:30:19.988+00", close: "2024-12-23 13:00:19.988+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 20, day: 3, open: "2024-12-23 16:30:28.138+00", close: "2024-12-23 21:00:28.138+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 21, day: 4, open: "2024-12-23 10:30:43.257+00", close: "2024-12-23 13:00:43.257+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 22, day: 4, open: "2024-12-23 16:30:49.35+00", close: "2024-12-23 21:00:49.35+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 23, day: 5, open: "2024-12-23 10:30:59.757+00", close: "2024-12-23 13:00:59.757+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 24, day: 5, open: "2024-12-23 16:30:39.513+00", close: "2024-12-23 21:30:39.513+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 25, day: 6, open: "2024-12-23 10:30:55.252+00", close: "2024-12-23 13:00:55.252+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 26, day: 6, open: "2024-12-23 16:30:09.001+00", close: "2024-12-23 21:30:09.001+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 27, day: 0, open: "2024-12-23 16:30:57.215+00", close: "2024-12-23 21:00:57.215+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" }
        ]
    },
    {
        id: 9,
        name: "Steakhouse Grill",
        cuisine: ["Barbecue"],
        open: true,
        address: {
            street: "50 Avenue du Bœuf",
            city: "Lille",
            postcode: "59000",
            label: "50 Avenue du Bœuf, 59000 Lille"
        },
        phone: "+33 3 20 45 67 89",
        website: "https://steakhousegrill.fr",
        rating: 4.3,
        price_range: "$$$",
        features: ["Grillades", "Viandes locales", "Vins français"],
        hours: [
            { id: 17, day: 2, open: "2024-12-23 10:00:37.029+00", close: "2024-12-23 13:00:37.029+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 18, day: 2, open: "2024-12-23 16:30:05.996+00", close: "2024-12-23 21:00:05.996+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 19, day: 3, open: "2024-12-23 10:30:19.988+00", close: "2024-12-23 13:00:19.988+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 20, day: 3, open: "2024-12-23 16:30:28.138+00", close: "2024-12-23 21:00:28.138+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 21, day: 4, open: "2024-12-23 10:30:43.257+00", close: "2024-12-23 13:00:43.257+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 22, day: 4, open: "2024-12-23 16:30:49.35+00", close: "2024-12-23 21:00:49.35+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 23, day: 5, open: "2024-12-23 10:30:59.757+00", close: "2024-12-23 13:00:59.757+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 24, day: 5, open: "2024-12-23 16:30:39.513+00", close: "2024-12-23 21:30:39.513+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 25, day: 6, open: "2024-12-23 10:30:55.252+00", close: "2024-12-23 13:00:55.252+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 26, day: 6, open: "2024-12-23 16:30:09.001+00", close: "2024-12-23 21:30:09.001+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 27, day: 0, open: "2024-12-23 16:30:57.215+00", close: "2024-12-23 21:00:57.215+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" }
        ]
    },
    {
        id: 10,
        name: "Vegan Paradise",
        open: true,
        cuisine: ["Végétalienne"],
        address: {
            street: "45 Rue Verte",
            city: "Strasbourg",
            postcode: "67000",
            label: "45 Rue Verte, 67000 Strasbourg"
        },
        phone: "+33 3 88 12 34 56",
        website: "https://veganparadise.fr",
        rating: 4.9,
        price_range: "$$$",
        features: ["100% bio", "Sans gluten", "Desserts gourmands"],
        hours: [
            { id: 17, day: 2, open: "2024-12-23 10:00:37.029+00", close: "2024-12-23 13:00:37.029+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 18, day: 2, open: "2024-12-23 16:30:05.996+00", close: "2024-12-23 21:00:05.996+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 19, day: 3, open: "2024-12-23 10:30:19.988+00", close: "2024-12-23 13:00:19.988+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 20, day: 3, open: "2024-12-23 16:30:28.138+00", close: "2024-12-23 21:00:28.138+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 21, day: 4, open: "2024-12-23 10:30:43.257+00", close: "2024-12-23 13:00:43.257+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 22, day: 4, open: "2024-12-23 16:30:49.35+00", close: "2024-12-23 21:00:49.35+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 23, day: 5, open: "2024-12-23 10:30:59.757+00", close: "2024-12-23 13:00:59.757+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 24, day: 5, open: "2024-12-23 16:30:39.513+00", close: "2024-12-23 21:30:39.513+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 25, day: 6, open: "2024-12-23 10:30:55.252+00", close: "2024-12-23 13:00:55.252+00", delivery: false, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 26, day: 6, open: "2024-12-23 16:30:09.001+00", close: "2024-12-23 21:30:09.001+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" },
            { id: 27, day: 0, open: "2024-12-23 16:30:57.215+00", close: "2024-12-23 21:00:57.215+00", delivery: true, clickAndCollect: true, onSite: false, shopUuid: "1f6268f3-44f7-47fe-8c6e-f674f1fdc865" }
        ]
    }
];


export default shops;