import { Shop } from "@/@types/shop";
import { IconCheck } from "@tabler/icons-react";
import { Divider } from "@mantine/core";
import ShopHours from "./ShopHours";
import ShopActionButton from "@/app/components/ui/ShopActionButton/ShopActionButton";
import StarButton from "@/app/components/ui/StarButton/StarButton";
import Image from "next/image";
import image from '@/public/img-1.jpg';
import ShopData from "./ShopData";
import shops from "@/db/shops";


export default async function ShopPage({
    params,
}: {
    params: Promise<{ shopSlug: string }>
}) {

    const { shopSlug } = await params;
    const shopId = Number(shopSlug.split("-")[0])
    const shop: Shop | undefined = shops.find(shop => shop.id === shopId)

    return (
        <div className="relative font-roboto">
            {shop &&
                <>
                    <section>
                        <div className="flex justify-center gap-5 items-center">
                            <h1 className="text-2xl font-bold text-center text-primary font-blackOpsOne">{shop.name}</h1>
                            <StarButton />
                        </div>
                        <Divider className="my-3" />
                        {/* Remplacer le "image" par l'url de l'image du shop */}
                        <Image className="rounded-xl shadow-xl h-[100px] object-cover mb-3" src={image} alt={shop.name} />
                    </section>
                    <section className="border border-primary rounded-xl overflow-hidden mb-3">
                        <ShopData shop={shop} />
                    </section>
                    <section className="border border-primary rounded-xl overflow-hidden mb-3">
                        <ShopHours shop={shop} />
                    </section>
                    <Divider className="my-3" />
                    <section>
                        <ul className="grid grid-cols-2 gap-x-1 ">
                            {shop.features.map((feature) => (
                                <li key={feature} className="text-sm flex items-center border p-2 rounded-xl shadow-xl gap-2"><IconCheck color="green" />{feature}</li>
                            ))}
                        </ul>
                    </section>
                    <div className="fixed bottom-10 right-10">
                        <ShopActionButton shop={shop} />
                    </div>
                </>
            }
        </div>
    );
}
