import { Divider } from "@mantine/core";
import Image from "next/image";
import Processes from "./Processes";

export default async function ItemBoard(
    {
        params,
    }: {
        params: Promise<{ shopSlug: string, categorySlug: string, itemSlug: string }>
    }
) {


    const { shopSlug, categorySlug, itemSlug } = await params;
    const urlParams = { shopSlug, categorySlug, itemSlug }


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
    }

    return (
        <div className="font-roboto">
            <h1 className="text-2xl font-bold text-center text-primary font-blackOpsOne">{item.name}</h1>
            <div className="w-full max-h-[150px] overflow-hidden rounded-xl" >
                <Image
                    src={item.image}
                    alt={item.name}
                    width={1000}
                    height={700}
                    className="w-full h-full rounded-xl brightness-90 shadow-xl"
                />
            </div >
            <div className=" p-2 my-2">
                <p className="text-justify text-md">{item.description}</p>
            </div>
            <Processes item={item} urlParams={urlParams} />
            <Divider />
        </div >
    )
}