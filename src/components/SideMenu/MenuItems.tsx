import { observer } from 'mobx-react';
import * as React from 'react';

import { IMenuItem } from '../../services';

import { MenuItem } from './MenuItem';
import { MenuItemUl } from './styled.elements';

const order = {
  null: 0,
  undefined: 0,
  options: 1,
  get: 2,
  head: 3,
  post: 4,
  put: 5,
  patch: 6,
  delete: 7,
  trace: 8,
  connect: 9
};

export interface MenuItemsProps {
  items: IMenuItem[];
  expanded?: boolean;
  onActivate?: (item: IMenuItem) => void;
  style?: React.CSSProperties;
  root?: boolean;

  className?: string;
}

@observer
export class MenuItems extends React.Component<MenuItemsProps> {
  operationSorter(a, b) {
    if(order[a.httpVerb] < order[b.httpVerb]) { return -1; }
    if(order[a.httpVerb] > order[b.httpVerb]) { return 1; }
    return 0;
  }

  render() {
    const { items, root, className } = this.props;
    const expanded = this.props.expanded == null ? true : this.props.expanded;
    return (
      <MenuItemUl
        className={className}
        style={this.props.style}
        expanded={expanded}
        {...(root ? { role: 'navigation' } : {})}
      >
        {items.sort(this.operationSorter).map((item, idx) => (
          <MenuItem key={idx} item={item} onActivate={this.props.onActivate} />
        ))}
      </MenuItemUl>
    );
  }
}
