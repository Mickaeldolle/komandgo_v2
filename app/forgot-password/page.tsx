"use client"

import { Button, Modal, PinInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const [opened, { open, close }] = useDisclosure(false);
    const [pinValue, setPinValue] = useState<string>('')
    const router = useRouter();
    return (
        <div className="font-roboto flex flex-col items-center w-full min-h-dvh">
            {opened ?
                <Modal opened={opened} onClose={close} centered={true}>
                    <p className="font-bold mb-5 text-center uppercase">Renseignez votre code de vérification</p>
                    {/* <small>Un code de vérification vous a été envoyé par email, verifiez votre boite de réception et votre boite de spam</small> */}
                    <div className="flex justify-center mb-5">
                        <PinInput value={pinValue} autoFocus={true} className="" length={5} size="xl" onChange={(value) => setPinValue(value.toUpperCase())} />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" onClick={() => router.push('/forgot-password/reset')}>Valider</Button>
                    </div>
                </Modal>
                :
                <div className="w-5/6 m-auto bg-background border shadow-md p-5 px-10 rounded-xl">
                    <h1 className="font-bold mb-5 text-center uppercase">Recupération du mot de passe</h1>
                    <form action="">
                        <TextInput
                            label="Email"
                            type="email"
                            required
                            mb={"lg"}
                        // size="lg"
                        />

                        <div className="flex justify-end">
                            <Button type="submit" onClick={open}>Recevoir un code de vérification</Button>
                        </div>
                    </form>
                </div>

            }
        </div>
    )
}