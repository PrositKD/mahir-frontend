import I18nProvider from "./contexts/i18n";
import SiteProvider from "./contexts/site";
import Providers from "./provider/userProvider";
import "./styles/globals.scss";

export const metadata = {
  title: "Agencistick",
  description:
    "A dynamic agency offering innovative solutions to meet your business needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <I18nProvider>
          <Providers>
            <SiteProvider>{children}</SiteProvider>
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
