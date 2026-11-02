/// <reference types="vite/client" />
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Ruta a un archivo de /public. En producción apunta a Vercel, así las imágenes
// cargan bien aunque la web se muestre desde otro dominio (plugin de WordPress).
export function asset(path: string) {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}
