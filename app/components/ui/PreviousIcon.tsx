'use client'

import { UnstyledButton } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";


export default function PreviousIcon() {
    return (
        <UnstyledButton className="" onClick={() => history.back()}><IconArrowLeft size={35} stroke={1.5} /></UnstyledButton>
    );
}   