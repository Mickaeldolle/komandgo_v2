'use client'

import { ActionIcon, Indicator } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowLeft, IconBell, IconHome, IconShoppingCart, IconUser } from "@tabler/icons-react";
import classes from './mobile-nav-bar.module.css';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCustomerStore } from "@/providers/customer-store-provider";

export default function MobileNavBar() {
    const [visible, { toggle }] = useDisclosure();
    const pathName = usePathname();
    const [showCartButton, setShowCartButton] = useState(false);
    const selectedShop = useCustomerStore((state) => state.selectedShop);

    useEffect(() => {
        // Le boutton du panier s'affiche sur les pages d'un etablissement et pages des produits
        setShowCartButton(pathName.includes('shop/'));
        return () => {
            setShowCartButton(false);
        };
    }, [pathName]);

    const router = useRouter();

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50">
                <div className="bg-white flex items-center justify-between shadow-md p-2 rounded-b-2xl h-16">
                    <div className="flex items-center gap-5">

                        <ActionIcon
                            onClick={() => history.back()}
                            p={4}
                            size={40}
                            color="transparent"
                        >
                            <IconArrowLeft
                                className="text-contrast"
                                size={40}
                                stroke={1.5}
                            />
                        </ActionIcon>
                        <ActionIcon
                            onClick={() => router.push('/')}
                            p={4}
                            size={40}
                            color="transparent">
                            <IconHome
                                className="text-contrast"
                                size={40}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </div>

                    {/* <TextInput
                        size="md"
                        radius="xl"
                        placeholder="Rechercher"
                        rightSection={<IconSearch size={20} stroke={1} />}
                        className="w-full max-w-[200px] mx-4"
                    /> */}
                    <div className="flex items-center gap-1">
                        <ActionIcon
                            p={4}
                            size={40}
                            color="transparent"
                            onClick={toggle}
                        >
                            <Indicator
                                disabled={!visible}
                                processing
                                color="red"
                                size={7}
                                offset={4}
                            >
                                <IconBell
                                    className={`text-contrast ${visible && classes.notificationIcon}`}
                                    size="xl"
                                    stroke={1}
                                />
                            </Indicator>
                        </ActionIcon>

                        <ActionIcon
                            p={4}
                            size={40}
                            color="transparent"
                            onClick={() => router.push('/profile')}
                        >
                            <IconUser
                                className="text-contrast"
                                size="xl"
                                stroke={1}
                            />
                        </ActionIcon>

                        {showCartButton && (
                            <ActionIcon
                                p={4}
                                size={40}
                                color="transparent"
                                onClick={() => router.push(`/shop/${selectedShop?.slug}/cart`)}
                            >
                                <IconShoppingCart
                                    className="text-contrast"
                                    size="xl"
                                    stroke={1}
                                />
                            </ActionIcon>
                        )}
                    </div>
                </div>
            </div>
            {/* Spacer pour éviter que le contenu ne soit caché sous la navbar */}
            <div className="h-16" />
        </>
    );
}