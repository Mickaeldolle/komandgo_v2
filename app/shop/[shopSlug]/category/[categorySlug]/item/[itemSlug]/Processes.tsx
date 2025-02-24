'use client';

import { Checkbox, CheckIcon, Radio, Button, ActionIcon } from "@mantine/core";
import { IconMinus, IconPlus, IconShoppingCartPlus } from "@tabler/icons-react";
import { Item } from "@/@types/item";
import { useRouter } from "next/navigation";

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
    const process = {
        id: 1,
        label: 'pizza',
        steps: [
            {
                id: 1,
                label: 'Taille',
                required: true,
                min_choice: 1,
                max_choice: 1,
                items: [
                    { id: 1, label: 'Petit', value: 10, processId: 1, additionalPrice: 0, menuAdditionalPrice: 0 },
                    { id: 2, label: 'Moyen', value: 15, processId: 2, additionalPrice: 150, menuAdditionalPrice: 150 },
                    { id: 3, label: 'Grand', value: 20, processId: 3, additionalPrice: 200, menuAdditionalPrice: 200 }
                ]
            },
            {
                id: 2,
                label: 'Suppléments',
                min_choice: 0,
                max_choice: null,
                items: [
                    { id: 1, label: 'Champignons', value: 10, processId: 1, additionalPrice: 100, menuAdditionalPrice: 100 },
                    { id: 2, label: 'Olives', value: 15, processId: 2, additionalPrice: 100, menuAdditionalPrice: 100 },
                    { id: 3, label: 'Jambon', value: 20, processId: 3, additionalPrice: 100, menuAdditionalPrice: 100 },
                    { id: 4, label: 'Fromage', value: 25, processId: 4, additionalPrice: 100, menuAdditionalPrice: 100 }
                ]
            },
            {
                id: 3,
                label: 'Boissons',
                min_choice: 1,
                max_choice: 1,
                items: [
                    { id: 1, label: 'Eau', value: 10, processId: 1, additionalPrice: 100, menuAdditionalPrice: 0 },
                    { id: 2, label: 'Coca-Cola', value: 15, processId: 2, additionalPrice: 100, menuAdditionalPrice: 0 },
                    { id: 3, label: 'Fanta', value: 20, processId: 3, additionalPrice: 100, menuAdditionalPrice: 0 },
                    { id: 4, label: 'Orangina', value: 25, processId: 4, additionalPrice: 100, menuAdditionalPrice: 0 },
                    { id: 5, label: 'Ice-Tea', value: 30, processId: 5, additionalPrice: 100, menuAdditionalPrice: 0 },
                    { id: 6, label: 'Limonade', value: 35, processId: 6, additionalPrice: 100, menuAdditionalPrice: 0 }
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
                    {
                        step.items.map(item => (
                            <div className="flex gap-2 items-center" key={item.id}>
                                {step.max_choice === null ? (
                                    <Checkbox id={item.label} icon={CheckIcon} name="process" value={item.label} />

                                ) : (
                                    <Radio id={item.label} icon={CheckIcon} name="process" value={item.label} />

                                )}
                                <label className="flex justify-between w-full" htmlFor={item.label} key={item.id}>
                                    {`${item.label} `}
                                    <small className="text-sm font-medium">
                                        {returnPrice(item.menuAdditionalPrice)}
                                    </small>
                                </label>
                            </div>
                        ))
                    }
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