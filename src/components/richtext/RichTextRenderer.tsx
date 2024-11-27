import React, { useEffect, useState } from 'react';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, Document, Node } from '@contentful/rich-text-types';
import Image from 'next/image';

interface RichTextProps {
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

const RichTextRenderer: React.FC<RichTextProps> = ({ content, links }) => {
  const [toc, setToc] = useState<TOCItem[]>([]);

  if (!content) {
    console.error('Content is not available');
    return <p>Content is not available</p>;
  }

  const assetMap = links.assets.block.reduce((map, asset) => {
    map[asset.sys.id] = asset;
    return map;
  }, {} as Record<string, typeof links.assets.block[number]>);

  const generateId = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  const extractText = (children: React.ReactNode): string => {
    return React.Children.toArray(children)
      .map((child) => {
        if (typeof child === 'string') {
          return child;
        } else if (React.isValidElement(child)) {
          return extractText(child.props.children);
        }
        return '';
      })
      .join('');
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
      [MARKS.BOLD]: (text: React.ReactNode) => <strong className='min-h-3 overflow-hidden'>{text}</strong>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: Node, children: React.ReactNode) => <p className='min-h-3 overflow-hidden'>{children}</p>,
      [BLOCKS.HEADING_1]: (_node: Node, children: React.ReactNode) => {
        const text = extractText(children); // Извлекаем текст без номера
        const id = generateId(text); // Генерируем чистый id
        return <h1 className='min-h-3 overflow-hidden' id={id} >{text}</h1>; // Рендерим текст без номера
      },
      [BLOCKS.HEADING_2]: (_node: Node, children: React.ReactNode) => {
        const text = extractText(children);
        const id = generateId(text);
        return <h2 className='min-h-3 overflow-hidden' id={id} >{text}</h2>;
      },
      [BLOCKS.HEADING_3]: (_node: Node, children: React.ReactNode) => {
        const text = extractText(children);
        const id = generateId(text);
        return <h3 className='min-h-3 overflow-hidden' id={id}  >{text}</h3>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const assetId = node?.data?.target?.sys?.id;
        if (!assetId) {
          console.error('Embedded asset is missing sys.id:', node);
          return null;
        }

        const asset = assetMap[assetId];
        if (!asset) {
          console.error('Asset not found for sys.id:', assetId);
          return null;
        }

        return (
          <Image
            src={asset.url}
            alt={asset.title || 'Embedded asset'}
            width={asset.width || 800}
            height={asset.height || 600}
            layout="responsive"
            priority
           
          />
        );
      },
    },
  };

  return (
    <div className="flex flex-wrap mx-3">
      
    {/* Оглавление */}
    <aside className="w-full md:w-1/4 mb-10">
      <nav>
        <h2>Оглавление</h2>
        <ol>
          {toc.map((item, index) => (
            <li key={item.id}  style={{ marginLeft: `${(item.level - 1) * 10}px` }}>
              <a href={`#${item.id}`} className='min-h-4 overflow-hidden'>
                {index + 1} – {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>

    {/* Основной контент */}
    <div className="w-full md:w-3/4 ">
      {documentToReactComponents(content, options)}
    </div>
  </div>
  );
};

export default RichTextRenderer;
