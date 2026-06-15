import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const REMARK_PLUGINS = [remarkGfm];

export const MarkdownView = memo(function MarkdownView({
  children,
}: {
  children: string;
}) {
  return (
    <div className="prose-tutor prose-sm">
      <ReactMarkdown remarkPlugins={REMARK_PLUGINS}>{children}</ReactMarkdown>
    </div>
  );
});
