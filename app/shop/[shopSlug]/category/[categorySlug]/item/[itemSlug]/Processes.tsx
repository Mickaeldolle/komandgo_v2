'use client';

import { Checkbox, CheckIcon, Radio, Button, ActionIcon } from "@mantine/core";
import { IconMinus, IconPlus, IconShoppingCartPlus } from "@tabler/icons-react";
import { Item, Process } from "@/@types/item";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Processes({
    item,
    urlParams
}:
    {
        item: Item,
        urlParams: {
            shopSlug: string,
            categorySlug: string,
            itemSlug: string
        }
    }
) {

    const router = useRouter()
    const redirectToCategoryPage = () => {
        router.push(`/shop/${urlParams.shopSlug}/category/${urlParams.categorySlug}`)
    }

    // En fonction du prix choisi (menu ou seul), faire un appel api pour mettre a jour le process
    // Voir pour le typage du prix


    const process: Process = {
        id: 1,
        label: 'pizza',
        steps: [
            {
                id: 1,
                label: 'Taille',
                min_choice: 1,
                max_choice: 1,
                items: [
                    { id: 1, name: 'Petit', imageUrl: "/orangina.png", prices: [{ id: 1, label: 'Petit', value: 10, processId: 1 }], slug: 'petit', description: 'Petit', allergens: [] },
                    { id: 2, name: 'Moyen', imageUrl: "/orangina.png", prices: [{ id: 2, label: 'Moyen', value: 15, processId: 2 }], slug: 'moyen', description: 'Moyen', allergens: [] },
                    { id: 3, name: 'Grand', imageUrl: "/orangina.png", prices: [{ id: 3, label: 'Grand', value: 20, processId: 3 }], slug: 'grand', description: 'Grand', allergens: [] }
                ]
            },
            {
                id: 2,
                label: 'Suppléments',
                min_choice: 0,
                max_choice: null,
                items: [
                    { id: 1, name: 'Champignons', imageUrl: "/orangina.png", prices: [{ id: 1, label: 'Champignons', value: 10, processId: 1 }], slug: 'champignons', description: 'Champignons', allergens: [] },
                    { id: 2, name: 'Olives', imageUrl: "/orangina.png", prices: [{ id: 2, label: 'Olives', value: 15, processId: 2 }], slug: 'olives', description: 'Olives', allergens: [] },
                    { id: 3, name: 'Jambon', imageUrl: "/orangina.png", prices: [{ id: 3, label: 'Jambon', value: 20, processId: 3 }], slug: 'jambon', description: 'Jambon', allergens: [] },
                    { id: 4, name: 'Fromage', imageUrl: "/orangina.png", prices: [{ id: 4, label: 'Fromage', value: 25, processId: 4 }], slug: 'fromage', description: 'Fromage', allergens: [] }
                ]
            },
            {
                id: 3,
                label: 'Boissons',
                min_choice: 1,
                max_choice: 1,
                items: [
                    { id: 1, name: 'Eau', imageUrl: "/orangina.png", prices: [{ id: 1, label: 'Eau', value: 10, processId: 1 }], slug: 'eau', description: 'Eau', allergens: [] },
                    { id: 2, name: 'Coca-Cola', imageUrl: "/orangina.png", prices: [{ id: 2, label: 'Coca-Cola', value: 15, processId: 2 }], slug: 'coca-cola', description: 'Coca-Cola', allergens: [] },
                    { id: 3, name: 'Fanta', imageUrl: "/orangina.png", prices: [{ id: 3, label: 'Fanta', value: 20, processId: 3 }], slug: 'fanta', description: 'Fanta', allergens: [] },
                    { id: 4, name: 'Orangina', imageUrl: "/orangina.png", prices: [{ id: 4, label: 'Orangina', value: 25, processId: 4 }], slug: 'orangina', description: 'Orangina', allergens: [] },
                    { id: 5, name: 'Ice-Tea', imageUrl: "/orangina.png", prices: [{ id: 5, label: 'Ice-Tea', value: 30, processId: 5 }], slug: 'ice-tea', description: 'Ice-Tea', allergens: [] },
                    { id: 6, name: 'Limonade', imageUrl: "/orangina.png", prices: [{ id: 6, label: 'Limonade', value: 35, processId: 6 }], slug: 'limonade', description: 'Limonade', allergens: [] }
                ]
            }
        ]
    }


    function returnPrice(price: number) {
        return price !== 0 ? `+ ${((price / 100).toFixed(2))} €` : "";
    }

    return (
        <>
            <div className="p-5 rounded-xl shadow-inner border bg-white space-y-2 mb-4">
                {item.prices.map(price => (
                    <div key={price.id} className="flex gap-2 items-center">
                        <Radio id={price.label} className="" icon={CheckIcon} name="price" key={price.id} value={price.label} />
                        <label htmlFor={price.label} className="flex justify-between w-full px-2" >
                            <span>{price.label}</span>
                            <span className="text-sm font-medium">{price.value.toFixed(2)} €</span>
                        </label>
                    </div>
                ))}
            </div>
            {process && process.steps.map(step => (
                <div className="rounded-xl mb-4 p-5 space-y-2 shadow-inner border bg-white" key={step.id} >
                    <h3 className="text-2xl font-bold text-base">{step.label}</h3>
                    <div className="grid grid-cols-3 gap-y-8 gap-x-2">
                        {
                            step.items.map(item => (
                                <div className="" key={item.id}>
                                    {step.max_choice === null ? (
                                        <Checkbox id={item.name} icon={CheckIcon} className="" name="process" value={item.name} />

                                    ) : (

                                        <Radio id={item.name} icon={CheckIcon} className="" name="process" value={item.name} />

                                    )}
                                    <label className="flex flex-col items-center justify-center" htmlFor={item.name} key={item.id}>
                                        <Image width={60} height={60} src={item.imageUrl} alt={item.name} />

                                        {`${item.name} `}
                                        <small className="text-sm font-medium">
                                            {returnPrice(item.prices[0].value)}
                                        </small>
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))
            }
            <div className="rounded-xl mb-4 p-5 space-y-2 shadow-inner border bg-white flex items-center justify-between">
                <span className="text-2xl font-bold text-base">Quantité</span>
                <div className="flex items-center">
                    <ActionIcon size="md" radius="" color="blue" variant="filled">
                        <IconMinus />
                    </ActionIcon>
                    <span className="mx-4">1</span>
                    <ActionIcon size="md" radius="" color="blue" variant="filled">
                        <IconPlus />
                    </ActionIcon>
                </div>
            </div>
            <Button onClick={redirectToCategoryPage} className="" fullWidth size="lg" my={'xl'}>
                <span className="font-roboto uppercase flex gap-2 items-center justify-center">Ajouter <IconShoppingCartPlus /></span>
            </Button>
        </>
    )
}
