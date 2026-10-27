export const experiences = [
  {
    period: 'Depuis octobre 2024',
    title: 'Technicien informatique',
    organization: 'Centre Hospitalier Louis Pasteur',
    location: 'Dole',
    summary:
      "Migration du tableau de bord de gestion des lits vers Laravel, et maintien en condition opérationnelle du système d'information.",
    // TODO: préciser ma part exacte
    todo: 'TODO: préciser ma part exacte',
  },
  {
    period: '2023-2024',
    title: 'Développeur C# (alternance)',
    organization: 'Fromageries BRUN',
    location: 'Poligny',
    summary: 'Application de gestion des stocks, articles et clients (C#, WPF, Access).',
  },
  {
    period: '2022-2023',
    title: 'Technicien développeur (alternance)',
    organization: 'Collège Mont Roland',
    location: 'Dole',
    summary:
      "Participation au développement d'un site de gestion de mails pour le service informatique.",
    // TODO: préciser ma part
    todo: 'TODO: préciser ma part',
  },
  {
    period: '2018-2021',
    title: 'Stages',
    organization: 'Pro Gray Informatique',
    location: 'Gray',
    summary: 'Application de gestion de clients.',
  },
]

export function warnIncompleteExperiences() {
  for (const experience of experiences) {
    const pending = [experience.summary, experience.todo].filter(
      (value) => typeof value === 'string' && value.includes('TODO'),
    )
    if (pending.length > 0) {
      console.warn(
        `[portfolio] Expérience « ${experience.title} — ${experience.organization} » à compléter :`,
        pending,
      )
    }
  }
}
