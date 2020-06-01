import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { useObserver } from 'mobx-react-lite';
import { useStores } from '../../hooks';
import './style.scss';

export default () => {
  const { appLoaderStore } = useStores();
  return useObserver(() => (
    <Dimmer active={appLoaderStore.isLoading}
            inverted
            page
            className="app-loader">
      <Loader size="large"/>
    </Dimmer>
  ));
};