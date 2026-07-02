---
title: "Notes on Scaling Distributed Training Without Losing Your Mind"
date: "2026-05-20"
excerpt: "Hard-won lessons from scaling PyTorch training across hundreds of GPUs — what breaks, what helps, and what I'd do differently."
tags: ["Distributed Training", "PyTorch", "GPU"]
cover: ""
---

When you first scale a training job from one GPU to many, everything _feels_ like
it should just work. NCCL handles the communication, PyTorch's DDP wraps your
model, and the docs make it look like a two-line change. Then reality shows up.

## The things that actually bite

- **Stragglers.** One slow node drags the entire all-reduce. Measure per-rank
  step time before you blame the model.
- **Checkpointing.** If a 400-GPU job dies at hour 9 with no checkpoint, you have
  lost a day. Checkpoint early, checkpoint often, checkpoint asynchronously.
- **Data loading.** The GPUs are rarely the bottleneck. Your input pipeline
  usually is.

## What helped

1. Treat the network as a first-class resource. Topology-aware scheduling matters.
2. Build fault tolerance in from day one — assume nodes will die.
3. Make the boring metrics impossible to ignore: GPU utilization, step time,
   and data-loader wait time on one dashboard.

> Good training infrastructure is invisible. You only notice it when it's missing.

Replace this post with your own writing — drop a new `.md` file in
`content/articles/` and it shows up automatically.
