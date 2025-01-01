import { RadioIcon } from "@mantine/core";
import Link from "next/link";

export default function Home() {

  const buttonGroup = [
    { label: "Recherche", href: "/restaurant" },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 border flex flex-col justify-between">
      <div className="border h-1/2 grow py-5 bg-white">
        {/* Logo / slogan / image */}
        <h1 className="text-center">Kom&GO</h1>
        <h2 className="text-center">The new way to order food !</h2>
      </div>
      <RadioIcon />
      <div className="grid grid-cols-2 gap-x-2 gap-y-3 border p-2 min-h-[300px]">
        {/* Button group */}
        {buttonGroup.map((button) => (
          <Link className="p-5 shadow shadow-inner rounded-xl hover:bg-gray-200 transition duration-500 bg-white uppercase" key={button.label} href={button.href}>
            {button.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
