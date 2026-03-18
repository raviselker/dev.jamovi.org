---
layout: ../layouts/BaseLayout.astro
title: "Image State Performance"
description: "Optimize your jamovi module by avoiding the \"State\" anti-pattern and storing only summary statistics."
---

In jamovi, the **State/Render** model is designed for speed. However, a common mistake—the "State" anti-pattern—can lead to sluggish performance and bloated file sizes.

## The "State" Anti-Pattern

The anti-pattern occurs when a developer stores the entire raw dataset in the image state:

```r
# ❌ THE ANTI-PATTERN
.run = function() {
    image <- self$results$plot
    image$setState(self$data) # BAD: Storing the whole dataset!
}
```

### Why this is bad

1.  **Memory Bloat:** If your dataset has 100,000 rows and you have 5 plots, you are storing 500,000 rows of data in memory.
2.  **Slow Saves:** jamovi saves the state of every results element into the `.omv` file. Storing raw data in the state makes files massive and saving/loading painfully slow.
3.  **Redundancy:** The raw data is already available to the analysis. Storing it again in the state is unnecessary.

## The Solution: Summary Statistics

The `.run()` function should do the "heavy lifting" of statistical calculation. The `.plot()` function should only handle the "painting" of pixels.

**Always store only the minimum data required to draw the plot.**

### Authoritative Example

Instead of the whole dataset, calculate the means and confidence intervals in `.run()`:

```r
# ✅ BEST PRACTICE
.run = function() {
    # 1. Calculate summary stats
    dep <- self$options$dep
    group <- self$options$group
    
    # Use jmvcore or base R to get just what you need
    plotData <- aggregate(
        as.formula(paste(dep, "~", group)), 
        data = self$data, 
        FUN = function(x) c(mean = mean(x), se = sd(x)/sqrt(length(x)))
    )
    
    # 2. Summarize and store only the summary table
    # (e.g., a data frame with 5-10 rows instead of 10,000)
    image <- self$results$plot
    image$setState(plotData)
}
```

## Performance Checklist

- [ ] **Is my state a data frame?** Data frames are generally more efficient for `ggplot2` than complex lists.
- [ ] **Did I filter NAs?** Don't pass missing values to the state if they aren't needed.
- [ ] **Is the row count minimal?** If your plot shows 10 groups, your state should ideally have 10 rows.
- [ ] **Are there large objects?** Avoid storing model objects (like `lm` or `lmer` outputs) in the state unless absolutely necessary. Extract the coefficients or predictions first.

> [!TIP]
> If you find yourself needing the raw data for a scatterplot with thousands of points, consider downsampling or using hexbins to maintain performance without sacrificing visual integrity.

**Next Step:** Learn how to make your plots match the jamovi look and feel in **[Plot Themes](/tutorial/tuts0302-plot-themes)**.
