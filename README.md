# Framework Documentation

A modern, production-ready documentation website built with React, TypeScript, and Tailwind CSS. Inspired by the NestJS documentation design.

![Framework Documentation](https://i.imgur.com/your-screenshot.png)

## Features

- **Modern Design**: Clean, professional UI inspired by NestJS documentation
- **Syntax Highlighting**: Full code syntax highlighting for TypeScript, JavaScript, Bash, JSON, and more
- **Dark/Light Mode**: Toggle between dark and light themes with persistent preference
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Collapsible Sidebar**: Organized navigation with expandable sections
- **Table of Contents**: Auto-updating TOC that highlights current section
- **Search**: Built-in search functionality with keyboard shortcut (⌘K / Ctrl+K)
- **Smooth Animations**: Polished transitions and scroll effects

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Syntax Highlighting**: PrismJS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/framework-docs.git
cd framework-docs
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── layout/        # Layout components (Header, Sidebar, Footer)
│   │   └── ui-custom/     # Custom UI components (CodeBlock)
│   ├── data/              # Documentation content data
│   ├── sections/          # Page sections (Hero)
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   ├── App.css            # App-specific styles
│   ├── index.css          # Global styles and Tailwind imports
│   └── main.tsx           # Application entry point
├── index.html             # HTML entry point
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Customizing the Documentation

### Adding New Sections

1. Open `src/App.tsx`
2. Add a new section object to the `docSections` array:

```typescript
{
  id: 'your-section-id',
  title: 'Your Section Title',
  level: 2, // 1 for main heading, 2 for subheading
  content: `Your section content here...`,
  code: {
    language: 'typescript',
    filename: 'example.ts',
    content: `// Your code example here`
  }
}
```

### Adding Code Examples

Code blocks support the following languages:
- `typescript`
- `javascript`
- `bash` / `shell`
- `json`
- `markdown`
- `dockerfile`

Example:
```typescript
{
  code: {
    language: 'typescript',
    filename: 'example.ts',
    content: `import { Controller, Get } from '@framework/common';

@Controller()
export class ExampleController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}`
  }
}
```

### Updating Navigation

1. Open `src/data/navigation.ts`
2. Add or modify navigation items in the `navigation` array

### Styling

- Global styles: `src/index.css`
- App-specific styles: `src/App.css`
- Tailwind config: `tailwind.config.js`

## Building for Production

1. Build the project:
```bash
npm run build
```

2. The build output will be in the `dist/` directory

3. Preview the production build locally:
```bash
npm run preview
```

## Deployment

### Static Hosting (Recommended)

The built files in `dist/` can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions or deploy manually
- **AWS S3**: Upload `dist/` contents to your S3 bucket
- **Firebase Hosting**: `firebase deploy`

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t framework-docs .
```

2. Run the container:
```bash
docker run -p 80:80 framework-docs
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Development
VITE_APP_TITLE=Framework Documentation

# Production
VITE_API_URL=https://api.example.com
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@framework.com or join our Discord community.

---

Built with ❤️ by the Framework Team
# expressXjs-Documentation
