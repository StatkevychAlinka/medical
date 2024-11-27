import React, { useEffect, useState } from 'react';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, Document, Node } from '@contentful/rich-text-types';
import Image from 'next/image';

interface RichTextProps {
  blog: { 
    data: string;
    title: string;
  }
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

    // Обрабатываем контент и устанавливаем TOC
    documentToReactComponents(content, optionsWithTOC);
    setToc(newToc);
  }, [content]);

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: Node, children: React.ReactNode) => <p className='mt-3 mb-3'>{children}</p>,
      [BLOCKS.HEADING_1]: (_node: Node, children: React.ReactNode) => {
        const text = extractText(children);
        const id = generateId(text);
        return <h1 id={id} className='mb-7.5 mt-7.5 text-[34px] font-semibold leading-[45px] text-white'>{text}</h1>;
      },
      [BLOCKS.HEADING_2]: (_node: Node, children: React.ReactNode) => {
        const text = extractText(children);
        const id = generateId(text);
        return <h2 id={id} className='text-2xl font-semibold mt-6 text-white'>{text}</h2>;
      },
      [BLOCKS.HEADING_3]: (_node: Node, children: React.ReactNode) => {
        const text = extractText(children);
        const id = generateId(text);
        return <h3 id={id} className='text-xl font-semibold mt-3 text-white'>{text}</h3>;
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
          <div className='w-full lg:w-1/5 mt-6 mb-6'>
          <Image
            src={asset.url}
            alt={asset.title || 'Embedded asset'}
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
      <aside className="w-full md:w-1/4 mb-10 min-h-[200px] mt-10">
        {/* Зарезервированное пространство */}
        {toc.length > 0 && (
          <nav>
            <h2 className='text-2xl font-semibold mb-6 text-white'> Introducere</h2>
            <ol>
              {toc.map((item, index) => (
                <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 10}px` }}>
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
      <div className="flex cursor-pointer flex-wrap items-center gap-2 duration-300 ease-in hover:text-white">
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 3.3125H15.875V2.625C15.875 2.25 15.5625 1.90625 15.1562 1.90625C14.75 1.90625 14.4375 2.21875 14.4375 2.625V3.3125H5.53125V2.625C5.53125 2.25 5.21875 1.90625 4.8125 1.90625C4.40625 1.90625 4.09375 2.21875 4.09375 2.625V3.3125H2.5C1.4375 3.3125 0.53125 4.1875 0.53125 5.28125V16.1563C0.53125 17.2188 1.40625 18.125 2.5 18.125H17.5C18.5625 18.125 19.4687 17.25 19.4687 16.1563V5.25C19.4687 4.1875 18.5625 3.3125 17.5 3.3125ZM1.96875 9.125H4.625V12.2188H1.96875V9.125ZM6.03125 9.125H9.3125V12.2188H6.03125V9.125ZM9.3125 13.625V16.6875H6.03125V13.625H9.3125ZM10.7187 13.625H14V16.6875H10.7187V13.625ZM10.7187 12.2188V9.125H14V12.2188H10.7187ZM15.375 9.125H18.0312V12.2188H15.375V9.125ZM2.5 4.71875H4.125V5.375C4.125 5.75 4.4375 6.09375 4.84375 6.09375C5.25 6.09375 5.5625 5.78125 5.5625 5.375V4.71875H14.5V5.375C14.5 5.75 14.8125 6.09375 15.2187 6.09375C15.625 6.09375 15.9375 5.78125 15.9375 5.375V4.71875H17.5C17.8125 4.71875 18.0625 4.96875 18.0625 5.28125V7.71875H1.96875V5.28125C1.96875 4.96875 2.1875 4.71875 2.5 4.71875ZM1.96875 16.125V13.5938H4.625V16.6563H2.5C2.1875 16.6875 1.96875 16.4375 1.96875 16.125ZM17.5 16.6875H15.375V13.625H18.0312V16.1563C18.0625 16.4375 17.8125 16.6875 17.5 16.6875Z"
                    fill=""
                  ></path>
                </svg>
                <span className="text-sm font-medium">{blog.data}</span>
              </div>
      
        {documentToReactComponents(content, options)}
      </div>
    </div>
  );
};

export default RichTextRenderer;
