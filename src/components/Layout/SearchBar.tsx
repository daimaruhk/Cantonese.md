import { IconSearch } from '@tabler/icons-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/InputGroup';

type SearchBarProps = {
  className?: string;
};

export const SearchBar = ({ className }: SearchBarProps) => {
  return (
    <div className={className}>
      <InputGroup>
        <InputGroupAddon>
          <IconSearch />
        </InputGroupAddon>
        <InputGroupInput placeholder="搜尋..." type="search" />
      </InputGroup>
    </div>
  );
};
