import Link from "next/link";
import { IconLogin, IconSearch, IconQuestionMark, IconPower, IconUser } from "@tabler/icons-react";

export default async function Home() {

  const userIsLoged = false;

  const buttonGroup = [
    { label: "Recherche", href: "/shop", icon: <IconSearch />, showWhenUserLoged: null, color: "" },
    { label: "Login / Signup", href: "/login", icon: <IconLogin />, showWhenUserLoged: false, color: "" },
    { label: "Profil", href: "/profile", icon: <IconUser />, showWhenUserLoged: true, color: "" },
    { label: "Deconnexion", href: "/register", icon: <IconPower />, showWhenUserLoged: true, color: "red" },
    { label: "A propos", href: "/contact", icon: <IconQuestionMark />, showWhenUserLoged: null, color: "" },
  ]

  const filteredButtonGroup = buttonGroup.filter(button => {
    if (button.showWhenUserLoged === null)
      return true;
    return button.showWhenUserLoged === userIsLoged;
  })

  return (
    <div className="h-dvh bg-background flex flex-col justify-between font-roboto">
      {/* Logo / slogan / image */}
      <div className="h-1/2 py-5 bg-hero-home bg-no-repeat bg-cover bg-center flex flex-col justify-center p-5">
        <div className="backdrop-blur-sm text-center text-xl font-medium p-5 rounded-xl">
          <h1 className="text-6xl font-blackOpsOne">Kom&GO</h1>
          <h2 className="font-pacifico">The new way to order food !</h2>
        </div>
      </div>
      {/* Button group */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-3 p-2 grow">
        {filteredButtonGroup.map((button) => (
          <Link
            className="active:scale-95 flex flex-col justify-between bg-foreground nowrap p-5 border shadow-inner rounded-xl transition ease uppercase hover:outline hover:outline-1 hover:outline-primary"
            key={button.label}
            href={button.href}
          >
            <div className=" text-primary ml-auto">{button.icon}</div>
            <div className={`text-${button.color}-950`}>{button.label}</div>
          </Link>
        ))}
      </div>
    </div >
  );
}