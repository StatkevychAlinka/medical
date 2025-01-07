import React, { useEffect, useState } from "react";
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, Document, Node } from "@contentful/rich-text-types";
import Image from "next/image";

interface RichTextProps {
  blog: {
    data: string;
    title: string;
  };
  content: Document;
  links: {
    assets: {
      block: {
        sys: { id: string };
        url: string;
        title: string;
        description: string;
        width: number;
        height: number;
        contentType: string;
      }[];
    };
  };
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const RichTextRenderer: React.FC<RichTextProps> = ({ content, links, blog }) => {
  const [toc, setToc] = useState<TOCItem[]>([]);

  if (!content) {
    console.error("Content is not available");
    return <p>Content is not available</p>;
  }

  const assetMap = links.assets.block.reduce((map, asset) => {
    map[asset.sys.id] = asset;
    return map;
  }, {} as Record<string, typeof links.assets.block[number]>);

  const generateId = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const extractText = (children: React.ReactNode): string => {
    return React.Children.toArray(children)
      .map((child) => {
        if (typeof child === "string") {
          return child;
        } else if (React.isValidElement(child)) {
          return extractText(child.props.children);
        }
        return "";
      })
      .join("");
  };

  useEffect(() => {
    const newToc: TOCItem[] = [];

    const optionsWithTOC: Options = {
      renderNode: {
        [BLOCKS.HEADING_1]: (_node: Node, children: React.ReactNode) => {
          const text = extractText(children);
          const id = generateId(text);
          newToc.push({ id, text, level: 1 });
          return null;
        },
        [BLOCKS.HEADING_2]: (_node: Node, children: React.ReactNode) => {
          const text = extractText(children);
          const id = generateId(text);
          newToc.push({ id, text, level: 2 });
          return null;
        },
        [BLOCKS.HEADING_3]: (_node: Node, children: React.ReactNode) => {
          const text = extractText(children);
          const id = generateId(text);
          newToc.push({ id, text, level: 3 });
          return null;
        },
      },
    };

    documentToReactComponents(content, optionsWithTOC);
    setToc(newToc);
  }, [content]);

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: Node, children: React.ReactNode) => (
        <p className="mt-3 mb-3 text-gray-800 dark:text-gray-300">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (_node: Node, children: React.ReactNode) => {
        const text = extractText(children);
        const id = generateId(text);
        return (
          <h1
            id={id}
            className="mb-7.5 mt-7.5 text-[34px] font-semibold leading-[45px] text-gray-900 dark:text-white"
          >
            {text}
          </h1>
        );
      },
      [BLOCKS.HEADING_2]: (_node: Node, children: React.ReactNode) => {
        const text = extractText(children);
        const id = generateId(text);
        return (
          <h2 id={id} className="text-3xl font-extrabold mt-10 text-gray-800 dark:text-gray-200">
            {text}
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (_node: Node, children: React.ReactNode) => {
        const text = extractText(children);
        const id = generateId(text);
        return (
          <h3 id={id} className="text-xl font-semibold mt-3 text-gray-800 dark:text-gray-200">
            {text}
          </h3>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const assetId = node?.data?.target?.sys?.id;
        if (!assetId) {
          console.error("Embedded asset is missing sys.id:", node);
          return null;
        }

        const asset = assetMap[assetId];
        if (!asset) {
          console.error("Asset not found for sys.id:", assetId);
          return null;
        }

        return (
          <div className="w-full mt-6 mb-6">
            <Image
              src={asset.url}
              alt={asset.title || "Embedded asset"}
              width={asset.width || 600}
              height={asset.height || 600}
              priority
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        );
      },
    },
  };

  return (
    <div className="flex flex-wrap mx-3">
      {/* Оглавление */}
      <aside className="w-full md:w-1/4 mb-10 min-h-[200px] lg:px-6">
        {toc.length > 0 && (
          <nav className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              Introducere
            </h2>
            <ol className="text-gray-800 dark:text-gray-300">
              {toc.map((item, index) => (
                <li
                  key={item.id}
                  style={{ marginLeft: `${(item.level - 1) * 10}px` }}
                  className="hover:text-blue-500 dark:hover:text-blue-300"
                >
                  <a href={`#${item.id}`}>
                    {index + 1} – {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </aside>

      {/* Основной контент */}
      <div className="w-full md:w-3/4">
        <div className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-300">
          <span className="text-sm font-medium">{blog.data}</span>
        </div>

        {documentToReactComponents(content, options)}
      </div>
    </div>
  );
};

export default RichTextRenderer;
