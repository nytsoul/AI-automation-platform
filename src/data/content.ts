// ============================================================
// Testimonials, FAQ, Workflow, Statistics, and Navigation Data
// ============================================================

import type {
  Testimonial,
  FAQItem,
  WorkflowStep,
  StatItem,
  TrustedCompany,
  NavLink,
} from '../types';

// ── Navigation ──────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

// ── Trusted Companies ───────────────────────────────────────
export const TRUSTED_COMPANIES: TrustedCompany[] = [
  { name: 'Quantix', id: 'quantix' },
  { name: 'NovaByte', id: 'novabyte' },
  { name: 'SynapseAI', id: 'synapse' },
  { name: 'DataForge', id: 'dataforge' },
  { name: 'CloudPeak', id: 'cloudpeak' },
  { name: 'Axiom', id: 'axiom' },
  { name: 'PulseNet', id: 'pulsenet' },
  { name: 'OmniFlow', id: 'omniflow' },
];

// ── Workflow Steps ──────────────────────────────────────────
export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'connect',
    step: 1,
    title: 'Connect Your Data',
    description:
      'Link your databases, APIs, and SaaS tools in minutes. Our AI auto-detects schemas and maps your data fields.',
    icon: 'link',
  },
  {
    id: 'configure',
    step: 2,
    title: 'Configure Pipelines',
    description:
      'Use our visual builder or let AI suggest optimal data flows. Set transformations, validations, and routing rules.',
    icon: 'cog-8-tooth',
  },
  {
    id: 'analyze',
    step: 3,
    title: 'Analyze & Optimize',
    description:
      'Real-time dashboards surface insights automatically. AI continuously optimizes your pipelines for peak performance.',
    icon: 'chart-pie',
  },
  {
    id: 'scale',
    step: 4,
    title: 'Scale Infinitely',
    description:
      'From startup to enterprise. Auto-scaling infrastructure handles any volume while maintaining sub-second latency.',
    icon: 'arrow-trending-up',
  },
];

// ── Statistics ──────────────────────────────────────────────
export const STATISTICS: StatItem[] = [
  { id: 'data-processed', value: 2.4, suffix: 'B+', label: 'Data Points Processed Daily', prefix: '' },
  { id: 'uptime', value: 99.99, suffix: '%', label: 'Platform Uptime SLA' },
  { id: 'companies', value: 500, suffix: '+', label: 'Enterprise Customers' },
  { id: 'faster', value: 10, suffix: 'x', label: 'Faster Than Manual Processing' },
];

// ── Testimonials ────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'Quantix',
    quote:
      'AetherFlow transformed our data infrastructure. What used to take weeks of engineering time now happens automatically in minutes. The AI-powered routing alone saved us $2M annually.',
    avatar: 'SC',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Marcus Rivera',
    role: 'Chief Data Officer',
    company: 'NovaByte',
    quote:
      'The real-time analytics capabilities are unmatched. We process 50M events per second with sub-100ms latency. No other platform comes close to this level of performance.',
    avatar: 'MR',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Aisha Patel',
    role: 'Head of AI',
    company: 'SynapseAI',
    quote:
      'Integration was seamless. AetherFlow connected to our 47 different data sources in under an hour. The AI schema detection is genuinely magical — it understood our complex data models instantly.',
    avatar: 'AP',
    rating: 5,
  },
  {
    id: 't4',
    name: 'James Thornton',
    role: 'CTO',
    company: 'DataForge',
    quote:
      'We evaluated every major data platform on the market. AetherFlow was the only one that delivered on its promises. The predictive routing has eliminated our outage incidents completely.',
    avatar: 'JT',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Elena Kowalski',
    role: 'Director of Operations',
    company: 'CloudPeak',
    quote:
      'AetherFlow is not just a tool — it is the backbone of our entire data strategy. The modular architecture lets us innovate at speeds we never thought possible.',
    avatar: 'EK',
    rating: 5,
  },
];

// ── FAQ ─────────────────────────────────────────────────────
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does AetherFlow\'s AI automation work?',
    answer:
      'AetherFlow uses advanced machine learning models to analyze your data patterns, automatically configure processing pipelines, and continuously optimize performance. Our AI engine learns from your specific use cases to deliver increasingly accurate and efficient automation over time.',
  },
  {
    id: 'faq-2',
    question: 'What data sources can I connect?',
    answer:
      'AetherFlow supports 200+ integrations including all major databases (PostgreSQL, MySQL, MongoDB), cloud services (AWS, GCP, Azure), SaaS tools (Salesforce, HubSpot, Stripe), and custom APIs. Our AI auto-detects schemas and maps fields automatically.',
  },
  {
    id: 'faq-3',
    question: 'Is my data secure with AetherFlow?',
    answer:
      'Absolutely. AetherFlow is SOC 2 Type II certified and HIPAA compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We offer dedicated infrastructure options for Enterprise customers with custom security requirements.',
  },
  {
    id: 'faq-4',
    question: 'Can I switch plans or cancel anytime?',
    answer:
      'Yes. You can upgrade, downgrade, or cancel your plan at any time. When switching to annual billing, you receive a 20% discount. Downgrades take effect at the end of your current billing cycle. We offer a 30-day money-back guarantee on all plans.',
  },
  {
    id: 'faq-5',
    question: 'What kind of support do you offer?',
    answer:
      'Starter plans include email support with 24-hour response times. Professional plans add live chat with priority routing. Enterprise plans include a dedicated account manager, 24/7 phone support, and custom SLA agreements. All plans include access to our comprehensive documentation and community forum.',
  },
  {
    id: 'faq-6',
    question: 'How long does it take to get started?',
    answer:
      'Most teams are up and running within 15 minutes. Our AI-powered onboarding automatically detects your data sources, suggests optimal configurations, and creates initial pipelines. Enterprise deployments with custom requirements typically take 1-2 business days.',
  },
];
