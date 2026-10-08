export type VariantId = 'ruby' | 'blue' | 'green' | 'gold';
export type PaintPalette = readonly [string, string, string];
export interface Product {
  id: VariantId;
  name: string;
  note: string;
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  paints: PaintPalette;
  priceMinor: number | null;
  image: string | null;
}
export interface CartItem { id: VariantId; quantity: number }
