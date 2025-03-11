import { Category } from "@/@types/category";
import { Indicator, Divider } from "@mantine/core";
import Link from "next/link";
import OrderParamsConfig from "../OrderParamsConfig";

export default async function Page(
    {
        params,
    }: {
        params: Promise<{ shopSlug: string, categorySlug: string }>
    }
) {


    // il faudra faire une requête à     la base de données pour récupérer les catégories avec tous les items associés
    const categories: Category[] = [
        { id: 1, name: "Pizza", imageUrl: "/img-1.jpg", slug: "pizza" },
        { id: 2, name: "Burger", imageUrl: "/img-1.jpg", slug: "burger" },
        { id: 3, name: "Pasta", imageUrl: "/img-1.jpg", slug: "pasta" },
    ]


    const { shopSlug, categorySlug } = await params;
    const categoryId = Number(categorySlug.split("-")[0]);
    const selectedCategory = categories.find(category => category.id === categoryId);

    const items = [
        {
            id: 1, name: 'Montagnarde', slug: 'montagnarde', description: 'Description de la pizza montagnarde', image: "/img-1.jpg", prices: [
                { id: 1, name: 'Seul', value: 10 },
                { id: 2, name: 'Menu', value: 15 }
            ]
        },
        {
            id: 2, name: 'Savoyarde', slug: 'savoyarde', description: 'Description de la pizza montagnarde', image: "/img-1.jpg", prices: [
                { id: 1, name: 'Seul', value: 10 },
                { id: 2, name: 'Menu', value: 15 }
            ]
        },
        {
            id: 3, name: 'Champignons', slug: 'champignons', description: 'Description de la pizza montagnarde', image: "/img-1.jpg", prices: [
                { id: 1, name: 'Seul', value: 10 },
                { id: 2, name: 'Menu', value: 15 }
            ]
        },
        {
            id: 4, name: 'Reine', slug: 'reine', description: 'Description de la pizza montagnarde', image: "/img-1.jpg", prices: [
                { id: 1, name: 'Seul', value: 10 },
                { id: 2, name: 'Menu', value: 15 }
            ]
        }
    ]
    return (
        <div>
            <div className="py-2 rounded-b-xl shadow-sm flex justify-around items-center mb-2 bg-background">
                <Indicator color="green" className="z-10"><span className="font-bold">Ouvert</span></Indicator>
                <Divider orientation="vertical" />
                <OrderParamsConfig />
            </div>
            <h1 className="text-2xl font-bold text-primary font-blackOpsOne">{selectedCategory?.name}</h1>
            <div className="grid grid-cols-1 gap-x-2">
                {items.map(item => (
                    <Link
                        href={`/shop/${shopSlug}/category/${categorySlug}/item/${item.id}-${item.slug}`}
                        key={item.id}
                        className="relative rounded-xl shadow-xl h-[100px] mb-3 relative overflow-hidden w-2/7 group cursor-pointer"
                    >
                        {/* Image de fond avec effet zoom */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-200 ease-in-out group-hover:scale-110"
                            style={{ backgroundImage: `url(${item.image})` }}
                        />
                        {/* Contenu avec un fond semi-transparent */}
                        <div className="relative z-50 p-4 bg-black/50 text-white h-full">
                            <h2 className="text-lg font-semibold">{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}