# Vercel Active CPU Billing

## Background

Vercel introduced Active CPU Billing at **Vercel Ship 2025** in September 2025. Teams created after September 9, 2025 have this enabled by default.

## Old Model: Memory-based Billing

Under the old model, you needed to configure function memory in `vercel.json`:

```json
{
  "functions": {
    "api/**": {
      "memory": 1024
    }
  }
}
```

Billing method: **Memory size × Execution time**

Problems:
- Required manual memory configuration tuning
- Larger memory = higher unit price
- Charged even while function waits for I/O

## New Model: Active CPU Billing

Under the new model, `memory` configuration is ignored.

Billing method:
- **Active CPU**: Time when code is actually executing ($0.128/hour)
- **Provisioned Memory**: Time when function is waiting ($0.0106/GB-hour, about 1/11 of Active CPU)

Benefits:
- No need to worry about memory allocation
- Functions automatically get sufficient resources
- Waiting for I/O (LLM calls, database queries) costs almost nothing
- AI-friendly, can reduce costs by up to 90%

## Action

If your `vercel.json` has `"memory": 1024`, you can remove it since it's ignored under the new model.

## References

- [Introducing Active CPU pricing for Fluid compute](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute)
- [Vercel Ship 2025 recap](https://vercel.com/blog/vercel-ship-2025-recap)
