import {
  ChangeEventHandler,
  createElement,
  FC,
  Fragment,
  HTMLAttributes,
  KeyboardEventHandler,
  ReactNode,
  useState
} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/shared/ui/popover";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {cn} from "@/shared/utils";

export type Item = HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string;
  isSelected?: boolean;
}

type SearchComboboxProps = {
  className?: string;
  label?: string;
  hasSearch?: boolean;
  items: Item[]
  trigger: ReactNode;
  renderItem?: FC<Item>
  onSearchChange?: (value: string) => void;
  onAddElement?: (value: string) => void;
  apiCallback?: (value: string) => Promise<Item[]>
}

export const SearchCombobox: FC<SearchComboboxProps> = (props) => {
  const {
    label,
    trigger,
    className,
    hasSearch = false,
    onSearchChange,
    onAddElement,
    items,
    renderItem,
    apiCallback
  } = props;

  const [search, setSearch] = useState<string>('');

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.currentTarget.value);
    onSearchChange?.(e.currentTarget.value);
  }

  const handleEnterPressed: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.code !== 'Enter') return;

    if (selectedItems.find(el => el.label === search)) return;

    const s = await apiCallback?.(search);

    if (!s) {
      setFilteredSelectedItems((state) => {
        console.log('state', selectedItems)

        const s = [...state, {value: `${state.length + 1}`, label: search}];
        setSearch('');
        return s;
      })
      return;
    }

    setFilteredSelectedItems(s);
    setSearch('');

    onAddElement?.(search);
  }

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [filteredSelectedItems, setFilteredSelectedItems] = useState<Item[]>(items);

  const handleSelectItem = (item: Item) => {
    setSelectedItems((state) => {
      if (state.includes(item)) {
        return state.filter(s => s !== item)
      }
      return [...state, item]
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className={cn(className)}>
        {label && <Label>{label}</Label>}
        {hasSearch && <Input value={search} onChange={handleSearchChange} onKeyDown={handleEnterPressed}/>}
        {items && items.length > 0 && filteredSelectedItems.filter(item => hasSearch ? item.label.includes(search) : true).map(item => (
            <Fragment key={item.label}>
              {renderItem ? (
                createElement(renderItem, {
                  key: item.label,
                  ...item,
                  isSelected: selectedItems.includes(item),
                  onClick: () => handleSelectItem(item),
                })
              ) : <div className={cn('', {
                ['bg-blue-400']: selectedItems.includes(item)
              })} onClick={() => handleSelectItem(item)}>{item.label}</div>
              }
            </Fragment>
          )
        )}
      </PopoverContent>
    </Popover>
  )
    ;
};