import SearchShopForm from "./components/SearchShopForm";

export default function Shop() {
    return (
        <div className="h-full p-3 bg-gray-100 flex flex-col">

            <h1 className="">Recherchez un lieu :</h1>
            <div className="m-auto w-full">
                <SearchShopForm />
            </div>
        </div>
    );
}