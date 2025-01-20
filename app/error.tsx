'use client' // Error boundaries must be Client Components

import { Button } from '@mantine/core'
import MobileNavBar from './components/MobileNavBar/MobileNavBar'

export default function Error({
    error,
    reset,
}:
    {
        error: Error & { digest?: string }
        reset: () => void
    }) {


    return (
        <div className='flex flex-col p-2 h-dvh'>
            <MobileNavBar />
            <div className='flex-grow flex flex-col justify-center items-center text-center'>
                <p className='font-medium text-xl'>Oups... une erreur s&apos;est produite.</p>
                {/* {error.digest && <p>{error.digest}</p>} */}
                {/* {error.name && <p>{error.name}</p>} */}
                {/* {error.stack && <p>{error.stack}</p>} */}
                {error.message && <p className='mb-5'>{error.message}</p>}
                <Button
                    onClick={reset}
                >
                    Reesayer
                </Button>
            </div>
        </div>
    )
}