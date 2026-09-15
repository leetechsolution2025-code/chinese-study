import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Hoa Ngữ | Ứng Dụng Học Tiếng Trung Toàn Diện',
  description:
    'Luyện 4 kỹ năng Nghe - Nói - Đọc - Viết tiếng Trung tối ưu cho người Việt: Bộ thủ, Chiết tự, Âm Hán-Việt, Biểu đồ thanh điệu và Flashcard SRS.',
};

import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else if (saved === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }

                  var savedLang = localStorage.getItem('app_language');
                  if (savedLang === 'en' || savedLang === 'vi') {
                    document.documentElement.lang = savedLang;
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <LanguageProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 70px)', padding: '24px 16px' }}>
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
