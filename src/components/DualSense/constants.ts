export interface Skill {
  name: string
  category: string
}

export interface SkillZone {
  id: string
  label: string
  description: string
  color: string
  skills: Skill[]
  keys: string[]
}

/** Maps keyboard keys to individual buttons within zones (press-and-hold) */
export const keyToButton: Record<string, { zone: string; button: string }> = {
  // D-pad - WASD
  w: { zone: 'dpad', button: 'dpad-up' },
  a: { zone: 'dpad', button: 'dpad-left' },
  s: { zone: 'dpad', button: 'dpad-down' },
  d: { zone: 'dpad', button: 'dpad-right' },
  // Face buttons - Arrow keys
  ArrowUp: { zone: 'face-buttons', button: 'btn-triangle' },
  ArrowRight: { zone: 'face-buttons', button: 'btn-circle' },
  ArrowDown: { zone: 'face-buttons', button: 'btn-cross' },
  ArrowLeft: { zone: 'face-buttons', button: 'btn-square' },
  // Triggers
  q: { zone: 'left-triggers', button: 'btn-l1' },
  Tab: { zone: 'left-triggers', button: 'btn-l2' },
  e: { zone: 'right-triggers', button: 'btn-r1' },
  r: { zone: 'right-triggers', button: 'btn-r2' },
  // Sticks
  z: { zone: 'left-stick', button: 'btn-left-stick' },
  c: { zone: 'right-stick', button: 'btn-right-stick' },
  // Special
  ' ': { zone: 'trackpad', button: 'btn-trackpad' },
  Enter: { zone: 'ps-button', button: 'btn-ns' },
}

export const skillZones: Record<string, SkillZone> = {
  'dpad': {
    id: 'dpad',
    label: 'Core Languages',
    description: 'The foundation of everything I build',
    color: '#171219',
    keys: ['W', 'A', 'S', 'D'],
    skills: [
      { name: 'TypeScript', category: 'language' },
      { name: 'JavaScript', category: 'language' },
      { name: 'Python', category: 'language' },
      { name: 'Go', category: 'language' },
      { name: 'HTML/CSS', category: 'language' },
    ],
  },
  'face-buttons': {
    id: 'face-buttons',
    label: 'Frameworks & Libraries',
    description: 'The tools I reach for daily',
    color: '#32de8a',
    keys: ['↑', '↓', '←', '→'],
    skills: [
      { name: 'React', category: 'framework' },
      { name: 'Next.js', category: 'framework' },
      { name: 'Node.js', category: 'framework' },
      { name: 'Three.js', category: 'framework' },
      { name: 'Vite', category: 'framework' },
    ],
  },
  'left-stick': {
    id: 'left-stick',
    label: 'DevOps & Cloud',
    description: 'Infrastructure that scales',
    color: '#f9a03f',
    keys: ['Z'],
    skills: [
      { name: 'AWS', category: 'cloud' },
      { name: 'Docker', category: 'cloud' },
      { name: 'Vercel', category: 'cloud' },
      { name: 'GitHub Actions', category: 'cloud' },
      { name: 'Kubernetes', category: 'cloud' },
    ],
  },
  'right-stick': {
    id: 'right-stick',
    label: 'Databases',
    description: 'Where the data lives',
    color: '#63D2FF',
    keys: ['C'],
    skills: [
      { name: 'PostgreSQL', category: 'database' },
      { name: 'MongoDB', category: 'database' },
      { name: 'Redis', category: 'database' },
      { name: 'Prisma', category: 'database' },
      { name: 'Supabase', category: 'database' },
    ],
  },
  'left-triggers': {
    id: 'left-triggers',
    label: 'Design & UX',
    description: 'Making it look and feel right',
    color: '#f9a03f',
    keys: ['Q', 'Tab'],
    skills: [
      { name: 'Figma', category: 'design' },
      { name: 'Tailwind CSS', category: 'design' },
      { name: 'Framer', category: 'design' },
      { name: 'Storybook', category: 'design' },
    ],
  },
  'right-triggers': {
    id: 'right-triggers',
    label: 'AI & ML',
    description: 'The future I\'m building with',
    color: '#63D2FF',
    keys: ['E', 'R'],
    skills: [
      { name: 'OpenAI', category: 'ai' },
      { name: 'Claude', category: 'ai' },
      { name: 'Hugging Face', category: 'ai' },
      { name: 'LangChain', category: 'ai' },
      { name: 'TensorFlow', category: 'ai' },
    ],
  },
}
