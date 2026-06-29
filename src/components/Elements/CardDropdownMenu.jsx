import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function CardDropdownMenu({ onEdit, onDelete }) {
  return (
    <div className="absolute right-0 top-0 p-2">
      <Menu as="div" className="relative inline-block">
        <MenuButton className="flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path d="M10 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM10 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
          </svg>
        </MenuButton>

        <MenuItems
          transition
          anchor={{ to: "bottom end", gap: 4, padding: 8 }}
          className="z-10 mt-1 w-40 origin-top-right rounded-xl bg-white dark:bg-gray-900 shadow-lg outline-1 outline-black/5 dark:outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1.5">
            {onEdit && (
              <MenuItem>
                <button
                  type="button"
                  onClick={onEdit}
                  className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs text-gray-600 dark:text-gray-400 data-focus:bg-gray-50 dark:data-focus:bg-gray-800 data-focus:text-gray-900 dark:data-focus:text-white data-focus:outline-hidden transition-colors"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5 opacity-60"
                  >
                    <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                  </svg>
                  Edit
                </button>
              </MenuItem>
            )}

            <div className="my-1 h-px bg-gray-100 dark:bg-gray-800 mx-3" />

            <MenuItem>
              <button
                type="button"
                onClick={onDelete}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs text-red-500 data-focus:bg-red-50 dark:data-focus:bg-red-950/40 data-focus:text-red-600 data-focus:outline-hidden transition-colors"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
