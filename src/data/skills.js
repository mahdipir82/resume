import { Code2, Database, Globe2, Wrench } from 'lucide-react'

export const skillGroups = [
  {
    title: 'Backend',
    icon: Code2,
    skills: [
      { name: 'Python', level: 'آشنا' },
      { name: 'Django', level: 'در حال یادگیری و تمرین' },
      { name: 'Django REST Framework', level: 'در حال یادگیری' },
      { name: 'REST API', level: 'آشنا' },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', level: 'آشنا' },
      { name: 'طراحی مدل‌های دیتابیس', level: 'در حال یادگیری' },
    ],
  },
  {
    title: 'Frontend',
    icon: Globe2,
    skills: [
      { name: 'HTML', level: 'آشنا' },
      { name: 'CSS', level: 'آشنا' },
      { name: 'JavaScript', level: 'آشنا' },
      { name: 'React', level: 'در حال یادگیری' },
      { name: 'Tailwind CSS', level: 'در حال یادگیری' },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', level: 'آشنا' },
      { name: 'GitHub', level: 'آشنا' },
      { name: 'Postman', level: 'آشنا' },
      { name: 'VS Code', level: 'ابزار روزمره' },
    ],
  },
]
