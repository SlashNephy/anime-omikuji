import { createTheme, NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { RecoilURLSync } from 'recoil-sync'

import { App } from './App'
import { deserializeFilters, serializeFilters } from './lib/recoil'

const lightTheme = createTheme({
  type: 'light',
})

const darkTheme = createTheme({
  type: 'dark',
})

const queryClient = new QueryClient()

const container = document.getElementById('root')
if (container !== null) {
  const root = createRoot(container)
  root.render(
    <StrictMode>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <RecoilURLSync
                deserialize={deserializeFilters}
                location={{ part: 'search' }}
                serialize={serializeFilters}
              >
                <App />
              </RecoilURLSync>
            </RecoilRoot>
          </QueryClientProvider>
        </NextUIProvider>
      </ThemeProvider>
    </StrictMode>
  )
}
