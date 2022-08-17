import { HeadProvider as _HeadProvider } from 'react-head';
import type { FC } from 'react';

const HeadProvider = _HeadProvider as FC<{ headTags?: any[], children: any }>;

export default HeadProvider;
