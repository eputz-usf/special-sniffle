export type InterdisciplinaryDetailContent = {
  overview: string[];
  fit: string[];
  preparation: string[];
  skills: string[];
  career: string;
  coursework?: { title: string; description: string; examples: string[] }[];
  electives?: string[];
  requirements?: string[];
  opportunities: string[];
};

// Summarized from the catalog text supplied by the user on October 8, 2026.
// Catalog year and academic approval remain to be confirmed.
export const interdisciplinaryDetailContent: Record<string, InterdisciplinaryDetailContent> = {
  'computer-science-and-criminology': {
    overview: [
      'This 120-credit interdisciplinary B.S. combines a foundation in computing with the study of crime and the criminal justice system. It connects software design and development with criminology, criminal behavior, and criminal justice research.',
      'The computing component covers data structures, algorithms, software engineering, secure computing, and artificial intelligence. Students bring their learning together in an interdisciplinary capstone project during their graduating semester.',
    ],
    fit: [
      'Want to connect computing with crime, justice, or public safety.',
      'Enjoy programming and want to understand how software systems are designed and secured.',
      'Are interested in criminal behavior, criminal justice systems, and research methods.',
      'Want an interdisciplinary project that brings computing and criminology together.',
    ],
    preparation: [
      'The curriculum includes programming, calculus, calculus-based physics, discrete structures, and statistics.',
      'Criminology courses include criminal justice systems, criminal behavior, and research methods.',
      'Consider how comfortable you are combining technical problem solving with social science study, and discuss preparation with an advisor.',
    ],
    skills: ['Programming', 'Data Structures', 'Algorithm Analysis', 'Software Engineering', 'Secure Coding', 'Operating Systems', 'Artificial Intelligence', 'Criminal Justice Research', 'Ethical and Professional Conduct', 'Interdisciplinary Project Design'],
    career: 'The program prepares students to connect computing knowledge with work in criminal justice agencies, including law enforcement, detention, courts, corrections, juvenile justice, probation, and parole. These are areas described in the supplied catalog text, rather than a guarantee of a particular role or employment outcome.',
    coursework: [
      { title: 'Math, science, and computing core — 56 credits', description: 'The core includes 28 credits of math and science and 28 credits of computer science.', examples: ['Calculus I and II; calculus-based physics with labs; discrete structures; statistics; natural science electives', 'COP 2510 Programming Concepts; COP 3514 Program Design; COP 4530 Data Structures', 'CDA 3103 Computer Organization; COP 4600 Operating Systems; COT 4400 Analysis of Algorithms', 'CEN 4020 Software Engineering; CNT 4419 Secure Coding; CIS 4250 Ethical Issues and Professional Conduct; CIS 1930 Freshman Seminar for Computing'] },
      { title: 'Criminology core — 9 credits', description: 'Three required courses establish the criminology foundation.', examples: ['CCJ 3024 Survey of the Criminal Justice System', 'CCJ 3117 Theories of Criminal Behavior', 'CCJ 3701 Research Methods in Criminal Justice I'] },
      { title: 'AI and capstone — 6 credits', description: 'Complete the capstone in the graduating semester.', examples: ['CAI 4002 Introduction to Artificial Intelligence', 'CIS 4910 Computer Science and Engineering Project'] },
      { title: 'Major electives — 27 credits', description: 'Choose 6 non-overlapping credits of upper-level computer science electives and 21 credits of criminology electives.', examples: ['Confirm approved courses and any special-topics options with Bellini advising.'] },
    ],
    electives: [
      'Computer science electives: 6 non-overlapping upper-level credits from approved computing electives. Special-topics courses may be available with advising confirmation.',
      'No more than 3 credits of supervised individual study may count as computer science electives, including CIS 4900, CIS 4915, and CIS 4940.',
      'Criminology electives: 21 credits from eligible upper-level CCJ, CJC, CJE, CJL, and DSC courses. Confirm the approved selection for your catalog year.',
      'Elective requirements are summarized here; a separate approved-course resource is still coming soon.',
    ],
    requirements: [
      'The supplied catalog lists 120 total degree credits and 98 credits of required coursework. Common prerequisites and mathematics pathway courses count toward requirements; they are not extra credits.',
      'Upper-division progression requires eligibility to register for COP 4530 Data Structures, good academic standing, and minimum 2.0 overall and USF GPAs. Before progression, students may take no more than two upper-level CAICC courses.',
      'Maintain at least a 2.0 semester, math and science, major, USF, and overall GPA.',
      'Unless the course inventory states otherwise, major required courses require a C or higher; C− is insufficient. Earn the required grade within two registered attempts. W, IF, U, and R grades count as attempts.',
      'Transfer students should complete state common prerequisites before entering USF. Prerequisite completion alone does not guarantee admission. Confirm course equivalencies and applicable residency requirements, including at least 18 approved USF specialization credits.',
      'Mandatory advising or mentoring and an exit interview or survey are required. Complete the capstone in the graduating semester.',
    ],
    opportunities: [
      'Industry internship: the college recommends an internship related to the major. CIS 4940 may earn elective credit, subject to approval and the elective limits.',
      'Undergraduate research: discuss mentored research and credit applicability with an advisor. Eligible students may document research through the 0-credit IDS 4914 Advanced Undergraduate Research Experience course.',
      'Bachelor’s/master’s pathway: the supplied catalog lists a pathway from the B.S. in Computer Science and Criminology to the M.S. in Computer Science. Confirm eligibility and requirements in the Graduate Catalog.',
    ],
  },

  'computer-science-and-interdisciplinary-social-sciences': {
    overview: [
      'This 120-credit interdisciplinary B.S. combines a foundation in computing with the study of people, communities, and social issues. It connects software design and development with social science research, sociology, and the critical analysis of society from different perspectives.',
      'The computing component covers data structures, algorithms, software engineering, secure computing, and artificial intelligence. The social science foundation includes research methods, disability studies, social theory, racial and ethnic relations, social psychology, and the sociology of sexualities. Students bring their learning together in an interdisciplinary capstone project during their graduating semester.',
      'Students also choose a social science specialization. Options include anthropology, economics, psychology, public health, political science, integrated community research, and other fields listed in the catalog.',
    ],
    fit: [
      'Want to connect computing with people, communities, social issues, or public systems.',
      'Enjoy programming and want to understand how software systems are designed and secured.',
      'Are interested in social science research, social behavior, inequality, disability, or cultural perspectives.',
      'Want to choose a social science specialization and bring it together with computing in an interdisciplinary project.',
    ],
    preparation: [
      'The curriculum includes programming, calculus, calculus-based physics, discrete structures, and statistics.',
      'Social science courses include research methods, social theory, disability studies, racial and ethnic relations, social psychology, and the sociology of sexualities.',
      'Consider how comfortable you are combining technical problem solving with the critical analysis of social issues from different perspectives. Discuss your preparation and specialization interests with an advisor.',
    ],
    skills: ['Programming', 'Data Structures', 'Algorithm Analysis', 'Software Engineering', 'Secure Coding', 'Operating Systems', 'Artificial Intelligence', 'Social Science Research', 'Critical Analysis of Social Issues', 'Ethical and Professional Conduct', 'Interdisciplinary Project Design'],
    career: 'This program brings together computing and social science research. Your chosen specialization can shape the questions, projects, and professional interests you explore. Discuss how to connect this preparation with career goals in technology, research, communities, or public systems with an advisor.',
    opportunities: [
      'Industry internship: the college recommends an internship related to the major. Ask advising whether CIS 4940 internship credit applies to your degree.',
      'Undergraduate research: explore mentored research and confirm how any credit applies. Eligible students may document research through the 0-credit IDS 4914 Advanced Undergraduate Research Experience course.',
      'Bachelor’s/master’s pathway: the supplied catalog lists a pathway from the B.S. in Computer Science and Interdisciplinary Social Sciences to the M.S. in Computer Science. Confirm eligibility and requirements in the Graduate Catalog.',
    ],
  },


  'computer-science-and-business-accountancy-and-analytics': {
    overview: [
      'This concentration within the 120-credit Computer Science and Business B.S. combines a foundation in computing with accounting, business analytics, and financial decision making. It connects software design and development with the systems businesses use to record, analyze, and review financial information.',
      'The computing component covers data structures, algorithms, software engineering, secure computing, and artificial intelligence. Business study includes financial and managerial accounting, economics, finance, organizational AI, data analytics, and public speaking. The Accountancy and Analytics concentration focuses on intermediate financial accounting, cost accounting, accounting information systems, and auditing.',
      'Students bring their computing and business knowledge together in an interdisciplinary capstone project during their graduating semester.',
    ],
    fit: [
      'Want to connect computing with accounting, financial information, or business decisions.',
      'Enjoy programming and want to understand how software systems are designed and secured.',
      'Are interested in financial reporting, cost analysis, accounting information systems, or auditing.',
      'Want to combine technical problem solving with business analytics in an interdisciplinary project.',
    ],
    preparation: [
      'The curriculum includes programming, calculus, calculus-based physics, discrete structures, and statistics or quantitative methods.',
      'Business and concentration courses include economics, finance, financial and managerial accounting, intermediate accounting, cost accounting, and auditing.',
      'Consider how comfortable you are combining technical problem solving with careful financial analysis. Accounting courses have specific sequencing and progression rules; discuss preparation and planning with an advisor.',
    ],
    skills: ['Programming', 'Data Structures', 'Algorithm Analysis', 'Software Engineering', 'Secure Coding', 'Artificial Intelligence', 'Business Data Analytics', 'Financial Accounting', 'Cost Accounting', 'Accounting Information Systems', 'Auditing', 'Professional Communication'],
    career: 'The broader Computer Science and Business program identifies corporate accounting systems analyst among its potential career directions. This concentration connects computing with financial accounting, accounting information systems, cost analysis, and auditing. Discuss how those interests can guide internships and career goals with an advisor.',
    opportunities: [
      'Industry internship: the college recommends an internship related to the major. Ask advising whether CIS 4940 internship credit applies to your degree.',
      'Undergraduate research: explore mentored research and confirm how any credit applies. Eligible students may document research through the 0-credit IDS 4914 Advanced Undergraduate Research Experience course.',
      'Bachelor’s/master’s pathway: the supplied catalog lists a pathway from the B.S. in Computer Science and Business to the M.S. in Computer Science. Confirm eligibility and requirements in the Graduate Catalog.',
    ],
  },


  'computer-science-and-business-analytics-and-information-systems': {
    overview: [
      'This concentration within the 120-credit Computer Science and Business B.S. combines a foundation in computing with business data analysis and information systems. It connects software design and development with the databases, analytical tools, and data systems organizations use to support decisions.',
      'The computing component covers data structures, algorithms, software engineering, secure computing, and artificial intelligence. Business study includes accounting, economics, finance, organizational AI, data analytics, and public speaking. The Business Analytics and Information Systems concentration focuses on database design and administration, data mining, predictive analytics, statistical programming, big data for AI and analytics, and Python for business analytics.',
      'Students bring their computing and business knowledge together in an interdisciplinary capstone project during their graduating semester.',
    ],
    fit: [
      'Want to connect computing with business data, information systems, or decision making.',
      'Enjoy programming and want to understand how software systems are designed and secured.',
      'Are interested in databases, predictive analytics, statistical programming, or working with large datasets.',
      'Want to use Python and analytical methods to explore business questions in an interdisciplinary project.',
    ],
    preparation: [
      'The curriculum includes programming, calculus, calculus-based physics, discrete structures, and statistics or quantitative methods.',
      'Business and concentration courses combine accounting, economics, and finance with database design, data mining, statistical programming, big data, and Python.',
      'Consider how comfortable you are combining technical problem solving with statistical analysis and business questions. Discuss preparation and course planning with an advisor.',
    ],
    skills: ['Programming', 'Data Structures', 'Algorithm Analysis', 'Software Engineering', 'Secure Coding', 'Artificial Intelligence', 'Database Design and Administration', 'Data Mining', 'Predictive Analytics', 'Statistical Programming', 'Big Data Analytics', 'Python for Business Analytics', 'Professional Communication'],
    career: 'This concentration connects computing with database management, business analytics, and information systems. Its focus can help you explore professional interests in analyzing business data and supporting organizational decisions. Discuss relevant internships and career directions with an advisor; the supplied catalog does not provide concentration-specific employment or salary figures.',
    opportunities: [
      'Industry internship: the college recommends an internship related to the major. Ask advising whether CIS 4940 internship credit applies to your degree.',
      'Undergraduate research: explore mentored research and confirm how any credit applies. Eligible students may document research through the 0-credit IDS 4914 Advanced Undergraduate Research Experience course.',
      'Bachelor’s/master’s pathway: the supplied catalog lists a pathway from the B.S. in Computer Science and Business to the M.S. in Computer Science. Confirm eligibility and requirements in the Graduate Catalog.',
    ],
  },


  'computer-science-and-business-digital-marketing-and-analytics': {
    overview: [
      'This concentration within the 120-credit Computer Science and Business B.S. combines a foundation in computing with digital marketing, marketing research, and analytics. It connects software design and development with the technology and data businesses use to understand markets and support marketing decisions.',
      'The computing component covers data structures, algorithms, software engineering, secure computing, and artificial intelligence. Business study includes accounting, economics, finance, organizational AI, data analytics, and public speaking. The Digital Marketing and Analytics concentration focuses on marketing principles, marketing research, digital marketing, marketing analytics, and marketing technology and AI.',
      'Students bring their computing and business knowledge together in an interdisciplinary capstone project during their graduating semester.',
    ],
    fit: [
      'Want to connect computing with digital marketing, marketing technology, or business decisions.',
      'Enjoy programming and want to understand how software systems are designed and secured.',
      'Are interested in marketing research, analyzing marketing data, or how AI is used in marketing.',
      'Want to combine technical problem solving with marketing questions in an interdisciplinary project.',
    ],
    preparation: [
      'The curriculum includes programming, calculus, calculus-based physics, discrete structures, and statistics or quantitative methods.',
      'Business and concentration courses combine accounting, economics, and finance with marketing principles, research, digital marketing, analytics, and marketing technology and AI.',
      'Consider how comfortable you are combining technical problem solving with research and analysis of marketing questions. Discuss preparation and course planning with an advisor.',
    ],
    skills: ['Programming', 'Data Structures', 'Algorithm Analysis', 'Software Engineering', 'Secure Coding', 'Artificial Intelligence', 'Business Data Analytics', 'Marketing Research', 'Digital Marketing', 'Marketing Analytics', 'Marketing Technology and AI', 'Professional Communication'],
    career: 'The broader Computer Science and Business program identifies marketing systems analyst among its potential career directions. This concentration connects computing with digital marketing, marketing research, analytics, and marketing technology and AI. Discuss how those interests can guide internships and career goals with an advisor.',
    opportunities: [
      'Industry internship: the college recommends an internship related to the major. Ask advising whether CIS 4940 internship credit applies to your degree.',
      'Undergraduate research: explore mentored research and confirm how any credit applies. Eligible students may document research through the 0-credit IDS 4914 Advanced Undergraduate Research Experience course.',
      'Bachelor’s/master’s pathway: the supplied catalog lists a pathway from the B.S. in Computer Science and Business to the M.S. in Computer Science. Confirm eligibility and requirements in the Graduate Catalog.',
    ],
  },


  'computer-science-and-business-fintech': {
    overview: [
      'This concentration within the 120-credit Computer Science and Business B.S. combines a foundation in computing with finance and financial technology. It connects software design and development with the data, models, and systems used in financial institutions and markets.',
      'The computing component covers data structures, algorithms, software engineering, secure computing, and artificial intelligence. Business study includes accounting, economics, finance, organizational AI, data analytics, and public speaking. The Fintech concentration focuses on financial institutions and markets, financial modeling and analytics, fintech foundations, big data and machine learning in finance, and algorithmic trading.',
      'Students bring their computing and business knowledge together in an interdisciplinary capstone project during their graduating semester.',
    ],
    fit: [
      'Want to connect computing with finance, financial markets, or financial technology.',
      'Enjoy programming and want to understand how software systems are designed and secured.',
      'Are interested in financial modeling, analytics, machine learning in finance, or algorithmic trading.',
      'Want to combine technical problem solving with financial questions in an interdisciplinary project.',
    ],
    preparation: [
      'The curriculum includes programming, calculus, calculus-based physics, discrete structures, and statistics or quantitative methods.',
      'Business and concentration courses combine accounting, economics, and finance with financial modeling, financial markets, big data, machine learning, and algorithmic trading.',
      'Consider how comfortable you are combining technical problem solving with quantitative financial analysis. Discuss preparation and course planning with an advisor.',
    ],
    skills: ['Programming', 'Data Structures', 'Algorithm Analysis', 'Software Engineering', 'Secure Coding', 'Artificial Intelligence', 'Business Data Analytics', 'Financial Modeling', 'Financial Analytics', 'Machine Learning in Finance', 'Algorithmic Trading', 'Professional Communication'],
    career: 'The broader Computer Science and Business program identifies fintech analyst, blockchain developer, and financial software engineer among its potential career directions. This concentration connects computing with financial modeling, financial markets, analytics, and machine learning in finance. Discuss how those interests can guide internships and career goals with an advisor.',
    opportunities: [
      'Industry internship: the college recommends an internship related to the major. Ask advising whether CIS 4940 internship credit applies to your degree.',
      'Undergraduate research: explore mentored research and confirm how any credit applies. Eligible students may document research through the 0-credit IDS 4914 Advanced Undergraduate Research Experience course.',
      'Bachelor’s/master’s pathway: the supplied catalog lists a pathway from the B.S. in Computer Science and Business to the M.S. in Computer Science. Confirm eligibility and requirements in the Graduate Catalog.',
    ],
  },


  'computer-science-and-business-supply-chain-management': {
    overview: [
      'This concentration within the 120-credit Computer Science and Business B.S. combines a foundation in computing with supply chain management, logistics, and global business. It connects software design and development with the systems and data used to source goods, manage distribution, and support supply chain decisions.',
      'The computing component covers data structures, algorithms, software engineering, secure computing, and artificial intelligence. Business study includes accounting, economics, finance, organizational AI, data analytics, and public speaking. The Supply Chain Management concentration focuses on supply chain management, global sourcing, global commerce, logistics and physical distribution, and supply chain analytics.',
      'Students bring their computing and business knowledge together in an interdisciplinary capstone project during their graduating semester.',
    ],
    fit: [
      'Want to connect computing with supply chains, logistics, or global business.',
      'Enjoy programming and want to understand how software systems are designed and secured.',
      'Are interested in global sourcing, distribution, or using data to support supply chain decisions.',
      'Want to combine technical problem solving with supply chain questions in an interdisciplinary project.',
    ],
    preparation: [
      'The curriculum includes programming, calculus, calculus-based physics, discrete structures, and statistics or quantitative methods.',
      'Business and concentration courses combine accounting, economics, and finance with global sourcing, commerce, logistics, physical distribution, and supply chain analytics.',
      'Consider how comfortable you are combining technical problem solving with quantitative analysis and global business questions. Discuss preparation and course planning with an advisor.',
    ],
    skills: ['Programming', 'Data Structures', 'Algorithm Analysis', 'Software Engineering', 'Secure Coding', 'Artificial Intelligence', 'Business Data Analytics', 'Supply Chain Management', 'Global Sourcing', 'Global Commerce', 'Logistics and Distribution', 'Supply Chain Analytics', 'Professional Communication'],
    career: 'The broader Computer Science and Business program identifies supply chain analyst among its potential career directions. This concentration connects computing with global sourcing, logistics, distribution, and supply chain analytics. Discuss how those interests can guide internships and career goals with an advisor.',
    opportunities: [
      'Industry internship: the college recommends an internship related to the major. Ask advising whether CIS 4940 internship credit applies to your degree.',
      'Undergraduate research: explore mentored research and confirm how any credit applies. Eligible students may document research through the 0-credit IDS 4914 Advanced Undergraduate Research Experience course.',
      'Bachelor’s/master’s pathway: the supplied catalog lists a pathway from the B.S. in Computer Science and Business to the M.S. in Computer Science. Confirm eligibility and requirements in the Graduate Catalog.',
    ],
  },

};
