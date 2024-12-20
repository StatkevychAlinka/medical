import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

export type DynamicCloudProps = {
  iconSlugs?: string[]; // Для SimpleIcons
  imageUrls?: string[]; // Для кастомных изображений
};

export function IconCloud({ iconSlugs, imageUrls }: DynamicCloudProps): JSX.Element {
  const [data, setData] = useState<SimpleIcon[] | null>(null);
  const { theme } = useTheme();

  // Загружаем SimpleIcons, если передан iconSlugs
  useEffect(() => {
    if (iconSlugs) {
      fetchSimpleIcons({ slugs: iconSlugs }).then((result) => {
        setData(Object.values(result.simpleIcons));
      });
    }
  }, [iconSlugs]);

  // Рендерим SimpleIcons
  const renderedIcons = useMemo(() => {
    if (!data) return [];
    return data.map((icon) =>
      renderSimpleIcon({
        icon,
        bgHex: theme === "light" ? "#f3f2ef" : "#080510",
        fallbackHex: theme === "light" ? "#6e6e73" : "#ffffff",
        minContrastRatio: theme === "dark" ? 2 : 1.2,
        size: 42,
      })
    );
  }, [data, theme]);

  // Рендерим кастомные изображения
  const renderedImages = useMemo(() => {
    if (!imageUrls) return [];
    return imageUrls.map((url, index) => (
      <img
        key={index}
        src={url}
        alt={`Custom Icon ${index}`}
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
        }}
      />
    ));
  }, [imageUrls]);

  return (
    <div className="px-3">
    <Cloud {...cloudProps}>
      {renderedIcons}
      {renderedImages}
    </Cloud>
    </div>
  );
}
