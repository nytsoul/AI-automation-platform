// ============================================================
// Feature items for Bento Grid / Accordion
// ============================================================

import type { FeatureItem } from '../types';

export const FEATURES: FeatureItem[] = [
  {
    id: 'intelligent-automation',
    title: 'Intelligent Automation',
    description: 'Automate complex data pipelines with AI-powered workflow orchestration.',
    icon: 'cog-8-tooth',
    gradient: 'from-[#114C5A] to-[#172B36]',
    detail:
      'Our AI engine analyzes your data patterns and automatically configures optimal processing pipelines. Reduce manual configuration by 90% and eliminate human error from your critical workflows.',
    stat: '90%',
    statLabel: 'Less Manual Work',
  },
  {
    id: 'real-time-analytics',
    title: 'Real-Time Analytics',
    description: 'Monitor and analyze data streams with sub-second latency dashboards.',
    icon: 'chart-pie',
    gradient: 'from-[#FFC801] to-[#FF9932]',
    detail:
      'Process millions of events per second with our distributed analytics engine. Get instant insights with customizable dashboards that update in real-time across all connected devices.',
    stat: '<1s',
    statLabel: 'Latency',
  },
  {
    id: 'smart-integrations',
    title: 'Smart Integrations',
    description: 'Connect to 200+ data sources with zero-config AI adapters.',
    icon: 'link-solid',
    gradient: 'from-[#172B36] to-[#114C5A]',
    detail:
      'Our AI automatically detects data schemas and maps fields across platforms. One-click connections to databases, APIs, SaaS tools, and legacy systems with automatic schema evolution.',
    stat: '200+',
    statLabel: 'Integrations',
  },
  {
    id: 'predictive-routing',
    title: 'Predictive Data Routing',
    description: 'AI-driven routing that anticipates bottlenecks before they happen.',
    icon: 'arrow-path',
    gradient: 'from-[#114C5A] to-[#0a3540]',
    detail:
      'Machine learning models analyze historical traffic patterns to predictively route data through optimal paths. Achieve 99.99% uptime with intelligent failover and load balancing.',
    stat: '99.99%',
    statLabel: 'Uptime',
  },
  {
    id: 'advanced-search',
    title: 'Semantic Search',
    description: 'Find any data point across your entire infrastructure in milliseconds.',
    icon: 'search',
    gradient: 'from-[#FF9932] to-[#FFC801]',
    detail:
      'Natural language queries powered by vector embeddings let your team find exactly what they need. Search across structured and unstructured data with AI-powered relevance ranking.',
    stat: '50ms',
    statLabel: 'Search Time',
  },
  {
    id: 'modular-architecture',
    title: 'Modular Architecture',
    description: 'Build, deploy, and scale microservices with drag-and-drop simplicity.',
    icon: 'cube-16-solid',
    gradient: 'from-[#172B36] to-[#1a4a5a]',
    detail:
      'Compose complex data architectures from pre-built, battle-tested modules. Each component auto-scales independently, ensuring optimal resource utilization across your infrastructure.',
    stat: '10x',
    statLabel: 'Faster Deployment',
  },
];
