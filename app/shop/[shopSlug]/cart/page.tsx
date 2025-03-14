
'use client'

import { ActionIcon, Button, Collapse } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconChevronDown, IconChevronUp, IconSettings } from "@tabler/icons-react"


export default function CartPage() {
    const cart = {
        id: 1,
        items: [
            {
                id: 1,
                name: 'Test',
                price: 10,
                quantity: 1,
            }
        ],
        total: 0,
        createdAt: new Date().toISOString(),
    }
    return (
        <div className="p-2 font-roboto">
            {!cart ? (
                <>
                    <h2 className="my-5">Panier vide...</h2>
                    <Button onClick={() => history.back()}>Retour</Button>
                </>
            ) : (
                <>
                    <div className="border bg-white rounded-lg shadow-md p-4 mb-5">
                        <div className="flex justify-between">
                            <h2 className="font-bold text-lg mb-3 font-blackOpsOne">Option de commande</h2>
                            <ActionIcon><IconSettings /></ActionIcon>
                        </div>
                        <p>Bistro Parisien</p>
                        <p>Livraison</p>
                        <p>8 rue de la paix, 75000 Paris</p>
                    </div>
                    <CartContent />

                    <div className="border bg-white rounded-lg shadow-md p-4 mb-5">
                        <h2 className="font-bold text-lg mb-3 font-blackOpsOne">Paiement</h2>
                        <div className="">
                            <div className="grid grid-cols-2 ">
                                <h2 className="font-roboto text-md">Sous total</h2>
                                <p className="font-roboto text-end">{cart.total.toFixed(2)} €</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <h2 className="font-roboto text-md">Livraison</h2>
                                <p className="font-roboto text-end">{cart.total.toFixed(2)} €</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <h2 className="font-bold font-roboto text-lg">Total à payer</h2>
                                <p className="font-roboto font-medium text-end text-lg">{cart.total.toFixed(2)} €</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}




function CartContent() {

    //todo : revoir le type de l'item et la structure de donnée
    const cartData = [
        {
            id: 1,
            name: 'Kebab',
            price: 9.90,
            quantity: 1,
            menu: true,
            steps: [
                {
                    id: 1,
                    name: 'Taille',
                    items: [
                        {
                            id: 1,
                            name: 'Large',
                            additionalPrice: 150
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Crudités',
                    items: [
                        {
                            id: 1,
                            name: 'Salade',
                            additionalPrice: 0
                        },
                        {
                            id: 2,
                            name: 'Tomate',
                            additionalPrice: 0
                        },
                        {
                            id: 3,
                            name: 'Oignon',
                            additionalPrice: 0
                        }
                    ],
                },
                {
                    id: 3,
                    name: 'Garnitures',
                    items: [
                        {
                            id: 1,
                            name: 'Tenders',
                            additionalPrice: 0
                        },
                        {
                            id: 2,
                            name: 'Kebab',
                            additionalPrice: 0
                        },
                    ],
                },
                {
                    id: 4,
                    name: 'Sauce',
                    items: [
                        {
                            id: 1,
                            name: 'Ketchup',
                            additionalPrice: 0
                        },
                        {
                            id: 2,
                            name: 'Mayonnaise',
                            additionalPrice: 0
                        },
                    ],
                },
                {
                    id: 5,
                    name: 'Sauce fromagère',
                    selected: true,
                }
            ]
        },
        {
            id: 200,
            name: 'Kebab',
            price: 9.90,
            quantity: 1,
            menu: true,
            steps: [
                {
                    id: 1,
                    name: 'Taille',
                    items: [
                        {
                            id: 1,
                            name: 'Large',
                            additionalPrice: 150
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Crudités',
                    items: [
                        {
                            id: 1,
                            name: 'Salade',
                            additionalPrice: 0
                        },
                        {
                            id: 2,
                            name: 'Tomate',
                            additionalPrice: 0
                        },
                        {
                            id: 3,
                            name: 'Oignon',
                            additionalPrice: 0
                        }
                    ],
                },
                {
                    id: 3,
                    name: 'Garnitures',
                    items: [
                        {
                            id: 1,
                            name: 'Tenders',
                            additionalPrice: 0
                        },
                        {
                            id: 2,
                            name: 'Kebab',
                            additionalPrice: 0
                        },
                    ],
                },
                {
                    id: 4,
                    name: 'Sauce',
                    items: [
                        {
                            id: 1,
                            name: 'Ketchup',
                            additionalPrice: 0
                        },
                        {
                            id: 2,
                            name: 'Mayonnaise',
                            additionalPrice: 0
                        },
                    ],
                },
                {
                    id: 5,
                    name: 'Sauce fromagère',
                    selected: true,
                }
            ]
        }
    ]

    return (
        <div className="bg-white shadow-md rounded-lg w-full p-4 mb-5">
            <h2 className="font-bold mb-3 text-lg font-blackOpsOne">Articles</h2>
            <div className="grid grid-cols-4 font-roboto font-medium mb-3">
                <p className="text-start text-lg">Nom</p>
                <p className="text-end text-lg">Prix</p>
                <p className="text-end text-lg">Quantité</p>
                <div className="text-end"></div>
            </div>
            {cartData.map(item => (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
    )
}





function CartItem({ item }: { item: TCartItem }) {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <div className="grid grid-cols-4 mb-3">
            <p>{item.name}</p>
            <p className="text-end">{item.price.toFixed(2)} €</p>
            <p className="text-end">{item.quantity}</p>
            <div className="text-end">
                {item.steps && item.steps.length > 0 &&
                    <ActionIcon onClick={toggle}>
                        {opened ? <IconChevronUp /> : <IconChevronDown />}
                    </ActionIcon>
                }
            </div>
            <Collapse in={opened} className="">
                {item.steps && item.steps.map((step: TStep) => (
                    <div className="" key={step.id}>
                        <p className="font-bold" key={step.id}>{step.name}</p>
                        {step.items && step.items?.length > 0 && step.items.map(item => (
                            <p key={item.id}>{item.name}</p>
                        ))}
                    </div>
                ))}
            </Collapse>
        </div>
    )
}