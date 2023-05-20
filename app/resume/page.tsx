import Link from "next/link";

import { ExternalLink } from "~/components/icons";

export const metadata = {
  title: "Resume",
  themeColor: "#f7f5f2",
  robots: {
    index: false,
  },
};

function Spacer() {
  return <div className="h-px w-full bg-black mb-6" />;
}

export default function ResumePage() {
  return (
    <main className="resume min-h-screen">
      <div className="pt-4 px-4 pb-40 max-w-3xl mx-auto">
        <Link href="/" className="block font-mono text-sm mb-4 hover:underline">
          ../
        </Link>
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="font-display text-4xl font-bold">Hunter Lovell</h1>
              <div className="text-xl">hunter@hntrl.io</div>
            </div>
          </div>
          <p className="mb-4">
            Adaptable software engineer with 4+ years experience providing
            first-class results that perform. Comprehensive technical experience
            in full-stack development, problem-solving skills, committment to
            follow through, and a focused attention to detail. Also well versed
            in optimizing business procedures, processess, and productivity.
          </p>
          <Spacer />
        </section>
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <AccreditationSection />
        <p className="font-display text-sm mx-auto italic text-center">
          References available upon request
        </p>
      </div>
    </main>
  );
}

const accreditations = [
  {
    name: "Utah State University / Resident Scholar",
    tag: "2022",
  },
  {
    name: "Lightbend Academy / Reactive Architecture",
    tag: "2020",
  },
  {
    name: "Bottega Tech / devCamp Certification",
    tag: "2018",
  },
];

function AccreditationSection() {
  return (
    <section>
      <h2 className="font-display text-xl font-bold mb-4">Accreditations</h2>
      <div className="mb-6">
        {accreditations.map((item, idx) => (
          <div key={idx} className="mb-3">
            <div className="text-lg leading-6">{item.name}</div>
            <div className="font-display text-sm">{item.tag}</div>
          </div>
        ))}
      </div>
      <Spacer />
    </section>
  );
}

const education = [
  {
    school: "Utah State University",
    location: "Logan, UT",
    certification: "B.S. Information Systems",
    desc: "August 2022 - Expected May 2025",
  },
  {
    school: "Provo High School",
    location: "Provo, UT",
    certification: "Diploma",
    desc: "Honor Roll, 3.9 GPA, Magna Cum Laude",
  },
];

function EducationSection() {
  return (
    <section>
      <h2 className="font-display text-xl font-bold mb-4">Education</h2>
      <div className="mb-6">
        {education.map((item, idx) => (
          <div key={idx} className="mb-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg leading-6">{item.school}</span>/
              <span className="font-display text-xs">{item.location}</span>
            </div>
            <div className="font-display text-sm mb-1">
              {item.certification}
            </div>
            <div className="font-display italic text-xs">{item.desc}</div>
          </div>
        ))}
      </div>
      <Spacer />
    </section>
  );
}

const experience = {
  professional: [
    {
      title: "Principal BI Developer",
      place: "Cubby's",
      location: "American Fork, UT",
      timeframe: "June 2021 - August 2022",
      link: "cubbys.co",
      content: (
        <ul className="list-disc ml-4 md:ml-0">
          <li>
            Implemented practices for data collection and warehousing for all
            past-and-present organizational data.
          </li>
          <li>
            Became the pointman for answering all data-intensive questions that
            arised from senior management and the c-suite.
          </li>
          <li>
            Conducted several platform migrations for critical business services
            including payroll providers, reporting workflows, point of sale
            solutions, and other customer facing implements.
          </li>
          <li>
            Directly oversaw 7 figures in payroll processing for 11+ retail
            locations and 300+ employees.
          </li>
          <li>
            Developed, optimized, and oversaw administrative processes like
            sales reporting, asset management, and payroll.
          </li>
          <li>
            Became a primary point-of-contact for IT operations and managed
            teams to improve networks and tech stacks both in store and in the
            cloud.
          </li>
          <li>
            Worked closely with decision-makers to develop software to better
            suit the needs of the business.
          </li>
          <li>
            <span className="italic">Technologies used:</span> Google Cloud,
            Golang, Neo4j, Python, MySQL, DOMO
          </li>
        </ul>
      ),
    },
  ],
  other: [
    {
      title: "mystickerspace.com",
      link: "https://mystickerspace.com",
      role: "Lead Developer & Architect",
      tag: "Client project",
      content: (
        <ul className="list-disc ml-4 md:ml-0">
          <li>
            Built a custom e-commerce storefront for a local made-to-order
            sticker print shop. Project involved the customer website, the
            commerce engine to process orders and manage the business, and the
            backend interface to be used internally by the company.
          </li>
          <li>
            <span className="italic">Technologies used:</span> Golang, MongoDB,
            Stripe, Remix, React, AWS, DigitalOcean, Vercel
          </li>
        </ul>
      ),
    },
    {
      title: "BoosterBox",
      link: null,
      role: "Developer",
      tag: "Business venture",
      content: (
        <ul className="list-disc ml-4 md:ml-0">
          <li>
            Worked with other founding members to develop strategies for
            building a suite of tools for events at local high schools.
            Developed a concessions app that allowed spectators to order food
            for pickup at sporting events.
          </li>
          <li>
            <span className="italic">Technologies used:</span> Stripe, React,
            Node.JS, AWS Lambda, AWS CloudFront, DynamoDB
          </li>
        </ul>
      ),
    },
  ],
};

function ExperienceSection() {
  return (
    <section>
      <h2 className="font-display text-xl font-bold mb-6">
        Professional Experience
      </h2>
      <div className="mb-6">
        {experience.professional.map((item, idx) => (
          <div key={idx} className="mb-4">
            <div className="md:flex justify-between items-center mb-2">
              <div>
                <h4 className="text-xl font-medium leading-5">{item.title}</h4>
                <div className="flex items-center gap-1">
                  <span>{item.place}</span>/
                  <span className="font-display text-xs">{item.location}</span>
                </div>
                <div className="font-display italic text-xs">
                  {item.timeframe}
                </div>
              </div>
              <div className="md:text-right">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://${item.link}`}
                  className="flex items-center gap-1 hover:underline"
                >
                  {item.link}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            {item.content}
          </div>
        ))}
      </div>
      <h3 className="text-xl font-display font-bold mb-4">Other Projects</h3>
      <div className="mb-6">
        {experience.other.map((item, idx) => (
          <div key={idx} className="mb-4">
            <div className="mb-2">
              {item.link ? (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={item.link}
                  className="text-xl font-medium leading-5 flex items-center gap-1.5 hover:underline"
                >
                  {item.title}
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <h4 className="text-xl font-medium leading-5">{item.title}</h4>
              )}
              <div className="flex items-center gap-1">
                <span>{item.role}</span>/<span>{item.tag}</span>
              </div>
            </div>
            {item.content}
          </div>
        ))}
      </div>
      <Spacer />
    </section>
  );
}

const techSkills = [
  {
    tag: "Languages",
    details: "Typescript/Javascript, Golang, Python, Java",
  },
  {
    tag: "Frameworks/Libraries",
    details: "Next.JS, React, Tailwind, Kubernetes, GraphQL",
  },
  {
    tag: "Databases/Datastores",
    details: "MongoDB, Redis, MySQL, DynamoDB, Prometheus, Neo4j",
  },
  {
    tag: "Tooling/Software",
    details: "Docker, Git, Figma, Grafana, Adobe Suite, DOMO",
  },
  {
    tag: "Services",
    details:
      "Github, Vercel, Stripe, AWS (Certified), Google Cloud, DigitalOcean",
  },
];

function SkillsSection() {
  return (
    <section>
      <h2 className="font-display text-xl font-bold mb-4">Technical Skills</h2>
      <div className="mb-6">
        {techSkills.map((item, idx) => (
          <div
            key={idx}
            className="flex md:flex-row flex-col md:items-center gap-2 md:gap-4 mb-3 md:mb-2"
          >
            <div className="text-xs border border-black py-2 rounded-sm w-44 font-mono font-medium flex justify-center">
              {item.tag}
            </div>
            <div className="w-4/5">{item.details}</div>
          </div>
        ))}
      </div>
      <Spacer />
    </section>
  );
}
