"use client";

import { IconAdjustmentsAlt, IconMapPin, IconSearch } from "@tabler/icons-react";
import { Button, Checkbox, Text, Modal, MultiSelect, Slider, TextInput, Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import StarButton from "../components/ui/StarButton/StarButton";
import Link from "next/link";
import type { Shop } from "@/@types/shop";
import shops from "@/db/shops";


// Liste des shops
// Composant Shop
export default function Shop() {

    const [showSearchShopModal, setShowSearchShopModal] = useState(false);
    const [toggleFilter, setToggleFilter] = useState(false);

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
            < div className="bg-background rounded-xl" >
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
                            <Link href={`/shop/${shop.id}-${shop.slug}`} className="grow items-center">
                                <div className="p-2 ">
                                    <h2 className="text-lg font-bold">{shop.name}</h2>
                                    <p className="text-sm text-gray-600">{shop.cuisine.join(', ')}</p>
                                    <p className="text-sm">{shop.address.label}</p>
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