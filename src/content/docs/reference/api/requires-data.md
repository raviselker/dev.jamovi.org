---
layout: ../layouts/BaseLayout.astro
title: "requiresData"
description: "Learn how to use the requiresData property to control the visibility of plots based on user options."
---

The `requiresData` property in `.r.yaml` is a powerful tool for managing the user experience. It allows you to hide an `Image` element until the user has provided the necessary inputs (e.g., variables in a variable selection box).

## Why use `requiresData`?

By default, jamovi attempts to render all results elements defined in the `.r.yaml`. For plots, this often results in:
1.  **Empty Placeholders:** A blank box appearing before the user has even selected a variable.
2.  **Error Messages:** The `.plot()` function failing because `self$data` or `image$state` is empty.

Using `requiresData` ensures that the plot only appears when the analysis is "ready" to draw it. This also helps keep the `.omv` file (the jamovi project file) clean and performant.

## Syntax

The `requiresData` property accepts a logical expression based on your analysis options (the names defined in your `.a.yaml` file).

```yaml
    - name: plot
      title: Descriptives Plot
      type: Image
      width:  400
      height: 300
      renderFun: .plot
      requiresData: (dep && group)
```

### Common Expressions

| Expression | Description |
| :--- | :--- |
| `(dep)` | Show if the `dep` option is not null/empty. |
| `(dep && group)` | Show only if both `dep` and `group` are provided. |
| `(dep || group)` | Show if either `dep` or `group` is provided. |
| `(mode == 'advanced')` | Show only if a specific UI mode is selected. |

## How it works

When `requiresData` evaluates to `false`:
- The image element is hidden in the jamovi results panel.
- The `.plot()` function is **not** called.
- The `.run()` function still executes, but you should use Input Checks (Early Returns) to avoid unnecessary calculations.

## Best Practices

**1. Use Input Checks (Early Returns) in R**
Even with `requiresData` in YAML, always include a check in your `.plot` function:

```r
.plot = function(image, ggtheme, theme, ...) {
    if (is.null(image$state))
        return(FALSE)
    # ... plotting logic
}
```

**2. Check inputs in `.run()`**
To prevent errors when the user hasn't selected enough variables, add a check at the beginning of your `.run()` function:

```r
.run = function() {
    if (is.null(self$options$dep) || length(self$options$group) == 0)
        return()
    
    # ... analysis logic
}
```

**3. Match your UI logic**
Ensure that the conditions in `requiresData` match the logic you use in `.run()` to populate the `image$state`. If `requiresData` is true but you haven't set the state, the user will see a blank plot or an error.

**4. Keep it simple**
Avoid overly complex logic in YAML. If you need sophisticated visibility rules, consider using `self$results$plot$setVisible(TRUE/FALSE)` dynamically within your `.run()` function instead.
