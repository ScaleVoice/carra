import { css, Global } from '@emotion/react'
import { global } from 'core/styles/global'
import { size } from 'core/styles/spacing'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'

import { color, font, shadow, variables } from 'core/styles/variables'
import 'react-toastify/dist/ReactToastify.css'

import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { Auth } from 'components/auth/Auth'
import { AuthAppProps } from 'components/auth/utils'
import { ToastWrapper } from 'components/toast/Toast'
import { useState } from 'react'
import { FilterProvider } from 'sections/filtering/reducer/FiltersContext'

function App({
  Component,
  pageProps: { session: clientSession, ...pageProps }
}: AuthAppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={clientSession}>
      <QueryClientProvider client={queryClient}>
        <Global
          styles={css`
            ${global.fonts};
            ${global.reset};
            ${global.nprogress};
            ${variables};

            body {
              font-family: ${font('text')};
              color: ${color('night-text')};
            }

            .ticking_app_toast {
              --toastify-color-success: ${color('night-l-100')};
              --toastify-font-family: ${font('text')};
            }

            .react-datepicker {
              background-color: ${color('white')};
              color: ${color('night-l-100')};
              box-shadow: ${shadow(3)};

              && {
                border: 2px solid ${color('night-l-700')};
              }

              &__header {
                background-color: ${color('night-l-700')};
                border: 0;
              }

              &__current-month,
              &__day-name {
                color: ${color('night-l-100')};
              }

              &__day--selected,
              &__day:hover:not(&__day--disabled) {
                background-color: ${color('night-l-100')};
                color: ${color('white')};
              }

              &__day--today {
                background-color: ${color('night-l-700')};
              }

              &__navigation-icon::before {
                border-color: ${color('night-l-100')};
              }

              &__navigation:hover *::before {
                border-color: ${color('black')};
              }
            }

            .ticking-datepicker-clear-btn {
              padding-right: 16px;

              &::after {
                color: ${color('white')};
                background-color: ${color('night-l-100')};
              }
            }

            html {
              scroll-padding-top: ${size(18)};
            }

            #nprogress {
              color: ${color('night')};
            }
          `}
        />
        <Hydrate state={pageProps.dehydratedState}>
          <FilterProvider>
            {Component.requiresAuth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}

            <ToastWrapper />
          </FilterProvider>
        </Hydrate>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(App)
