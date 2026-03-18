import { Code2, Brain, Users, BookOpen, Lightbulb } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SectionHeader from './SectionHeader';

const traits = [
  { icon: Code2, title: 'Full-Stack Developer', desc: 'Experienced in building scalable web applications using React, Node.js, and MongoDB.' },
  { icon: Brain, title: 'Problem Solver', desc: 'Strong analytical skills with a passion for solving complex coding challenges and optimizing performance.' },
  { icon: Users, title: 'Collaboration', desc: 'Excellent team player with experience working in agile environments and collaborating with cross-functional teams.' },
  { icon: BookOpen, title: 'Continuous Learner', desc: 'Committed to staying up-to-date with the latest technologies and continuously improving my skills.' },
  { icon: Lightbulb, title: 'Innovative Thinker', desc: 'Creative problem-solving mindset with a focus on delivering innovative solutions.' },
];

export const About = () => {
  return (
    <section id="about" className="relative z-10">
      <div className="container mx-auto px-6">
        <SectionHeader label="About Me" title="Building the Future One component at a time." />
    
        <div className="grid lg:grid-cols-2 gap-8 mb-12 md:mb-16 items-center">
          <ScrollReveal>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                I'm a Computer Science student who simply enjoys building and learning. I started coding out of curiosity and gradually developed an interest in solving logical problems and creating structured solutions. I like working on projects where I can experiment, improve, and understand the reasoning behind every line of code.
              </p>
              <p>
                Apart from academics, I've explored competitive programming, small automation ideas, and web-based projects. I prefer keeping things simple, clean, and efficient rather than overcomplicating solutions.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <p className="text-foreground italic leading-relaxed text-base md:text-lg">
                "My mission is to build innovative and user-friendly applications that make a positive impact on people's lives. I am always eager to take on new challenges and collaborate with others to create something truly remarkable. Let's connect and see how we can work together to bring your ideas to life!"
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {traits.map((trait, i) => (
            <ScrollReveal key={trait.title} delay={i * 0.1}>
              <div className="glass-card p-5 md:p-6 rounded-2xl h-full group">
                <trait.icon className="w-8 h-8 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-base md:text-lg font-semibold mb-2">{trait.title}</h3>
                <p className="text-sm text-muted-foreground">{trait.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About