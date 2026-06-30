import { ReactNode } from "react";

interface Props{
    children:ReactNode;
}

export default function AuthCard({
    children,
}:Props){

    return(

        <div
        className="
        w-full
        max-w-xl
        rounded-[28px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-10
        shadow-[0_20px_70px_rgba(0,0,0,.55)]
        "
        >

            {children}

        </div>

    );

}