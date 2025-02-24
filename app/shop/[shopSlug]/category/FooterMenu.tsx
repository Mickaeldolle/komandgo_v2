import { IconArrowUp } from "@tabler/icons-react";

export default function FooterMenu() {
    return (
        // <div className="relative">

        //     <div className="fixed bottom-0 z-50 p-0 m-0 left-0 w-full overflow-hidden">
        //         <div className="flex items-bottom color-white relative">
        //             <div className="absolute h-26 bottom-0 w-full z-10 h-2 bg-white"></div>
        //             <div className="grow rounded-br-3xl bg-white bg-black"></div>
        //             <div className="grow-0 rounded-t-3xl w-40 bg-white text-white p-2 z-50"><IconHighlight color="red" className="mx-auto" /></div>
        //             <div className="grow rounded-bl-3xl bg-white bg-black"></div>
        //         </div>
        //         <div className="w-full bg-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti neque recusandae atque praesentium ducimus ut commodi, dignissimos cupiditate placeat officia! Magnam ipsam, assumenda voluptatem exercitationem esse sint recusandae ut!</div>
        //     </div>
        // </div>
        <div className="">
            <div className="bg-background flex relative">
                <div className="h-5 -z-1 bg-white absolute bottom-0 w-full z-50"></div>
                <div className="grow bg-background z-50 rounded-br-3xl"></div>
                <div className="bg-white w-2/5 mx-auto rounded-t-2xl py-1 z-50">
                    <IconArrowUp className="mx-auto" />
                </div>
                <div className="grow bg-background z-50 rounded-bl-3xl"></div>


            </div>
            <div className="bg-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, nemo?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio modi enim nesciunt. Vero voluptatibus repellat eum ipsum voluptate quia? Iusto adipisci earum, quos rerum architecto voluptate, illo doloremque porro impedit, quaerat ad magni culpa temporibus. Eius nisi inventore delectus impedit.
            </div>
        </div>
    )
}