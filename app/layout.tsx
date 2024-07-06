import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

import { hostMap } from '@/config/multi-site';
import { headers } from "next/headers";
import Tr1pIoLayout from "./@tr1p_io/_layout";

type LayoutType = React.ComponentType<{ children: React.ReactNode }>;

interface LayoutConfig {
  PropertyLayout: LayoutType;
  propertyContent: React.ReactNode;
  shouldRenderChildren: boolean;
}

interface HostMapType {
  [key: string]: string;
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

function configureLayout({
  tr1p_io,
}: {
  tr1p_io: React.ReactNode;
}): LayoutConfig {
  const host = headers().get('host') ?? '';
  let PropertyLayout: LayoutType = Tr1pIoLayout; // Default to Tr1pRootLayout
  let propertyContent: React.ReactNode = tr1p_io; // Default property content
  let shouldRenderChildren = true;

  switch (hostMap[host]) {
    case 'tr1p.io':
      PropertyLayout = Tr1pIoLayout;
      propertyContent = tr1p_io;
      break;
    default:
      console.warn(`Unknown host: ${host}. Defaulting to Tr1pRootLayout.`);
      break;
  }

  // Assuming propertyContent is a React component with props including childProp
  // This cast ensures we can safely access .props on propertyContent
  const componentProps = propertyContent as React.ComponentPropsWithRef<any>;
  console.log(componentProps)
  shouldRenderChildren = componentProps?.props?.childProp?.segment === '__DEFAULT__';
  console.log(shouldRenderChildren)
  return { PropertyLayout, propertyContent, shouldRenderChildren };
}

export default function RootLayout({
  children,
  tr1p_io,
}: {
  children: React.ReactNode;
  tr1p_io: React.ReactNode;
}) {


  const { PropertyLayout, propertyContent, shouldRenderChildren } = configureLayout({ tr1p_io });

  return (

		<PropertyLayout>
			{propertyContent}
			{/*Conditional for rendering children. This is what makes it fallback to non-slot implementation */}
			{shouldRenderChildren && children}
		</PropertyLayout>


  );
}
