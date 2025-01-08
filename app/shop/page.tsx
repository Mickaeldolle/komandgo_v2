import SearchShopForm from "./components/SearchShopForm";

export default function Shop() {
    return (
        <div className="p-3 bg-gray-100 h-screen flex flex-col">

            <h1 className="">Recherchez un lieu :</h1>
            <div className="m-auto w-full">
                <SearchShopForm />
            </div>
        </div>
    );
}