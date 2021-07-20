import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import {CacheProvider} from "@emotion/react";
import createEmotionCache from "../src/util/createEmotionCache";

export default function MyApp(props) {
  const { Component, disableEmotionCache = false, pageProps } = props;
  const MaybeCacheProvider = disableEmotionCache ? React.Fragment : CacheProvider;
  const cache = createEmotionCache();

  return (
      <MaybeCacheProvider {...disableEmotionCache ? {} : { value: cache }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
      </MaybeCacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  disableEmotionCache: PropTypes.bool,
  pageProps: PropTypes.object.isRequired,
};
