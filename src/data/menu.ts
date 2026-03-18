// Shared menu structure used by Sidebar and PageNav components
export const menu = [
  {
    section: 'learn',
    category: 'Tutorial',
    items: [
      { text: '1 - Getting Started', href: '/tutorial/tuts0101-getting-started' },
      { text: '2 - Building Your First Analysis', href: '/tutorial/tuts0102-building-your-first-analysis' },
      { text: '3 - Implementing an Analysis', href: '/tutorial/tuts0103-implementing-an-analysis' },
      { text: '4 - The jamovi Results Model', href: '/tutorial/tuts0104-results-mental-model' },
      { text: '5 - Creating Rich Results', href: '/tutorial/tuts0105-creating-rich-results' },
      { text: '6 - Debugging an Analysis', href: '/tutorial/tuts0106-debugging-an-analysis' },
      { text: '7 - Adding Plots', href: '/tutorial/tuts0107-adding-plots' },
      { text: '8 - Distributing Modules', href: '/tutorial/tuts0109-distributing-modules' },
      { text: '9 - Additional Notes', href: '/tutorial/tuts0110-additional-notes' },
      { text: '10 - Summary & Next Steps', href: '/tutorial/tuts0111-summary' },
    ]
  },
  {
    section: 'learn',
    category: 'Intermediate',
    items: [
      { text: '1 - Dynamic Tables', href: '/tutorial/tuts0201-dynamic-tables' },
      { text: '2 - Handling Data', href: '/tutorial/tuts0202-handling-data' },
      { text: '3 - State', href: '/tutorial/tuts0203-state' },
      { text: '4 - Unit Testing your Analysis', href: '/tutorial/tuts0108-unit-testing' },
    ]
  },
  {
    section: 'learn',
    category: 'User Interface',
    items: [
      { text: '1 - Basic UI Design', href: '/ui/basic-design' },
      { text: '2 - Advanced UI Design', href: '/ui/advanced-design' },
      { text: '3 - Advanced Customisation', href: '/ui/advanced-customisation' },
    ]
  },
  {
    section: 'reference',
    category: 'API (yaml)',
    items: [
      { text: 'Module Definition', href: '/api/module-definition' },
      { text: 'Analysis Definition', href: '/api/analysis-definition' },
      { text: 'Results Definition', href: '/api/results-definition' },
      { text: 'UI Definition', href: '/api/ui-definition' },
    ]
  },
  {
    section: 'reference',
    category: 'API (R)',
    items: [
      { text: 'Results Elements', href: '/api/results-elements' },
      { text: 'Table', href: '/api/table' },
      { text: 'Notices', href: '/api/notices' },
      { text: 'Actions', href: '/api/actions' },
      { text: 'Image Sizing', href: '/api/image-sizing' },
      { text: 'Module Translation', href: '/api/i18n' },
    ]
  },
  {
    section: 'reference',
    category: 'UI Controls',
    items: [
      { text: 'BaseControl', href: '/ui/basecontrol' },
      { text: 'CheckBox', href: '/ui/checkbox' },
      { text: 'CollapseBox', href: '/ui/collapsebox' },
      { text: 'ComboBox', href: '/ui/combobox' },
      { text: 'Label', href: '/ui/label' },
      { text: 'LayoutBox', href: '/ui/layoutbox' },
      { text: 'ListBox', href: '/ui/listbox' },
      { text: 'OptionControl', href: '/ui/optioncontrol' },
      { text: 'ParentControl', href: '/ui/parentcontrol' },
      { text: 'RadioButton', href: '/ui/radiobutton' },
      { text: 'Supplier', href: '/ui/supplier' },
      { text: 'TargetLayoutBox', href: '/ui/targetlayoutbox' },
      { text: 'TermLabel', href: '/ui/termlabel' },
      { text: 'TextBox', href: '/ui/textbox' },
      { text: 'VariableLabel', href: '/ui/variablelabel' },
      { text: 'VariableSupplier', href: '/ui/variablesupplier' },
    ]
  },
  {
    section: 'resources',
    category: 'Resources',
    items: [
      { text: 'Module Showcase', href: '/showcase' },
      { text: 'Cheat Sheet', href: '/misc/cheat-sheet' },
    ]
  },
  {
    section: 'resources',
    category: 'Misc',
    items: [
      { text: 'Submitting to Library', href: '/misc/library' },
      { text: 'Project Structure', href: '/misc/project-structure' },
      { text: 'API Updates', href: '/misc/updates' },
    ]
  }
];

// Flatten all items into a single ordered list for prev/next navigation
export const allPages = menu.flatMap(section => section.items);
