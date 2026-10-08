import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/layout/MotionProvider';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { Hero } from '@/components/sections/Hero';
import { Colourways } from '@/components/sections/Colourways';
import { MarbleLab } from '@/components/sections/MarbleLab';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Collection } from '@/components/sections/Collection';
import { InsideBox } from '@/components/sections/InsideBox';
import { Gallery } from '@/components/sections/Gallery';
import { Editorial } from '@/components/sections/Editorial';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
export default function Home() {
  return <><Header/><main id="main"><Hero/><div className="paint-ribbon" aria-hidden="true"><span>POUR IT. SWIRL IT. MAKE IT YOURS. ✷ POUR IT. SWIRL IT. MAKE IT YOURS. ✷</span></div><Colourways/><MarbleLab/><HowItWorks/><Collection/><InsideBox/><Gallery/><Editorial/><FAQ/><FinalCTA/></main><Footer/><CartDrawer/><MotionProvider/></>;
}
