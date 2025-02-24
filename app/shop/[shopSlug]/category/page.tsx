import { Divider, Indicator } from "@mantine/core";
import OrderParamsConfig from "./OrderParamsConfig";
import Link from "next/link";

export default async function MenuBoard({
    params,
}: {
    params: Promise<{ shopSlug: string }>
}) {

    const { shopSlug } = await params;

    const announcements = [
        { id: 1, title: "Promotion 1", description: "Description de la promotion 1", image: "/img-1.jpg" },
        { id: 2, title: "Promotion 1", description: "Description de la promotion 1", image: "/img-1.jpg" },
    ]

    // Il faudra faire une requête à la base de données pour récupérer les catégories
    const categories = [
        { id: 1, name: "Pizza", imageUrl: "/img-1.jpg", slug: "pizza" },
        { id: 2, name: "Burger", imageUrl: "/img-1.jpg", slug: "burger" },
        { id: 3, name: "Pasta", imageUrl: "/img-1.jpg", slug: "pasta" },
        // { id: 4, name: "Steak", image: "/img-1.jpg" },
        // { id: 5, name: "Sushi", image: "/img-1.jpg" },
        // { id: 6, name: "Poulet", image: "/img-1.jpg" },
        // { id: 7, name: "Riz", image: "/img-1.jpg" },
        // { id: 8, name: "Soupe", image: "/img-1.jpg" },
        // { id: 9, name: "Salade", image: "/img-1.jpg" },
        // { id: 10, name: "Dessert", image: "/img-1.jpg" },
        // { id: 11, name: "Dessert", image: "/img-1.jpg" },
    ]

    return (
        <div className="font-roboto">
            <div className="py-2 rounded-b-xl shadow-sm flex justify-around items-center mb-2 bg-background">
                <Indicator color="green" className="z-10"><span className="font-bold">Ouvert</span></Indicator>
                <Divider orientation="vertical" />
                <OrderParamsConfig />
            </div>
            {/* <Divider className="my-3" /> */}
            {announcements.length > 0 &&
                <section>
                    <h2 className="text-xl font-bold text-primary mb-2 font-roboto">Nos offres</h2>
                    <div className="flex gap-x-2 overflow-x-scroll">
                        {announcements.map((announcement) => (
                            <div
                                key={announcement.id}
                                className="min-w-[250px] rounded-xl shadow-xl h-[100px] mb-3 relative overflow-hidden group cursor-pointer"
                            >
                                {/* Image de fond avec effet zoom */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-200 ease-in-out group-hover:scale-110"
                                    style={{ backgroundImage: `url(${announcement.image})` }}
                                />
                                {/* Contenu avec un fond semi-transparent */}
                                <div className="relative z-10 p-4 bg-black/50 text-white h-full">
                                    <h2 className="text-lg font-semibold">{announcement.title}</h2>
                                    <p className="text-sm">{announcement.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            }
            {categories.length > 0 &&
                <section>
                    <h2 className="text-xl font-bold text-primary mb-2 font-roboto">Categories</h2>
                    <div className="grid grid-cols-2 gap-x-2">
                        {categories.map((category) => (
                            <Link
                                href={`/shop/${shopSlug}/category/${category.id}-${category.slug}`}
                                key={category.id}
                                className="relative rounded-xl shadow-xl h-[100px] mb-3 relative overflow-hidden w-2/7 group cursor-pointer"
                            >
                                {/* Image de fond avec effet zoom */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-200 ease-in-out group-hover:scale-110"
                                    style={{ backgroundImage: `url(${category.imageUrl})` }}
                                />
                                {/* Contenu avec un fond semi-transparent */}
                                <div className="relative z-50 p-4 bg-black/50 text-white h-full">
                                    <h2 className="text-lg font-semibold">{category.name}</h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            }
            {/* <section>
                <FooterMenu />
            </section> */}
        </div>
    );
}