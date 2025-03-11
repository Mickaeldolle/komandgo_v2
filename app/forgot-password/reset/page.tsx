"use client"

import { Button, PasswordInput } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function ResetPassword() {

    const router = useRouter();

    return (
        <div className="font-roboto flex flex-col items-center  w-full min-h-dvh">

            <div className="w-5/6 border m-auto bg-background shadow-md p-5 px-10 rounded-xl">
                <h1 className="font-bold mb-5 text-center uppercase">Modifier votre mot de passe</h1>
                <form action="">
                    <PasswordInput
                        label="Nouveau mot de passe"
                        type="password"
                        required
                        mb={"lg"}
                    // size="lg"
                    />

                    <PasswordInput
                        label="Confirmation du mot de passe"
                        type="password"
                        required
                        mb={"lg"}
                    // size="lg"
                    />

                    <div className="flex justify-end">
                        <Button type="submit" onClick={() => { router.push('/login'); }}>Valider</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}