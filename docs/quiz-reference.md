# Quiz Questions, Answers, and Recommendation Scoring

This document is generated from the quiz question files and recommendation config files in the app. 

## Shared Recommendation Rules

All quiz groups use the same recommendation engine except the high-school quiz, which calls a thin wrapper around the same engine.

1. Each selected answer adds points to one or more degree paths.
2. Single-select questions add points from one answer.
3. Multi-select questions add points from every selected answer, up to that question's selection limit.
4. Each degree also has a calculated maximum possible score based on the best-scoring answers available for that quiz.
5. Match percentage = student score for that degree / maximum possible score for that degree.
6. Results are ranked by match percentage, then by raw score as the tie-breaker.
7. The top 3 degree paths are recommended.
8. Answers marked "No direct recommendation points" still appear in the quiz, but they do not change the degree score directly.

## Degree Legend

| Short name | Full degree path |
| --- | --- |
| CS | Computer Science |
| AI | Artificial Intelligence |
| CY | Cybersecurity |
| IT | Information Technology |
| CSE | Computer Science and Engineering |
| CS + Crim | BS in Computer Science and Criminology |
| CS + ISS | BS in Computer Science and Interdisciplinary Social Sciences |
| CS + Acct | BS in Computer Science and Business: Accountancy and Analytics Concentration |
| CS + BAIS | BS in Computer Science and Business: Business Analytics and Information Systems Concentration |
| CS + Marketing | BS in Computer Science and Business: Digital Marketing and Analytics Concentration |
| CS + Fintech | BS in Computer Science and Business: Fintech Concentration |
| CS + Supply Chain | BS in Computer Science and Business: Supply Chain Management Concentration |

## High School Student Quiz

Quiz version: `high-school-v3`

planned file flow:

- Questions: `src/pages/highSchool/quiz/HighSchoolIntakeQuiz.tsx`
- Scoring: `src/config/highSchoolQuizRecommendationConfig.ts`

Recommended degree pool:

- CS
- AI
- CY
- IT
- CSE
- CS + Crim
- CS + ISS
- CS + Acct
- CS + BAIS
- CS + Marketing
- CS + Fintech
- CS + Supply Chain

### 1. College search stage: Where are you in your college search?

Choose the option that best describes where you are right now.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| I am a high school freshman or sophomore | I am just starting to explore college and majors. | No direct recommendation points |
| I am a high school junior | I am starting to compare colleges, majors, and careers. | No direct recommendation points |
| I am a high school senior | I am thinking about applications, decisions, or next steps. | No direct recommendation points |
| I am taking a gap year or exploring options | I want to learn more before choosing a direction. | No direct recommendation points |
| I am a parent or family member helping a student | I am helping someone understand their college options. | No direct recommendation points |

### 2. Favorite subjects: Which school subjects do you enjoy most?

Your favorite subjects can point toward different ways to explore computing.

Selection: Choose up to 5.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Math | Logic, numbers, formulas, and problem solving. | +1 CS, +1 AI |
| Science | Experiments, systems, and understanding how things work. | +1 CSE, +1 AI |
| Computer science or technology classes | Coding, digital tools, devices, or tech projects. | +1 CS, +1 IT |
| Engineering or robotics | Building, testing, fixing, or designing things. | +2 CSE |
| Health science or biology | The human body, medicine, health, or life science. | +1 IT, +1 AI |
| Business or entrepreneurship | Products, companies, leadership, money, or strategy. | +1 IT, +1 CS + Acct, +1 CS + BAIS, +1 CS + Marketing, +1 CS + Fintech, +1 CS + Supply Chain |
| Accounting or finance | Money, budgets, reports, banks, or how businesses track numbers. | +2 CS + Acct, +2 CS + Fintech |
| Marketing or media | Ads, social media, customers, brands, or online campaigns. | +2 CS + Marketing, +1 CS + ISS |
| Business operations | How products, supplies, shipping, and work processes move. | +2 CS + Supply Chain, +1 CS + BAIS, +1 IT |
| Psychology or sociology | People, behavior, communities, and society. | +1 IT, +1 CY, +2 CS + ISS |
| Criminal justice or law | Rules, safety, crime, investigations, or legal systems. | +2 CY, +3 CS + Crim |
| Art, design, or media | Creativity, visuals, stories, or communication. | +1 CS |
| English, writing, or communication | Explaining ideas, writing clearly, or presenting information. | +1 IT, +1 CS + ISS, +1 CS + Marketing |
| I am still figuring it out | I do not have one favorite subject yet. | No direct recommendation points |

### 3. Topic interests: Which topics sound interesting to you?

Choose the topics that catch your attention most today. This can change later.

Selection: Choose up to 6.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Building apps, websites, or games | Creating digital tools people can use. | +3 CS |
| Artificial intelligence | Teaching computers to recognize patterns, answer questions, or make predictions. | +3 AI, +1 CS |
| Cybersecurity | Protecting accounts, systems, networks, and private information. | +3 CY |
| Data and patterns | Using information to understand problems and make decisions. | +2 AI, +1 CS |
| Robots, smart devices, or sensors | Connecting software to machines, devices, or electronics. | +3 CSE |
| Health and medical technology | Using technology to support doctors, patients, hospitals, or health research. | +2 IT, +1 AI |
| Business and technology | Using technology to help companies, teams, or organizations work better. | +2 IT, +2 CS + BAIS, +1 CS + Acct, +1 CS + Marketing, +1 CS + Fintech, +1 CS + Supply Chain |
| Money records and reports | Using technology to understand budgets, reports, or accounting data. | +4 CS + Acct, +1 CS + BAIS |
| Business data | Using charts, dashboards, and data to help a business decide what to do. | +4 CS + BAIS, +1 IT, +1 AI |
| Online ads and customer data | Using technology to understand customers, websites, campaigns, or social media. | +4 CS + Marketing, +1 CS + ISS, +1 CS |
| Money apps and banking technology | Using technology for payments, banking, investing, or secure financial tools. | +4 CS + Fintech, +1 CY, +1 CS + Acct |
| Shipping, supplies, and operations | Using technology to move products, track inventory, or improve business processes. | +4 CS + Supply Chain, +1 CS + BAIS, +1 IT |
| Crime, justice, and digital investigations | Using computing to understand cybercrime, digital evidence, or public safety. | +3 CY, +3 CS + Crim |
| Social media, online behavior, or digital communities | Understanding how people use technology and how it affects society. | +1 IT, +2 CS + ISS, +1 CS + Marketing |
| Design, creativity, or user experience | Making technology easier, clearer, and more enjoyable to use. | +1 CS, +1 IT, +1 CS + ISS, +1 CS + Marketing |
| Networks, cloud, or computer systems | Understanding how computers, servers, and the internet work together. | +3 IT, +1 CY |
| I am not sure yet | I want to see examples before choosing. | No direct recommendation points |

### 4. Interesting tasks: What kind of task sounds interesting to you?

Choose the tasks you would most enjoy spending time on.

Selection: Choose up to 4.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Build a website or app people can use | For example, a tool that helps people compare options or make decisions. | +3 CS |
| Train an AI tool to recognize patterns | For example, helping a computer predict what users may need. | +3 AI |
| Find and fix a security problem | For example, protecting an account, website, or organization system. | +3 CY, +1 CS + Crim, +1 CS + Fintech |
| Look at data and explain what it means | For example, finding trends in health, business, community, or technology data. | +2 AI, +1 CS, +2 CS + BAIS, +1 CS + Acct, +1 CS + Marketing |
| Check money data for patterns | For example, finding mistakes or trends in reports, payments, or budgets. | +3 CS + Acct, +1 CS + BAIS |
| Make a business dashboard | For example, showing sales, customers, or project data in a clear way. | +3 CS + BAIS, +1 IT, +1 AI |
| Study what people click online | For example, learning which ads, posts, or pages people respond to. | +3 CS + Marketing, +1 CS + ISS |
| Work on a money or payment app | For example, helping make a finance tool easier or safer to use. | +3 CS + Fintech, +1 CY |
| Improve how products move | For example, tracking supplies, deliveries, inventory, or shipping data. | +3 CS + Supply Chain, +1 IT |
| Connect software to a device or robot | For example, making a robot, sensor, or smart device respond correctly. | +3 CSE |
| Help a hospital or clinic use technology better | For example, improving patient records, scheduling, or health data systems. | +3 IT |
| Investigate a digital problem | For example, tracing suspicious activity or understanding digital evidence. | +3 CY, +3 CS + Crim |
| Improve how a technology looks or feels | For example, making an app easier for people to use. | +1 CS, +1 IT, +1 CS + ISS, +1 CS + Marketing |
| Help a company choose the right technology | For example, recommending tools, systems, or software for a team. | +2 IT, +2 CS + BAIS, +1 CS + Supply Chain |
| Keep computer systems running smoothly | For example, helping with networks, servers, accounts, or devices. | +2 IT |

### 5. Career curiosity: Which job description sounds most interesting?

Choose the descriptions that sound closest to work you may enjoy.

Selection: Choose up to 3.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Someone who builds software | Creates apps, websites, tools, and programs people use. | +3 CS |
| Someone who works with AI | Builds or improves systems that can learn, predict, or generate answers. | +3 AI |
| Someone who protects technology | Helps keep accounts, networks, companies, and data safe. | +3 CY |
| Someone who works with data | Finds patterns and explains what the information means. | +2 AI, +2 CS + BAIS, +1 CS + Acct, +1 CS + Marketing |
| Someone who works with hardware and software together | Builds or improves devices, smart systems, or computer-based machines. | +3 CSE |
| Someone who supports technology in organizations | Helps schools, hospitals, businesses, or teams use technology successfully. | +3 IT |
| Someone who designs better digital experiences | Makes websites, apps, or systems easier for people to understand and use. | +1 CS, +1 IT |
| Someone who works with technology in medicine or health | Uses computing to support health care, patients, or medical research. | +2 IT, +1 AI |
| Someone who works with technology and crime/public safety | Uses computing to study cybercrime, digital evidence, or security problems. | +3 CY, +3 CS + Crim |
| I do not know yet | I want to learn what these jobs actually do. | No direct recommendation points |

### 6. AI experience: What experience do you have with AI?

Choose the option that best describes your experience right now.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| I use AI tools often | For example, ChatGPT, image generators, coding tools, or study tools. | +1 AI |
| I have tried AI tools a few times | I know what they are, but I am still learning how they work. | No direct recommendation points |
| I have heard about AI but have not used it much | I am curious but still new to it. | No direct recommendation points |
| I have worked on an AI-related project before | For example, a class project, coding project, research activity, or club project. | +2 AI, +1 CS |
| I am not really familiar with AI yet | I would need a beginner-friendly explanation. | No direct recommendation points |

### 7. Coding comfort: How do you feel about coding right now?

You do not need experience already. This helps match the starting point.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| I already enjoy coding | I have tried it and want to keep learning. | +2 CS, +1 AI |
| I have tried coding a little | I know some basics, but I am still a beginner. | +1 CS, +1 IT |
| I am interested but new to coding | I want a beginner-friendly place to start. | +1 IT, +1 CS |
| I am unsure if I would like coding | I want to understand what coding is actually like. | No direct recommendation points |
| I like technology, but I may prefer less coding | I may enjoy systems, support, design, business, or people-focused tech work. | +2 IT, +1 CS + ISS, +1 CS + BAIS |

### 8. Future work style: What do you want your future work to feel like?

Choose the qualities that matter most to you.

Selection: Choose up to 3.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Creative | I want to build, design, or make new things. | +1 CS |
| Analytical | I want to solve problems and understand patterns. | +1 AI, +1 CS |
| Helpful | I want to support people, teams, or communities. | +1 IT, +1 CS + ISS |
| Protective | I want to keep people, systems, or information safe. | +2 CY, +1 CS + Crim, +1 CS + Fintech |
| Innovative | I want to work with new technology like AI or smart systems. | +2 AI, +1 CSE |
| Hands-on | I want to build, test, fix, or connect systems. | +2 CSE, +1 IT |
| Organized | I want to plan projects, manage systems, or improve processes. | +2 IT, +1 CS + BAIS, +2 CS + Supply Chain |
| Investigative | I want to figure out what happened and solve digital problems. | +2 CY, +2 CS + Crim |

## Transfer Student Quiz

Quiz version: `transfer-v3`

Source files:

- Questions: `src/pages/transfer/quiz/TransferIntakeQuiz.tsx`
- Scoring: `src/pages/transfer/quiz/transferQuizRecommendationConfig.ts`

Recommended degree pool:

- CS
- AI
- CY
- IT
- CSE
- CS + Crim
- CS + ISS
- CS + Acct
- CS + BAIS
- CS + Marketing
- CS + Fintech
- CS + Supply Chain

### 1. Transfer situation: What best describes your current transfer situation?

This helps the platform understand where you are starting from and whether you are planning from inside or outside Florida.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| I am at a Florida community or state college | I am planning from a Florida 2-year or state college transfer path. | +1 IT, +1 CS |
| I am at another Florida university | I am currently at a Florida 4-year university and want to compare how my credits may apply. | +1 IT, +1 CS |
| I am at an out-of-state college or university | I am outside Florida and want to compare how my credits may apply. | +1 CS, +1 AI, +1 CSE |
| I have college credits but I am not currently enrolled | I may be in Florida or out of state, and I want to understand how previous credits may fit. | +1 IT, +1 CY |
| I am still exploring whether I want to transfer | I am early in the decision process and still comparing options. | +1 CS, +1 IT, +1 CY |

### 2. Transfer timing: When are you hoping to transfer to USF?

This helps separate students who are close to transferring from students who are still early in the planning process.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Next semester | I need near-term transfer planning guidance. | +1 IT |
| Within the next year | I am actively preparing to transfer soon. | +1 CS, +1 IT |
| After I complete my associate degree | I want to plan around associate degree completion. | +1 IT, +1 CS |
| In more than a year | I have time to prepare coursework and compare options. | +1 CS, +1 AI, +1 CSE |
| I am not sure yet | I am still figuring out the right timeline. | +1 CS, +1 IT, +1 CY |

### 3. Computing interests: Which computing areas are you interested in?

This connects your interests to Bellini College degree categories.

Selection: Choose up to 6.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Software, apps, or websites | Building digital tools and applications. | +3 CS |
| Artificial intelligence or data | Using models, analytics, and data-driven systems. | +3 AI, +1 CS |
| Cybersecurity or digital protection | Protecting systems, accounts, networks, and data. | +3 CY |
| Computer hardware, devices, or systems | Working with devices, systems, or hardware-aware computing. | +3 CSE |
| IT, networks, or technical support | Supporting infrastructure, networks, and users. | +3 IT |
| Business, criminology, social science, or another field connected with computing | Using computing in another applied field. | +2 IT, +1 CY, +1 AI, +1 CS + BAIS, +1 CS + Crim, +1 CS + ISS |
| Business analytics or information systems | Using dashboards, databases, and data to help organizations decide what to do. | +4 CS + BAIS, +1 IT, +1 AI |
| Accounting, auditing, or financial reports | Using computing to understand money records and business reports. | +4 CS + Acct, +1 CS + BAIS |
| Digital marketing or customer data | Using technology to understand websites, campaigns, customers, or social media. | +4 CS + Marketing, +1 CS + ISS |
| Finance, banking, or payment technology | Using computing for banking, payments, investing, or secure financial tools. | +4 CS + Fintech, +1 CY, +1 CS + Acct |
| Supply chain, logistics, or operations | Using systems and data to improve inventory, shipping, and business processes. | +4 CS + Supply Chain, +1 IT, +1 CS + BAIS |
| Crime, justice, or digital evidence | Using computing for cybercrime, investigations, public safety, or justice systems. | +4 CS + Crim, +2 CY |
| People, communities, or society | Using computing to study social systems, policy, behavior, or community impact. | +4 CS + ISS, +1 IT |
| I am not sure yet | I want to compare examples before choosing. | +1 CS, +1 IT, +1 CY |

### 4. Completed coursework: Which types of college courses have you already completed or are currently taking?

This connects your academic background to transfer planning.

Selection: Choose up to 6.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Programming course | A course focused on coding or software basics. | +3 CS, +1 AI |
| Calculus or higher-level math course | Math preparation that may support technical majors. | +2 CS, +2 AI, +2 CSE |
| Statistics or data-related course | Coursework connected to data, statistics, or analysis. | +2 AI, +1 IT |
| Science course | Science preparation that may matter for technical pathways. | +1 CSE, +1 CS |
| Engineering course | Engineering coursework connected to systems or design. | +3 CSE |
| Cybersecurity, networking, or IT course | Applied computing, security, networking, or support coursework. | +2 CY, +2 IT |
| Business, criminology, social science, or interdisciplinary course | Coursework that connects computing to another field. | +2 IT, +1 CY, +1 AI, +1 CS + BAIS, +1 CS + Crim, +1 CS + ISS |
| Business, accounting, finance, or marketing course | Business coursework that may connect with CS + Business options. | +3 CS + Acct, +2 CS + BAIS, +2 CS + Marketing, +2 CS + Fintech, +2 CS + Supply Chain |
| Criminology, law, or public safety course | Coursework connected to crime, justice, or investigations. | +3 CS + Crim, +1 CY |
| Psychology, sociology, policy, or social science course | Coursework about people, communities, society, or public systems. | +3 CS + ISS, +1 IT |
| General education courses | General education credits that may support graduation planning. | +1 IT |
| I have not taken computing-related courses yet | I may need beginner-friendly preparation guidance. | +2 IT |
| I am not sure which courses count | I need help identifying relevant credits. | +1 IT, +1 CS |

### 5. Programming comfort: How comfortable are you with programming right now?

This helps the system give a better recommendation and preparation message.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Very comfortable - I have written programs before | I have meaningful programming experience. | +3 CS, +1 AI, +1 CSE |
| Somewhat comfortable - I understand the basics | I know some programming foundations. | +2 CS, +1 IT, +1 CY |
| Beginner - I have tried it but still need practice | I am still building confidence with coding. | +2 IT, +1 CY |
| Not comfortable yet | Programming is currently a concern for me. | +2 IT |
| I have not taken programming yet | I may need a first programming course. | +2 IT |

### 6. Math comfort: How comfortable are you with math-heavy coursework?

Some computing degrees may require more math, engineering, or theory than others.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Very comfortable with advanced math | I am comfortable with math-intensive coursework. | +3 AI, +2 CS, +2 CSE |
| Somewhat comfortable with math | I can handle math with normal preparation. | +1 CS, +1 AI, +1 CSE |
| I can do math, but I may need support | I want to plan for tutoring or support if needed. | +2 IT, +1 CY |
| Math is one of my concerns | I want to understand math expectations carefully. | +2 IT |
| I am not sure what math is required | I need clarity on degree requirements. | +1 IT, +1 CS |

### 7. Future work: What kind of work do you imagine yourself doing in the future?

This connects degree fit to career direction.

Selection: Choose up to 6.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Building software or apps | Creating applications, websites, systems, or tools. | +3 CS |
| Working with AI tools, data, or machine learning | Using data and intelligent systems to solve problems. | +3 AI |
| Protecting systems from cyber threats | Securing systems, accounts, networks, or data. | +3 CY |
| Managing networks or technology systems | Keeping infrastructure and systems running. | +3 IT |
| Designing or understanding computer hardware | Working with devices, embedded systems, or hardware-aware software. | +3 CSE |
| Using computing in business, crime, society, health, or another field | Applying computing to a field outside pure technology. | +2 IT, +1 AI, +1 CY, +1 CS + BAIS, +1 CS + Crim, +1 CS + ISS |
| Using business data to make decisions | Working with reports, dashboards, databases, or business systems. | +4 CS + BAIS, +1 CS + Acct, +1 AI |
| Working with financial technology | Building or analyzing secure tools for banking, payments, or finance. | +4 CS + Fintech, +1 CS + Acct, +1 CY |
| Working with marketing or customer data | Understanding digital campaigns, online behavior, or customer patterns. | +4 CS + Marketing, +1 CS + ISS |
| Improving logistics or operations | Using systems and data to improve inventory, transportation, and business processes. | +4 CS + Supply Chain, +1 IT, +1 CS + BAIS |
| Investigating digital evidence | Using computing to understand cybercrime, evidence, or public safety problems. | +4 CS + Crim, +2 CY |
| Using technology for people or communities | Applying computing to social systems, policy, research, or community impact. | +4 CS + ISS, +1 IT |
| Helping people solve technical problems | Supporting users, teams, or organizations with technology. | +3 IT |
| I am still unsure | I want recommendations to help narrow my direction. | +1 CS, +1 IT, +1 CY |

### 8. Transfer concerns: What are your biggest transfer planning concerns?

This helps personalize your final result and next steps.

Selection: Choose up to 4.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Whether my credits will transfer | I need clarity on credit applicability. | +1 IT |
| Which courses I should take before transferring | I want to choose useful courses now. | +1 CS, +1 IT |
| Which major fits the courses I already have | I want a major that fits my completed coursework. | +1 IT, +1 CS |
| How long the degree may take after I transfer | I want a realistic timeline after transferring. | +1 IT |
| Whether I am prepared for programming | I want to know if my coding foundation is enough. | +1 CS, +1 IT |
| Whether I am prepared for math | I want to understand math readiness. | +1 CS, +1 AI, +1 CSE |
| Who I should contact for advising | I need the right next contact. | +1 IT |
| I am not sure where to start | I need a simple starting point. | +1 IT |

### 9. Planning state and next steps: Which statements sound most like you right now?

Choose up to 5. This helps decide whether you should go next to degree comparison, course planning, advising questions, official resources, or saved next steps.

Selection: Choose up to 5.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| I know the major I want and need help planning the transfer path | I need planning steps for a chosen major. | +1 CS |
| I have a few majors in mind and want to compare them | I need side-by-side degree comparison. | +1 CS, +1 AI, +1 CY, +1 IT, +1 CSE |
| I know I like computing but I am unsure which degree fits | I need help connecting interests to majors. | +1 CS, +1 AI, +1 CY, +1 IT |
| I am mainly worried about how my credits will apply | Credit applicability is my main concern. | +1 IT |
| I am exploring USF and Bellini College for the first time | I need a broad introduction to options. | +1 CS, +1 IT, +1 CY |
| I want to review common lower-division courses | I want to understand early course patterns. | +1 CS, +1 CSE |
| I want a transfer planning summary | I want a saved summary of my next steps. | +1 IT |
| I want to see career paths for my recommended major | I want to connect the major to future work. | +1 CS, +1 AI, +1 CY |
| I want official USF transfer resources | I want official requirements and resources. | +1 IT |
| I want to prepare questions for advising | I want to know what to ask next. | +1 IT |

## Current USF Student Quiz

Quiz version: `current-usf-v1`

Source files:

- Questions: `src/pages/USF/quiz/CurrentUsfIntakeQuiz.tsx`
- Scoring: `src/pages/USF/quiz/currentUsfQuizRecommendationConfig.ts`

Recommended degree pool:

- CS
- AI
- CY
- IT
- CSE
- CS + Crim
- CS + ISS
- CS + Acct
- CS + BAIS
- CS + Marketing
- CS + Fintech
- CS + Supply Chain

### 1. USF college tracking: Which option best describes your current academic home at USF?

This helps frame how your current college requirements and completed coursework may overlap with Bellini College.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| College of Arts and Sciences | Humanities, social sciences, communication, math, biology, chemistry, physics, or related fields. | +1 CS, +1 AI, +2 CS + ISS |
| College of Behavioral and Community Sciences | Community-focused fields such as criminology, behavioral healthcare, psychology, or social work. | +3 CS + Crim, +1 CY, +1 CS + ISS |
| Muma College of Business | Business fields such as accounting, finance, marketing, business analytics, or management. | +3 CS + BAIS, +2 CS + Acct, +2 CS + Marketing, +2 CS + Fintech, +2 CS + Supply Chain, +1 IT |
| College of Design, Art and Performance | Creative fields such as fine arts, music, theater, architecture, or design. | +2 CS + Marketing, +1 IT |
| College of Education | Teaching, learning, education policy, student support, or instructional fields. | +2 CS + ISS, +1 IT |
| College of Engineering | Engineering fields such as mechanical, civil, chemical, industrial, biomedical, or computer engineering. | +3 CSE, +1 CS |
| Bellini College of Artificial Intelligence, Cybersecurity and Computing | USF computing pathways including AI, cybersecurity, computer science, engineering, and IT. | +1 CS, +1 AI, +1 CY, +1 IT, +1 CSE |
| Morsani College of Medicine | Health, biomedical, clinical, medical science, or medicine-related academic pathways. | +2 AI, +1 CS + ISS |
| College of Nursing | Nursing, patient care, healthcare practice, or clinical preparation fields. | +1 IT, +1 CS + ISS |
| Taneja College of Pharmacy | Pharmacy, pharmaceutical sciences, medication systems, or health technology interests. | +2 AI, +1 IT |
| College of Public Health | Public health, population health, epidemiology, policy, or community health interests. | +2 AI, +2 CS + ISS |
| Exploratory Curriculum (ECM) Students | I am still deciding on a major through Exploratory Curriculum. | +1 CS, +1 IT, +1 CY |
| Non-Degree Seeking Students | I am taking individual courses and am not currently pursuing a degree program. | +1 IT, +1 CS |

### 2. Academic background: What is your current credit standing or year?

This helps estimate how much timing, sequencing, and possible graduation delay may matter.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Freshman | I am early in my USF coursework. | No direct recommendation points |
| Sophomore | I have completed some college coursework and am still exploring options. | No direct recommendation points |
| Junior | I may need to think carefully about time to graduation. | No direct recommendation points |
| Senior | I need focused advising before considering a major or college change. | No direct recommendation points |

### 3. Academic background: About how many college credits have you completed?

This helps estimate how much prior coursework may need to be reviewed before switching programs.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| 0-29 credits | I am early in my college coursework. | +1 CS, +1 CSE |
| 30-59 credits | I have completed roughly one to two years of college credits. | +1 CS, +1 IT |
| 60-89 credits | I have completed a substantial amount of college coursework. | +1 IT, +1 CY |
| 90 or more credits | I may need close advising about timeline and degree completion. | +2 IT |
| I am not sure | I need help confirming my completed credit total. | +1 IT |

### 4. Transition motivation: What is making you consider a Bellini computing major?

Select any reasons that fit. This helps identify what kind of transition support may be most useful.

Selection: Choose up to 7.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Career opportunities | I am interested in computing-related career options and job growth. | +1 CS, +1 IT, +1 CY |
| I enjoyed a computing-related course | A class, assignment, or project made me want to explore computing further. | +2 CS |
| I want stronger technical skills | I want to build practical coding, data, security, or systems skills. | +1 IT, +1 CS |
| My current major does not feel like the right fit | I am reconsidering my academic direction and want to compare options. | +1 IT, +1 CS |
| I want to combine computing with my current field | I want computing skills that connect with my existing academic interests. | +1 CS + BAIS, +1 CS + Crim, +1 CS + ISS |
| I am still exploring | I am not ready to choose yet, but I want to understand possible pathways. | +1 CS, +1 IT, +1 CY |
| An advisor, professor, or peer suggested it | Someone recommended that I look into Bellini College programs. | +1 IT |

### 5. Coursework: Which courses have you already completed or are currently taking?

Select any that apply. This can later support a course-fit or advising preview.

Selection: Choose up to 10.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Calculus I | You completed or are currently taking Calculus I. | +2 CS, +2 AI, +2 CSE |
| Calculus II | You completed or are currently taking Calculus II. | +2 CS, +2 AI, +2 CSE |
| College Algebra | You completed or are currently taking College Algebra. | +1 IT, +1 CY |
| Statistics | You completed or are currently taking a statistics course. | +2 AI, +1 CS + BAIS |
| Introductory Programming | You completed or are currently taking an introductory coding course. | +3 CS, +1 AI |
| Data, analytics, or research methods course | You have worked with data analysis, research design, or methods. | +2 AI, +2 CS + BAIS |
| Science or lab course | You completed or are currently taking a science course with lab work. | +1 CSE, +1 AI |
| Business or information systems course | You have taken business technology, analytics, or systems coursework. | +2 IT, +2 CS + BAIS |
| General education courses | You have completed some USF general education requirements. | +1 IT |
| Not sure yet | You need to check Degree Works or your transcript. | +1 IT |

### 6. Technical experience: How much experience do you currently have with coding?

Choose the option that best describes your current coding experience.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Very little or none | You are new to coding or have only seen a small amount. | +2 IT |
| Some coding experience | You have written simple programs, scripts, or class assignments. | +1 CS, +1 IT |
| Comfortable with coding | You can work through coding tasks with some independence. | +3 CS, +1 AI |
| Experience with data or AI tools | You have used tools for data analysis, AI, automation, or modeling. | +2 AI |
| Experience with technology systems | You have worked with networks, hardware, platforms, or IT systems. | +2 IT, +1 CY |

### 7. AI experience: How have you used AI tools so far?

Choose the option that best describes your current AI tools experience.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Very little or none | You have not used AI tools much yet. | +1 IT |
| Writing, studying, or brainstorming | You have used AI to summarize, draft, study, or generate ideas. | +1 CS + ISS |
| Coding help | You have used AI to explain code, debug, or generate programming examples. | +1 CS, +1 AI |
| Data analysis | You have used AI or analytics tools to find patterns or interpret data. | +3 AI |
| Creative work | You have used AI for images, media, design, writing, or creative projects. | +1 CS + Marketing |
| Workflows or automation | You have used AI to speed up tasks, organize work, or automate steps. | +1 IT, +1 CS + BAIS |
| Ethics, privacy, or security | You are interested in responsible AI, privacy, trust, or risk. | +1 CY, +1 AI |

### 8. Computing interests: Which computing topics interest you the most?

Select any topics you would want to learn more about in a Bellini program.

Selection: Choose up to 4.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Coding and software development | Building programs, tools, systems, or applications. | +3 CS |
| Artificial intelligence, machine learning, or data | Working with models, data, automation, prediction, or analytics. | +3 AI |
| Cybersecurity and protecting systems | Securing users, data, networks, organizations, or infrastructure. | +3 CY |
| Hardware, robotics, or devices | Connecting computing with physical systems, circuits, or devices. | +3 CSE |
| Information technology and business systems | Supporting organizations through systems, platforms, and operations. | +3 IT |
| Web, apps, and user experience | Designing digital products people can use and understand. | +1 CS, +2 CS + Marketing |
| Math, logic, and algorithms | Solving structured problems with mathematical or computational thinking. | +2 CS, +1 AI |
| Not sure yet | You are still exploring which computing topics fit you. | +1 CS, +1 IT |

### 9. Application area: Where would you most like to apply computing?

Select the fields or settings where you could imagine using computing skills.

Selection: Choose up to 4.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Health, medicine, or public health | Using computing to support health systems, medicine, or communities. | +1 AI, +2 CS + ISS |
| Business, finance, or organizations | Using technology to improve operations, analytics, or decisions. | +2 CS + BAIS, +1 CS + Fintech |
| Security, law, or justice | Applying computing to risk, investigations, security, or justice systems. | +2 CY, +3 CS + Crim |
| Science, research, or engineering | Using computing for discovery, modeling, experimentation, or systems. | +2 AI, +1 CSE |
| Education, people, or community services | Using technology to support learning, access, services, or public good. | +2 CS + ISS, +1 IT |
| Design, media, or creative technology | Combining computing with design, storytelling, media, or creative work. | +2 CS + Marketing |
| General technology career | Keeping options open for a broad technology role. | +2 IT |
| Not sure yet | You want to explore application areas before narrowing your path. | +1 CS, +1 IT |

### 10. Project style: What kind of work or project style sounds most appealing?

Select the work styles that sound most like the kind of projects you want to do.

Selection: Choose up to 4.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Solving logical problems | Working through puzzles, algorithms, systems, or structured challenges. | +2 CS, +1 AI |
| Building software people can use | Creating useful applications, tools, websites, or products. | +3 CS |
| Finding patterns in data | Using data to explain, predict, or support better decisions. | +3 AI |
| Investigating security and risk | Thinking through threats, vulnerabilities, privacy, and protection. | +3 CY |
| Building or connecting technical systems | Working with devices, platforms, infrastructure, or integrated systems. | +2 CSE |
| Managing systems and infrastructure | Keeping technology environments organized, reliable, and secure. | +3 IT |
| Working with people to solve technology problems | Helping teams, users, or communities use technology effectively. | +1 IT, +1 CS + ISS |
| Not sure yet | You want to try different project styles before choosing a direction. | +1 IT |

### 11. Advising preparation: What do you most need help understanding before meeting with an advisor?

Select any advising questions you want the dashboard to help organize later.

Selection: Choose up to 5.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Which Bellini majors may fit me | You want help narrowing which programs are worth exploring first. | +1 CS, +1 IT, +1 CY |
| How my completed courses may count | You want to understand possible overlap with Bellini requirements. | +1 IT |
| How switching may affect graduation timing | You want to discuss sequencing, added semesters, or timeline risk. | +1 IT |
| How different Bellini majors compare | You want a side-by-side view before choosing what to ask about. | +1 CS, +1 AI, +1 CY |
| Requirements for entering the major | You want to know prerequisites, GPA expectations, or entry steps. | +1 CS, +1 IT |
| Questions to bring to advising | You want a prepared list for your next advisor conversation. | +1 IT |
| Not sure yet | You need help figuring out what to ask first. | +1 IT |

## Current Bellini Student Quiz

Quiz version: `current-bellini-v1`

Source files:

- Questions: `src/pages/belliniStudent/quiz/BelliniStudentIntakeQuiz.tsx`
- Scoring: `src/pages/belliniStudent/quiz/belliniStudentQuizRecommendationConfig.ts`

Recommended degree pool:

- CS
- AI
- CY
- CSE
- IT

### 1. Current major: What is your current Bellini College major?

This helps frame whether you are comparing a nearby major or looking at a larger academic change.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Computer Science | You are currently in CS. | +1 CS |
| Artificial Intelligence | You are currently in AI. | +1 AI |
| Cybersecurity | You are currently in Cybersecurity. | +1 CY |
| Computer Science and Engineering | You are currently in CSE. | +1 CSE |
| Information Technology | You are currently in IT. | +1 IT |
| Other Bellini/computing-related major | You are in another computing-related path. | +1 CS, +1 IT |
| I am not sure | You need to confirm your current program or catalog record. | +1 CS, +1 IT |

### 2. Possible destination: Which majors or areas are you considering now?

Choose up to 4 options. You can still compare several programs in the results.

Selection: Choose up to 4.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Computer Science | You want to compare CS as a possible destination. | +4 CS |
| Artificial Intelligence | You want to compare AI as a possible destination. | +4 AI |
| Cybersecurity | You want to compare Cybersecurity as a possible destination. | +4 CY |
| Computer Science and Engineering | You want to compare CSE as a possible destination. | +4 CSE |
| Information Technology | You want to compare IT as a possible destination. | +4 IT |
| I am comparing multiple Bellini majors | You need a broader comparison first. | +1 CS, +1 AI, +1 CY, +1 CSE, +1 IT |
| I am not sure yet | You are still narrowing your options. | +1 CS, +1 IT |

### 3. Reason for comparing: What reasons are making you think about switching or comparing majors?

Choose up to 4 reasons. This helps separate interest fit from requirements, grades, and timeline concerns.

Selection: Choose up to 4.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| I am more interested in another computing field | Your interests are shifting within computing. | +1 AI, +1 CY, +1 CSE |
| My current major does not match my career goals | You want the major to connect better to your target career. | +1 CS, +1 AI, +1 CY, +1 IT |
| I am struggling with some required courses | Course difficulty is part of the decision. | +2 IT |
| I want more hands-on or applied work | You want more practical projects or applied technical work. | +2 IT, +1 CY, +1 CSE |
| I want more flexibility with electives | You want more room to customize your plan. | +2 CS |
| I am worried about graduation timeline or requirements | You need advising to evaluate time and requirements. | +2 IT |
| I am unsure if my current major is the best fit | You need a structured comparison before deciding. | +1 CS, +1 IT |

### 4. Academic interests: Which topics are you most interested in building into your degree plan?

Choose up to 5 topics you want more of.

Selection: Choose up to 5.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Software development | Apps, systems, coding, and software products. | +3 CS |
| Artificial intelligence or machine learning | Models, automation, prediction, and AI systems. | +3 AI |
| Cybersecurity | Security, risk, privacy, and system protection. | +3 CY |
| Data science or analytics | Using data to explain, predict, or support decisions. | +2 AI |
| Computer hardware or embedded systems | Devices, circuits, hardware, and integrated systems. | +3 CSE |
| Networking or cloud systems | Infrastructure, networks, platforms, and cloud environments. | +2 IT, +1 CY |
| IT systems or technical support | Supporting users, systems, and organizations. | +3 IT |
| Human-centered technology | Technology designed around people and use cases. | +1 IT, +1 CS |
| Research or advanced computing | Advanced study, experimentation, or graduate-school preparation. | +1 AI, +1 CS |

### 5. Topics to reduce: Which topics or course types do you want less of?

Choose up to 4 areas you would prefer to reduce in your plan.

Selection: Choose up to 4.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Heavy programming | You want less intensive coding work. | +2 IT |
| Heavy math | You want fewer math-heavy requirements. | +2 IT, +1 CY |
| Theory-heavy computer science | You want less theory and more applied work. | +1 IT, +1 CY |
| Hardware, circuits, or engineering topics | You want fewer hardware or engineering topics. | +1 CS, +1 AI, +1 CY, +1 IT |
| Security-focused courses | You want fewer security-focused courses. | +1 CS, +1 AI, +1 IT |
| AI or data-focused courses | You want fewer AI, data, or analytics courses. | +1 CS, +1 CY, +1 IT |
| IT or networking topics | You want fewer IT operations or networking topics. | +1 CS, +1 AI, +1 CSE |
| I am not sure | You need more information before naming what to reduce. | +1 CS, +1 IT |

### 6. Course fit: Which courses or learning experiences have fit you best so far?

Choose up to 5 experiences that felt strongest or most interesting.

Selection: Choose up to 5.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Programming courses | Coding and software assignments have fit you well. | +3 CS |
| Math courses | Math-heavy courses have fit you well. | +2 AI, +1 CS |
| AI or data courses | AI, data, analytics, or modeling has fit you well. | +3 AI |
| Cybersecurity courses | Security topics have fit you well. | +3 CY |
| Hardware or engineering courses | Hardware, circuits, or engineering systems have fit you well. | +3 CSE |
| Web/app development courses | Web, app, or product-building work has fit you well. | +2 CS, +1 IT |
| IT or networking courses | Systems, networks, cloud, or IT work has fit you well. | +3 IT, +1 CY |
| Project-based courses | Applied projects and hands-on work have fit you well. | +1 IT, +1 CY, +1 CSE |
| I have not taken enough courses to know yet | You need more course experience before deciding. | +1 CS, +1 IT |

### 7. Career direction: Which career directions sound most appealing to you right now?

Choose up to 4 career directions even if you are still exploring.

Selection: Choose up to 4.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Software engineer or app developer | You want to build software, apps, or systems. | +4 CS |
| AI or machine learning specialist | You want to work with models, AI systems, or automation. | +4 AI |
| Cybersecurity analyst | You want to protect systems, data, or organizations. | +4 CY |
| Data analyst or data scientist | You want to work with data, analytics, or decision support. | +3 AI |
| Computer engineer or embedded systems developer | You want hardware-aware or embedded computing work. | +4 CSE |
| IT specialist, network administrator, or cloud support | You want systems, networks, cloud, or support roles. | +4 IT |
| Product, consulting, or technology management | You want to connect technology with teams, clients, or strategy. | +2 IT, +1 CS |
| I am not sure yet | You need to compare outcomes before deciding. | +1 CS, +1 IT |

### 8. Technical comfort: How would you describe your comfort with the technical demands of your current major?

Choose the option that best describes your current comfort level.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Very comfortable with programming and math | You feel strong in the core technical demands. | +2 CS, +1 AI |
| Comfortable with programming, but less comfortable with math | Coding fits better than math-heavy work. | +2 CS, +1 IT |
| Comfortable with math, but less comfortable with programming | Math fits better than coding-heavy work. | +1 AI |
| Comfortable with applied/project work, but not theory-heavy work | Hands-on work fits better than theory. | +2 IT, +1 CY |
| Somewhat uncomfortable overall | You need to talk through course fit and support. | +2 IT |
| Very uncomfortable overall | You should evaluate options carefully with advising. | +1 IT |
| I am still figuring it out | You need more information before deciding. | +1 CS, +1 IT |

### 9. Decision priority: What matters most when deciding whether to switch?

Choose up to 4 factors that should carry the most weight.

Selection: Choose up to 4.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Better career fit | You want the major to align with your work goals. | +1 CS, +1 AI, +1 CY, +1 IT |
| Stronger personal interest | You want the subject to feel more engaging. | +1 CS, +1 AI, +1 CY, +1 CSE |
| Shorter graduation timeline | You want to avoid adding time if possible. | +2 IT |
| Less course difficulty | You want a path that feels more manageable. | +2 IT |
| More elective flexibility | You want more room to customize courses. | +2 CS |
| Better salary or job opportunities | You are prioritizing employment outcomes. | +1 CS, +1 AI, +1 CY |
| Better preparation for graduate school | You want research or advanced-study preparation. | +2 AI, +1 CS |
| Better balance between technical and applied work | You want a mix of technical depth and practical work. | +1 IT, +1 CY |

### 10. Switch or explore: Would you rather switch majors or stay in your current major and use electives to explore another area?

This helps distinguish a formal major-change need from an elective or concentration strategy.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| I want to switch majors | You are leaning toward a formal change. | +1 CS, +1 AI, +1 CY, +1 CSE, +1 IT |
| I would prefer to stay and use electives | You may not need a formal change. | +1 CS |
| I am open to either option | You need to compare both paths. | +1 CS, +1 IT |
| I need to compare requirements first | Requirements should drive the next step. | +1 IT |
| I need to know how many extra courses switching would add | Timeline needs official evaluation. | +1 IT |
| I am not sure yet | You need a guided comparison. | +1 IT |

### 11. Timeline check: Where are you in your current degree timeline?

This is important because Bellini must evaluate whether a switch can still fit within the four-year completion rule.

Selection: Choose 1.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| First year or early in the plan | You may have more room to compare options. | +1 CS, +1 AI, +1 CY, +1 CSE, +1 IT |
| Second year or around 30-59 credits | Course overlap and sequencing matter. | +1 CS, +1 AI, +1 CY, +1 IT |
| Third year or around 60-89 credits | A switch needs close timeline review. | +2 IT, +1 CY |
| Fourth year, 90+ credits, or close to graduation | A switch may not be approvable if it extends beyond four years. | +2 IT |
| I am not sure | Check Degree Works and ask advising to evaluate your case. | +1 IT |

### 12. Decision support: What would help you make a decision before talking to an advisor?

Choose up to 6 items you want the dashboard to help organize.

Selection: Choose up to 6.

| Answer | What it means | Recommendation points |
| --- | --- | --- |
| Comparing Bellini major requirements | You want to compare requirements across majors. | +1 CS, +1 AI, +1 CY, +1 IT |
| Seeing which completed courses overlap | You want to know what may still count. | +1 IT |
| Understanding how switching may affect graduation | You need timing and four-year-rule guidance. | +2 IT |
| Comparing career outcomes | You want career direction to inform the decision. | +1 CS, +1 AI, +1 CY |
| Reviewing elective options | You want to know if electives could solve the problem. | +1 CS |
| Seeing recommended next steps | You want a clear action plan. | +1 IT |
| Preparing advisor questions | You want questions ready for advising. | +1 IT |
| Saving or printing a planning report | You want a record you can bring to advising. | +1 IT |

