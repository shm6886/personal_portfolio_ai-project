# -*- coding: utf-8 -*-

"""
Test for Config Management.

This test is intentionally minimal. We only verify that Config.new() can
successfully create an instance in the current runtime environment.

Why such a simple test?
-----------------------
The Config class uses factory methods that detect the runtime environment
(local vs Vercel) and create appropriately configured instances. If the
factory method runs without error, it means:

1. Runtime detection works (runtime.is_local() or runtime.is_vercel())
2. Environment variables are accessible (on Vercel) or default chain works (locally)
3. The Config dataclass is correctly defined

We don't need to test specific values because:
- On local: values come from defaults, nothing to verify
- On Vercel: values come from environment variables, which are platform-managed

The fact that `config` exists and is usable is the test.
"""

from learn_personal_portfolio_ai.config import config


def test_new_config():
    """
    Verify that config singleton is successfully created.

    This test passes if the module-level `config = Config.new()` executed
    without raising an exception. The underscore assignment is a Python
    idiom meaning "I'm using this value just to verify it exists."
    """
    _ = config
