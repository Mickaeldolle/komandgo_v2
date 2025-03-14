import { redirect } from "next/navigation";

export default function ProfilePage() {

    const isConnected = false;
    if (!isConnected)
        redirect('/login')


    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}