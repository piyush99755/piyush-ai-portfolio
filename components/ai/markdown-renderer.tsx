import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface Block {
  type: "heading" | "list" | "ordered-list" | "paragraph";
  level?: 1 | 2 | 3;
  items?: string[];
  lines?: string[];
}

// Ensure URL is safe (prevent javascript:, data:, etc.)
function isSafeUrl(url: string): boolean {
  const trimmed = url.trim().toLowerCase();
  return (
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("mailto:")
  );
}

// Parse inline formatting: **bold**, `code`, [label](url), bare URLs
function renderInline(text: string): React.ReactNode[] {
  // Regex matches:
  // 1. Bold: **text**
  // 2. Inline code: `text`
  // 3. Markdown link: [label](url)
  // 4. Bare URL: https://... or http://...
  const tokenRegex =
    /(\*\*[^*]+?\*\*|`[^`]+?`|\[[^\]]+?\]\((?:https?:\/\/[^\s\)]+|\/[^\s\)]*)\)|https?:\/\/[^\s<>"'{}|\\^`\[\]()]+)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchText = match[0];

    // Push preceding plain text
    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex));
    }

    if (matchText.startsWith("**") && matchText.endsWith("**")) {
      const boldContent = matchText.slice(2, -2);
      parts.push(
        <strong key={`bold-${matchIndex}`} className="font-semibold text-foreground">
          {boldContent}
        </strong>
      );
    } else if (matchText.startsWith("`") && matchText.endsWith("`")) {
      const codeContent = matchText.slice(1, -1);
      parts.push(
        <code
          key={`code-${matchIndex}`}
          className="bg-muted px-1.5 py-0.5 rounded text-[11px] font-mono border border-border/40 text-foreground"
        >
          {codeContent}
        </code>
      );
    } else if (matchText.startsWith("[") && matchText.includes("](")) {
      const linkMatch = matchText.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch && isSafeUrl(linkMatch[2])) {
        const label = linkMatch[1];
        const href = linkMatch[2];
        parts.push(
          <a
            key={`link-${matchIndex}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-2 font-medium"
          >
            {label}
          </a>
        );
      } else {
        parts.push(matchText);
      }
    } else if (matchText.startsWith("http://") || matchText.startsWith("https://")) {
      let url = matchText;
      let trailingPunctuation = "";
      const trailingMatch = url.match(/[.,;:!?)]+$/);
      if (trailingMatch) {
        trailingPunctuation = trailingMatch[0];
        url = url.slice(0, -trailingPunctuation.length);
      }

      if (isSafeUrl(url)) {
        parts.push(
          <React.Fragment key={`url-${matchIndex}`}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-2 break-all font-mono text-[11px] sm:text-xs"
            >
              {url}
            </a>
            {trailingPunctuation}
          </React.Fragment>
        );
      } else {
        parts.push(matchText);
      }
    } else {
      parts.push(matchText);
    }

    lastIndex = matchIndex + matchText.length;
  }

  // Push trailing text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  if (!content) return null;

  // Normalize escaped markdown if present (e.g. \*\* -> **, \* -> *, \# -> #)
  const normalized = content.replace(/\\([*#_`~[\]()])/g, "$1");

  const rawLines = normalized.split(/\r?\n/);
  const blocks: Block[] = [];
  let currentBlock: Block | null = null;

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();

    // Blank line terminates current paragraph or list
    if (!trimmed) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }

    // Heading match: ### Heading, ## Heading, # Heading
    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      const level = headingMatch[1].length as 1 | 2 | 3;
      blocks.push({
        type: "heading",
        level,
        lines: [headingMatch[2]],
      });
      continue;
    }

    // Unordered list item: * item, - item, • item, + item
    const unorderedMatch = trimmed.match(/^[*•\-+]\s+(.+)$/);
    if (unorderedMatch) {
      if (currentBlock && currentBlock.type === "list") {
        currentBlock.items?.push(unorderedMatch[1]);
      } else {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = {
          type: "list",
          items: [unorderedMatch[1]],
        };
      }
      continue;
    }

    // Ordered list item: 1. item, 2. item
    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      if (currentBlock && currentBlock.type === "ordered-list") {
        currentBlock.items?.push(orderedMatch[1]);
      } else {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = {
          type: "ordered-list",
          items: [orderedMatch[1]],
        };
      }
      continue;
    }

    // Regular text line / paragraph
    if (currentBlock && currentBlock.type === "paragraph") {
      currentBlock.lines?.push(line);
    } else {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = {
        type: "paragraph",
        lines: [line],
      };
    }
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return (
    <div className={`space-y-2 text-xs sm:text-sm text-foreground/90 leading-relaxed ${className || ""}`}>
      {blocks.map((block, idx) => {
        if (block.type === "heading") {
          const headingText = block.lines?.[0] || "";
          if (block.level === 1) {
            return (
              <h3 key={idx} className="font-bold text-foreground text-sm sm:text-base mt-3 mb-1">
                {renderInline(headingText)}
              </h3>
            );
          }
          if (block.level === 2) {
            return (
              <h4 key={idx} className="font-semibold text-foreground text-xs sm:text-sm mt-2.5 mb-1">
                {renderInline(headingText)}
              </h4>
            );
          }
          return (
            <h5 key={idx} className="font-semibold text-foreground text-xs sm:text-sm mt-2 mb-1">
              {renderInline(headingText)}
            </h5>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1 my-1.5">
              {block.items?.map((item, itemIdx) => (
                <li key={itemIdx} className="leading-relaxed">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol key={idx} className="list-decimal pl-5 space-y-1 my-1.5">
              {block.items?.map((item, itemIdx) => (
                <li key={itemIdx} className="leading-relaxed">
                  {renderInline(item)}
                </li>
              ))}
            </ol>
          );
        }

        // Paragraph block
        return (
          <p key={idx} className="leading-relaxed my-1">
            {block.lines?.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {lineIdx > 0 && <br />}
                {renderInline(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
