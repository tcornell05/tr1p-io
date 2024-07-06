
import { DM_Mono } from 'next/font/google'

import Drawer from "@/components/ui/drawer";


const FONT_DM_MONO = DM_Mono({weight:"300", preload: false,})


export default function Page() {

    return (

        <>

            <Drawer />



        </>
    );
}
