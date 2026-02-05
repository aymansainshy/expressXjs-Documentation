import { MessageCircle, Github, Twitter, Youtube, BookOpen, Users, Award, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const communityLinks = [
  {
    title: 'Discord',
    description: 'Join our Discord server to chat with other developers, ask questions, and get help.',
    icon: MessageCircle,
    href: 'https://discord.gg/framework',
    color: 'bg-indigo-500/10 text-indigo-500',
  },
  {
    title: 'GitHub',
    description: 'Star the repository, report issues, and contribute to the project.',
    icon: Github,
    href: 'https://github.com/framework/framework',
    color: 'bg-gray-500/10 text-gray-700 dark:text-gray-300',
  },
  {
    title: 'Twitter',
    description: 'Follow us for the latest news, updates, and tips.',
    icon: Twitter,
    href: 'https://twitter.com/framework',
    color: 'bg-sky-500/10 text-sky-500',
  },
  {
    title: 'YouTube',
    description: 'Watch tutorials, demos, and conference talks.',
    icon: Youtube,
    href: 'https://youtube.com/framework',
    color: 'bg-red-500/10 text-red-500',
  },
  {
    title: 'Stack Overflow',
    description: 'Ask and answer questions tagged with "framework".',
    icon: BookOpen,
    href: 'https://stackoverflow.com/questions/tagged/framework',
    color: 'bg-orange-500/10 text-orange-500',
  },
  {
    title: 'Blog',
    description: 'Read articles, tutorials, and case studies.',
    icon: Users,
    href: '/blog',
    color: 'bg-green-500/10 text-green-500',
  },
];

const contributors = [
  { name: 'John Doe', role: 'Core Maintainer', avatar: 'JD' },
  { name: 'Jane Smith', role: 'Core Maintainer', avatar: 'JS' },
  { name: 'Bob Johnson', role: 'Contributor', avatar: 'BJ' },
  { name: 'Alice Williams', role: 'Contributor', avatar: 'AW' },
  { name: 'Charlie Brown', role: 'Contributor', avatar: 'CB' },
  { name: 'Diana Prince', role: 'Contributor', avatar: 'DP' },
];

const resources = [
  {
    title: 'Official Documentation',
    description: 'Comprehensive guides and API references.',
    link: '/docs',
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video courses for beginners and advanced users.',
    link: '#',
  },
  {
    title: 'Example Projects',
    description: 'Real-world projects to learn from and get inspired.',
    link: '/examples',
  },
  {
    title: 'Best Practices',
    description: 'Guidelines and patterns for building scalable applications.',
    link: '/docs/best-practices',
  },
];

const events = [
  {
    title: 'Framework Conf 2024',
    date: 'March 15-17, 2024',
    location: 'San Francisco, CA',
    description: 'The annual Framework conference featuring talks from core team members and community contributors.',
  },
  {
    title: 'Monthly Community Call',
    date: 'First Thursday of every month',
    location: 'Online',
    description: 'Join our monthly community call to discuss new features, roadmap, and community updates.',
  },
];

export function Community() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
              Join the Community
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Connect with thousands of developers building amazing applications with Framework. 
              Get help, share your projects, and contribute to the ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://discord.gg/framework"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Join Discord
                </Button>
              </a>
              <a
                href="https://github.com/framework/framework"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <Github className="w-5 h-5" />
                  Star on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Community Links */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-8 text-center">Connect With Us</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-xl bg-background border border-border hover:border-brand-primary/50 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center mb-4`}>
                  <link.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-primary transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-8 text-center">Learning Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.link}
                className="group p-6 rounded-xl bg-muted/50 border border-border hover:border-brand-primary/50 transition-all"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-8 text-center">Upcoming Events</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {events.map((event) => (
              <div
                key={event.title}
                className="p-6 rounded-xl bg-background border border-border"
              >
                <div className="flex items-center gap-2 text-sm text-brand-primary mb-2">
                  <span>{event.date}</span>
                  <span>•</span>
                  <span>{event.location}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Our Contributors</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
            Framework is made possible by the hard work of our amazing community of contributors.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {contributors.map((contributor) => (
              <div key={contributor.name} className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mb-2 mx-auto">
                  <span className="text-lg font-semibold text-brand-primary">
                    {contributor.avatar}
                  </span>
                </div>
                <p className="font-medium text-sm">{contributor.name}</p>
                <p className="text-xs text-muted-foreground">{contributor.role}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a
              href="https://github.com/framework/framework/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-primary hover:underline"
            >
              View all contributors →
            </a>
          </div>
        </div>
      </section>

      {/* Contributing CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-primary-dark">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Award className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-semibold mb-4">Want to Contribute?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              We welcome contributions of all kinds! Whether it&apos;s code, documentation, 
              or helping others in the community, your contribution matters.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/framework/framework/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" className="gap-2">
                  <Heart className="w-4 h-4" />
                  Contributing Guide
                </Button>
              </a>
              <a
                href="https://github.com/framework/framework/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Good First Issues
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-semibold text-brand-primary">50K+</p>
              <p className="text-sm text-muted-foreground">GitHub Stars</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-brand-primary">100+</p>
              <p className="text-sm text-muted-foreground">Contributors</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-brand-primary">10K+</p>
              <p className="text-sm text-muted-foreground">Discord Members</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-brand-primary">1M+</p>
              <p className="text-sm text-muted-foreground">Weekly Downloads</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
