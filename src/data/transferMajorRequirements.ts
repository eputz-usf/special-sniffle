export type TransferRequirement = {
  id: string;
  text: string;
};

export type TransferRequirementLevel = {
  id: string;
  label: string;
  requirements: TransferRequirement[];
};

export type MajorTransferRequirement = {
  id: string;
  title: string;
  degreeLinks: {
    label: string;
    slug: string;
  }[];
  levels: TransferRequirementLevel[];
};

export const majorTransferRequirements: MajorTransferRequirement[] = [
  {
    id: 'cs-ai',
    title: 'Computer Science and Artificial Intelligence',
    degreeLinks: [
      { label: 'Computer Science', slug: 'computer-science' },
      { label: 'Artificial Intelligence', slug: 'artificial-intelligence' },
    ],
    levels: [
      {
        id: 'lower-level',
        label: 'Lower-Level (LL) Transfer',
        requirements: [
          {
            id: 'math-test-score',
            text: 'SAT math section score of 570 or higher, or ACT math section score of 24 or higher.',
          },
          {
            id: 'high-school-gpa',
            text: 'High school GPA of 4.00 or higher, as calculated by the Office of Admissions.',
          },
        ],
      },
      {
        id: 'mid-upper-level',
        label: 'Mid-Level (ML) and Upper-Level (UL) Transfer',
        requirements: [
          {
            id: 'programming-concepts-b',
            text: 'Complete Programming Concepts (COP 1220, COP 2030, COP 2224, COP 2360, COP 2510, or COP 2800) with a minimum grade of B or better (maximum two attempts).',
          },
          {
            id: 'calculus-i-b',
            text: 'Complete Calculus I (MAC x281 or MAC x311) with a minimum grade of B or better (maximum two attempts).',
          },
          {
            id: 'calculus-ii-c',
            text: 'Complete Calculus II (MAC x282 or MAC x312) with a minimum grade of C or better (maximum two attempts).',
          },
          {
            id: 'physics-i-b',
            text: 'Complete Calculus-based Physics I plus lab (PHY x048/PHY x048L, or PHY x045/PHY x045L) with a minimum grade of B or better (maximum two attempts).',
          },
        ],
      },
    ],
  },
  {
    id: 'computer-engineering',
    title: 'Computer Science and Engineering',
    degreeLinks: [
      {
        label: 'Computer Science and Engineering',
        slug: 'computer-science-and-engineering',
      },
    ],
    levels: [
      {
        id: 'lower-level',
        label: 'Lower-Level (LL) Transfer',
        requirements: [
          {
            id: 'math-test-score',
            text: 'SAT math section score of 570 or higher, or ACT math section score of 24 or higher.',
          },
          {
            id: 'high-school-gpa',
            text: 'High school GPA of 4.00 or higher, as calculated by the Office of Admissions.',
          },
        ],
      },
      {
        id: 'mid-upper-level',
        label: 'Mid-Level (ML) and Upper-Level (UL) Transfer',
        requirements: [
          {
            id: 'programming-concepts-b',
            text: 'Complete Programming Concepts (COP 1220, COP 2030, COP 2224, COP 2360, COP 2510, or COP 2800) with a minimum grade of B or better (maximum two attempts).',
          },
          {
            id: 'calculus-i-b',
            text: 'Complete Calculus I (MAC x281 or MAC x311) with a minimum grade of B or better (maximum two attempts).',
          },
          {
            id: 'calculus-ii-c',
            text: 'Complete Calculus II (MAC x282 or MAC x312) with a minimum grade of C or better (maximum two attempts).',
          },
          {
            id: 'physics-i-b',
            text: 'Complete Calculus-based Physics I plus lab (PHY x048/PHY x048L, or PHY x045/PHY x045L) with a minimum grade of B or better (maximum two attempts).',
          },
          {
            id: 'chemistry-i-c',
            text: 'Complete Chemistry I plus lab (CHM x045/CHM x045L, or CHM x045C, or CHS x440/CHS x440L) with a minimum grade of C or better (maximum two attempts).',
          },
        ],
      },
    ],
  },
  {
    id: 'cybersecurity-it',
    title: 'Cybersecurity and Information Technology',
    degreeLinks: [
      { label: 'Cybersecurity', slug: 'cybersecurity' },
      { label: 'Information Technology', slug: 'information-technology' },
    ],
    levels: [
      {
        id: 'lower-level',
        label: 'Lower-Level (LL) Transfer',
        requirements: [
          {
            id: 'math-test-score',
            text: 'SAT math section score of 570 or higher, or ACT math section score of 24 or higher.',
          },
          {
            id: 'high-school-gpa',
            text: 'High school GPA of 4.00 or higher, as calculated by the Office of Admissions.',
          },
        ],
      },
      {
        id: 'mid-upper-level',
        label: 'Mid-Level (ML) and Upper-Level (UL) Transfer',
        requirements: [
          {
            id: 'programming-concepts-c',
            text: 'Complete Programming Concepts (COP 1220, COP 2030, COP 2224, COP 2360, COP 2510, or COP 2800) with a minimum grade of C or better (maximum two attempts).',
          },
          {
            id: 'databases-b',
            text: 'Complete Intro to Databases for IT (CGS 1540, CGS 2541, or equivalent) with a minimum grade of B or better (maximum of two attempts and course must be three credits).',
          },
          {
            id: 'pre-calculus-b',
            text: 'Complete Pre-Calculus (MAC x147, or MAC x140 and MAC x114) with a minimum grade of B or better (maximum of two attempts).',
          },
          {
            id: 'statistics-b',
            text: 'Complete Introductory Statistics I (STA x023 or STA x122) with a minimum grade of B or better (maximum of two attempts).',
          },
          {
            id: 'discrete-math-b',
            text: 'Complete Discrete Math (MAD 2104) with a minimum grade of B or better (maximum of two attempts).',
          },
          {
            id: 'physics-b',
            text: 'Complete any Physics course (PHY 1000 - PHY 2999) with a minimum grade of B or better (maximum of two attempts).',
          },
        ],
      },
    ],
  },
];
