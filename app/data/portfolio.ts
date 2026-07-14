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
  role: 'Web Developer · Frontend → Fullstack',
  location: 'Da Nang, Vietnam',

  headline: 'Frontend-first developer, growing into fullstack',
  summary:
    'Primarily a frontend developer with 5+ years building UIs in Vue, React, Nuxt, and Next — strong on UI/UX, components, and responsive product screens. Also hands-on with Java/Spring Boot and APIs from real projects, with a clear path toward fullstack delivery.',

  lookingFor:
    'Open to frontend-heavy roles with room to grow as a fullstack developer — modern teams, solid product craft, and AI-assisted workflows.',

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
    badge: 'Frontend first · Fullstack-bound · Da Nang',
    caption:
      'Nguyen Thanh Dat — frontend-focused web developer (Vue / React / Nuxt / Next), expanding toward fullstack with Spring Boot and API work.',
  },

  about: {
    title: 'About',
    intro:
      'Since 2020 I have shipped mostly on the frontend — design to production UI, components, and client flows — while picking up backend work on real products. Frontend is the core strength; fullstack is the direction.',
    points: [
      {
        title: 'Objective',
        text: 'Keep shipping excellent frontend experiences while deepening backend skills to operate confidently as a fullstack developer.',
      },
      {
        title: 'Mission',
        text: 'Turn designs into fast, responsive interfaces people enjoy — with clean components, solid UX, and enough API/backend fluency to own features end-to-end when needed.',
      },
      {
        title: 'Approach',
        text: 'Frontend-first by default; jump into Java/Spring Boot or mobile when the product needs full-feature ownership across the stack.',
      },
    ],
  },

  skillsFrontend: {
    title: 'Frontend',
    lead: 'Main craft — UI systems, responsive layouts, and product screens.',
    items: [
      'HTML',
      'CSS',
      'SCSS',
      'JavaScript',
      'TypeScript',
      'Vue.js',
      'Nuxt.js',
      'React',
      'Next.js',
      'Gatsby',
      'React Native',
      'Flutter',
      'Figma',
      'Storybook',
    ],
  },

  skillsBackend: {
    title: 'Backend',
    lead: 'Growing fullstack path — APIs and services from FPT/Permate and real delivery work.',
    items: [
      'Java',
      'Spring Boot',
      'Python',
      'Node.js',
      'RESTful API',
      'SQL',
      'Postman',
    ],
  },

  skills: [
    {
      title: 'Languages & styling',
      items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'SCSS'],
    },
    {
      title: 'Frameworks',
      items: ['Vue.js', 'React', 'Nuxt.js', 'Next.js', 'React Native', 'Flutter', 'Gatsby'],
    },
    {
      title: 'Backend exposure',
      items: ['Java', 'Spring Boot', 'Python', 'Node.js', 'RESTful API', 'SQL'],
    },
    {
      title: 'Tools',
      items: ['Figma', 'Storybook', 'Postman', 'DevTools', 'Photoshop', 'Git'],
    },
  ] as SkillGroup[],

  projects: [
    {
      id: 'permate',
      name: 'Permate',
      period: 'Aug 2023 – Present',
      company: 'Permate Global',
      description:
        'Affiliate marketing platform — main ownership on web UI/UX from designs and client flows, plus API wiring, code review, backend support when needed, and Flutter app features for the mobile product on a 20-person team.',
      stack: ['Vue 2', 'Nuxt.js', 'Flutter'],
      highlights: [
        'Web UI/UX (Vue / Nuxt)',
        'Flutter app screens & flows',
        'API integration & code review',
        'Backend support when needed',
      ],
      teamSize: 20,
    },
    {
      id: 'lgu',
      name: 'LGU+ Digital Channel',
      period: 'Oct 2021 – May 2022',
      company: 'FPT Software',
      description:
        'Digital services channel for end users. Built shared components, screens from a base library, API integrations, unit tests, and coordinated with BA/BrSE/clients on a team of 11.',
      stack: ['Vue.js', 'Nuxt.js'],
      highlights: [
        'Common component library',
        'Screen & API integration',
        'Unit tests per screen',
        'Client & BA collaboration',
      ],
      teamSize: 11,
    },
    {
      id: 'dsh',
      name: 'DSH Blockchain Landing',
      period: 'Jul 2021 – Sep 2021',
      company: 'NCCSOFT',
      description:
        'Marketing landing pages for a blockchain product — pages, components, business logic, and full responsive delivery with design-system tooling.',
      stack: ['React', 'Next.js', 'Gatsby', 'Styled Components', 'Storybook'],
      highlights: [
        'Responsive landing pages',
        'Component-driven UI',
        'Storybook workflow',
      ],
      teamSize: 6,
    },
    {
      id: 'cinvest',
      name: 'Cinvest Landing',
      period: 'Jun 2022 – Aug 2022',
      company: 'Freelance',
      description:
        'Landing page and page/component implementation with React and Next.js in a team of four.',
      stack: ['Next.js', 'React'],
      highlights: ['Landing page', 'Reusable components'],
      teamSize: 4,
    },
    {
      id: 'vf-framework',
      name: 'VF Framework',
      period: 'May 2023 – Aug 2023',
      company: 'FPT Software',
      description:
        'Migrated legacy MyBatis data flows to Spring Boot JPA while keeping results aligned with the existing system — API and persistence work on a Java backend modernization track.',
      stack: ['Java', 'Spring Boot', 'JPA', 'MyBatis', 'SQL'],
      highlights: [
        'MyBatis → Spring Boot JPA migration',
        'Legacy-compatible query/results',
        'REST / service layer support',
        'Backend modernization',
      ],
    },
    {
      id: 'survey',
      name: 'Survey App',
      period: 'Mar 2021 – Jul 2021',
      company: 'NCCSOFT',
      description:
        'React Native app for factory worker surveys, health evaluations, blogs, and Q&A — Figma-driven UI with backend coordination and bug fixing.',
      stack: ['React Native'],
      highlights: ['Figma to mobile UI', 'App logic & flows'],
      teamSize: 7,
    },
  ] as ProjectItem[],

  softSkills: [
    'Teamwork',
    'Attention to detail',
    'Fast learner',
    'Deadline-driven',
    'Responsible ownership',
    'Clear communication',
  ],

  experience: [
    {
      id: 'permate',
      company: 'Permate Global',
      role: 'Developer',
      period: 'Aug 2023 – Present',
      projects: [
        {
          name: 'Permate',
          period: 'Aug 2023 – Present',
          summary:
            'Affiliate marketing platform. Web UI/UX (Vue/Nuxt), Flutter app features, API integration, code review, and backend support when the product needs it.',
            stack: ['Vue 2', 'Nuxt.js', 'Flutter'],
        },
        {
          name: 'Permate Flutter App',
          period: 'Aug 2023 – Present',
          summary:
            'Contribute Flutter app screens, flows, and API-backed features alongside the web product — shipping mobile UX for affiliate users.',
          stack: ['Flutter', 'Dart', 'REST API'],
        },
      ],
    },
    {
      id: 'fpt',
      company: 'FPT Software',
      role: 'Developer',
      period: 'Oct 2021 – Aug 2023',
      achievements: ['🏆 Best Performance of BU 2022'],
      projects: [
        {
          name: 'VF Framework',
          period: 'May 2023 – Aug 2023',
          summary: 'Migrated MyBatis flows to Spring Boot JPA while matching legacy results.',
          stack: ['Java', 'Spring Boot', 'JPA'],
        },
        {
          name: 'Ucube Slim',
          period: 'Jan 2023 – May 2023',
          summary: 'Backend controller and screen testing; sub-leader support for task delivery and reporting.',
          stack: ['Spring Boot'],
        },
        {
          name: 'Java & Low-code Training',
          period: 'May 2022 – Jan 2023',
          summary: 'Built REST APIs with Spring Boot/MyBatis; trained on WebSquare and Nexacro.',
          stack: ['Spring Boot', 'MyBatis', 'Low-code'],
        },
        {
          name: 'LGU+ Digital Channel',
          period: 'Oct 2021 – May 2022',
          summary: 'Vue/Nuxt digital services UI, shared components, APIs, tests, and stakeholder collaboration.',
          stack: ['Vue.js', 'Nuxt.js'],
        },
      ],
 
    },
    {
      id: 'ncc',
      company: 'NCCSOFT Company',
      role: 'Developer / Intern',
      period: 'Apr 2020 – Sep 2021',
      projects: [
        {
          name: 'DSH',
          period: 'Jul 2021 – Sep 2021',
          summary: 'Blockchain landing pages with React, Next, Gatsby, and Storybook.',
          stack: ['React', 'Next.js', 'Gatsby'],
        },
        {
          name: 'Survey App',
          period: 'Mar 2021 – Jul 2021',
          summary: 'React Native workplace survey and content app from Figma designs.',
          stack: ['React Native'],
        },
        {
          name: 'ToiYeuTien',
          period: 'Oct 2020',
          summary: 'Mortgage and tax calculator tools in Vue.',
          stack: ['Vue.js'],
        },
        {
          name: 'CRM IMS / Checkpoint / Hivelab',
          period: '2020',
          summary: 'Internal CRM and HR systems — features, UI updates, CRUD flows, and bug fixes in Vue.',
          stack: ['Vue.js'],
        },
      ],
    },
    {
      id: 'freelance',
      company: 'Freelance',
      role: 'Frontend Developer',
      period: '2022 – 2023',
      projects: [
        {
          name: 'Cinvest',
          period: 'Jun 2022 – Aug 2022',
          summary: 'Next.js landing pages and components.',
          stack: ['Next.js', 'React'],
        },
        {
          name: 'OTG',
          period: 'Apr 2023 – May 2023',
          summary: 'Responsive UI implementation from design.',
          stack: ['HTML', 'CSS', 'JavaScript'],
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
      id: 'interview-qa',
      name: 'Interview Q&A',
      demoUrl: 'https://thanhdat130298.github.io/interview-qa/',
      githubUrl: 'https://github.com/thanhdat130298/interview-qa',
      stack: ['HTML', 'CSS', 'JavaScript'],
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
    { name: 'English', level: 'B1 — reading & basic communication' },
  ],

  interests: ['Football', 'Gaming', 'Traveling', 'Learning and building new things'],
}

/** Plain-text knowledge block for the AI chat system prompt */
export function buildKnowledgeBase(): string {
  const p = portfolio
  return `
Name: ${p.name}
Role: ${p.role}
Positioning: Primarily a frontend developer (Vue/React/Nuxt/Next, UI/UX). Orientation: growing into fullstack (Java/Spring Boot, APIs) while keeping frontend as the core strength. Familiar with Python/Django only at a light level — do not oversell Django.
Location: ${p.location} (${p.contact.address})
Summary: ${p.summary}
Looking for: ${p.lookingFor}

Contact (public only):
- Email: ${p.contact.email}
- Phone: ${p.contact.phoneDisplay}
- Facebook: ${p.contact.facebook}

Education: Informatics Teacher Education, The University of Danang — University of Education.

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
