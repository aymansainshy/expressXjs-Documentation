import { useLocation, useNavigate } from 'react-router-dom';
import { GitBranch } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDocsVersion } from '@/context/DocsVersionContext';
import { docsVersionDefinitions, getDocsVersion, resolveDocsPage } from '@/docs/registry';
import { getDocsPath } from '@/docs/paths';

export function DocsVersionSelector({ onNavigate }: { onNavigate?: () => void }) {
  const { definition, activePage } = useDocsVersion();
  const location = useLocation();
  const navigate = useNavigate();

  const handleVersionChange = (version: string) => {
    const targetDefinition = getDocsVersion(version);
    if (!targetDefinition) return;

    const requestedSlug = activePage?.slug ?? 'introduction';
    const targetPage = resolveDocsPage(targetDefinition, requestedSlug);
    const targetPath = targetPage?.path ?? getDocsPath(targetDefinition.id);
    navigate(`${targetPath}${location.search}${location.hash}`);
    onNavigate?.();
  };

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3">
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <GitBranch className="h-3.5 w-3.5" /> Documentation version
      </p>
      <Select value={definition.id} onValueChange={handleVersionChange}>
        <SelectTrigger className="w-full bg-background" aria-label="Select documentation version">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {docsVersionDefinitions.map((version) => (
            <SelectItem key={version.id} value={version.id}>
              {version.label}{version.status === 'latest' ? ' — Latest' : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
