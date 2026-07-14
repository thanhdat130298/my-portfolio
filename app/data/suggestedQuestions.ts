export interface SuggestedQuestion {
  id: string
  question: string
  answer: string
  sort_order: number
}

export const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: 'q1',
    question: 'What is Dat’s current role?',
    answer:
      'Dat is a Developer at Permate Global (since August 2023), working on the Permate affiliate marketing platform with Vue, Nuxt, Django, and Flutter — focused on UI/UX, APIs, and team collaboration.',
    sort_order: 1,
  },
  {
    id: 'q2',
    question: 'How many years of experience does he have?',
    answer:
      'Dat has 5+ years of experience building modern, responsive web applications, starting from internships at NCCSOFT in 2020 through roles at FPT Software, freelance work, and Permate Global.',
    sort_order: 2,
  },
  {
    id: 'q3',
    question: 'What tech stack does he use most?',
    answer:
      'He works primarily with HTML, CSS, JavaScript, TypeScript, Vue.js, React, Nuxt.js, and Next.js. He also has exposure to React Native, Flutter, Spring Boot, Django, and REST APIs.',
    sort_order: 3,
  },
  {
    id: 'q4',
    question: 'Where is he based?',
    answer:
      'Dat is based in Hoa Xuan, Cam Le, Da Nang, Vietnam.',
    sort_order: 4,
  },
  {
    id: 'q5',
    question: 'How can I contact him?',
    answer:
      'You can reach Dat at nguyenthanhdat1302@gmail.com, phone 0935 467 108, or Facebook at facebook.com/thanhdat130298.',
    sort_order: 5,
  },
]
