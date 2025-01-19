"use client";

import { IconAdjustmentsAlt, IconMapPin, IconSearch } from "@tabler/icons-react";
import { Button, Checkbox, Text, Modal, MultiSelect, Slider, TextInput, Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import StarButton from "../components/ui/StarButton/StarButton";
import Link from "next/link";
import type { Shop } from "@/@types/shop";

// Liste des shops
const shops: Shop[] = [
    {
        id: 1,
        name: "Bistro Parisien",
        cuisine: "Française",
        address: {
            street: "10 Avenue des Champs",
            city: "Paris",
            postcode: "75008"
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
        cuisine: "Italienne",
        address: {
            street: "21 Via Roma",
            city: "Nice",
            postcode: "06000"
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
        cuisine: "Indienne",
        address: {
            street: "5 Rue Maharaja",
            city: "Lille",
            postcode: "59000"
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
        cuisine: "Savoyarde",
        address: {
            street: "14 Rue des Alpes",
            city: "Grenoble",
            postcode: "38000"
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
        cuisine: "Mexicaine",
        address: {
            street: "7 Calle Sol",
            city: "Toulouse",
            postcode: "31000"
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
        cuisine: "Américaine",
        address: {
            street: "22 High Street",
            city: "Bordeaux",
            postcode: "33000"
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
        cuisine: "Chinoise",
        address: {
            street: "18 Rue du Lotus",
            city: "Lyon",
            postcode: "69001"
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
        cuisine: "Japonaise",
        address: {
            street: "33 Boulevard Sakura",
            city: "Marseille",
            postcode: "13007"
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
        cuisine: "Barbecue",
        address: {
            street: "50 Avenue du Bœuf",
            city: "Lille",
            postcode: "59000"
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
        cuisine: "Végétalienne",
        address: {
            street: "45 Rue Verte",
            city: "Strasbourg",
            postcode: "67000"
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


// Composant Shop
export default function Shop() {

    const [showSearchShopModal, setShowSearchShopModal] = useState(false);
    const [toggleFilter, setToggleFilter] = useState(true);
    const distanceValues = [
        { value: 5, label: '5 km' },
        { value: 15, label: '15 km' },
        { value: 30, label: '30 km' },
        { value: 45, label: '45 km' },
    ]
    const featuresValues = [
        { value: 'Livraison', label: 'Livraison' },
        { value: 'click_and_collect', label: 'Click & Collect' },
        { value: 'Menu enfant', label: 'Menu enfant' },
        { value: 'Terrasse', label: 'Terrasse' },
        { value: 'Réservations', label: 'Réservations' },
        { value: 'Wi-Fi', label: 'Wi-Fi' },
    ]

    // A remplacer par les types de cuisine stocké dans la BDD
    const cuisineValues = [
        { value: 'francaise', label: 'Française' },
        { value: 'italienne', label: 'Italienne' },
        { value: 'japonaise', label: 'Japonaise' },
        { value: 'chinoise', label: 'Chinoise' },
        { value: 'vietnamienne', label: 'Vietnamienne' },
        { value: 'végétalienne', label: 'Végétalienne' },
        { value: 'barbecue', label: 'Barbecue' },
    ]
    useEffect(() => {
        // remplacer la logique ici, Si la liste des shops est vide, afficher le modal
        if (shops.length < 0) {
            setShowSearchShopModal(true);
        }
    }, [])

    return (
        <div className="h-full">


            < div className="bg-background rounded-xl bg-background" >
                {showSearchShopModal && (
                    <Modal
                        withCloseButton={false}
                        overlayProps={{
                            backgroundOpacity: 0.8,
                            blur: 2,
                        }} opened={showSearchShopModal} onClose={() => setShowSearchShopModal(false)}>

                        <div className="" >
                            <IconMapPin stroke={0.8} size={50} className="mx-auto mb-2 text-primary" />
                            <h1 className="text-xl text-center font-blackOpsOne mb-2">Où êtes-vous ?</h1>
                            <form action="" className="flex flex-col">
                                <TextInput
                                    autoFocus
                                    size="md"
                                    aria-label="Ou êtes vous ?"
                                    classNames={{
                                        root: 'flex-1',
                                    }}
                                />
                                <Button p={8} onClick={() => setToggleFilter((prev) => !prev)} variant="outline" className="mt-2 ml-auto" type="button"><IconAdjustmentsAlt /></Button>
                                {toggleFilter && (

                                    <div className="rounded-xl border border-primary my-2 p-5">
                                        {/* <Fieldset legend=""> */}
                                        <Text size="sm" fw={600}>Distance</Text>

                                        <Slider
                                            label={(value) => `${value} km`}
                                            defaultValue={50}
                                            aria-label="Distance"
                                            mb={30}
                                            color="orange"
                                            size="sm"
                                            radius="md"
                                            min={1}
                                            max={50}
                                            marks={distanceValues}
                                        />
                                        <MultiSelect
                                            mb={5}
                                            label="Cuisine"
                                            aria-label="Type de cuisine"
                                            data={cuisineValues}></MultiSelect>
                                        <Checkbox.Group className="" label="Services" defaultValue={['buffet']}>
                                            <div className="grid grid-cols-2 gap-y-3">
                                                {featuresValues.map((feature) => (
                                                    <Checkbox key={feature.value} value={feature.value} label={feature.label} />
                                                ))}
                                            </div>
                                        </Checkbox.Group>
                                        {/* </Fieldset> */}
                                    </div>
                                )}
                                <Button className="mt-5" size="md" fullWidth type="submit">Recherche<IconSearch className="ms-2" />  </Button>
                            </form>
                        </div>


                    </Modal>
                )
                }
            </div >

            {/* Liste des magasins */}

            < div className="flex flex-col" >
                <Button className="ml-auto" onClick={() => setShowSearchShopModal(true)} radius={"xl"} size="sm"
                    type="button">
                    <IconSearch />
                </Button>
                <Divider my="sm" />
                {
                    shops.map((shop: Shop) => (
                        <div key={shop.id} className="flex items-center border-b border-primary/20">
                            <Link href={`/shop/${shop.id}`} className="grow items-center">
                                <div className="p-2 ">
                                    <h2 className="text-lg font-bold">{shop.name}</h2>
                                    <p className="text-sm text-gray-600">{shop.cuisine}</p>
                                    <p className="text-sm">{shop.address.street}, {shop.address.city}</p>
                                </div>
                            </Link>
                            <StarButton />
                        </div>
                    ))
                }
            </div >
        </div >

    )
}