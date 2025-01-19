'use client'

import { UnstyledButton, Collapse } from "@mantine/core";
import { IconClockCheck, IconSelector } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Shop } from "@/@types/shop";


export default function ShopHours({ shop }: { shop: Shop }) {
    const [opened, { toggle }] = useDisclosure(true);
    const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    // Formatter pour afficher les heures en format lisible
    const formatTime = (isoString: string) =>
        new Intl.DateTimeFormat("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(isoString));

    // Grouper les horaires par jour
    const hoursByDay = shop.hours.reduce((acc, hour) => {
        if (!acc[hour.day]) acc[hour.day] = [];
        acc[hour.day].push(hour);
        return acc;
    }, {} as Record<number, typeof shop.hours>);

    return (
        <>
            <UnstyledButton className="w-full" onClick={toggle}>
                <p className="bg-primary flex gap-5 font-roboto p-2 items-center text-white font-medium">
                    <IconClockCheck color="white" />
                    Horaires
                    <IconSelector className="ml-auto" color="white" />
                </p>
            </UnstyledButton>
            <Collapse in={opened}>
                <div className="p-3">
                    {Object.entries(hoursByDay).map(([day, hours]) => (
                        <div key={day} className="grid grid-cols-2 mb-2 text-sm">
                            <p className="font-medium">{daysOfWeek[parseInt(day)]}</p>
                            <ul className="ml-4  ">
                                {hours.map((hour) => (
                                    <li key={hour.id} className="text-end">
                                        {formatTime(hour.open)} - {formatTime(hour.close)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Collapse>
        </>
    )

}