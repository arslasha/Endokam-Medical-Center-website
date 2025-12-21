import { Hero } from './_components/Hero';
import { Doctors } from "./_components/Doctors";
import { PageTransition } from '@/components/shared/PageTransition';
import { Services } from './_components/Services';
import Reviews from './_components/Reviews';
import Location from "@/app/home/_components/Location";


export default function HomePage() {
    return (
        <>
            <PageTransition>
            <Hero />
                <Services />
                <Doctors />
                <Reviews />
                <Location/>
            </PageTransition>
        </>
    );
}
