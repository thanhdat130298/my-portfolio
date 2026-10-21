export interface NavLink {
  label: string
  href: string
}

export interface StatItem {
  value: string
  label: string
}

export interface ProjectItem {
  id: string
  name: string
  period: string
  company: string
  description: string
  stack: string[]
  highlights: string[]
  teamSize?: number
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  period: string
  achievements?: string[]
  projects: {
    name: string
    period: string
    summary: string
    stack?: string[]
  }[]
}

export interface PersonalProject {
  id: string
  name: string
  /** Live demo URL (optional). */
  demoUrl?: string
  githubUrl: string
  stack: string[]
  /** When true, show localized note from i18n `personalProjects.items.{id}.note`. */
  hasNote?: boolean
}


export interface ContactInfo {
  email: string
  phone: string
  phoneDisplay: string
  address: string
  facebook: string
  facebookUrl: string
  /** Public live URL of this portfolio (shown in Contact + README). */
  demoUrl?: string
}

export const portfolio = {
  brand: 'DAT NGUYEN',
  name: 'Nguyễn Thành Đạt',
  role: 'Software Developer · Frontend & Fullstack',
  location: 'Da Nang, Vietnam',

  headline: 'Software developer with strong frontend craft and fullstack delivery',
  summary:
    'Software Developer with 5+ years building and maintaining web applications — strong frontend expertise in React, TypeScript, Vue, and Nuxt, plus hands-on Node.js/Express and Java Spring Boot for REST APIs. Experienced in production features, refactoring, performance, troubleshooting, and mobile work with React Native and Flutter.',

  lookingFor:
    'Open to software / frontend / fullstack roles where clean code, product delivery, and cross-team collaboration matter — with room to keep growing across the stack.',

  nav: [
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Career', href: '#career' },
    { label: 'Meet Dat', href: '#meet-dat' },
    { label: 'Contact', href: '#contact' },
  ] as NavLink[],

  stats: [
    { value: '10+', label: 'Projects shipped' },
    { value: '4', label: 'Companies & freelance' },
    { value: '5+', label: 'Years of experience' },
  ] as StatItem[],

  profile: {
    badge: 'Software Developer · Frontend & Fullstack · Da Nang',
    caption:
      'Nguyen Thanh Dat — software developer with strong frontend (React / Vue / Nuxt / Next) and hands-on backend (Node.js / Spring Boot) experience.',
  },

  about: {
    title: 'About',
    intro:
      'Software Developer with over 5 years building and maintaining web applications. Strong front-end expertise in React, TypeScript, Vue, and Nuxt — plus mobile (React Native, Flutter) and basic REST API work with Java Spring Boot and Node.js.',
    points: [
      {
        title: 'Objective',
        text: 'Ship reliable production features with clean, maintainable code — refactoring, performance optimization, and troubleshooting across frontend and fullstack work.',
      },
      {
        title: 'Mission',
        text: 'Deliver solid UI/UX and complete product flows while collaborating with designers, backend, BA/BrSE, and clients to resolve issues and finish on time.',
      },
      {
        title: 'Approach',
        text: 'Frontend-strong by default; step into Node.js/Express or Java Spring Boot, code review, mentoring, and mobile when the product needs broader ownership.',
      },
    ],
  },

  skillsFrontend: {
    title: 'Frontend',
    lead: 'Main craft — UI systems, frameworks, state, and product screens.',
    items: [
      'JavaScript',
      'TypeScript',
      'HTML5',
      'CSS3',
      'Vue.js 2/3',
      'Nuxt.js 2/3',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Vuetify',
      'Element UI',
      'Bootstrap Vue',
      'Ant Design',
      'Vuex',
      'Pinia',
      'axios',
      'React Native',
      'Flutter',
      'SEO',
    ],
  },

  skillsBackend: {
    title: 'Backend',
    lead: 'REST APIs and services from FPT, NCC, and real delivery work.',
    items: [
      'Node.js',
      'Express.js',
      'Java',
      'Spring Boot',
      'RESTful API',
      'SQL',
      'JPA',
      'MyBatis',
      'Postman',
      'GitHub',
      'npm',
      'Jira',
    ],
  },

  skills: [
    {
      title: 'Core web',
      items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Node.js'],
    },
    {
      title: 'Frontend frameworks',
      items: ['Vue.js 2/3', 'Nuxt.js 2/3', 'React', 'Next.js', 'React Native', 'Flutter'],
    },
    {
      title: 'Backend frameworks',
      items: ['Java Spring Boot', 'Express.js', 'RESTful API', 'SQL'],
    },
    {
      title: 'UI, state & tools',
      items: [
        'Tailwind CSS',
        'Vuetify',
        'Ant Design',
        'Vuex',
        'Pinia',
        'axios',
        'GitHub',
        'Jira',
      ],
    },
  ] as SkillGroup[],

  projects: [
    {
      id: 'permate',
      name: 'Permate',
      period: 'Aug 2023 – May 2026',
      company: 'Permate',
      description:
        'SaaS partnership automation platform for affiliate marketing — campaigns, partner relationships, conversion tracking, commission payouts, and real-time performance analytics. Front-end ownership with Vue/Nuxt, REST integration, reusable UI, code review, and Flutter in the stack on a 20-person team.',
      stack: ['Vue.js', 'Nuxt.js', 'Flutter', 'Bootstrap Vue'],
      highlights: [
        'New affiliate-platform features (Vue / Nuxt)',
        'Reusable UI components & REST API integration',
        'State management & designer/backend collaboration',
        'Code review and cross-team support',
      ],
      teamSize: 20,
    },
    {
      id: 'vf-framework',
      name: 'VF Framework',
      period: 'Jun 2022 – Jul 2023',
      company: 'FPT Software',
      description:
        'Migration project moving MyBatis data access to Spring Boot JPA. Fullstack delivery including flow testing, fresher training/reporting, and low-code study to meet requirements on a 4-person team.',
      stack: ['Java', 'Spring Boot', 'JPA', 'MyBatis'],
      highlights: [
        'MyBatis → Spring Boot JPA migration',
        'End-to-end flow testing',
        'Fresher training & task reporting',
        'Low-code adaptation for requirements',
      ],
      teamSize: 4,
    },
    {
      id: 'lgu',
      name: 'LGU+ Digital Channel',
      period: 'Oct 2021 – May 2022',
      company: 'FPT Software',
      description:
        'Digital services channel for end users. Built and enhanced reusable components and screens, integrated REST APIs across frontend/backend, wrote unit tests, and collaborated with BA/BrSE/clients on a team of 11.',
      stack: ['Vue.js', 'Nuxt.js', 'Spring Boot'],
      highlights: [
        'Reusable components & UI screens',
        'REST API + business flow handling',
        'Unit tests per screen',
        'BA / BrSE / client collaboration',
      ],
      teamSize: 11,
    },
    {
      id: 'dsh',
      name: 'DSH Blockchain CMS',
      period: 'Jul 2021 – Sep 2021',
      company: 'NCCSOFT',
      description:
        'CMS / marketing surfaces for a blockchain product — responsive pages, reusable components, business logic, and UX improvements with design-system tooling.',
      stack: ['React', 'Next.js', 'Gatsby', 'Styled Components', 'Storybook'],
      highlights: [
        'Responsive UI pages & components',
        'Business logic implementation',
        'UI issue fixes & UX improvements',
      ],
      teamSize: 6,
    },
    {
      id: 'survey',
      name: 'We Check',
      period: 'Mar 2021 – Jun 2021',
      company: 'NCCSOFT',
      description:
        'Mobile survey / health-check app. Built UI from Figma, implemented app logic, and worked with backend to improve usability.',
      stack: ['React Native', 'Redux Saga'],
      highlights: [
        'Figma to mobile UI',
        'App logic & functions',
        'Backend collaboration for usability',
      ],
      teamSize: 7,
    },
    {
      id: 'internal-crm',
      name: 'Internal CRM / HRM',
      period: 'Jun 2021 – Sep 2021',
      company: 'NCCSOFT',
      description:
        'Internal business applications with Node.js/Express REST APIs (CRUD, validation, error handling) and Vue UI — fullstack delivery for CRM/HR-style systems on a 10-person team.',
      stack: ['Node.js', 'Express.js', 'Vue.js'],
      highlights: [
        'Node.js / Express REST APIs',
        'CRUD, validation & error handling',
        'Vue UI + API integration',
        'Consistent data flow across layers',
      ],
      teamSize: 10,
    },
  ] as ProjectItem[],

  softSkills: [
    'Team collaboration',
    'Clean code mindset',
    'Code review & mentoring',
    'Testing & troubleshooting',
    'UI/UX analysis',
    'Task breakdown (Jira / Redmine)',
    'Independent delivery',
  ],

  experience: [
    {
      id: 'permate',
      company: 'Permate',
      role: 'Front-end Developer',
      period: 'Aug 2023 – May 2026',
      projects: [
        {
          name: 'Permate',
          period: 'Aug 2023 – May 2026',
          summary:
            'Affiliate marketing SaaS — Vue/Nuxt features, reusable UI, REST APIs, state management, code review, and Flutter in the product stack.',
          stack: ['Vue.js', 'Nuxt.js', 'Flutter', 'Bootstrap Vue'],
        },
      ],
    },
    {
      id: 'fpt',
      company: 'FPT Software',
      role: 'Fullstack Developer',
      period: 'Oct 2021 – Aug 2023',
      projects: [
        {
          name: 'VF Framework',
          period: 'Jun 2022 – Jul 2023',
          summary:
            'Migrated MyBatis to Spring Boot JPA; tested flows; trained freshers and studied low-code for requirements.',
          stack: ['Java', 'Spring Boot', 'JPA'],
        },
        {
          name: 'LGU+ Digital Channel',
          period: 'Oct 2021 – May 2022',
          summary:
            'Vue/Nuxt digital services UI, reusable components, REST APIs, unit tests, and BA/BrSE/client collaboration.',
          stack: ['Vue.js', 'Nuxt.js', 'Spring Boot'],
        },
      ],
    },
    {
      id: 'freelance',
      company: 'Freelance',
      role: 'Front-end Developer',
      period: 'Jun 2022 – Aug 2022',
      projects: [
        {
          name: 'Cinvest',
          period: 'Jun 2022 – Aug 2022',
          summary: 'Next.js / React landing pages and reusable components.',
          stack: ['Next.js', 'React'],
        },
      ],
    },
    {
      id: 'ncc',
      company: 'NCCSOFT',
      role: 'Front-end Developer',
      period: 'Apr 2020 – Sep 2021',
      projects: [
        {
          name: 'DSH',
          period: 'Jul 2021 – Sep 2021',
          summary: 'Blockchain CMS UI with React, Next, Gatsby, Styled Components, and Storybook.',
          stack: ['React', 'Next.js', 'Gatsby'],
        },
        {
          name: 'We Check',
          period: 'Mar 2021 – Jun 2021',
          summary: 'React Native health-survey app from Figma with Redux Saga.',
          stack: ['React Native', 'Redux Saga'],
        },
        {
          name: 'Internal CRM / HRM',
          period: 'Jun 2021 – Sep 2021',
          summary:
            'Node.js/Express REST APIs and Vue UI for internal CRM/HR systems — CRUD, validation, and layer integration.',
          stack: ['Node.js', 'Express.js', 'Vue.js'],
        },
      ],
    },
  ] as ExperienceItem[],

  personalProjects: [
    {
      id: 'my-portfolio',
      name: 'My Portfolio',
      demoUrl: 'https://my-portfolio-drab-phi-hko31oj1lt.vercel.app/',
      githubUrl: 'https://github.com/thanhdat130298/my-portfolio',
      stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'CSS'],
    },
    {
      id: 'knowledge-page',
      name: 'Knowledge FStack',
      demoUrl: 'https://knowledge-page-two.vercel.app',
      githubUrl: 'https://github.com/thanhdat130298/knowledge-page',
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Tiptap'],
    },
    {
      id: 'english-fe',
      name: 'English App',
      demoUrl: 'https://english-fe-phi.vercel.app',
      githubUrl: 'https://github.com/thanhdat130298/english-fe',
      stack: ['TypeScript', 'Vue', 'CSS', 'REST API'],
      hasNote: true,
    },
    {
      id: 'template-invitation',
      name: 'Invitation Template',
      demoUrl: 'https://invitation-beta.web.app/',
      githubUrl: 'https://github.com/thanhdat130298/template-invitation',
      stack: ['Vue', 'TypeScript', 'HTML', 'CSS'],
    },
  ] as PersonalProject[],

  contact: {
    email: 'nguyenthanhdat1302@gmail.com',
    phone: '+84935467108',
    phoneDisplay: '0935 467 108',
    address: 'Hoa Xuan, Cam Le, Da Nang',
    facebook: 'facebook.com/thanhdat130298',
    facebookUrl: 'https://facebook.com/thanhdat130298',
    demoUrl: 'https://my-portfolio-drab-phi-hko31oj1lt.vercel.app/',
  } as ContactInfo,

  languages: [
    { name: 'Vietnamese', level: 'Native' },
    { name: 'English', level: 'Technical reading and communication' },
  ],

  interests: ['Football', 'Gaming', 'Traveling', 'Learning and building new things'],
}

/** Plain-text knowledge block for the AI chat system prompt */
export function buildKnowledgeBase(): string {
  const p = portfolio
  return `
Name: ${p.name}
Role: ${p.role}
Positioning: Software Developer with 5+ years — strong frontend (React/TypeScript/Vue/Nuxt) and hands-on fullstack (Node.js/Express, Java Spring Boot REST APIs). Also React Native and Flutter. Focus on production features, clean code, refactoring, performance, troubleshooting, code review, and mentoring. Do not oversell Django.
Location: ${p.location} (${p.contact.address})
Summary: ${p.summary}
Looking for: ${p.lookingFor}

Contact (public only):
- Email: ${p.contact.email}
- Phone: ${p.contact.phoneDisplay}
- Facebook: ${p.contact.facebook}

Education: Informatics Teacher Education, The University of Danang — University of Education (Aug 2016 – Aug 2021).

Skills:
- Frontend: ${p.skillsFrontend.items.join(', ')}
- Backend: ${p.skillsBackend.items.join(', ')}
Soft skills: ${p.softSkills.join(', ')}

Languages:
${p.languages.map(l => `- ${l.name}: ${l.level}`).join('\n')}

Experience:
${p.experience
  .map(
    e =>
      `## ${e.company} — ${e.role} (${e.period})\n` +
      (e.achievements?.length
        ? `Achievements: ${e.achievements.join('; ')}\n`
        : '') +
      e.projects
        .map(
          pr =>
            `- ${pr.name} (${pr.period}): ${pr.summary}` +
            (pr.stack ? ` [${pr.stack.join(', ')}]` : ''),
        )
        .join('\n'),
  )
  .join('\n\n')}

Featured projects:
${p.projects
  .map(
    pr =>
      `- ${pr.name} @ ${pr.company} (${pr.period}): ${pr.description} Stack: ${pr.stack.join(', ')}.`,
  )
  .join('\n')}

Personal projects:
${p.personalProjects
  .map(
    pr =>
      `- ${pr.name}` +
      (pr.demoUrl ? ` | demo: ${pr.demoUrl}` : '') +
      ` | github: ${pr.githubUrl} | stack: ${pr.stack.join(', ')}`,
  )
  .join('\n')}

Interests: ${p.interests.join(', ')}.
`.trim()
}
