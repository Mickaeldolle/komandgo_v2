import { IconDotsCircleHorizontal, IconMapPin, IconPhone, IconToolsKitchen2, IconWorldWww } from "@tabler/icons-react";
import { Shop } from "@/@types/shop";
import Link from "next/link";


export default function ShopData({ shop }: { shop: Shop }) {
    return (
        <>
            <div className="w-full font-roboto">
                <p className="bg-primary flex gap-5 p-2 items-center text-white font-medium">
                    <IconDotsCircleHorizontal color="white" />
                    Informations
                </p>
            </div>
            <div >
                <div className="flex flex-col p-3 gap-y-3">
                    {shop.address?.label && <span className="flex gap-3"><IconMapPin /><p>{shop.address.label}</p></span>}
                    {shop.phone && <span className="flex gap-3"><IconPhone /><p>{shop.phone}</p></span>}
                    {shop.website && <span className="flex gap-3"><IconWorldWww /><Link href={shop.website} className="text-blue-800 active:text-blue-600">{shop.website}</Link></span>}
                    {shop.cuisine && <span className="flex gap-3"><IconToolsKitchen2 /><p >Cuisine : {shop.cuisine.join(', ')}</p></span>}
                </div>
            </div >
        </>
    )

}