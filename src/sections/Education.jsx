import { GraduationCap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SectionHeader from './SectionHeader';

const education = [
  {
    period: '2023 - 2026',
    title: 'Bachelor of Technology in Computer Science and Engineering',
    school: 'Shah and Anchor Kutchhi Engineering College, Mumbai',
    desc: 'Graduated with a CGPA of 8.5, with coursework focused on data structures, algorithms, databases, and software engineering. Completed a capstone project on building a scalable web application for real-time data visualization.',
  },
  {
    period: '2020 - 2023',
    title: 'Diploma in Computer Engineering',
    school: 'M.H Saboo Siddik Polytechnic, Mumbai',
    desc: 'Graduated with a percentage of 86%, with coursework focused on programming languages, computer networks, and software development. Completed a project on developing a mobile application for local event management.',
  },
];

export const Education = () => {
  return (
    <section id="education" className="relative z-10 section-padding">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionHeader label="Academic Journey" title="Education that Shapes" />
        <p className="text-center text-muted-foreground mb-8 md:mb-16 -mt-8 md:-mt-12 text-sm md:text-base">
          My academic journey has been a blend of rigorous coursework and hands-on projects, providing me with a strong foundation in computer science principles and practical skills.
        </p>

        <div className="space-y-6 md:space-y-8">
          {education.map((edu, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="glass-card p-5 md:p-8 rounded-2xl group">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    <GraduationCap size={22} className="md:size-6" />
                  </div>
                  <div>
                    <span className="text-xs md:text-sm font-mono text-primary">{edu.period}</span>
                    <h3 className="text-base md:text-lg font-semibold mt-1">{edu.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{edu.school}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-3 leading-relaxed">{edu.desc}</p>
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

export default Education