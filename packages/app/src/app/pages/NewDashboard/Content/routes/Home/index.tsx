import React, { useEffect } from 'react';
import { useOvermind } from 'app/overmind';
import { sandboxesTypes } from 'app/overmind/namespaces/dashboard/state';
import { Header } from 'app/pages/NewDashboard/Components/Header';
import { VariableGrid } from 'app/pages/NewDashboard/Components/VariableGrid';
import { SelectionProvider } from 'app/pages/NewDashboard/Components/Selection';
import { Helmet } from 'react-helmet';

export const Home = () => {
  const {
    actions,
    state: {
      dashboard: { viewMode, sandboxes },
    },
  } = useOvermind();

  useEffect(() => {
    actions.dashboard.getPage(sandboxesTypes.HOME);
  }, [actions.dashboard]);

  const templates = (sandboxes.TEMPLATE_HOME || []).map(template => {
    const { sandbox, ...templateValues } = template;
    return {
      type: 'sandbox',
      ...sandbox,
      isTemplate: true,
      template: templateValues,
      isHomeTemplate: true,
    };
  });

  const items = sandboxes.RECENT_HOME
    ? [
        {
          type: 'header',
          title: 'Recently Used Templates',
          ...(viewMode === 'list'
            ? {
                showMoreLink: '/s',
                showMoreLabel: '+ New Sandbox',
              }
            : {}),
        },
        { type: 'new-sandbox' },
        ...templates,
        {
          type: 'header',
          title: 'Your Recent Sandboxes',
          showMoreLink: '/new-dashboard/recent',
          showMoreLabel: 'Show more',
        },
        ...(sandboxes.RECENT_HOME || []).map(sandbox => ({
          type: 'sandbox',
          ...sandbox,
        })),
      ]
    : [
        { type: 'header', title: 'Recently Used Templates' },
        { type: 'skeletonRow' },
        { type: 'header', title: 'Your Recent Sandboxes' },
        { type: 'skeletonRow' },
      ];

  return (
    <SelectionProvider items={items}>
      <Helmet>
        <title>Dashboard - CodeSandbox</title>
      </Helmet>
      <Header title="Home" showViewOptions />
      <VariableGrid items={items} />
    </SelectionProvider>
  );
};
