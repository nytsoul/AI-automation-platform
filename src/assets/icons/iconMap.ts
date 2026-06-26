import React from 'react';
import {
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  ChartPieIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpSolidIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  CubeSolidIcon,
  LinkSolidIcon,
  LinkIcon,
  SearchIcon,
  XMarkIcon,
  CheckIcon,
  StarIcon,
} from './index';

interface IconProps {
  className?: string;
  size?: number;
  'aria-hidden'?: boolean;
}

export const ICON_MAP: Record<string, React.FC<IconProps>> = {
  'arrow-path': ArrowPathIcon,
  'arrow-trending-up': ArrowTrendingUpIcon,
  'chart-pie': ChartPieIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-up-solid': ChevronUpSolidIcon,
  'chevron-up': ChevronUpIcon,
  'cog-8-tooth': Cog8ToothIcon,
  'cube-16-solid': CubeSolidIcon,
  'link-solid': LinkSolidIcon,
  'link': LinkIcon,
  'search': SearchIcon,
  'x-mark': XMarkIcon,
  'check': CheckIcon,
  'star': StarIcon,
};
