export type CvExperienceEntry = {
  label: string;
  date: string;
  timeline: { title: string; description: string }[];
};

const CONTACT = {
  name: "Franklin Agu",
  headline:
    "MSc Cybersecurity | Service Operations Analyst | Secure Software Engineer",
  location: "Derby, UK",
  phone: "07551116916",
  email: "Gozieagu1@gmail.com",
  linkedin: "https://www.linkedin.com/in/chigozie-agu-85019b209",
  github: "https://github.com/GozzAgu",
  portfolio: "https://goz-portfolio-app.vercel.app",
};

const PROFILE_PARAGRAPHS = [
  "Cybersecurity MSc graduate with 4+ years of professional software engineering experience building and securing cloud-based applications. Strong foundation across security operations, governance & compliance (GRC), application security, and secure system design.",
  "Experienced in access control, encryption, secure API integration, GDPR-aligned data handling, Microsoft 365 and Dynamics 365 (including case logging and CRM workflows), CRM tools, and incident-aware support environments. Seeking roles where technical depth and risk-focused thinking can support secure and compliant systems.",
  "Developed enterprise-grade web applications using Vue.js and Nuxt.js, implemented Role-Based Access Control (RBAC) to enforce least-privilege access, and integrated secure APIs with authentication tokens and robust error handling.",
  "Academic research focused on enhancing data integrity, security, and access control in cloud-based inventory management systems, applying AES encryption, RSA key exchange, and role-based access control to protect data integrity and prevent unauthorized access.",
];

const SECURITY_DOMAINS = [
  "Security Operations (SOC-aligned)",
  "Governance, Risk & Compliance (GRC)",
  "Application Security (AppSec)",
  "Secure Software Development Lifecycle (SSDLC)",
  "Identity & Access Management (RBAC, ABAC)",
  "Data Protection & GDPR Compliance",
  "Cryptography fundamentals (AES, RSA, hashing)",
  "Secure authentication & authorization",
  "Vulnerability awareness & risk mitigation",
];

const LANGUAGES = [
  "JavaScript (ES6+)",
  "TypeScript",
  "HTML5",
  "CSS3",
];

const FRAMEWORKS = ["Vue.js (2/3)", "Nuxt.js", "TailwindCSS", "SASS"];

const TOOLS = [
  "Git",
  "Firebase",
  "REST APIs",
  "GraphQL",
  "CI/CD Pipelines",
  "Microsoft 365 & Dynamics 365",
  "ERP",
];

const TESTING_TOOLS = ["Postman", "Playwright", "Cypress", "Jest"];

const EDUCATION = [
  {
    year: "2025",
    degree: "Master of Science in Cybersecurity",
    institution: "University of Derby, UK",
  },
  {
    year: "2020",
    degree: "Bachelor of Science in Computer Information Systems",
    institution: "Babcock University, Nigeria",
  },
];

const ACHIEVEMENT =
  "Secure design: successfully contributed to the migration of legacy data to secure cloud environments with zero data loss or security breaches, demonstrating secure data migration, risk mitigation, and data integrity through complex transitions.";

const PROJECTS: { name: string; detail: string; url: string }[] = [
  {
    name: "Storvv",
    detail:
      "Secure cloud-based inventory management web app (Firebase, AES, RSA key exchange, RBAC).",
    url: "https://www.storvv.com",
  },
  {
    name: "SmartPhoneHub",
    detail:
      "Retail ecommerce experience: phones, laptops, wearables, accessories, trade-in, support, and store information.",
    url: "https://sph-ng.com/",
  },
  {
    name: "Secret Santa Generator",
    detail:
      "Interactive gift exchange: participant pairing, notifications, and wishlists.",
    url: "https://secret-santa-virid.vercel.app/auth",
  },
  {
    name: "Password Entropy Calculator",
    detail: "Password strength analysis with a modern web UI.",
    url: "https://password-entropy-six.vercel.app/",
  },
  {
    name: "KUO Company Website",
    detail: "Corporate site for KUO Smart Solutions (services, team, testimonials).",
    url: "https://www.kuosmartsolution.com/",
  },
  {
    name: "Visioni and Strauss",
    detail: "Corporate site with services, team, and SEO-focused structure.",
    url: "https://www.visioniandstrauss.com/",
  },
  {
    name: "T30 Energies",
    detail: "Energy company site: services, portfolios, and responsive layout.",
    url: "https://www.t30energies.com/",
  },
];

const COLOR = {
  body: "1A1A1A",
  muted: "555555",
  rule: "94A3B8",
  link: "1D4ED8",
} as const;

function spacingSectionTitle() {
  return { before: 320, after: 200 };
}

function spacingBody() {
  return { after: 140, line: 276 };
}

export async function downloadCvDocx(experience: CvExperienceEntry[]) {
  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    BorderStyle,
    LineRuleType,
    Table,
    TableRow,
    TableCell,
    WidthType,
    TableLayoutType,
    ExternalHyperlink,
    TabStopType,
    TabStopPosition,
    VerticalAlignTable,
    TableBorders,
    UnderlineType,
  } = await import("docx");

  const linkRun = (text: string, href: string) =>
    new ExternalHyperlink({
      link: href,
      children: [
        new TextRun({
          text,
          color: COLOR.link,
          underline: { type: UnderlineType.SINGLE },
          size: 20,
        }),
      ],
    });

  const contactBlock = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [3200, 3200, 3200],
    layout: TableLayoutType.FIXED,
    borders: TableBorders.NONE,
    margins: { top: 80, bottom: 120 },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: VerticalAlignTable.CENTER,
            margins: { top: 80, bottom: 80, left: 60, right: 60 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: "Location",
                    size: 18,
                    color: COLOR.muted,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: CONTACT.location,
                    size: 22,
                    color: COLOR.body,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: VerticalAlignTable.CENTER,
            margins: { top: 80, bottom: 80, left: 60, right: 60 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: "Phone",
                    size: 18,
                    color: COLOR.muted,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: CONTACT.phone,
                    size: 22,
                    color: COLOR.body,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: VerticalAlignTable.CENTER,
            margins: { top: 80, bottom: 80, left: 60, right: 60 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: "Email",
                    size: 18,
                    color: COLOR.muted,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new ExternalHyperlink({
                    link: `mailto:${CONTACT.email}`,
                    children: [
                      new TextRun({
                        text: CONTACT.email,
                        size: 20,
                        color: COLOR.link,
                        underline: { type: UnderlineType.SINGLE },
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: VerticalAlignTable.CENTER,
            margins: { top: 60, bottom: 80, left: 60, right: 60 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [linkRun("LinkedIn profile", CONTACT.linkedin)],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: VerticalAlignTable.CENTER,
            margins: { top: 60, bottom: 80, left: 60, right: 60 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [linkRun("GitHub", CONTACT.github)],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: VerticalAlignTable.CENTER,
            margins: { top: 60, bottom: 80, left: 60, right: 60 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [linkRun("Portfolio site", CONTACT.portfolio)],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const bodyChildren: (
    | InstanceType<typeof Paragraph>
    | InstanceType<typeof Table>
  )[] = [];

  bodyChildren.push(
    new Paragraph({
      text: CONTACT.name,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120, line: 320, lineRule: LineRuleType.AUTO },
      run: {
        color: "0F172A",
      },
    })
  );

  bodyChildren.push(
    new Paragraph({
      children: [
        new TextRun({
          text: CONTACT.headline,
          italics: true,
          size: 22,
          color: COLOR.muted,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200, line: 276, lineRule: LineRuleType.AUTO },
    })
  );

  bodyChildren.push(contactBlock);

  bodyChildren.push(
    new Paragraph({
      text: "Professional profile",
      heading: HeadingLevel.HEADING_1,
      spacing: spacingSectionTitle(),
      run: { color: "0F172A" },
    })
  );

  for (const p of PROFILE_PARAGRAPHS) {
    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: p,
            color: COLOR.body,
          }),
        ],
        spacing: {
          ...spacingBody(),
          lineRule: LineRuleType.AUTO,
        },
      })
    );
  }

  bodyChildren.push(
    new Paragraph({
      text: "Core competencies (security & risk)",
      heading: HeadingLevel.HEADING_1,
      spacing: spacingSectionTitle(),
      run: { color: "0F172A" },
    })
  );
  for (const item of SECURITY_DOMAINS) {
    bodyChildren.push(
      new Paragraph({
        children: [new TextRun({ text: item, color: COLOR.body })],
        bullet: { level: 0 },
        spacing: { after: 72, line: 276, lineRule: LineRuleType.AUTO },
      })
    );
  }

  bodyChildren.push(
    new Paragraph({
      text: "Technical skills",
      heading: HeadingLevel.HEADING_1,
      spacing: spacingSectionTitle(),
      run: { color: "0F172A" },
    })
  );

  bodyChildren.push(
    new Paragraph({
      children: [
        new TextRun({ text: "Languages: ", bold: true, color: COLOR.body }),
        new TextRun({ text: LANGUAGES.join(", "), color: COLOR.body }),
      ],
      spacing: {
        ...spacingBody(),
        lineRule: LineRuleType.AUTO,
      },
    })
  );
  bodyChildren.push(
    new Paragraph({
      children: [
        new TextRun({ text: "Frameworks: ", bold: true, color: COLOR.body }),
        new TextRun({ text: FRAMEWORKS.join(", "), color: COLOR.body }),
      ],
      spacing: {
        ...spacingBody(),
        lineRule: LineRuleType.AUTO,
      },
    })
  );
  bodyChildren.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Cloud, APIs & tooling: ",
          bold: true,
          color: COLOR.body,
        }),
        new TextRun({ text: TOOLS.join(", "), color: COLOR.body }),
      ],
      spacing: {
        ...spacingBody(),
        lineRule: LineRuleType.AUTO,
      },
    })
  );
  bodyChildren.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Security & testing: ",
          bold: true,
          color: COLOR.body,
        }),
        new TextRun({ text: TESTING_TOOLS.join(", "), color: COLOR.body }),
      ],
      spacing: {
        ...spacingBody(),
        lineRule: LineRuleType.AUTO,
      },
    })
  );

  bodyChildren.push(
    new Paragraph({
      text: "Professional experience",
      heading: HeadingLevel.HEADING_1,
      spacing: spacingSectionTitle(),
      run: { color: "0F172A" },
    })
  );

  for (const job of experience) {
    bodyChildren.push(
      new Paragraph({
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX,
          },
        ],
        spacing: { before: 200, after: 120, line: 276, lineRule: LineRuleType.AUTO },
        children: [
          new TextRun({
            text: job.label,
            bold: true,
            size: 24,
            color: "0F172A",
          }),
          new TextRun({ text: "\t" }),
          new TextRun({
            text: job.date,
            italics: true,
            size: 22,
            color: COLOR.muted,
          }),
        ],
      })
    );
    for (const item of job.timeline) {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${item.title}: `,
              bold: true,
              color: COLOR.body,
            }),
            new TextRun({ text: item.description, color: COLOR.body }),
          ],
          bullet: { level: 0 },
          spacing: { after: 100, line: 276, lineRule: LineRuleType.AUTO },
        })
      );
    }
  }

  bodyChildren.push(
    new Paragraph({
      text: "Education",
      heading: HeadingLevel.HEADING_1,
      spacing: spacingSectionTitle(),
      run: { color: "0F172A" },
    })
  );
  for (const edu of EDUCATION) {
    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${edu.degree} `,
            bold: true,
            color: COLOR.body,
          }),
          new TextRun({
            text: `(${edu.year})`,
            italics: true,
            color: COLOR.muted,
          }),
        ],
        spacing: { after: 60, line: 276, lineRule: LineRuleType.AUTO },
      })
    );
    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: edu.institution,
            italics: true,
            color: COLOR.muted,
          }),
        ],
        spacing: { after: 200, line: 276, lineRule: LineRuleType.AUTO },
      })
    );
  }

  bodyChildren.push(
    new Paragraph({
      text: "Key achievement",
      heading: HeadingLevel.HEADING_1,
      spacing: spacingSectionTitle(),
      run: { color: "0F172A" },
    })
  );
  bodyChildren.push(
    new Paragraph({
      children: [
        new TextRun({
          text: ACHIEVEMENT,
          color: COLOR.body,
        }),
      ],
      spacing: {
        ...spacingBody(),
        lineRule: LineRuleType.AUTO,
      },
    })
  );

  bodyChildren.push(
    new Paragraph({
      text: "Selected projects & portfolio links",
      heading: HeadingLevel.HEADING_1,
      spacing: spacingSectionTitle(),
      run: { color: "0F172A" },
    })
  );
  for (const proj of PROJECTS) {
    bodyChildren.push(
      new Paragraph({
        bullet: { level: 0 },
        spacing: { after: 120, line: 276, lineRule: LineRuleType.AUTO },
        children: [
          new TextRun({
            text: `${proj.name}. `,
            bold: true,
            color: COLOR.body,
          }),
          new TextRun({
            text: `${proj.detail} `,
            color: COLOR.body,
          }),
          new ExternalHyperlink({
            link: proj.url,
            children: [
              new TextRun({
                text: proj.url,
                color: COLOR.link,
                size: 20,
                underline: { type: UnderlineType.SINGLE },
              }),
            ],
          }),
        ],
      })
    );
  }

  bodyChildren.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Document generated from portfolio on ${new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}.`,
          italics: true,
          size: 18,
          color: "777777",
        }),
      ],
      spacing: { before: 360, after: 120 },
      border: {
        top: {
          style: BorderStyle.SINGLE,
          size: 4,
          color: "E2E8F0",
          space: 10,
        },
      },
    })
  );

  const doc = new Document({
    creator: CONTACT.name,
    title: `${CONTACT.name} CV`,
    description: "Curriculum vitae exported from portfolio",
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 22,
            color: COLOR.body,
          },
          paragraph: {
            spacing: {
              line: 276,
              lineRule: LineRuleType.AUTO,
            },
          },
        },
        title: {
          run: {
            font: "Calibri",
            bold: true,
            size: 44,
            color: "0F172A",
          },
          paragraph: {
            spacing: { after: 80 },
            alignment: AlignmentType.CENTER,
          },
        },
        heading1: {
          run: {
            font: "Calibri",
            bold: true,
            size: 24,
            color: "0F172A",
            allCaps: true,
          },
          paragraph: {
            spacing: { before: 280, after: 160 },
            border: {
              bottom: {
                style: BorderStyle.SINGLE,
                size: 8,
                color: COLOR.rule,
                space: 4,
              },
            },
            keepNext: true,
          },
        },
        listParagraph: {
          paragraph: {
            spacing: { after: 72 },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children: bodyChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const filename = `Franklin_Agu_CV_${new Date().toISOString().slice(0, 10)}.docx`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
