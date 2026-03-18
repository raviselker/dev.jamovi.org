---
layout: ../layouts/BaseLayout.astro
title: "Advanced Table Techniques"
description: "Learn the three levels of table initialization and how to use Table Folding for complex results."
---

Building on the [Analysis Lifecycle](/tutorial/tuts0104a-analysis-lifecycle), this section explores how to handle tables that don't have a fixed structure.

## The Three Levels of Table Initialization

In jamovi, you can define a table's structure at three different stages, depending on how much information you have.

### 1. YAML (Static/Data-bound)
The simplest way. **Define** the columns and rows directly in your `.r.yaml`. **Use** `columns` for fixed columns and `rows` for fixed rows. You can also **use** `clearWith` to specify which options should trigger a reset of the table.

```yaml
- name: mainTable
  type: Table
  columns:
    - name: var
      title: Variable
      type: text
    - name: p
      title: p-value
      type: number
      format: zto,pvalue
```

### 2. `.init()` (Dynamic Structure)
**Use** this when the table structure depends on **User Options**, but not on the data values themselves. For example, if the user selects "Descriptives", you might want to **add** extra columns.

```r
.init = function() {
    table <- self$results$mainTable
    if (self$options$showDescriptives) {
        table$addColumn(name='mean', title='Mean', type='number')
        table$addColumn(name='sd', title='SD', type='number')
    }
}
```

### 3. .run() (Result-based Structure)
**Use** this only when the structure depends on the **Results of the Calculation**. For example, in an Exploratory Factor Analysis where the number of columns depends on how many factors were actually extracted from the data.

> [!CAUTION]
> **Avoid Level 3 whenever possible.** Using `.run()` to define table structure causes a "UI Jump." Because the `.init()` phase doesn't know the structure, it creates a generic placeholder. When `.run()` finishes, the table "jumps" as columns and rows are suddenly added. This happens every time an option changes, making the UI feel unstable.

**Prefer Level 1 or 2:** You **MUST** use Level 1 (YAML) or Level 2 (`.init()`) unless it is absolutely impossible to know the structure before the analysis runs. Level 1 and 2 ensure a smooth, professional-feeling UI where the table structure is visible immediately.

```r
.run = function() {
    # Perform calculation
    results <- stats::factanal(self$data, factors=3)

    table <- self$results$mainTable

    # Add columns based on the number of factors found
    for (i in seq_len(ncol(results$loadings))) {
        table$addColumn(
            name=paste0('f', i), 
            title=paste('Factor', i),
            type='number'
        )
    }

    # Populate the table
    # ...
}
```

---

## Table Folding

Sometimes, a single logical "result" actually consists of multiple tables (e.g., a main t-test table and a table for normality tests). **Table Folding** allows you to group these together using a specific naming convention in your `.r.yaml`.

### The Bracket Convention
By using square brackets in the `name` property, jamovi treats these items as part of a single group.

- **Before the brackets:** (e.g., `ttest`) This becomes the name of the results object in your R code.
- **Inside the brackets:** (e.g., `main`) This is the specific table within that group.

```yaml
# .r.yaml
items:
  - name: ttest[main]
    title: Independent Samples T-Test
    type: Table
    ...
  - name: ttest[assum]
    title: Assumption Checks
    type: Table
    ...
```

### Why use Folding?
1.  **Logical Grouping:** In the R API, these are accessed as a single object: `self$results$ttest`.
2.  **UI Organization:** jamovi can use this information to group results visually or when exporting to APA format.
3.  **Clean Code:** You can iterate over the group if needed.

```r
# Accessing folded tables in .b.R
# 'ttest' comes from before the brackets, 'main' from inside them.
mainTable <- self$results$ttest$main
assumTable <- self$results$ttest$assum

# You can also use get() if the name is dynamic
# mainTable <- self$results$ttest$get('main')
```

> [!TIP]
> Table folding is particularly powerful when combined with `visible` options. You can have a whole suite of "Assumption" tables that only appear when a single "Check Assumptions" checkbox is ticked.

**Next Step:** Now that you've mastered tables, let's look at [Handling Data](/tutorial/tuts0202-handling-data) more efficiently.
