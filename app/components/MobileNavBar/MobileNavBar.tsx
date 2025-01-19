'use client'

import { ActionIcon, Indicator, TextInput, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowLeft, IconBell, IconSearch, IconUser } from "@tabler/icons-react";
import classes from './mobile-nav-bar.module.css'


export default function MobileNavBar() {
    const [visible, { toggle }] = useDisclosure();


    return (
        <div className="min-h-16 bg-background">
            {/* Il faudra fetch les notifications pour afficher l'indicator  */}
            <div className="bg-white flex items-center justify-between mb-5 z-50 fixed  w-full shadow p-2 rounded-b-2xl">
                <ActionIcon onClick={() => history.back()} p={4} size={40} color="transparent" >
                    <IconArrowLeft className="text-contrast" size={40} stroke={1.5} />
                </ActionIcon>
                <TextInput radius="xl" placeholder="Rechercher" className="" rightSection={<IconSearch size={20} stroke={1} />} />
                <div className="items-center flex">

                    <ActionIcon p={4} size={40} color="transparent" onClick={toggle}>
                        <Indicator disabled={!visible} processing color="red" size={7} offset={4}>
                            {/* Remplacer le visible par une logique plus approprié (Voir si il y a des notifications) */}
                            <IconBell className={`text-contrast ${visible && classes.notificationIcon}`} size={25} stroke={1} />
                        </Indicator>
                    </ActionIcon>
                    <ActionIcon p={4} size={40} color="transparent" >
                        <IconUser className="text-contrast" size={30} stroke={1} />
                    </ActionIcon>
                </div>
            </div>
        </div>
    );
}   