import { css, Global } from '@emotion/react'

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        html,
        body,
        #root {
          width: 100%;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        *,
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background-color: #14161a;
          color: white;
        }
      `}
    />
  )
}

export default GlobalStyles
