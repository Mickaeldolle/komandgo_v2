import { Loader } from '@mantine/core';

export default function Loading() {
    return (
        <Loader size={'xl'} className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]' />
    );
}