import Image from 'next/image';
import { BunnyArt } from './BunnyArt';
import type { Product } from '@/types/product';
export function ProductVisual({ product, showDisclosure = false }: { product: Product; showDisclosure?: boolean }) {
  return product.image ? <Image className="real-product-image" src={product.image} alt={`${product.name} Drip Bunny product packaging`} width={450} height={600} sizes="(max-width: 600px) 45vw, (max-width: 850px) 40vw, 25vw"/> : <><BunnyArt paints={product.paints}/>{showDisclosure && <span className="sample-label">SAMPLE ART · PRODUCT PHOTO TO COME</span>}</>;
}
