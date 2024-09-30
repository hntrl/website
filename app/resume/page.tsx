import { MdOutlineMail } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import Link from "next/link";

import { twMerge as cs } from "tailwind-merge";

import { ExternalLink } from "~/components/icons";

export const metadata = {
  title: "Resume",
  themeColor: "#f7f5f2",
  robots: {
    index: false,
  },
};

function Spacer({ className }: { className?: string }) {
  return <div className={cs("h-px w-full bg-black mb-6", className)} />;
}

export default function ResumePage() {
  return (
    <main className="resume print:bg-transparent min-h-screen">
      <div className="pt-4 px-4 pb-40 max-w-3xl mx-auto">
        <Link
          href="/"
          className="block font-mono text-sm mb-4 hover:underline print:hidden"
        >
          ../
        </Link>
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-4xl font-bold">
                  Hunter Lovell
                </h1>
                <div className="text-2xl hidden print:block">
                  /<span className="ml-2">Software Engineer</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xl">
                <MdOutlineMail className="hidden print:block" />
                hunter@hntrl.io
              </div>
              <div className="hidden print:flex items-center gap-2 text-xl">
                <CgWebsite className="hidden print:block" />
                hntrl.io
              </div>
            </div>
          </div>
          <p className="mb-4">
            Software Engineer with 4+ years of comprehensive technical
            experience across multiple disciplines including frontend, backend,
            devops, and data engineering. Proven ability to navigate diverse
            vendor ecosystems to provide first-class digital experiences that
            scale. Well versed in all aspects of the software development cycle,
            from concept through to development and delivery. Also skilled in
            optimizing business procedures, processes, and productivity.
          </p>
          <Spacer />
        </section>
        <SkillsSection />
        <Spacer />
        <ExperienceSection />
        <Spacer className="break-before-page" />
        <EducationSection />
        <Spacer />
        <AccreditationSection />
        <Spacer />
        <p className="font-display text-sm mx-auto italic text-center print:mt-6">
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
    </section>
  );
}

const education = [
  {
    school: "Utah State University",
    location: "Logan, UT",
    certification: "B.S. Information Systems, Data Engineering",
    desc: "August 2022 - Expected Dec 2024",
  },
  {
    school: "Provo High School",
    location: "Provo, UT",
    certification: "Diploma",
    desc: "Honor Roll, 3.9 GPA, Magna Cum Laude",
  },
];

function EducationSection({ className }: { className?: string }) {
  return (
    <section className={className}>
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
    </section>
  );
}

const experience = {
  professional: [
    {
      title: "Junior Software Developer",
      place: "Outsmartly",
      location: "Remote",
      timeframe: "June 2023 - March 2024",
      link: "outsmartly.com",
      content: (
        <ul className="list-disc ml-4 md:ml-0">
          <li>
            Worked closely with 9 figure ecommerce brands to instill practices
            of conversion rate optimization and data driven business decisions.
          </li>
          <li>
            Ensured quality deliverables for new and existing clients by working
            closely with internal stakeholders and external vendors.
          </li>
          <li>
            Involved in the development of a product offering that centers
            around experimentation and lightning-fast web performance.
          </li>
          <li>
            <span className="italic">Technologies used:</span> TypeScript,
            BigQuery, Cloudflare, AWS, NextJS, React, Google Cloud
          </li>
        </ul>
      ),
    },
    {
      title: "Principal BI Developer",
      place: "Cubby's",
      location: "American Fork, UT",
      timeframe: "June 2021 - August 2022",
      link: "cubbys.co",
      content: (
        <ul className="list-disc ml-4 md:ml-0">
          <li>
            Conducted several platform migrations for critical business services
            including payroll providers, reporting workflows, point of sale
            solutions, and other customer facing implements.
          </li>
          <li>
            Directly oversaw $12m+ in payroll processing for 11+ retail
            locations and 300+ employees. Achieved this by building a data
            pipeline across multiple platforms that ensured compliance and
            accuracy, and was directly involved in making sure everyone got paid
            on time and correctly.
          </li>
          <li>
            Increased labor efficiency by 8% in-store and up to 60% in
            administrative processes through new software development and
            implementations through collaboration with internal stakeholders.
          </li>
          <li>
            Became the pointman for answering all data-intensive questions that
            arised from senior management and the c-suite.
          </li>
          <li>
            Implemented practices for data collection and warehousing for all
            past-and-present organizational data.
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
      title: "Stickerspace",
      link: null,
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
      <h2 className="font-display text-xl font-bold mb-4">
        Professional Experience
      </h2>
      <div className="mb-6">
        {experience.professional.map((item, idx) => (
          <div key={idx} className="mb-4 break-inside-avoid">
            <div className="md:flex justify-between items-center mb-2">
              <div>
                <h4 className="text-xl font-medium leading-5">{item.title}</h4>
                <div className="flex items-center gap-1">
                  <span>{item.place}</span>/
                  <span className="font-display text-xs">{item.location}</span>
                </div>
                <div className="font-display italic md:text-xs">
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
                  <ExternalLink className="w-4 h-4 print:hidden" />
                </a>
              </div>
            </div>
            {item.content}
          </div>
        ))}
      </div>
      <h3 className="text-xl font-display font-bold mb-4">Other Experience</h3>
      <div className="mb-6">
        {experience.other.map((item, idx) => (
          <div key={idx} className="mb-4 break-inside-avoid">
            <div className="mb-2">
              {item.link ? (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={item.link}
                  className="text-xl font-medium leading-5 flex items-center gap-1.5 hover:underline"
                >
                  {item.title}
                  <ExternalLink className="w-4 h-4 print:hidden" />
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
    details: "Next.JS, React, Astro, Pandas, PyCaret",
  },
  {
    tag: "Databases/Datastores",
    details: "MongoDB, Redis, MySQL, DynamoDB, Prometheus, Snowflake, Neo4j",
  },
  {
    tag: "Tooling/Software",
    details: "Docker, Git, Figma, Grafana, Adobe Suite, DOMO",
  },
  {
    tag: "Services",
    details:
      "Github, Cloudflare, Stripe, AWS (Certified), Google Cloud, DigitalOcean",
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
            className="flex md:flex-row flex-col md:items-center gap-2 md:gap-4 mb-3 md:mb-2 print:flex-row print:items-center"
          >
            <div className="text-xs border border-black py-2 rounded-sm w-44 font-mono font-medium flex justify-center">
              {item.tag}
            </div>
            <div className="w-4/5">{item.details}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
