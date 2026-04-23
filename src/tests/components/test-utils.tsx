import { useState, type ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
