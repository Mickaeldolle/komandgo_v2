"use client";

import { type FC } from "react";
import { useCallback, useTransition } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ActionIcon, Button, Loader, Modal, Select } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

type OrderMode = 'delivery' | 'click_and_collect' | 'table_service';

interface OrderModeOption {
    value: OrderMode;
    label: string;
}

const ORDER_MODES: OrderModeOption[] = [
    { value: 'delivery', label: 'Livraison' },
    { value: 'click_and_collect', label: 'Click & Collect' },
    { value: 'table_service', label: 'Sur place' }
];

const OrderParamsConfig: FC = () => {
    // Hooks for modal state
    const [opened, { open, close }] = useDisclosure(false);

    // URL handling hooks
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    // State transition handling
    const [isPending, startTransition] = useTransition();

    // URL update handler with proper type safety
    const updateURL = useCallback((mode: OrderMode) => {
        const params = new URLSearchParams(searchParams);
        params.set('mode', mode);
        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`);
        });
    }, [searchParams, pathname, router]);

    // Form submission handler
    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const mode = formData.get('mode') as OrderMode;

        if (mode) {
            updateURL(mode);
            setTimeout(close, 500);
        }
    }, [updateURL, close]);

    const currentMode = searchParams.get('mode') as OrderMode || '';

    return (
        <>
            <ActionIcon
                variant="outline"
                onClick={open}
                aria-label="Paramètres de commande"
            >
                <IconSettings stroke={1} />
            </ActionIcon>

            <Modal
                opened={opened}
                onClose={close}
                title="Paramètres de la commande"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border rounded-lg shadow-xl p-4">
                        <fieldset className="space-y-2">
                            <legend className="text-sm font-medium">
                                Mode de commande
                            </legend>
                            <div className="flex items-center gap-2">
                                <Select
                                    name="mode"
                                    defaultValue={currentMode}
                                    data={ORDER_MODES}
                                    className="flex-1"
                                    required
                                />
                            </div>
                        </fieldset>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            loading={isPending}
                            disabled={isPending}
                        >
                            {isPending ? <Loader type="dots" /> : "Valider"}
                        </Button>
                    </div>
                </form>

            </Modal>
        </>
    );
};

export default OrderParamsConfig;