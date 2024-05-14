import {
  ChangeEventHandler,
  createElement,
  FC,
  Fragment,
  HTMLAttributes,
  KeyboardEventHandler,
  ReactNode,
  useRef,
  useState,
} from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils";

export type Item = HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string;
  isSelected?: boolean;
};

type SearchComboboxProps = {
  className?: string;
  label?: string;
  hasSearch?: boolean;
  items: Item[];
  createNewItems?: boolean;
  trigger: ReactNode;
  renderItem?: FC<Item>;
  onSearchChange?: (value: string) => void;
  onAddElement?: (value: string) => void;
  apiCallback?: (value: string) => Promise<Item[]>;
  onItemClick?: (value: string) => void;
  closeOnClick?: boolean;
};

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
    apiCallback,
    createNewItems = false,
    onItemClick,
    closeOnClick = false,
  } = props;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [search, setSearch] = useState<string>("");

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.currentTarget.value);
    onSearchChange?.(e.currentTarget.value);
  };

  const handleEnterPressed: KeyboardEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.code !== "Enter") return;

    if (selectedItems.find((el) => el.label === search)) return;

    const s = await apiCallback?.(search);

    if (!s) {
      setFilteredSelectedItems((state) => {
        const s = [...state, { value: `${state.length + 1}`, label: search }];
        setSearch("");
        return s;
      });
      return;
    }

    setFilteredSelectedItems(s);
    setSearch("");

    onAddElement?.(search);
  };

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [filteredSelectedItems, setFilteredSelectedItems] =
    useState<Item[]>(items);

  const handleSelectItem = (item: Item) => {
    if (onItemClick) {
      onItemClick?.(item.value);
    } else {
      setSelectedItems((state) => {
        if (state.includes(item)) {
          return state.filter((s) => s !== item);
        }
        return [...state, item];
      });
    }
    if (closeOnClick && triggerRef.current) triggerRef.current.click();
  };

  return (
    <Popover>
      <PopoverTrigger ref={triggerRef} asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className={cn(className)}>
        {label && <Label>{label}</Label>}
        {hasSearch && (
          <Input
            value={search}
            onChange={handleSearchChange}
            className="mb-2"
            onKeyDown={createNewItems ? handleEnterPressed : undefined}
          />
        )}
        <div className="flex flex-col gap-1">
          {items &&
            items.length > 0 &&
            filteredSelectedItems
              .filter((item) =>
                hasSearch
                  ? item.label.toLowerCase().includes(search.toLowerCase())
                  : true
              )
              .map((item) => (
                <Fragment key={item.label}>
                  {renderItem ? (
                    createElement(renderItem, {
                      key: item.label,
                      ...item,
                      isSelected: selectedItems.includes(item),
                      onClick: () => handleSelectItem(item),
                    })
                  ) : (
                    <div
                      className={cn(
                        "px-2 py-1 rounded hover:opacity-80 cursor-pointer",
                        {
                          ["bg-muted font-bold"]: selectedItems.includes(item),
                        }
                      )}
                      onClick={() => handleSelectItem(item)}
                    >
                      {item.label}
                    </div>
                  )}
                </Fragment>
              ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
