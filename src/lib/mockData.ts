export const mockProjects = [
  {
    id: "proj-1",
    title: "AI Adoption in Higher Education",
    field: "Education Technology • UTAUT • Higher Education",
    progress: 62,
    papersCollected: 1284,
    papersScreened: 742,
    included: 163,
    gapConfidence: 91,
    words: 7420,
    readiness: 84,
    updated: "2 hours ago",
    status: "Active",
    color: "amber"
  },
  {
    id: "proj-2",
    title: "Digital Leadership and Firm Performance",
    field: "Strategic Management • RBV • SMEs",
    progress: 38,
    papersCollected: 892,
    papersScreened: 421,
    included: 87,
    gapConfidence: 76,
    words: 3200,
    readiness: 42,
    updated: "Yesterday",
    status: "Screening",
    color: "blue"
  },
  {
    id: "proj-3",
    title: "Telemedicine Adoption in Sub-Saharan Africa",
    field: "Health Informatics • TOE • Africa",
    progress: 15,
    papersCollected: 2156,
    papersScreened: 120,
    included: 12,
    gapConfidence: 0,
    words: 0,
    readiness: 18,
    updated: "3 days ago",
    status: "Literature Search",
    color: "emerald"
  }
];

export const mockPapers = [
  { id: 1, title: "Understanding AI adoption in university teaching: An extended UTAUT perspective", authors: "Zhang et al.", year: 2024, journal: "Computers & Education", citations: 142, doi: "10.1016/j.compedu.2024.105123", decision: "Include", confidence: 96, population: "University lecturers", country: "China", theory: "UTAUT2", method: "Survey (n=842)" },
  { id: 2, title: "Generative AI acceptance among higher education students: A systematic review", authors: "Okonkwo & Bello", year: 2023, journal: "Int. J. Educ. Technol.", citations: 89, doi: "10.1000/ijet.2023.04", decision: "Exclude", confidence: 94, population: "Students", country: "Nigeria", theory: "TAM", method: "Systematic Review" },
  { id: 3, title: "Faculty resistance to AI tools: Institutional theory lens", authors: "Müller et al.", year: 2025, journal: "Higher Education", citations: 34, doi: "10.1007/s10734-025-01234", decision: "Include", confidence: 88, population: "Faculty", country: "Germany", theory: "Institutional Theory", method: "Interviews (n=34)" },
  { id: 4, title: "AI literacy as mediator between training and adoption intention", authors: "Santos & Lim", year: 2024, journal: "British J. Educ. Technol.", citations: 67, doi: "10.1111/bjet.13456", decision: "Include", confidence: 91, population: "Lecturers", country: "Singapore", theory: "UTAUT + TTF", method: "PLS-SEM (n=412)" },
  { id: 5, title: "Barriers to generative AI integration in African universities", authors: "Adeyemi et al.", year: 2024, journal: "Educ. Inf. Technol.", citations: 112, doi: "10.1007/s10639-024-12345", decision: "Maybe", confidence: 61, population: "Lecturers & Admin", country: "South Africa", theory: "TOE", method: "Mixed (n=210)" },
  { id: 6, title: "Cross-cultural comparison of AI acceptance: US, UK and Japan", authors: "Chen & Williams", year: 2023, journal: "Tech. Soc.", citations: 201, doi: "10.1016/j.techsoc.2023.102123", decision: "Include", confidence: 93, population: "Students & Lecturers", country: "USA/UK/Japan", theory: "UTAUT", method: "Survey (n=1204)" },
];

export const mockGaps = [
  { id: "gap-1", title: "AI literacy → Trust → Adoption chain among lecturers", population: "Lecturers", geography: "Sub-Saharan Africa", method: "Longitudinal", novelty: 92, feasibility: 84, publication: 88, overall: 89, evidence: "Only 3 of 163 included studies test full mediation chain; 0 in Africa" },
  { id: "gap-2", title: "Institutional pressures vs. individual acceptance (Institutional + UTAUT)", population: "Private vs Public universities", geography: "Nigeria/Ghana", method: "Mixed", novelty: 88, feasibility: 72, publication: 86, overall: 86, evidence: "Most studies use TAM/UTAUT alone; institutional lens underexplored" },
  { id: "gap-3", title: "Generative AI (ChatGPT-specific) vs. general AI adoption", population: "Lecturers", geography: "Global South", method: "Comparative survey", novelty: 81, feasibility: 94, publication: 85, overall: 85, evidence: "312 papers on 'AI' generally, only 76 on GenAI specifically" },
];

export const mockEvidenceMatrix = [
  { study: "Zhang et al. 2024", theory: "UTAUT2", iv: "Performance expectancy", dv: "Intention", finding: "β=0.42***", population: "Lecturers, China", gap: "No trust variable" },
  { study: "Santos 2024", theory: "UTAUT+TTF", iv: "AI literacy → Trust", dv: "Adoption", finding: "Mediation supported", population: "Lecturers, SG", gap: "Single country" },
  { study: "Adeyemi 2024", theory: "TOE", iv: "Institutional support", dv: "Adoption", finding: "Qual: support low", population: "SA Lecturers", gap: "No quantification" },
];

export const prismaData = {
  identified: 2847,
  duplicates: 563,
  screened: 2284,
  excludedScreening: 1542,
  fullTextAssessed: 742,
  excludedFullText: 579,
  included: 163
};
