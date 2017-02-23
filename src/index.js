import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';
import RepositoryList from './components/repository-list';

    render(
        <Provider store={store}>
            <RepositoryList />
        </Provider>,
        document.getElementById('root')
    );
