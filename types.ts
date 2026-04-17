import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProjectLocation {
  id: number;
  title: string;
  location: string;
  type: string;
  area: string;
  year: string;
  lat: number;
  lng: number;
  imageUrl: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Differentiator {
  title: string;
  description: string;
  icon: LucideIcon;
}