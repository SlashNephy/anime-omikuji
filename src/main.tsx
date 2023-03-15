import { createTheme, NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import { App } from './App'

const lightTheme = createTheme({
  type: 'light',
})

const darkTheme = createTheme({
  type: 'dark',
})

const queryClient = new QueryClient()

const container = document.getElementById('root')
if (container !== null) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
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
              <App />
            </RecoilRoot>
          </QueryClientProvider>
        </NextUIProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}
