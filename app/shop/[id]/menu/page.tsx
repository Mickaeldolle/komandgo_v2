'use client'
import { useCustomerStore } from "@/providers/customer-store-provider";

export default function Menu() {
    // Sélectionner individuellement les valeurs pour éviter les re-rendus inutiles
    const selectedShop = useCustomerStore(state => state.selectedShop);
    const connected = useCustomerStore(state => state.connected);
    const connect = useCustomerStore(state => state.connect);

    const handleConnect = () => {
        connect(!connected);
    };

    return (
        <div className="menu">
            <h1>Menu</h1>
            {selectedShop?.name && <p>{selectedShop.name}</p>}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleConnect}
            >
                {connected ? 'Disconnect' : 'Connect'}
            </button>
            <p>{connected ? 'Connected' : 'Not Connected'}</p>
        </div>
    );
}