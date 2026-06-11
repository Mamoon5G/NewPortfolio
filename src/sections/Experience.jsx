import ScrollReveal from './ScrollReveal';
import SectionHeader from './SectionHeader';

const experiences = [
  {
    period: 'March 2026 - Present',
    title: 'Frontend Web Developer - Intern',
    company: 'HomeFirst Finance Company (HFFC)',
    desc: 'Currently working on building and enhancing the company\'s web applications using React, TypeScript, and various AI tools. Responsible for implementing new features, optimizing existing code, and collaborating with the team to deliver high-quality software solutions.',
    tags: ['React', 'TypeScript', 'AI Tools (ChatGPT, DALL-E, etc.)'],
  },
  {
    period: 'June 2022 - August 2022',
    title: 'Frontend Web Developer - Intern',
    company: 'SmartByte StudyLeague IT Solutions',
    desc: 'Worked on developing and maintaining web applications using HTML, CSS, JavaScript, PHP, and MySQL. Collaborated with cross-functional teams to design and implement new features, optimize performance, and ensure a seamless user experience.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="relative z-10 section-padding">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionHeader label="Career Journey" title="Experience that Speaks" />
        <p className="text-center text-muted-foreground mb-8 md:mb-16 -mt-8 md:-mt-12 text-sm md:text-base">
          I've had the privilege of working with diverse teams and technologies, contributing to impactful projects that drive innovation and deliver value to clients.
        </p>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-primary/50 via-secondary/50 to-transparent" />

          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className={`relative flex flex-col md:flex-row gap-6 md:gap-8 mb-10 md:mb-16 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 mt-2 glow-border" />
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-6 md:text-right' : 'md:pl-6 md:text-left'} pl-8 md:pl-0`}>
                  <span className="text-xs md:text-sm font-mono text-primary">{exp.period}</span>
                </div>
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pl-6' : 'md:pr-6'} pl-8 md:pl-0`}>
                  <div className="glass-card p-5 md:p-5 rounded-2xl">
                    <h3 className="text-base md:text-lg font-semibold mb-1">{exp.title}</h3>
                    <p className="text-primary text-xs md:text-sm mb-2 md:mb-3">{exp.company}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">{exp.desc}</p>
                    <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? '' : 'md:justify-end'}`}>
                      {exp.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience