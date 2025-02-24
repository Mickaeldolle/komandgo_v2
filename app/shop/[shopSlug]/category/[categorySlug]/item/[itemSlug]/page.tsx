import { Button, Checkbox, CheckIcon, Divider, Radio } from "@mantine/core";
import Image from "next/image";

export default async function ItemBoard({
    params,
}: {
    params: Promise<{ shopSlug: string, categorySlug: string, itemSlug: string }>
}) {


    const { shopSlug, categorySlug, itemSlug } = await params;
    const itemId = Number(itemSlug.split("-")[0]);
    const item = {
        id: 1, name: 'Montagnarde',
        slug: 'montagnarde',
        description: 'Delicieuse pizza montagnarde avec des ingrédients de qualité supérieure, parfait pour les amateurs de pizza traditionnelle.',
        image: "/img-1.jpg",
        allergens: ["lait", "moule", "gluten"],
        prices: [
            { id: 1, label: 'Seul', value: 10, processId: 1 },
            { id: 2, label: 'Menu', value: 15, processId: 2 }
        ],
        processes: [
            {
                id: 1,
                label: 'Taille',
                allowMultiple: false,
                items: [
                    { id: 1, label: 'Petit', value: 10, processId: 1, additionalPrice: 0 },
                    { id: 2, label: 'Moyen', value: 15, processId: 2, additionalPrice: 150 },
                    { id: 3, label: 'Grand', value: 20, processId: 3, additionalPrice: 200 }
                ]
            }
        ]
    }

    function returnPrice(price: number) {
        return price !== 0 ? `+ ${((price / 100).toFixed(2))} €` : "";
    }

    return (
        <div className="">
            <h1 className="text-2xl font-bold text-center text-primary font-blackOpsOne">{item.name}</h1>
            <div className="w-full max-h-[150px] overflow-hidden rounded-xl">
                <Image
                    src={item.image}
                    alt={item.name}
                    width={1000}
                    height={700}
                    className="w-full h-full rounded-xl brightness-90 shadow-xl"
                />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-inner border my-4">
                <p className="text-justify font-roboto text-sm">{item.description}</p>
            </div>
            <div className="">
                <div className="p-5 rounded-xl shadow-inner border bg-white space-y-2 mb-4">
                    {item.prices.map(price => (
                        <Radio icon={CheckIcon} name="price" key={price.id} value={price.label} label={`${price.label}: ${price.value.toFixed(2)} €`} />
                    ))}
                </div>
                <div className="p-5 rounded-xl shadow-inner border bg-white space-y-2 mb-4">
                    {item.processes.map(process => (
                        <div key={process.id}>
                            <h3 className="text-2xl font-bold text-base">{process.label}</h3>
                            {
                                process.items.map(item => (
                                    <div className="flex gap-2 items-center" key={item.id}>
                                        <Radio id={item.label} icon={CheckIcon} name="process" value={item.label} />
                                        <label htmlFor={item.label} className="" key={item.id}>{`${item.label} `}
                                            <small className="text-sm font-medium">
                                                {returnPrice(item.additionalPrice)}
                                            </small>
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                    }
                </div>
            </div>

        </div>
    )
}