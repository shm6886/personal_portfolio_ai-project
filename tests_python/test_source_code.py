# -*- coding: utf-8 -*-

from learn_personal_portfolio_ai.source_code import add_two


def test_add_two():
    assert add_two(1, 2) == 3
    assert add_two(-1, 1) == 0
    assert add_two(0, 0) == 0
