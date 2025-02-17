import React, { useMemo } from 'react';

import { selectors } from '@grafana/e2e-selectors';
import { locationService, reportInteraction } from '@grafana/runtime';
import { Menu } from '@grafana/ui';
import { t } from 'app/core/internationalization';
import { DashboardModel } from 'app/features/dashboard/state';
import {
  getCopiedPanelPlugin,
  onAddLibraryPanel,
  onCreateNewPanel,
  onCreateNewRow,
  onPasteCopiedPanel,
} from 'app/features/dashboard/utils/dashboard';

interface Props {
  dashboard: DashboardModel;
}

export const AddPanelMenu = ({ dashboard }: Props) => {
  const copiedPanelPlugin = useMemo(() => getCopiedPanelPlugin(), []);

  return (
    <Menu>
      <Menu.Item
        key="add-visualisation"
        label={t('dashboard.add-menu.visualization', 'Visualization')}
        testId={selectors.components.PageToolbar.itemButton('Add new visualization menu item')}
        onClick={() => {
          reportInteraction('dashboards_toolbar_add_clicked', { item: 'add_visualization' });
          const id = onCreateNewPanel(dashboard);
          locationService.partial({ editPanel: id });
        }}
      />
      <Menu.Item
        key="add-row"
        label={t('dashboard.add-menu.row', 'Row')}
        testId={selectors.components.PageToolbar.itemButton('Add new row menu item')}
        onClick={() => {
          reportInteraction('dashboards_toolbar_add_clicked', { item: 'add_row' });
          onCreateNewRow(dashboard);
        }}
      />
      <Menu.Item
        key="add-panel-lib"
        label={t('dashboard.add-menu.import', 'Import from library')}
        testId={selectors.components.PageToolbar.itemButton('Add new panel from panel library menu item')}
        onClick={() => {
          reportInteraction('dashboards_toolbar_add_clicked', { item: 'import_from_library' });
          onAddLibraryPanel(dashboard);
        }}
      />
      <Menu.Item
        key="add-panel-clipboard"
        label={t('dashboard.add-menu.paste-panel', 'Paste panel')}
        testId={selectors.components.PageToolbar.itemButton('Add new panel from clipboard menu item')}
        onClick={() => {
          reportInteraction('dashboards_toolbar_add_clicked', { item: 'paste_panel' });
          onPasteCopiedPanel(dashboard, copiedPanelPlugin);
        }}
        disabled={!copiedPanelPlugin}
      />
    </Menu>
  );
};
