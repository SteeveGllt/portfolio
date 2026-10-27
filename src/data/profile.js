export function publicPath(file) {
  if (!file) return ''
  if (/^(https?:)?\/\//.test(file) || file.startsWith('data:')) return file
  return `${import.meta.env.BASE_URL}${String(file).replace(/^\//, '')}`
}

export const profile = {
  firstName: 'Steeve',
  lastName: 'Guillot',
  fullName: 'Steeve Guillot',
  monogram: 'SG',
  role: 'Développeur Full Stack junior',
  greeting: 'Bonjour, je suis',
  tagline:
    "Développeur full stack junior (bac+5), curieux et rigoureux. Ma formation m'a donné des bases en développement d'applications de gestion et en systèmes d'information. Je cherche un premier poste où apprendre auprès d'une équipe et évoluer vers le back-end.",
  about:
    "Développeur full stack junior (bac+5), curieux et rigoureux. Ma formation m'a donné des bases en développement d'applications de gestion et en systèmes d'information. Je cherche un premier poste où apprendre auprès d'une équipe et évoluer vers le back-end.",
  contactLead:
    'Disponible pour un premier poste de développeur. Écrivez-moi par le formulaire ou directement par e-mail.',
  email: 'steeveguillot@orange.fr',
  githubUrl: 'https://github.com/SteeveGllt',
  linkedinUrl: 'https://www.linkedin.com/in/steeve-guillot-945835230',
  location: 'Franche-Comté',
  availability: 'Disponible pour un premier poste de développeur',
  cvFile: 'cv-steeve-guillot.pdf',
  photo: '',
  photoAlt: 'Portrait de Steeve Guillot',
  qualities: ["Esprit d'équipe", 'Autonomie', 'Rigueur', 'Bienveillance'],
  interests: ['Jeux vidéo', 'Football', 'Musculation', 'Voyage'],
  stats: [
    { value: 'Bac+5', label: 'Expert en Système Informatique' },
    { value: '3', label: "structures où j'ai travaillé (entreprise, collège, hôpital)" },
    { value: 'Disponible', label: 'pour un premier poste de développeur' },
  ],
}

export const navLinks = [
  { id: 'accueil', href: '#accueil', label: 'Accueil' },
  { id: 'projets', href: '#projets', label: 'Projets' },
  { id: 'competences', href: '#competences', label: 'Compétences' },
  { id: 'parcours', href: '#parcours', label: 'Parcours' },
  { id: 'contact', href: '#contact', label: 'Contact' },
]
