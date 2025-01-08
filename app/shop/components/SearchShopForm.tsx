import { Button, TextInput, Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function SearchShopForm() {
    return (
        <div>
            <form action="">
                <Group align="flex-end" gap="md">
                    <TextInput
                        size="lg"
                        // label="Recherchez un lieu"
                        aria-label="Recherchez un lieu"
                        classNames={{
                            root: 'flex-1',
                        }}
                    />
                    <Button size="lg" color="primary" type="submit"><IconSearch /></Button>
                </Group>
            </form>
        </div>
    )
}