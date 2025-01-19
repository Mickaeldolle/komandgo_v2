'use client' // Error boundaries must be Client Components

import { Button } from '@mantine/core'

export default function Error() {


    return (
        <div>
            <h2>Something went wrong!</h2>
            <Button
            >
                Try again
            </Button>
        </div>
    )
}