Feature: Counter

Scenario: The counter starts at 0
    Given I can see the counter
    Then I see the counter is 0

Scenario: Incrementing the counter, so that I can keep track of how many times I've seen an MLB player spit
    Given I can see the counter
    When I click the increment button
    Then I see the counter is 1

Scenario: Resetting the counter
    Given I can see the counter
    When I click the increment button
    And I click the increment button
    And I click the increment button
    Then I see the counter is 3
    When I reset the counter
    Then I see the counter is 0
